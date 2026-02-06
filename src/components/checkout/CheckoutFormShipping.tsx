import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormData {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface CheckoutFormShippingProps {
  formData: FormData;
  updateField: (field: string, value: string) => void;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh"
];

const CheckoutFormShipping = ({ formData, updateField }: CheckoutFormShippingProps) => {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-semibold mb-4">Shipping Address</h2>

      <div className="space-y-2">
        <Label htmlFor="street">Street Address *</Label>
        <Input
          id="street"
          placeholder="123, Main Street, Apartment 4B"
          value={formData.street}
          onChange={(e) => updateField("street", e.target.value)}
          className="h-12 rounded-xl bg-secondary border-border"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            placeholder="Mumbai"
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="h-12 rounded-xl bg-secondary border-border"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Select value={formData.state} onValueChange={(value) => updateField("state", value)}>
            <SelectTrigger className="h-12 rounded-xl bg-secondary border-border">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zip">PIN Code *</Label>
          <Input
            id="zip"
            placeholder="400001"
            value={formData.zip}
            onChange={(e) => updateField("zip", e.target.value)}
            className="h-12 rounded-xl bg-secondary border-border"
            maxLength={6}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value="India"
            disabled
            className="h-12 rounded-xl bg-secondary border-border opacity-70"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutFormShipping;
