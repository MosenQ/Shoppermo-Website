import Navbar from "@/components/landing/Navbar";
import OldHero from "@/components/landing/OldHero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function OldHomepage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <OldHero />
        <Features />
        
        {/* Banner for Business */}
        <section className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Own a local business?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of merchants growing their revenue with Shoppermo. 
              Get discovered by customers right outside your door.
            </p>
            <Link href="/business#hero">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 font-bold text-lg px-8 h-14 rounded-full">
                Become a Partner <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
