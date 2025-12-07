import { Button } from "@/components/ui/button";
import { ArrowRight, Apple, Smartphone, Play } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@assets/generated_images/app_mockup_showing_local_deals_on_orange_background.png";
import { Link } from "wouter";
import { WaitlistModal } from "./WaitlistModal";

export default function OldHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Launching soon in Glasgow
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              Your neighborhood, <br />
              <span className="text-primary">unlocked.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Connect with independent shops and big brands. Discover personalized deals, 
              flash sales, and AI-powered recommendations right around the corner.
            </p>
            
            <div className="flex flex-col gap-4">
              <Link href="/app">
                <Button 
                  className="h-14 px-8 rounded-full bg-black hover:bg-black/80 text-white gap-3 shadow-xl hover:translate-y-[-2px] transition-all w-full sm:w-fit"
                >
                  <Smartphone size={24} />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] font-medium opacity-80">Try the Prototype</span>
                    <span className="text-base font-bold">Launch App Demo</span>
                  </div>
                </Button>
              </Link>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <WaitlistModal>
                  <Button 
                    variant="outline" 
                    className="h-14 px-8 rounded-full border-2 gap-3 hover:bg-secondary/5 transition-all w-full sm:w-auto"
                  >
                    <Apple size={24} fill="currentColor" />
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[10px] font-medium opacity-80">Download on the</span>
                      <span className="text-base font-bold">App Store</span>
                    </div>
                  </Button>
                </WaitlistModal>
                <WaitlistModal>
                  <Button 
                    variant="outline" 
                    className="h-14 px-8 rounded-full border-2 gap-3 hover:bg-secondary/5 transition-all w-full sm:w-auto"
                  >
                    <Play size={24} fill="currentColor" />
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[10px] font-medium opacity-80">Get it on</span>
                      <span className="text-base font-bold">Google Play</span>
                    </div>
                  </Button>
                </WaitlistModal>
              </div>
            </div>
            
            <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p>Be one of our first 1,000 early adopters</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 mx-auto max-w-[320px] md:max-w-[400px]">
              <img 
                src={heroImage} 
                alt="Shoppermo App Interface" 
                className="w-full h-auto drop-shadow-2xl rounded-[3rem] border-[8px] border-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
              />
              
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-1/4 -left-8 md:-left-12 bg-white p-4 rounded-2xl shadow-lg max-w-[180px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xs">50%</div>
                  <div className="text-xs font-bold text-gray-800">Flash Sale</div>
                </div>
                <p className="text-[10px] text-gray-500">Artisan Coffee Roasters just posted a deal nearby.</p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 -right-4 md:-right-12 bg-white p-3 rounded-2xl shadow-lg flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">🤖</div>
                <div>
                  <p className="text-xs font-bold">AI Pick</p>
                  <p className="text-[10px] text-gray-500">Based on your tastes</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
