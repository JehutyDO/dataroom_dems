import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface KPIProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}

const KPI = ({ title, value, icon: Icon, trend }: KPIProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full bg-card/40 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 shadow-card hover:shadow-card-hover">
        <CardContent className="p-4 sm:p-6 h-full flex items-center">
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-foreground/70 mb-1 sm:mb-2 min-h-[1.25rem]">{title}</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground truncate min-h-[2rem] sm:min-h-[2.5rem]">{value}</p>
              {trend && (
                <p className="text-xs sm:text-sm text-blue-500 mt-1 sm:mt-2 min-h-[1.25rem]">{trend}</p>
              )}
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default KPI;
