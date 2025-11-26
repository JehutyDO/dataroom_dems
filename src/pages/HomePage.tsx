import { Building, Database, Workflow, Gauge, FolderKanban } from "lucide-react";
import { motion } from "framer-motion";
import CardDemo from "@/components/CardDemo";
import Navbar from "@/components/Navbar";
import StyledText from "@/components/StyledText";

const HomePage = () => {
  const demos = [
    {
      title: "Simulador de Reconversión Modular",
      description: "Modifica un edificio y observa cambios en costo, tiempo y residuos.",
      icon: Building,
      href: "/dataroom/simulador",
    },
    {
      title: "Banco de Materiales",
      description: "Consulta materiales modulares, reutilizables y su disponibilidad.",
      icon: Database,
      href: "/dataroom/materiales",
      useDEMS: true,
    },
    {
      title: "Cadena de Valor Circular",
      description: "Visualiza el ecosistema entre DEMS–Mexalit–Cempanel.",
      icon: Workflow,
      href: "/dataroom/cadena",
    },
    {
      title: "Calculadora ESG / CO₂",
      description: "Calcula emisiones evitadas e impacto ambiental.",
      icon: Gauge,
      href: "/dataroom/esg",
    },
    {
      title: "Dashboard de Proyectos",
      description: "Visualiza proyectos activos, métricas y estados en tiempo real.",
      icon: FolderKanban,
      href: "/dataroom/proyectos",
      useDEMS: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-24 scroll-mt-20 lg:scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-6xl mx-auto space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground">
                <StyledText variant="gradient" /> DataRoom
              </h1>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-foreground/70 max-w-2xl mx-auto">
                Explora módulos, circularidad, modelos de negocio y métricas ESG en tiempo real
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto auto-rows-fr">
              {demos.map((demo, idx) => (
                <motion.div
                  key={demo.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.15 + idx * 0.08 
                  }}
                  className="h-full"
                >
                  <CardDemo {...demo} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dataroom Access Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
                Accede al <StyledText variant="gradient" className="text-2xl sm:text-3xl lg:text-4xl inline" /> Dataroom
              </h2>
              <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto">
                Sistema seguro con documentación completa, modelos de negocio y análisis detallados
              </p>
            </div>

            {/* Dataroom Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
              {[
                { icon: "💼", label: "Modelos de Negocio" },
                { icon: "📄", label: "Docs Técnica" },
                { icon: "🏢", label: "Arquitectura" },
                { icon: "♻️", label: "Economía Circular" },
                { icon: "🤝", label: "Alianzas" },
                { icon: "📁", label: "Archivos PDF" },
                { icon: "🔒", label: "Acceso Seguro" },
                { icon: "🔄", label: "Actualizado" },
              ].map((category, idx) => (
                <motion.div
                  key={category.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-card/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 sm:p-5 text-center hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200"
                >
                  <div className="text-3xl sm:text-4xl mb-2">{category.icon}</div>
                  <p className="text-xs sm:text-sm font-medium text-foreground/80">{category.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <a
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 text-base sm:text-lg"
              >
                <Database className="w-5 h-5" />
                Ingresar al Dataroom
              </a>
              <p className="mt-4 text-sm text-foreground/60">
                Acceso seguro con credenciales
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
