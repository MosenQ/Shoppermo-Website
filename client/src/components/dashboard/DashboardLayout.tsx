import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, PlusCircle, Settings, Store, LogOut, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: PlusCircle, label: "New Deal", href: "/dashboard/create-deal" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 flex items-center gap-2 border-b border-gray-100">
          <img src={logo} alt="Shoppermo" className="w-8 h-8 rounded-lg" />
          <span className="font-['Pacifico'] text-xl pt-1">Shoppermo</span>
        </div>

        <div className="p-4">
          <div className="bg-gray-100 rounded-xl p-3 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-primary">
              <Store size={20} />
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-sm truncate">Bean & Leaf</div>
              <div className="text-xs text-muted-foreground truncate">Merchant Account</div>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm",
                  location === item.href 
                    ? "bg-primary/10 text-primary" 
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                )}>
                  <item.icon size={18} />
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-gray-100">
          <Link href="/login">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut size={18} className="mr-2" />
              Log Out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        {children}
      </main>
    </div>
  );
}
