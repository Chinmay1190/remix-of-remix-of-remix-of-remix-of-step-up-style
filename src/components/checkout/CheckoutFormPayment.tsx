import { useState } from "react";
import { CreditCard, Smartphone, Building2, Wallet, Shield, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/currency";

type PaymentMethod = "card" | "upi" | "netbanking" | "cod";

interface FormData {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardName: string;
  upiId: string;
  bank: string;
}

interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

interface CheckoutFormPaymentProps {
  formData: FormData;
  updateField: (field: string, value: string) => void;
  items: CartItem[];
  totalPrice: number;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
}

const banks = [
  { id: "sbi", name: "State Bank of India", icon: "🏦" },
  { id: "hdfc", name: "HDFC Bank", icon: "🏛️" },
  { id: "icici", name: "ICICI Bank", icon: "🏢" },
  { id: "axis", name: "Axis Bank", icon: "🏤" },
  { id: "kotak", name: "Kotak Mahindra Bank", icon: "🏣" },
  { id: "pnb", name: "Punjab National Bank", icon: "🏦" },
];

const CheckoutFormPayment = ({
  formData,
  updateField,
  items,
  totalPrice,
  paymentMethod,
  setPaymentMethod,
}: CheckoutFormPaymentProps) => {
  const shippingCost = totalPrice > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = totalPrice + shippingCost;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-semibold mb-4">Payment Method</h2>

      {/* Payment Options */}
      <RadioGroup
        value={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        <div>
          <RadioGroupItem value="card" id="card" className="peer sr-only" />
          <Label
            htmlFor="card"
            className="flex flex-col items-center justify-center rounded-xl border-2 border-border bg-secondary p-4 hover:bg-muted cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 transition-all"
          >
            <CreditCard className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Card</span>
          </Label>
        </div>

        <div>
          <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
          <Label
            htmlFor="upi"
            className="flex flex-col items-center justify-center rounded-xl border-2 border-border bg-secondary p-4 hover:bg-muted cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 transition-all"
          >
            <Smartphone className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">UPI</span>
          </Label>
        </div>

        <div>
          <RadioGroupItem value="netbanking" id="netbanking" className="peer sr-only" />
          <Label
            htmlFor="netbanking"
            className="flex flex-col items-center justify-center rounded-xl border-2 border-border bg-secondary p-4 hover:bg-muted cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 transition-all"
          >
            <Building2 className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Net Banking</span>
          </Label>
        </div>

        <div>
          <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
          <Label
            htmlFor="cod"
            className="flex flex-col items-center justify-center rounded-xl border-2 border-border bg-secondary p-4 hover:bg-muted cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 transition-all"
          >
            <Wallet className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">COD</span>
          </Label>
        </div>
      </RadioGroup>

      {/* Payment Form Based on Selection */}
      <div className="mt-6 p-6 rounded-xl bg-secondary/50 border border-border">
        {paymentMethod === "card" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Lock className="w-4 h-4" />
              <span>Your card details are encrypted and secure</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number *</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => updateField("cardNumber", formatCardNumber(e.target.value))}
                className="h-12 rounded-xl bg-background border-border"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date *</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={(e) => updateField("expiry", formatExpiry(e.target.value))}
                  className="h-12 rounded-xl bg-background border-border"
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="•••"
                  value={formData.cvv}
                  onChange={(e) => updateField("cvv", e.target.value.replace(/\D/g, ""))}
                  className="h-12 rounded-xl bg-background border-border"
                  maxLength={4}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name *</Label>
              <Input
                id="cardName"
                placeholder="JOHN DOE"
                value={formData.cardName}
                onChange={(e) => updateField("cardName", e.target.value.toUpperCase())}
                className="h-12 rounded-xl bg-background border-border"
              />
            </div>
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Shield className="w-4 h-4" />
              <span>Pay securely using any UPI app</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID *</Label>
              <Input
                id="upiId"
                placeholder="yourname@upi"
                value={formData.upiId}
                onChange={(e) => updateField("upiId", e.target.value)}
                className="h-12 rounded-xl bg-background border-border"
              />
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/120px-UPI-Logo-vector.svg.png" alt="UPI" className="h-8 object-contain" />
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-background text-xs font-medium">
                <span>GPay</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-background text-xs font-medium">
                <span>PhonePe</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-background text-xs font-medium">
                <span>Paytm</span>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "netbanking" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Building2 className="w-4 h-4" />
              <span>Select your bank to proceed</span>
            </div>
            
            <RadioGroup
              value={formData.bank}
              onValueChange={(value) => updateField("bank", value)}
              className="grid grid-cols-2 gap-3"
            >
              {banks.map((bank) => (
                <div key={bank.id}>
                  <RadioGroupItem value={bank.id} id={bank.id} className="peer sr-only" />
                  <Label
                    htmlFor={bank.id}
                    className="flex items-center gap-3 rounded-xl border-2 border-border bg-background p-4 hover:bg-muted cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 transition-all"
                  >
                    <span className="text-xl">{bank.icon}</span>
                    <span className="text-sm font-medium">{bank.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {paymentMethod === "cod" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-primary mb-4">
              <Wallet className="w-4 h-4" />
              <span>Pay with cash when your order arrives</span>
            </div>
            
            <div className="p-4 rounded-xl bg-accent/50 border border-accent">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> Cash on Delivery is available for orders up to ₹50,000. 
                Please keep exact change ready for faster delivery.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="mt-6 p-6 rounded-xl bg-secondary border border-border">
        <h3 className="font-display font-semibold mb-4">Order Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className={shippingCost === 0 ? "text-green-600" : ""}>
              {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
            </span>
          </div>
          
          {paymentMethod === "cod" && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">COD Charges</span>
              <span>₹0</span>
            </div>
          )}
          
          <div className="border-t border-border pt-3 mt-3">
            <div className="flex justify-between font-display font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>256-bit SSL</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span>Secure Payment</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFormPayment;
