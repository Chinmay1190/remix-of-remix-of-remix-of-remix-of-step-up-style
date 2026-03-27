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

const descriptionMap: Record<string, string> = {
  processing: "Order is being prepared",
  shipped: "Order has been shipped",
  delivered: "Order has been delivered",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify user via getClaims
    const authClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = claimsData.claims.sub;

    const { order_id } = await req.json();

    // Use service role client for DB operations (bypasses RLS)
    const supabase = createClient(supabaseUrl, serviceKey);

    // Fetch order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .eq("user_id", userId)
      .single();

    if (orderError || !order) {
      return new Response(JSON.stringify({ error: "Order not found", details: orderError?.message }), {
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
    const description = descriptionMap[nextStatus] || `Order status updated to ${nextStatus}`;

    // Update order status
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: nextStatus })
      .eq("id", order_id);

    if (updateError) throw updateError;

    // Directly insert tracking entry (in case trigger doesn't fire)
    await supabase.from("order_tracking").insert({
      order_id,
      status: nextStatus,
      description,
      location,
    });

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
