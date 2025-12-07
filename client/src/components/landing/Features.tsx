import DealCard from "./DealCard";
import { Sparkles, Coins, Map } from "lucide-react";
import { motion } from "framer-motion";
import coffeeImg from "@assets/generated_images/latte_art_in_cozy_cafe.png";
import sneakerImg from "@assets/generated_images/modern_streetwear_sneakers.png";
import pizzaImg from "@assets/generated_images/gourmet_pizza_close_up.png";

export default function Features() {
  const deals = [
    {
      image: coffeeImg,
      title: "Signature Latte + Pastry",
      shop: "Bean & Leaf Roastery",
      distance: "0.2 mi",
      discount: "30%",
      rating: 4.9,
      tags: ["Coffee", "Breakfast"],
      timeLeft: "Ends in 2h"
    },
    {
      image: sneakerImg,
      title: "Limited Edition Drops",
      shop: "Urban Sole",
      distance: "0.8 mi",
      discount: "20%",
      rating: 4.7,
      tags: ["Fashion", "Streetwear"]
    },
    {
      image: pizzaImg,
      title: "Wood-fired Margherita",
      shop: "Napoli Crust",
      distance: "0.5 mi",
      discount: "Buy 1 Get 1",
      rating: 4.8,
      tags: ["Dinner", "Italian"],
      timeLeft: "Today only"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart savings, <span className="text-secondary">found for you.</span></h2>
          <p className="text-muted-foreground text-lg">
            Search for specific products in your nearby stores. Find exactly what you need, right around the corner. 
            From morning coffee to evening kicks.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {deals.map((deal, index) => (
            <motion.div key={index} variants={item}>
              <DealCard {...deal} />
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:border-primary/20 transition-colors"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
              <Map size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Hyper-local Focus</h3>
            <p className="text-muted-foreground">We map every hidden gem. Find amazing shops you walk past every day.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:border-secondary/20 transition-colors"
          >
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-secondary">
              <Sparkles size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Personalization</h3>
            <p className="text-muted-foreground">The app gets smarter as you use it, curating deals that match your style and taste.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:border-green-500/20 transition-colors"
          >
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600">
              <Coins size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Shopperjoy Rewards</h3>
            <p className="text-muted-foreground">Earn Shopperjoy currency on every purchase. Redeem for gift cards, food discounts, or donate to local charities.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
