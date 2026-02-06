import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Clock, CheckCircle, Truck, ArrowLeft, Download, MapPin, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/currency";

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string | null;
  size: number;
  color: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string | null;
  created_at: string;
}

interface Order {
  id: string;
  status: string;
  total: number;
  shipping_address: ShippingAddress | null;
  created_at: string;
  items?: OrderItem[];
  tracking?: TrackingEvent[];
}

const statusConfig = {
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Pending" },
  processing: { icon: Package, color: "text-blue-500", bg: "bg-blue-500/10", label: "Processing" },
  shipped: { icon: Truck, color: "text-purple-500", bg: "bg-purple-500/10", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", label: "Delivered" },
};

const statusOrder = ["pending", "processing", "shipped", "delivered"];

const generateInvoiceHTML = (order: Order, userName: string) => {
  const date = new Date(order.created_at).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });
  const invoiceNo = `INV-${order.id.slice(0, 8).toUpperCase()}`;
  const subtotal = order.items?.reduce((s, i) => s + i.price * i.quantity, 0) || 0;
  const shipping = order.total - subtotal;
  const addr = order.shipping_address;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice ${invoiceNo}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',sans-serif;color:#1a1a2e;padding:40px;max-width:800px;margin:auto}
.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px;border-bottom:3px solid #1a1a2e;padding-bottom:20px}
.logo{font-size:28px;font-weight:800;letter-spacing:-1px}
.invoice-info{text-align:right;font-size:13px;color:#666}
.invoice-info h2{color:#1a1a2e;font-size:18px;margin-bottom:8px}
.addresses{display:flex;justify-content:space-between;margin-bottom:30px}
.addr-block{font-size:13px;line-height:1.6}
.addr-block h4{font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#999;margin-bottom:4px}
table{width:100%;border-collapse:collapse;margin-bottom:30px}
th{background:#f8f8f8;padding:12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #eee}
td{padding:12px;border-bottom:1px solid #f0f0f0;font-size:14px}
.text-right{text-align:right}
.totals{margin-left:auto;width:280px}
.totals .row{display:flex;justify-content:space-between;padding:8px 0;font-size:14px}
.totals .row.total{border-top:2px solid #1a1a2e;font-weight:700;font-size:16px;padding-top:12px;margin-top:4px}
.footer{margin-top:50px;text-align:center;font-size:12px;color:#999;border-top:1px solid #eee;padding-top:20px}
</style></head><body>
<div class="header">
  <div class="logo">SNEAKERS</div>
  <div class="invoice-info">
    <h2>INVOICE</h2>
    <p>${invoiceNo}</p>
    <p>Date: ${date}</p>
  </div>
</div>
<div class="addresses">
  <div class="addr-block">
    <h4>Billed To</h4>
    <p><strong>${userName}</strong></p>
    ${addr ? `<p>${addr.street || ""}</p><p>${addr.city || ""}, ${addr.state || ""} ${addr.zip || ""}</p><p>${addr.country || ""}</p>` : ""}
  </div>
  <div class="addr-block" style="text-align:right">
    <h4>From</h4>
    <p><strong>Sneakers Store</strong></p>
    <p>123 Fashion Street</p>
    <p>Mumbai, MH 400001</p>
    <p>India</p>
  </div>
</div>
<table>
  <thead><tr><th>Item</th><th>Size</th><th>Color</th><th>Qty</th><th class="text-right">Price</th><th class="text-right">Total</th></tr></thead>
  <tbody>
    ${order.items?.map(i => `<tr>
      <td>${i.product_name}</td>
      <td>${i.size}</td>
      <td>${i.color}</td>
      <td>${i.quantity}</td>
      <td class="text-right">₹${Number(i.price).toLocaleString("en-IN")}</td>
      <td class="text-right">₹${(Number(i.price) * i.quantity).toLocaleString("en-IN")}</td>
    </tr>`).join("") || ""}
  </tbody>
</table>
<div class="totals">
  <div class="row"><span>Subtotal</span><span>₹${subtotal.toLocaleString("en-IN")}</span></div>
  <div class="row"><span>Shipping</span><span>${shipping > 0 ? `₹${shipping.toLocaleString("en-IN")}` : "Free"}</span></div>
  <div class="row total"><span>Total</span><span>₹${Number(order.total).toLocaleString("en-IN")}</span></div>
</div>
<div class="footer">
  <p>Thank you for shopping with Sneakers!</p>
  <p>For queries, contact support@sneakers.store</p>
</div>
</body></html>`;
};

const downloadInvoice = (order: Order, userName: string) => {
  const html = generateInvoiceHTML(order, userName);
  const blob = new Blob([html], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Invoice-${order.id.slice(0, 8).toUpperCase()}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const Orders = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "tracking">("details");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      fetchOrders();

      const channel = supabase
        .channel('orders')
        .on('postgres_changes', {
          event: '*', schema: 'public', table: 'orders',
          filter: `user_id=eq.${user.id}`,
        }, () => { fetchOrders(); })
        .on('postgres_changes', {
          event: '*', schema: 'public', table: 'order_tracking',
        }, () => { fetchOrders(); })
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    }
  }, [user, authLoading, navigate]);

  const fetchOrders = async () => {
    if (!user) return;

    const { data: ordersData, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) { console.error("Error fetching orders:", error); return; }

    const ordersWithItems: Order[] = await Promise.all(
      (ordersData || []).map(async (order) => {
        const [{ data: items }, { data: tracking }] = await Promise.all([
          supabase.from("order_items").select("*").eq("order_id", order.id),
          supabase.from("order_tracking").select("*").eq("order_id", order.id).order("created_at", { ascending: true }),
        ]);

        return {
          id: order.id,
          status: order.status,
          total: order.total,
          shipping_address: order.shipping_address as ShippingAddress | null,
          created_at: order.created_at,
          items: (items || []).map((item) => ({
            id: item.id, product_name: item.product_name, product_image: item.product_image,
            size: Number(item.size), color: item.color, quantity: item.quantity, price: Number(item.price),
          })),
          tracking: (tracking || []).map((t) => ({
            id: t.id, status: t.status, description: t.description,
            location: t.location, created_at: t.created_at,
          })),
        };
      })
    );

    setOrders(ordersWithItems);
    setLoading(false);
  };

  if (authLoading || loading) {
    return (
      <main className="pt-24 pb-16 section-padding min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
      </main>
    );
  }

  if (!user) return null;

  const userName = user.user_metadata?.full_name || user.email || "Customer";

  return (
    <main className="pt-24 pb-16 section-padding">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-bold tracking-tight mb-2">Order History</h1>
          <p className="text-muted-foreground mb-8">{orders.length} orders</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Package className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here!</p>
            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:scale-105 transition-transform">
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => {
              const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
              const StatusIcon = status.icon;
              const isExpanded = expandedOrder === order.id;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl bg-secondary p-6"
                >
                  <button
                    onClick={() => { setExpandedOrder(isExpanded ? null : order.id); setActiveTab("details"); }}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="font-display font-semibold">
                          {new Date(order.created_at).toLocaleDateString("en-IN", {
                            year: "numeric", month: "long", day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${status.bg}`}>
                        <StatusIcon className={`w-4 h-4 ${status.color}`} />
                        <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-3">
                        {order.items?.slice(0, 3).map((item, i) => (
                          <div key={i} className="w-12 h-12 rounded-xl border-2 border-secondary overflow-hidden">
                            <img src={item.product_image || "/placeholder.svg"} alt={item.product_name} className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {(order.items?.length || 0) > 3 && (
                          <div className="w-12 h-12 rounded-xl border-2 border-secondary bg-muted flex items-center justify-center text-xs font-medium">
                            +{(order.items?.length || 0) - 3}
                          </div>
                        )}
                      </div>
                      <p className="font-display font-bold text-lg">{formatPrice(Number(order.total))}</p>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-border overflow-hidden"
                      >
                        {/* Tabs */}
                        <div className="flex gap-2 mb-4">
                          <button
                            onClick={() => setActiveTab("details")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "details" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                          >
                            <FileText className="w-4 h-4 inline mr-1" /> Details
                          </button>
                          <button
                            onClick={() => setActiveTab("tracking")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "tracking" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                          >
                            <Truck className="w-4 h-4 inline mr-1" /> Track Order
                          </button>
                          <button
                            onClick={() => downloadInvoice(order, userName)}
                            className="ml-auto px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
                          >
                            <Download className="w-4 h-4 inline mr-1" /> Invoice
                          </button>
                        </div>

                        {activeTab === "details" && (
                          <div>
                            <div className="space-y-3">
                              {order.items?.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted">
                                    <img src={item.product_image || "/placeholder.svg"} alt={item.product_name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{item.product_name}</p>
                                    <p className="text-sm text-muted-foreground">Size {item.size} • {item.color} • Qty {item.quantity}</p>
                                  </div>
                                  <p className="font-display font-semibold">{formatPrice(Number(item.price))}</p>
                                </div>
                              ))}
                            </div>

                            {order.shipping_address && (
                              <div className="mt-4 p-4 rounded-xl bg-muted/50">
                                <p className="text-sm font-medium mb-1">Shipping Address</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.shipping_address.street}<br />
                                  {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}<br />
                                  {order.shipping_address.country}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {activeTab === "tracking" && (
                          <div>
                            {/* Status progress bar */}
                            <div className="flex items-center justify-between mb-6 px-2">
                              {statusOrder.map((s, i) => {
                                const cfg = statusConfig[s as keyof typeof statusConfig];
                                const Icon = cfg.icon;
                                const currentIdx = statusOrder.indexOf(order.status);
                                const isCompleted = i <= currentIdx;
                                const isActive = i === currentIdx;
                                return (
                                  <div key={s} className="flex flex-col items-center flex-1 relative">
                                    {i > 0 && (
                                      <div className={`absolute top-4 right-1/2 w-full h-0.5 -z-10 ${i <= currentIdx ? "bg-primary" : "bg-muted"}`} />
                                    )}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${isActive ? "bg-primary text-primary-foreground" : isCompleted ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>{cfg.label}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Tracking timeline */}
                            {order.tracking && order.tracking.length > 0 ? (
                              <div className="space-y-0 relative ml-4">
                                {order.tracking.map((event, i) => (
                                  <div key={event.id} className="flex gap-4 pb-4 relative">
                                    <div className="flex flex-col items-center">
                                      <div className={`w-3 h-3 rounded-full ${i === order.tracking!.length - 1 ? "bg-primary" : "bg-muted-foreground/30"}`} />
                                      {i < order.tracking!.length - 1 && <div className="w-0.5 flex-1 bg-muted-foreground/20" />}
                                    </div>
                                    <div className="pb-2">
                                      <p className="font-medium text-sm">{event.description}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {new Date(event.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                                        {" • "}
                                        {new Date(event.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                                      </p>
                                      {event.location && (
                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                          <MapPin className="w-3 h-3" /> {event.location}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground text-center py-4">No tracking updates yet.</p>
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;
