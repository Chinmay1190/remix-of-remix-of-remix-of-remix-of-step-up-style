import { User, MapPin, CreditCard, Check } from "lucide-react";

const steps = [
  { id: 1, label: "Information", icon: User },
  { id: 2, label: "Shipping", icon: MapPin },
  { id: 3, label: "Payment", icon: CreditCard },
];

interface CheckoutStepsProps {
  currentStep: number;
}

const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  return (
    <div className="flex items-center justify-between mb-12">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentStep > s.id
                ? "bg-green-500 text-white"
                : currentStep === s.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {currentStep > s.id ? (
              <Check className="w-4 h-4" />
            ) : (
              <s.icon className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-12 sm:w-24 h-0.5 mx-2 transition-colors ${
                currentStep > s.id ? "bg-green-500" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
