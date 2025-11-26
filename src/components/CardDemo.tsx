import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import StyledText from "@/components/StyledText";

interface CardDemoProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  useDEMS?: boolean;
}

const CardDemo = ({ title, description, icon: Icon, href, useDEMS }: CardDemoProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="group h-full flex flex-col bg-card/40 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 shadow-card hover:shadow-card-hover">
        <CardHeader className="space-y-4 flex-grow">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-lg sm:text-xl font-semibold text-foreground min-h-[3.5rem]">
            {useDEMS ? (
              <>
                {title.split("dems").map((part, idx, arr) => (
                  <span key={idx}>
                    {part}
                    {idx < arr.length - 1 && <StyledText />}
                  </span>
                ))}
              </>
            ) : (
              title
            )}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base leading-relaxed text-foreground/70 min-h-[4rem]">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Link to={href}>
            <Button 
              variant="outline" 
              className="w-full border-blue-500/20 hover:bg-blue-500/10 hover:border-blue-500/60 hover:scale-105 transition-all duration-300 text-foreground"
            >
              Ver demo
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CardDemo;
