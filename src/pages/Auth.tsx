import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Loader2, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import heroShoe from "@/assets/hero-shoe.jpg";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");
const nameSchema = z.string().min(2, "Name must be at least 2 characters");

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  const [signupSuccess, setSignupSuccess] = useState(false);

  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) newErrors.email = emailResult.error.errors[0].message;
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) newErrors.password = passwordResult.error.errors[0].message;
    if (!isLogin) {
      const nameResult = nameSchema.safeParse(fullName);
      if (!nameResult.success) newErrors.name = nameResult.error.errors[0].message;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Email not confirmed")) {
            toast.error("Please verify your email before signing in. Check your inbox for a confirmation link.");
          } else if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password. Please try again.");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Welcome back!");
          navigate("/");
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("This email is already registered. Please sign in instead.");
          } else {
            toast.error(error.message);
          }
        } else {
          setSignupSuccess(true);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Success state after signup
  if (signupSuccess) {
    return (
      <main className="min-h-screen flex">
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img src={heroShoe} alt="Sneakers" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />
          <div className="absolute bottom-12 left-12 right-12">
            <ShoppingBag className="w-10 h-10 text-primary mb-4" />
            <h2 className="font-display text-4xl font-bold text-background mb-3 tracking-tight">
              Almost There!
            </h2>
            <p className="text-background/60 text-lg max-w-sm">
              Just one more step to unlock exclusive deals and new drops.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </motion.div>
            <h1 className="font-display text-3xl font-bold tracking-tight mb-3">Check your email</h1>
            <p className="text-muted-foreground mb-2">
              We've sent a verification link to
            </p>
            <p className="font-semibold text-lg mb-6">{email}</p>
            <p className="text-sm text-muted-foreground mb-8">
              Click the link in your email to verify your account, then come back here to sign in.
            </p>
            <button
              onClick={() => {
                setSignupSuccess(false);
                setIsLogin(true);
                setPassword("");
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-wider rounded-xl btn-primary-glow hover:scale-[1.02] transition-all"
            >
              Back to Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex">
      {/* Left - Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={heroShoe} alt="Sneakers" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />
        <div className="absolute bottom-12 left-12 right-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <ShoppingBag className="w-10 h-10 text-primary mb-4" />
            <h2 className="font-display text-4xl font-bold text-background mb-3 tracking-tight">
              Your Style,<br />Your Statement.
            </h2>
            <p className="text-background/60 text-lg max-w-sm">
              Join thousands of sneaker enthusiasts. Get exclusive access to new drops and member-only deals.
            </p>
          </motion.div>
        </div>

        {/* Back to home link */}
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-background/70 hover:text-background text-sm font-medium transition-colors">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Store
        </Link>
      </div>

      {/* Right - Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background relative">
        {/* Mobile back link */}
        <Link to="/" className="absolute top-6 left-6 lg:hidden flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back
        </Link>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">SOLEMATE</span>
          </Link>

          {/* Header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                {isLogin ? "Welcome back" : "Create account"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin
                  ? "Enter your credentials to access your account"
                  : "Fill in your details to get started"}
              </p>
            </motion.div>
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: undefined })); }}
                      placeholder="John Doe"
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-secondary border outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                        errors.name ? "border-destructive" : "border-border"
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-destructive mt-1.5">{errors.name}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })); }}
                  placeholder="you@example.com"
                  type="email"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-secondary border outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                    errors.email ? "border-destructive" : "border-border"
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-destructive mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs text-primary hover:underline font-medium">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: undefined })); }}
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-12 pr-12 py-3.5 rounded-xl bg-secondary border outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                    errors.password ? "border-destructive" : "border-border"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive mt-1.5">{errors.password}</p>}
              {!isLogin && (
                <p className="text-xs text-muted-foreground mt-1.5">Must be at least 6 characters</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-wider rounded-xl btn-primary-glow hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground tracking-wider">or</span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setPassword("");
              }}
              className="text-primary hover:underline font-semibold"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>

          {/* Terms notice for signup */}
          {!isLogin && (
            <p className="text-center text-xs text-muted-foreground mt-6">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-primary hover:underline">Terms</Link>
              {" "}&{" "}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default Auth;
