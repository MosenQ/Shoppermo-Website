import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Team from "@/components/landing/Team";
import { motion } from "framer-motion";
import { Building2, Rocket, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main className="pt-20">
        {/* About Hero */}
        <section className="bg-gray-900 text-white py-20 md:py-32 relative overflow-hidden min-h-[60vh] flex items-center">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold mb-8 border border-primary/20 backdrop-blur-md">
                <Building2 size={16} />
                Our Story
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Bridging the gap between <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                  communities & commerce
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                We believe the best shopping experiences happen offline, but they need online discovery. 
                Shoppermo is building the digital infrastructure for the physical world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Values */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <Rocket size={28} />
                </div>
                <h3 className="text-2xl font-bold">Hyper-local First</h3>
                <p className="text-muted-foreground text-lg">
                  We focus on connecting people with what's right in front of them. Supporting local economies isn't just a slogan, it's our core mechanic.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
                  <Heart size={28} />
                </div>
                <h3 className="text-2xl font-bold">Community Driven</h3>
                <p className="text-muted-foreground text-lg">
                  Every feature we build is designed to strengthen the bond between merchants and their neighbors. When local businesses thrive, everyone wins.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                  <Building2 size={28} />
                </div>
                <h3 className="text-2xl font-bold">Digital for Physical</h3>
                <p className="text-muted-foreground text-lg">
                  We don't want to replace the high street; we want to power it. Giving physical stores the same data superpowers as e-commerce giants.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <Team />

      </main>
      <Footer />
    </div>
  );
}
