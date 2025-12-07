import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpg";
import { WaitlistModal } from "./WaitlistModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "For Shoppers", href: "/" },
    { name: "For Business", href: "/business" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 group cursor-pointer">
            <img src={logo} alt="Shoppermo" className="w-10 h-10 rounded-xl shadow-sm group-hover:scale-105 transition-transform" />
            <span className="font-['Pacifico'] text-2xl text-foreground pt-1">
              Shoppermo
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                  location === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
              </div>
            </Link>
          ))}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm font-medium">
                Log in
              </Button>
            </Link>
            <WaitlistModal>
              <Button 
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              >
                Download App
              </Button>
            </WaitlistModal>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-border p-4 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div
                className="text-lg font-medium text-foreground py-2 block cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </div>
            </Link>
          ))}
          <div className="flex flex-col gap-2">
            <Link href="/login">
              <Button variant="ghost" className="w-full justify-start text-lg font-medium px-0 hover:bg-transparent hover:text-primary">
                Log in
              </Button>
            </Link>
            <WaitlistModal>
              <Button 
                className="w-full bg-primary text-white rounded-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download App
              </Button>
            </WaitlistModal>
          </div>
        </div>
      )}
    </nav>
  );
}
