import farzinImg from "@assets/generated_images/professional_headshot_of_male_founder_farzin.png";
import mohsenImg from "@assets/image_1765105508245.png";
import { Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function Team() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Built by founders who <span className="text-primary">love local.</span></h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We started Shoppermo with a simple mission: to bridge the digital gap between 
              communities and commerce. We believe the best shopping experiences happen 
              offline, but they need online discovery.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-4xl font-bold text-foreground mb-1">Glasgow</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Pilot City</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-1">2025</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Launch Year</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-1">1,000</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Early Access Spots</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-1">Local</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">First Approach</div>
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl mb-4 aspect-[4/5]">
                <img 
                  src={farzinImg} 
                  alt="Farzin Pezeshgi" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex gap-3 text-white">
                    <Linkedin className="cursor-pointer hover:text-primary transition-colors" />
                    <Twitter className="cursor-pointer hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold">Farzin Pezeshgi</h3>
              <p className="text-primary font-medium">Co-Founder & CPO</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group sm:mt-12"
            >
              <div className="relative overflow-hidden rounded-3xl mb-4 aspect-[4/5]">
                <img 
                  src={mohsenImg} 
                  alt="Mohsen Ghods" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex gap-3 text-white">
                    <Linkedin className="cursor-pointer hover:text-primary transition-colors" />
                    <Twitter className="cursor-pointer hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold">Mohsen Ghods</h3>
              <p className="text-secondary font-medium">Co-Founder & CEO</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
