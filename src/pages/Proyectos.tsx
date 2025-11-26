import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FolderKanban, TrendingUp, AreaChart, Leaf } from "lucide-react";
import StyledText from "@/components/StyledText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import KPI from "@/components/KPI";

const proyectosData = [
  { id: 1, nombre: "Hotel Modular Riviera", tipo: "Turismo", estado: "En construcción", avance: 65, responsable: "Arq. María González" },
  { id: 2, nombre: "Centro de Salud Integral", tipo: "Salud", estado: "En diseño", avance: 30, responsable: "Ing. Carlos Ruiz" },
  { id: 3, nombre: "Plaza Comercial Sustentable", tipo: "Retail", estado: "Operando", avance: 100, responsable: "Arq. Laura Torres" },
  { id: 4, nombre: "Almacén Logístico Verde", tipo: "Industrial", estado: "En construcción", avance: 80, responsable: "Ing. Pedro Martínez" },
  { id: 5, nombre: "Complejo Residencial Sustentable", tipo: "Turismo", estado: "En pausa", avance: 45, responsable: "Arq. Ana López" },
  { id: 6, nombre: "Oficinas Corporativas dems", tipo: "Retail", estado: "Operando", avance: 100, responsable: "Arq. Roberto Sánchez" },
];

interface ProyectosProps {
  hideNavbar?: boolean;
}

const Proyectos = ({ hideNavbar = false }: ProyectosProps) => {
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [estadoFilter, setEstadoFilter] = useState("todos");

  const filteredProyectos = proyectosData.filter((proyecto) => {
    const matchesTipo = tipoFilter === "todos" || proyecto.tipo === tipoFilter;
    const matchesEstado = estadoFilter === "todos" || proyecto.estado === estadoFilter;
    return matchesTipo && matchesEstado;
  });

  const estadoColors: Record<string, string> = {
    "En diseño": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    "En construcción": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    "Operando": "bg-green-500/10 text-green-700 dark:text-green-400",
    "En pausa": "bg-gray-500/10 text-gray-700 dark:text-gray-400",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {!hideNavbar && <Navbar />}
      
      <section className={hideNavbar ? "py-8" : "py-20 lg:py-24 scroll-mt-20 lg:scroll-mt-24"}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-7xl mx-auto space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {!hideNavbar && (
              <Link to="/dataroom">
                <Button 
                  variant="ghost" 
                  className="hover:bg-blue-500/10 hover:border-blue-500/60 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Dataroom
                </Button>
              </Link>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <FolderKanban className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
                  Dashboard de Proyectos <StyledText />
                </h1>
                <p className="text-sm md:text-base text-foreground/70">
                  Demo 5 — Visualiza proyectos activos y métricas clave
                </p>
              </div>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPI 
              title="Proyectos Activos"
              value="6"
              icon={TrendingUp}
              trend="+2 este mes"
            />
            <KPI 
              title="Total m² en Desarrollo"
              value="18,450"
              icon={AreaChart}
              trend="4 proyectos activos"
            />
            <KPI 
              title="Emisiones Evitadas"
              value="245 ton CO₂"
              icon={Leaf}
              trend="Proyectos actuales"
            />
            <KPI 
              title="Circularidad Promedio"
              value="91%"
              icon={FolderKanban}
              trend="Meta: 95%"
            />
          </div>

          <motion.div 
            className="bg-card/40 backdrop-blur-sm rounded-xl shadow-card p-4 sm:p-6 lg:p-8 border border-blue-500/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Select value={tipoFilter} onValueChange={setTipoFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Tipo de proyecto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Turismo">Turismo</SelectItem>
                  <SelectItem value="Salud">Salud</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>

              <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="En diseño">En diseño</SelectItem>
                  <SelectItem value="En construcción">En construcción</SelectItem>
                  <SelectItem value="Operando">Operando</SelectItem>
                  <SelectItem value="En pausa">En pausa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border border-blue-500/20 overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre del Proyecto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>% Avance</TableHead>
                    <TableHead>Responsable</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProyectos.map((proyecto) => (
                    <TableRow key={proyecto.id}>
                      <TableCell className="font-medium">{proyecto.nombre}</TableCell>
                      <TableCell>{proyecto.tipo}</TableCell>
                      <TableCell>
                        <Badge className={estadoColors[proyecto.estado]}>
                          {proyecto.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-secondary rounded-full h-2 max-w-[100px]">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${proyecto.avance}%` }}
                            />
                          </div>
                          <span className="text-xs md:text-sm text-muted-foreground">{proyecto.avance}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{proyecto.responsable}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

            {filteredProyectos.length === 0 && (
              <motion.div 
                className="text-center py-12 text-foreground/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                No se encontraron proyectos con los filtros aplicados
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Proyectos;
