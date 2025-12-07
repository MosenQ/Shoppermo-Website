import AppLayout from "@/components/app/AppLayout";
import { useLocation } from "wouter";
import { Construction } from "lucide-react";

export default function AppPlaceholder() {
  const [location] = useLocation();
  const title = location.split('/').pop() || 'Page';
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
          <Construction size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{formattedTitle}</h1>
        <p className="text-gray-500 max-w-xs">
          This feature is currently under development for the prototype.
        </p>
      </div>
    </AppLayout>
  );
}
