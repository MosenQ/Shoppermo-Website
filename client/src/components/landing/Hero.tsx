import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, Sparkles, Bell, Tag } from "lucide-react";
import { motion } from "framer-motion";
import mapImage from "@assets/map-min_1765113694415.png";
import phoneImage from "@assets/phone-without-shadow-min_1765114451254.png";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const notifications = [
  {
    icon: Sparkles,
    title: "Special deal for you!",
    subtitle: "20% off at your favourite store",
    mobilePosition: "top-[5%] -left-[2%]",
    desktopPosition: "sm:top-[12%] sm:-left-[8%]",
    delay: 0,
  },
  {
    icon: Bell,
    title: "New message from John",
    subtitle: "Check out this amazing find!",
    mobilePosition: "top-[35%] -right-[2%]",
    desktopPosition: "sm:top-[35%] sm:-right-[12%]",
    delay: 0.5,
  },
  {
    icon: Tag,
    title: "Clearance Alert",
    subtitle: "Limited deals at nearby stores",
    mobilePosition: "bottom-[5%] -left-[2%]",
    desktopPosition: "sm:bottom-[12%] sm:-left-[10%]",
    delay: 1,
  },
];

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedNotification, setExpandedNotification] = useState<number | null>(null);
  const notificationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expandedNotification !== null) {
        const clickedRef = notificationRefs.current[expandedNotification];
        if (clickedRef && !clickedRef.contains(event.target as Node)) {
          setExpandedNotification(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expandedNotification]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '', email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to join waitlist');
      }

      toast({
        title: "You're on the list!",
        description: "We'll notify you as soon as Shoppermo launches.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative pt-24 pb-16 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Mobile: Image first */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-first lg:order-last"
          >
            <div className="relative z-10 mx-auto max-w-[300px] md:max-w-[528px]">
              <img 
                src={mapImage} 
                alt="Glasgow Map" 
                className="w-full h-auto"
                data-testid="img-hero-map"
              />
              <img 
                src={phoneImage} 
                alt="Shoppermo App Interface" 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52%] md:w-[40%] h-auto ml-[7px] mr-[7px]"
                data-testid="img-hero-phone"
              />
              
              {/* Floating Notifications */}
              {notifications.map((notification, index) => {
                const Icon = notification.icon;
                const isExpanded = expandedNotification === index;
                return (
                  <motion.div
                    key={index}
                    ref={(el) => { notificationRefs.current[index] = el; }}
                    initial={{ opacity: 0, scale: 0.8, y: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      y: isExpanded ? 0 : [0, -6, 0]
                    }}
                    transition={{ 
                      opacity: { duration: 0.5, delay: 0.5 + notification.delay },
                      scale: { duration: 0.5, delay: 0.5 + notification.delay },
                      y: isExpanded ? { duration: 0.2 } : { 
                        duration: 3 + index * 0.5, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: 0.5 + notification.delay
                      }
                    }}
                    onClick={() => {
                      if (window.innerWidth < 640) {
                        setExpandedNotification(isExpanded ? null : index);
                      }
                    }}
                    className={`absolute ${notification.mobilePosition} ${notification.desktopPosition} z-20 flex items-center bg-white rounded-xl shadow-lg border border-secondary/20 cursor-pointer sm:cursor-default p-1.5 sm:px-3 sm:py-2`}
                    data-testid={`notification-${index}`}
                  >
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
                    </div>
                    {/* Mobile: Animated expandable content */}
                    <motion.div 
                      className="text-left overflow-hidden sm:hidden"
                      initial={false}
                      animate={{ 
                        width: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0,
                        paddingLeft: isExpanded ? 8 : 0,
                        paddingRight: isExpanded ? 4 : 0
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 280,
                        damping: 24,
                        mass: 0.6
                      }}
                    >
                      <p className="text-xs font-semibold text-gray-900 whitespace-nowrap">{notification.title}</p>
                      <p className="text-[10px] text-gray-500 whitespace-nowrap">{notification.subtitle}</p>
                    </motion.div>
                    {/* Desktop: Always visible content */}
                    <div className="text-left hidden sm:block ml-2">
                      <p className="text-xs font-semibold text-gray-900 whitespace-nowrap">{notification.title}</p>
                      <p className="text-[10px] text-gray-500 whitespace-nowrap">{notification.subtitle}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Content section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-last lg:order-first text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Launching soon in Glasgow
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6" data-testid="text-headline">
              The Best Deals, <br className="hidden sm:block" />
              <span className="text-primary">Right Around You</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed mx-auto lg:mx-0" data-testid="text-subheadline">
              <span className="sm:hidden">Find exclusive deals from your favourite brands and local shops.</span>
              <span className="hidden sm:inline">Find exclusive deals from your favourite brands and local shops—all in one app. Save money on what you love, discover new stores, and never miss an offer again.</span>
            </p>
            
            {/* Waitlist Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto lg:mx-0">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 px-5 rounded-full text-base sm:flex-1 bg-white border-gray-200 w-full"
                data-testid="input-email"
              />
              <Button 
                type="submit"
                disabled={isLoading}
                className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white gap-2 shadow-xl hover:translate-y-[-2px] transition-all font-semibold text-base w-full sm:w-auto"
                data-testid="button-join-waitlist"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight size={20} />
                  </>
                )}
              </Button>
            </form>

            {/* Social Proof */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p data-testid="text-social-proof">Join 1,000+ early adopters</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
