import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tighter mb-4">
              SOLE<span className="text-primary">MATE</span>
            </h3>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Step into style with premium footwear curated for every occasion. Quality, comfort, and design — all in one place.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="space-y-3">
              {[
                { to: "/products", label: "Shop All" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                { to: "/faq", label: "FAQ" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="block text-sm text-background/60 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Customer Service</h4>
            <div className="space-y-3">
              {[
                { to: "/shipping", label: "Shipping & Returns" },
                { to: "/faq", label: "Help Center" },
                { to: "/orders", label: "Track Order" },
                { to: "/wishlist", label: "Wishlist" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="block text-sm text-background/60 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-background/60">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Mumbai, Maharashtra 400001</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 98765 43210</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> hello@solemate.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">© 2026 SOLEMATE. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-background/40">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
