import { Link } from "wouter";
import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.jpg";

export default function Footer() {
  const { toast } = useToast();

  const handleDownloadClick = () => {
    toast({
      title: "Coming Soon!",
      description: "The Shoppermo mobile app is currently in beta.",
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6 text-white">
              <img src={logo} alt="Shoppermo" className="w-8 h-8 rounded-lg" />
              <span className="font-['Pacifico'] text-2xl pt-1">
                Shoppermo
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              The hyper-local shopping platform connecting you with the best deals in your neighborhood.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/"><a className="hover:text-primary transition-colors">About Us</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-primary transition-colors">Careers</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-primary transition-colors">Press</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-primary transition-colors">Contact</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Discover</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/"><a className="hover:text-primary transition-colors">For Shoppers</a></Link></li>
              <li><Link href="/business"><a className="hover:text-primary transition-colors">For Business</a></Link></li>
              <li><Link href="/"><a className="hover:text-primary transition-colors">Cities</a></Link></li>
              <li><Link href="/"><a className="hover:text-primary transition-colors">Blog</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Download</h4>
            <p className="text-sm text-gray-400 mb-4">Get the app and start saving today.</p>
            <div className="space-y-3">
              <button 
                onClick={handleDownloadClick}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium border border-gray-700"
              >
                App Store
              </button>
              <button 
                onClick={handleDownloadClick}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium border border-gray-700"
              >
                Google Play
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; 2024 Shoppermo Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
