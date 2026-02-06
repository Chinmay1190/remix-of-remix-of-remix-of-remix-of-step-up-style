import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface CheckoutFormInfoProps {
  formData: FormData;
  updateField: (field: string, value: string) => void;
}

const CheckoutFormInfo = ({ formData, updateField }: CheckoutFormInfoProps) => {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-semibold mb-4">Contact Information</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className="h-12 rounded-xl bg-secondary border-border"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            className="h-12 rounded-xl bg-secondary border-border"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="h-12 rounded-xl bg-secondary border-border"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="h-12 rounded-xl bg-secondary border-border"
          required
        />
      </div>
    </div>
  );
};

export default CheckoutFormInfo;
