import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MaterialCardProps {
  name: string;
  units: number;
  reusability: number;
  status: "Disponible" | "En recuperación" | "Reservado";
}

const MaterialCard = ({ name, units, reusability, status }: MaterialCardProps) => {
  const statusColors = {
    "Disponible": "bg-green-500/10 text-green-700 dark:text-green-400",
    "En recuperación": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    "Reservado": "bg-blue-500/10 text-blue-700 dark:text-blue-400"
  };

  return (
    <Card className="border-border bg-card hover:shadow-card-hover transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge className={statusColors[status]}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Unidades disponibles:</span>
            <span className="font-semibold text-foreground">{units}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">% Reutilización:</span>
            <span className="font-semibold text-foreground">{reusability}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
