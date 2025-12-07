import { useState } from "react";
import AppLayout from "@/components/app/AppLayout";
import { Search, MapPin, Bell, Filter, Star, Clock, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Mock Data
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "coffee", label: "Coffee" },
  { id: "food", label: "Food" },
  { id: "fashion", label: "Fashion" },
  { id: "tech", label: "Tech" },
  { id: "beauty", label: "Beauty" },
];

const NEARBY_DEALS = [
  {
    id: 1,
    title: "Oat Flat White",
    shop: "Papercup Coffee",
    distance: "0.1 mi",
    price: "£2.50",
    originalPrice: "£3.80",
    image: "https://images.unsplash.com/photo-1556742400-b5b7c5121f99?auto=format&fit=crop&q=80&w=300&h=300",
    tag: "Morning Fix",
    points: 25
  },
  {
    id: 2,
    title: "Vintage Levi's 501",
    shop: "Minted Vintage",
    distance: "0.3 mi",
    price: "£45.00",
    originalPrice: "£65.00",
    image: "https://images.unsplash.com/photo-1542272617-08f086303294?auto=format&fit=crop&q=80&w=300&h=300",
    tag: "Rare Find",
    points: 450
  },
  {
    id: 3,
    title: "Sourdough Pizza",
    shop: "Paesano Pizza",
    distance: "0.4 mi",
    price: "£6.00",
    originalPrice: "£9.00",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=300&h=300",
    tag: "Lunch Deal",
    points: 60
  }
];

const RECOMMENDED = [
  {
    id: 4,
    title: "Wireless Headphones",
    shop: "TechVault",
    match: "98% Match",
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: 5,
    title: "Aesop Hand Balm",
    shop: "Space NK",
    match: "Based on recent views",
    discount: "Free Sample",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300&h=300",
  }
];

export default function AppHome() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <AppLayout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-white p-2 rounded-full shadow-sm">
              <MapPin size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Location</div>
              <div className="font-bold text-sm flex items-center gap-1">
                Glasgow, City Centre
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-gray-900 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-bold shadow-md">
              <span>1,250</span>
              <span className="text-[10px] bg-white/20 px-1 rounded text-white/90">SJ</span>
            </div>
            <Button size="icon" variant="ghost" className="relative rounded-full hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
          </div>
        </header>

        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Morning, Alex! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-gray-500">Ready to find some hidden gems?</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input 
            placeholder="Search 'vintage jacket' or 'latte'..." 
            className="h-12 pl-11 pr-12 rounded-2xl bg-white border-gray-200 shadow-sm focus-visible:ring-primary text-base"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-100 p-1.5 rounded-lg">
            <Filter size={16} className="text-gray-500" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20"
                  : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* AI Recommended */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Star size={18} className="text-secondary fill-secondary" />
              Picked for you
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {RECOMMENDED.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -4 }}
                className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gray-100">
                  <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold shadow-sm">
                    {item.discount}
                  </div>
                </div>
                <h3 className="font-bold text-sm text-gray-900 truncate">{item.title}</h3>
                <p className="text-xs text-gray-500 truncate mb-2">{item.shop}</p>
                <div className="flex items-center gap-1 text-[10px] font-medium text-secondary bg-secondary/5 px-2 py-1 rounded-full w-fit">
                  <Star size={10} className="fill-secondary" />
                  {item.match}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Nearby Deals */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Nearby right now</h2>
            <Button variant="link" className="text-primary text-sm font-bold h-auto p-0">See all</Button>
          </div>
          <div className="space-y-4">
            {NEARBY_DEALS.map((deal) => (
              <motion.div 
                key={deal.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-center"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100 relative">
                  <img src={deal.image} alt={deal.title} className="object-cover w-full h-full" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-[10px] text-white font-medium flex items-center gap-1">
                      <Clock size={10} /> 15m left
                    </p>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold mb-1">
                        {deal.tag}
                      </span>
                      <h3 className="font-bold text-gray-900 truncate">{deal.title}</h3>
                    </div>
                    <div className="text-right">
                       <span className="font-bold text-gray-900">{deal.price}</span>
                       <div className="text-xs text-gray-400 line-through">{deal.originalPrice}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-3 truncate">{deal.shop} • {deal.distance}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center text-[8px] text-white">SJ</div>
                      +{deal.points} pts
                    </div>
                    <Button size="sm" className="h-8 rounded-full text-xs bg-gray-900 hover:bg-gray-800">
                      View Deal <ArrowUpRight size={12} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
