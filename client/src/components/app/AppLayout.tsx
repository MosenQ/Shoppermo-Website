import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Home, Map, Wallet, User, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/app" },
    { icon: Map, label: "Explore", href: "/app/explore" },
    { icon: Wallet, label: "Wallet", href: "/app/wallet" },
    { icon: User, label: "Profile", href: "/app/profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-foreground pb-20 md:pb-0 md:pl-64">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50">
        <div className="p-6 flex items-center gap-2">
          <ShoppingBag className="text-primary" size={28} />
          <span className="font-logo text-2xl text-primary">Shoppermo</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                location === item.href 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              )}>
                <item.icon size={20} />
                {item.label}
              </a>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-100">
          <div className="bg-gray-900 text-white rounded-2xl p-4">
            <div className="text-xs text-gray-400 mb-1">Balance</div>
            <div className="text-2xl font-bold flex items-center gap-1">
              1,250 <span className="text-xs font-normal bg-white/20 px-1.5 py-0.5 rounded">SJ</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto md:mx-0 w-full">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-6 py-3 pb-6">
        <nav className="flex justify-between items-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                location === item.href 
                  ? "text-primary" 
                  : "text-gray-400 hover:text-gray-600"
              )}>
                <item.icon size={24} strokeWidth={location === item.href ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
