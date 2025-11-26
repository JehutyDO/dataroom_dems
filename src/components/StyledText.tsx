import { cn } from "@/lib/utils";

interface StyledTextProps {
  text?: string;
  className?: string;
  variant?: "default" | "gradient" | "accent";
}

const StyledText = ({ text = "dems", className, variant = "default" }: StyledTextProps) => {
  const variantStyles = {
    default: "font-display text-blue-500 font-semibold lowercase",
    gradient: "font-display bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent font-semibold lowercase",
    accent: "font-display text-blue-600 font-semibold lowercase",
  };

  return (
    <span className={cn(variantStyles[variant], className)}>
      {text.toLowerCase()}
    </span>
  );
};

export default StyledText;
