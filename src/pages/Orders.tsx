import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Clock, CheckCircle, Truck, ArrowLeft, Download, MapPin, FileText, Calendar, Box, ChevronDown, RefreshCw, ShieldCheck, CircleDot, Play, Loader2, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/currency";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

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
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20", label: "Order Placed", desc: "Your order has been confirmed" },
  processing: { icon: Package, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", label: "Processing", desc: "Being packed at our warehouse" },
  shipped: { icon: Truck, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20", label: "Shipped", desc: "On its way to you" },
  delivered: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20", label: "Delivered", desc: "Successfully delivered" },
};

const statusOrder = ["pending", "processing", "shipped", "delivered"];

const generateInvoiceHTML = (order: Order, userName: string) => {
  const date = new Date(order.created_at).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });
  const invoiceNo = `INV-${order.id.slice(0, 8).toUpperCase()}`;
  const subtotal = order.items?.reduce((s, i) => s + i.price * i.quantity, 0) || 0;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = Number(order.total);
  const shipping = Math.max(0, grandTotal - subtotal - gst);
  const addr = order.shipping_address;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice ${invoiceNo}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Outfit',sans-serif;color:#1a1a2e;background:#fff}
.invoice{max-width:800px;margin:0 auto;padding:48px}
.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px;padding-bottom:32px;border-bottom:2px solid #f0f0f0}
.brand{display:flex;align-items:center;gap:12px}
.brand-icon{width:48px;height:48px;background:linear-gradient(135deg,#e85d26,#f09030);border-radius:14px;display:flex;align-items:center;justify-content:center;color:white;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px}
.brand-name{font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:700;letter-spacing:-0.5px}
.invoice-meta{text-align:right}
.invoice-badge{display:inline-block;background:linear-gradient(135deg,#e85d26,#f09030);color:white;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:13px;padding:6px 16px;border-radius:20px;letter-spacing:1px;margin-bottom:12px}
.invoice-meta p{font-size:13px;color:#777;line-height:1.8}
.invoice-meta strong{color:#1a1a2e}
.addresses{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-bottom:40px}
.addr-block{padding:24px;background:#fafafa;border-radius:16px;border:1px solid #f0f0f0}
.addr-label{font-family:'Space Grotesk',sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#999;margin-bottom:12px;font-weight:600}
.addr-block p{font-size:14px;line-height:1.7;color:#555}
.addr-block .name{font-weight:600;color:#1a1a2e;font-size:15px}
table{width:100%;border-collapse:collapse;margin-bottom:32px}
thead{background:#1a1a2e}
th{padding:14px 16px;text-align:left;font-family:'Space Grotesk',sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:white;font-weight:600}
th:last-child,th:nth-child(4),th:nth-child(5){text-align:right}
td{padding:16px;border-bottom:1px solid #f5f5f5;font-size:14px;color:#555}
td:last-child,td:nth-child(4),td:nth-child(5){text-align:right;font-weight:500}
tr:hover td{background:#fafafa}
.item-name{font-weight:600;color:#1a1a2e}
.item-details{font-size:12px;color:#999;margin-top:2px}
.summary{display:flex;justify-content:flex-end;margin-bottom:48px}
.summary-box{width:320px;padding:24px;background:linear-gradient(135deg,#fef7f0,#fff5eb);border-radius:16px;border:1px solid #fde8d3}
.summary-row{display:flex;justify-content:space-between;padding:8px 0;font-size:14px;color:#666}
.summary-row.total{border-top:2px solid #e85d26;padding-top:16px;margin-top:8px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;color:#1a1a2e}
.footer{text-align:center;padding-top:32px;border-top:1px solid #f0f0f0}
.footer p{font-size:12px;color:#aaa;line-height:2}
.footer .thanks{font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:600;color:#1a1a2e;margin-bottom:8px}
</style></head><body>
<div class="invoice">
<div class="header">
  <div class="brand">
    <div class="brand-icon">S</div>
    <div class="brand-name">SOLEMATE</div>
  </div>
  <div class="invoice-meta">
    <div class="invoice-badge">INVOICE</div>
    <p><strong>${invoiceNo}</strong></p>
    <p>Date: ${date}</p>
    <p>Status: ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
  </div>
</div>
<div class="addresses">
  <div class="addr-block">
    <div class="addr-label">Billed To</div>
    <p class="name">${userName}</p>
    ${addr ? `<p>${addr.street || ""}<br/>${addr.city || ""}, ${addr.state || ""} ${addr.zip || ""}<br/>${addr.country || ""}</p>` : ""}
  </div>
  <div class="addr-block">
    <div class="addr-label">From</div>
    <p class="name">SOLEMATE Store</p>
    <p>123 Fashion Street<br/>Mumbai, MH 400001<br/>India</p>
  </div>
</div>
<table>
  <thead><tr><th>#</th><th>Item</th><th>Size</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
  <tbody>
    ${order.items?.map((i, idx) => `<tr>
      <td>${idx + 1}</td>
      <td><span class="item-name">${i.product_name}</span><div class="item-details">Color: ${i.color}</div></td>
      <td>UK ${i.size}</td>
      <td style="text-align:right">${i.quantity}</td>
      <td style="text-align:right">₹${Number(i.price).toLocaleString("en-IN")}</td>
      <td style="text-align:right;font-weight:600;color:#1a1a2e">₹${(Number(i.price) * i.quantity).toLocaleString("en-IN")}</td>
    </tr>`).join("") || ""}
  </tbody>
</table>
<div class="summary">
  <div class="summary-box">
    <div class="summary-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString("en-IN")}</span></div>
    <div class="summary-row"><span>CGST (9%)</span><span>₹${Math.round(gst / 2).toLocaleString("en-IN")}</span></div>
    <div class="summary-row"><span>SGST (9%)</span><span>₹${Math.round(gst / 2).toLocaleString("en-IN")}</span></div>
    <div class="summary-row"><span>Shipping</span><span>${shipping > 0 ? `₹${shipping.toLocaleString("en-IN")}` : "Free"}</span></div>
    <div class="summary-row total"><span>Grand Total</span><span>₹${grandTotal.toLocaleString("en-IN")}</span></div>
  </div>
</div>
<div class="footer">
  <p class="thanks">Thank you for shopping with SOLEMATE! 🧡</p>
  <p>Questions? Email us at support@solemate.store</p>
  <p>This is a computer-generated invoice and does not require a signature.</p>
</div>
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

const getTimeAgo = (dateStr: string) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMins > 0) return `${diffMins}m ago`;
  return "Just now";
};

const TrackingTab = ({ order, onSimulate, simulating }: { order: Order; onSimulate: () => void; simulating: boolean }) => {
  const currentIdx = statusOrder.indexOf(order.status);
  const progressPercent = Math.round(((currentIdx + 1) / statusOrder.length) * 100);
  const orderDate = new Date(order.created_at);
  const estimatedDelivery = new Date(orderDate);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + (order.status === "delivered" ? 0 : order.status === "shipped" ? 2 : order.status === "processing" ? 5 : 7));
  const currentStatus = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
  const isDelivered = order.status === "delivered";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      {/* Status Summary Card */}
      <div className="p-5 rounded-2xl bg-background/50 border border-border relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />

        {/* Top info row */}
        <div className="flex items-center justify-between mb-5 relative">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${currentStatus.bg} flex items-center justify-center`}>
              <currentStatus.icon className={`w-6 h-6 ${currentStatus.color}`} />
            </div>
            <div>
              <p className="font-display font-bold">{currentStatus.label}</p>
              <p className="text-xs text-muted-foreground">{currentStatus.desc}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display font-bold text-3xl text-primary">{progressPercent}%</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Complete</p>
          </div>
        </div>

        {/* Estimated delivery */}
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-muted/50">
          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="text-sm">
            <span className="text-muted-foreground">{isDelivered ? "Delivered on " : "Estimated delivery: "}</span>
            <span className="font-semibold">
              {estimatedDelivery.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
            </span>
          </p>
        </div>

        {/* Animated progress bar */}
        <div className="relative h-3 w-full rounded-full bg-muted overflow-hidden mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-primary/80"
          />
          {!isDelivered && (
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-y-0 rounded-full bg-primary/40"
              style={{ left: `${Math.max(0, progressPercent - 6)}%`, width: "6%" }}
            />
          )}
        </div>

        {/* Status stepper */}
        <div className="grid grid-cols-4 gap-0 relative">
          {/* Connecting line */}
          <div className="absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-muted z-0">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(0, (currentIdx / (statusOrder.length - 1)) * 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-primary"
            />
          </div>

          {statusOrder.map((s, i) => {
            const cfg = statusConfig[s as keyof typeof statusConfig];
            const Icon = cfg.icon;
            const isCompleted = i < currentIdx;
            const isActive = i === currentIdx;

            return (
              <div key={s} className="flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    boxShadow: isActive ? "0 0 0 6px hsla(var(--primary) / 0.15)" : "0 0 0 0px transparent",
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors relative border-2 ${
                    isActive ? "bg-primary text-primary-foreground border-primary" :
                    isCompleted ? "bg-primary/20 text-primary border-primary/30" :
                    "bg-background text-muted-foreground border-border"
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  {isActive && !isDelivered && (
                    <motion.span
                      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2 border-primary"
                    />
                  )}
                </motion.div>
                <span className={`text-[11px] font-semibold leading-tight ${
                  isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {cfg.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulate Progress Button */}
      {!isDelivered && (
        <button
          onClick={onSimulate}
          disabled={simulating}
          className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-wider hover:scale-[1.02] transition-transform disabled:opacity-50 btn-primary-glow"
        >
          {simulating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Advancing Order Status...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Simulate Next Status Update
            </>
          )}
        </button>
      )}

      {/* Live Tracking Timeline */}
      {order.tracking && order.tracking.length > 0 ? (
        <div className="p-5 rounded-2xl bg-background/50 border border-border">
          <div className="flex items-center justify-between mb-5">
            <h4 className="font-display font-bold flex items-center gap-2">
              <CircleDot className="w-4 h-4 text-primary" />
              Live Tracking
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
              <RefreshCw className="w-3 h-3" />
              <span>Real-time</span>
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
          </div>

          <div className="space-y-0 relative ml-1">
            {[...order.tracking].reverse().map((event, i) => {
              const isFirst = i === 0;
              const isLast = i === order.tracking!.length - 1;
              const eventStatus = statusConfig[event.status as keyof typeof statusConfig];
              const EventIcon = eventStatus?.icon || Clock;
              const eventDate = new Date(event.created_at);

              return (
                <div key={event.id} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative border-2 ${
                        isFirst
                          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                          : "bg-muted text-muted-foreground border-transparent"
                      }`}
                    >
                      <EventIcon className="w-4 h-4" />
                      {isFirst && !isDelivered && (
                        <motion.span
                          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full border-2 border-primary"
                        />
                      )}
                    </motion.div>
                    {!isLast && (
                      <div className={`w-0.5 h-full min-h-[32px] ${isFirst ? "bg-primary/30" : "bg-border"}`} />
                    )}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`pb-5 flex-1 ${isFirst ? "" : "opacity-60"}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`font-semibold text-sm ${isFirst ? "text-foreground" : "text-muted-foreground"}`}>
                          {event.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <p className="text-xs text-muted-foreground">
                            {eventDate.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                            {" • "}
                            {eventDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                          {event.location && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1 bg-muted px-2.5 py-0.5 rounded-full">
                              <MapPin className="w-3 h-3 text-primary" /> {event.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                        isFirst ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}>
                        {getTimeAgo(event.created_at)}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 rounded-2xl bg-background/50 border border-border">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Truck className="w-16 h-16 text-muted-foreground/20" />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
            </motion.div>
          </div>
          <p className="font-display font-semibold">Waiting for tracking updates</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">Click "Simulate Next Status" to see real-time tracking in action.</p>
        </div>
      )}

      {/* Notification + Secure notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 border border-border">
          <Bell className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="text-[11px] text-muted-foreground">Real-time notifications enabled for this order.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 border border-border">
          <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="text-[11px] text-muted-foreground">Tracked securely with end-to-end encryption.</p>
        </div>
      </div>
    </motion.div>
  );
};

const DetailsTab = ({ order }: { order: Order }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div className="space-y-3">
      {order.items?.map((item) => (
        <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-background/50 hover:bg-background transition-colors">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
            <img src={item.product_image || "/placeholder.svg"} alt={item.product_name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{item.product_name}</p>
            <p className="text-sm text-muted-foreground">Size {item.size} • {item.color} • Qty {item.quantity}</p>
          </div>
          <p className="font-display font-bold text-lg flex-shrink-0">{formatPrice(Number(item.price))}</p>
        </div>
      ))}
    </div>

    {/* Price Breakdown */}
    <div className="mt-4 p-4 rounded-xl bg-background/50 border border-border space-y-2">
      {(() => {
        const subtotal = order.items?.reduce((s, i) => s + i.price * i.quantity, 0) || 0;
        const gst = Math.round(subtotal * 0.18);
        const grandTotal = Number(order.total);
        const shippingCost = Math.max(0, grandTotal - subtotal - gst);
        return (
          <>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>GST (18%)</span><span>{formatPrice(gst)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span><span>{shippingCost > 0 ? formatPrice(shippingCost) : <span className="text-green-500 font-medium">Free</span>}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border font-display font-bold">
              <span>Grand Total</span><span>{formatPrice(grandTotal)}</span>
            </div>
          </>
        );
      })()}
    </div>

    {order.shipping_address && (
      <div className="mt-4 p-4 rounded-xl bg-background/50 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-primary" />
          <p className="text-sm font-semibold">Shipping Address</p>
        </div>
        <p className="text-sm text-muted-foreground ml-6">
          {order.shipping_address.street}, {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}, {order.shipping_address.country}
        </p>
      </div>
    )}
  </motion.div>
);

const Orders = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "tracking">("details");
  const [simulating, setSimulating] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    const { data: ordersData, error } = await supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    if (error) { console.error("Error fetching orders:", error); return; }
    const ordersWithItems: Order[] = await Promise.all(
      (ordersData || []).map(async (order) => {
        const [{ data: items }, { data: tracking }] = await Promise.all([
          supabase.from("order_items").select("*").eq("order_id", order.id),
          supabase.from("order_tracking").select("*").eq("order_id", order.id).order("created_at", { ascending: true }),
        ]);
        return {
          id: order.id, status: order.status, total: order.total,
          shipping_address: order.shipping_address as ShippingAddress | null,
          created_at: order.created_at,
          items: (items || []).map((item) => ({
            id: item.id, product_name: item.product_name, product_image: item.product_image,
            size: Number(item.size), color: item.color, quantity: item.quantity, price: Number(item.price),
          })),
          tracking: (tracking || []).map((t) => ({
            id: t.id, status: t.status, description: t.description, location: t.location, created_at: t.created_at,
          })),
        };
      })
    );
    setOrders(ordersWithItems);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) { navigate("/auth"); return; }
    if (user) {
      fetchOrders();
      const channel = supabase
        .channel('orders-realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `user_id=eq.${user.id}` }, () => fetchOrders())
        .on('postgres_changes', { event: '*', schema: 'public', table: 'order_tracking' }, () => fetchOrders())
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [user, authLoading, navigate, fetchOrders]);

  const handleSimulate = async (orderId: string) => {
    setSimulating(orderId);
    try {
      const { data, error } = await supabase.functions.invoke("simulate-order-progress", {
        body: { order_id: orderId },
      });
      if (error) throw error;
      toast.success(data?.message || "Order status updated!");
      // Realtime will auto-refresh, but fetch immediately too
      await fetchOrders();
    } catch (err: any) {
      console.error("Simulate error:", err);
      toast.error("Failed to simulate. Please try again.");
    } finally {
      setSimulating(null);
    }
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-4xl font-bold tracking-tight mb-2">Order History</h1>
          <p className="text-muted-foreground">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 rounded-3xl bg-secondary/50 border border-border">
            <Box className="w-20 h-20 mx-auto text-muted-foreground/30 mb-6" />
            <h2 className="font-display text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">Start shopping to see your orders here. We'll keep track of everything for you.</p>
            <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-display font-semibold text-sm uppercase tracking-wider hover:scale-105 transition-transform btn-primary-glow">
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
                  className={`rounded-2xl border transition-all duration-300 ${isExpanded ? `bg-secondary/80 ${status.border} border-2` : "bg-secondary border-transparent hover:border-border"}`}
                >
                  <button
                    onClick={() => { setExpandedOrder(isExpanded ? null : order.id); setActiveTab("details"); }}
                    className="w-full text-left p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${status.bg} flex items-center justify-center`}>
                          <StatusIcon className={`w-6 h-6 ${status.color}`} />
                        </div>
                        <div>
                          <p className="font-display font-semibold">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            {new Date(order.created_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full ${status.bg} border ${status.border}`}>
                          <span className={`text-xs font-semibold ${status.color}`}>{status.label}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-3">
                        {order.items?.slice(0, 4).map((item, i) => (
                          <div key={i} className="w-12 h-12 rounded-xl border-2 border-secondary overflow-hidden shadow-sm">
                            <img src={item.product_image || "/placeholder.svg"} alt={item.product_name} className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {(order.items?.length || 0) > 4 && (
                          <div className="w-12 h-12 rounded-xl border-2 border-secondary bg-muted flex items-center justify-center text-xs font-bold">
                            +{(order.items?.length || 0) - 4}
                          </div>
                        )}
                      </div>
                      <p className="font-display font-bold text-xl">{formatPrice(Number(order.total))}</p>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6 overflow-hidden"
                      >
                        <div className="pt-4 border-t border-border">
                          {/* Tabs */}
                          <div className="flex gap-2 mb-6">
                            <button
                              onClick={() => setActiveTab("details")}
                              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "details" ? "bg-primary text-primary-foreground shadow-md" : "bg-muted hover:bg-muted/80"}`}
                            >
                              <FileText className="w-4 h-4 inline mr-1.5 -mt-0.5" /> Details
                            </button>
                            <button
                              onClick={() => setActiveTab("tracking")}
                              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all relative ${activeTab === "tracking" ? "bg-primary text-primary-foreground shadow-md" : "bg-muted hover:bg-muted/80"}`}
                            >
                              <Truck className="w-4 h-4 inline mr-1.5 -mt-0.5" /> Track Order
                              {order.status !== "delivered" && (
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                              )}
                            </button>
                            <button
                              onClick={() => downloadInvoice(order, userName)}
                              className="ml-auto px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-all flex items-center gap-1.5"
                            >
                              <Download className="w-4 h-4" /> Invoice
                            </button>
                          </div>

                          {activeTab === "details" && <DetailsTab order={order} />}
                          {activeTab === "tracking" && (
                            <TrackingTab
                              order={order}
                              onSimulate={() => handleSimulate(order.id)}
                              simulating={simulating === order.id}
                            />
                          )}
                        </div>
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
