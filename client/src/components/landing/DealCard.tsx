import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface DealCardProps {
  image: string;
  title: string;
  shop: string;
  distance: string;
  discount: string;
  rating: number;
  timeLeft?: string;
  tags: string[];
}

export default function DealCard({ image, title, shop, distance, discount, rating, timeLeft, tags }: DealCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
    >
      <Card className="overflow-hidden border-none shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300 rounded-2xl">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-foreground flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            {rating}
          </div>
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {discount} OFF
          </div>
        </div>
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-sm text-muted-foreground font-medium">{shop}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {distance}
            </div>
            {timeLeft && (
              <div className="flex items-center gap-1 text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                <Clock size={14} />
                {timeLeft}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0 h-5 bg-gray-100 text-gray-600 hover:bg-gray-200">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
