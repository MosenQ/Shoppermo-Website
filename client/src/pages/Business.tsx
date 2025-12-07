import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, BarChart3, Users, Target, ArrowRight, Smartphone, Store } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@assets/generated_images/digital_city_map_connecting_shops_and_shoppers.png";
import { MerchantApplicationModal } from "@/components/business/MerchantApplicationModal";
import { ContactSalesModal } from "@/components/business/ContactSalesModal";

export default function Business() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main className="pt-16">
        {/* Business Hero */}
        <section id="hero" className="bg-gray-900 text-white py-12 md:py-16 relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroBg} 
              alt="Digital City Map" 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/40"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold mb-4 border border-primary/20 backdrop-blur-md">
                  <Store size={16} />
                  For Merchants & Brands
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-[1.1] tracking-tight">
                  Your Shelves. <br />
                  Their Screens. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                    Instant Foot Traffic.
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-xl leading-relaxed">
                  Don't let your inventory sit unseen. Shoppermo broadcasts your in-store products to customers walking by right now.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <MerchantApplicationModal defaultPlan="Trial">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-full text-base font-bold shadow-lg shadow-primary/25 hover:translate-y-[-2px] transition-all">
                      Claim Your Business
                    </Button>
                  </MerchantApplicationModal>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 h-12 px-8 rounded-full text-base bg-transparent backdrop-blur-sm"
                    onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    See How It Works
                  </Button>
                </div>
              </motion.div>

              {/* Hero Visual/Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden lg:block relative"
              >
                {/* Floating Notification Cards */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute top-0 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-2xl w-64 shadow-2xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                      <Smartphone className="text-white" size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">New Customer Nearby!</h4>
                      <p className="text-[10px] text-gray-300 mt-0.5">Someone is 0.1 miles away and searching for "Vintage Denim".</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                  className="absolute top-24 right-0 bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-2xl w-72 shadow-2xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <Target className="text-white" size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">Inventory Match</h4>
                      <p className="text-[10px] text-gray-300 mt-0.5">Your "Levi's 501" just appeared on 15 shoppers' maps.</p>
                    </div>
                  </div>
                </motion.div>

                 <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-48 right-16 bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-2xl w-56 shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-2xl font-bold text-white">+127%</div>
                    <div className="text-green-400 text-[10px] font-bold bg-green-400/20 px-2 py-0.5 rounded-full">Trending Up</div>
                  </div>
                  <p className="text-[10px] text-gray-300">Foot traffic increase this week.</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl font-bold">Precision Targeting</h3>
                <p className="text-muted-foreground text-lg">
                  Reach customers based on their real-time location and shopping habits. No more wasted ad spend.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-2xl font-bold">Measurable ROI</h3>
                <p className="text-muted-foreground text-lg">
                  Track exactly how many customers walked into your store from your Shoppermo campaigns.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                  <Users size={24} />
                </div>
                <h3 className="text-2xl font-bold">Customer Retention</h3>
                <p className="text-muted-foreground text-lg">
                  Automatic loyalty rewards keep your best customers coming back for more.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing/Plans Preview */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
              <p className="text-muted-foreground text-lg">
                Start small and scale as you grow. No long-term contracts.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 flex flex-col h-full"
              >
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <div className="text-3xl font-bold mb-6">£0 <span className="text-base font-normal text-muted-foreground">/mo</span></div>
                <p className="text-sm text-muted-foreground mb-6">Perfect for new local shops.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-green-500" /> Basic Store Profile</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-green-500" /> 3 Active Deals</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-green-500" /> Weekly Analytics</li>
                </ul>
                <MerchantApplicationModal defaultPlan="Starter">
                  <Button className="w-full rounded-full mt-auto" variant="outline">Get Started</Button>
                </MerchantApplicationModal>
              </motion.div>

              {/* Growth */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white p-8 rounded-3xl shadow-xl border-2 border-primary relative transform md:-translate-y-4 flex flex-col h-full"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">Most Popular</div>
                <h3 className="text-xl font-bold mb-2">Growth</h3>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">£0</span>
                    <span className="text-xl text-muted-foreground line-through decoration-2 decoration-red-500/50">£29</span>
                    <span className="text-base font-normal text-muted-foreground">/mo</span>
                  </div>
                  <p className="text-xs font-bold text-primary mt-1 uppercase tracking-wide">Free for Glasgow Pilot (Limited Time)</p>
                </div>
                <p className="text-sm text-muted-foreground mb-6">For establishing local dominance.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-green-500" /> Verified Badge</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-green-500" /> Unlimited Deals</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-green-500" /> AI Recommenders</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-green-500" /> Real-time Analytics</li>
                </ul>
                <MerchantApplicationModal defaultPlan="Growth">
                  <Button className="w-full rounded-full bg-primary hover:bg-primary/90 mt-auto">Get Started</Button>
                </MerchantApplicationModal>
              </motion.div>

              {/* Enterprise */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 flex flex-col h-full"
              >
                <h3 className="text-xl font-bold mb-2">Brand</h3>
                <div className="text-3xl font-bold mb-6">Custom</div>
                <p className="text-sm text-muted-foreground mb-6">For multi-location chains.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-green-500" /> Multi-store Dashboard</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-green-500" /> API Access</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-green-500" /> Dedicated Account Manager</li>
                </ul>
                <ContactSalesModal>
                  <Button className="w-full rounded-full mt-auto" variant="outline">Contact Sales</Button>
                </ContactSalesModal>
              </motion.div>
            </div>
            <div className="text-center mt-12 text-muted-foreground max-w-2xl mx-auto space-y-4">
              <p className="font-medium text-lg">All plans: pay just 7% commission on app‑driven sales. no sales, no fee.</p>
              <p>Optional sponsored views – boost your shop through ads. Set your own budget and bids.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
