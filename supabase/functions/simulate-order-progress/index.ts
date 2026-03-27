import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const statusFlow = ["pending", "processing", "shipped", "delivered"];

const locationMap: Record<string, string> = {
  processing: "Warehouse - Mumbai, MH",
  shipped: "In Transit - Local Hub",
  delivered: "Delivered to Address",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user
    const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!);
    const { data: { user }, error: authError } = await anonClient.auth.getUser(authHeader.replace("Bearer ", ""));
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { order_id } = await req.json();

    // Fetch order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .eq("user_id", user.id)
      .single();

    if (orderError || !order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const currentIdx = statusFlow.indexOf(order.status);
    if (currentIdx >= statusFlow.length - 1) {
      return new Response(
        JSON.stringify({ message: "Order already delivered", status: order.status }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const nextStatus = statusFlow[currentIdx + 1];
    const location = locationMap[nextStatus] || null;

    // Update order status (trigger will auto-create tracking entry)
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: nextStatus })
      .eq("id", order_id);

    if (updateError) throw updateError;

    // Update location on the tracking entry
    if (location) {
      // Small delay to let trigger fire
      await new Promise((r) => setTimeout(r, 500));
      await supabase
        .from("order_tracking")
        .update({ location })
        .eq("order_id", order_id)
        .eq("status", nextStatus);
    }

    return new Response(
      JSON.stringify({ message: `Order advanced to ${nextStatus}`, status: nextStatus }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
