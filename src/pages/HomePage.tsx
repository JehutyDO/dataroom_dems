import { Building, Database, Workflow, Gauge, FolderKanban, ShieldAlert, Lock, AlertTriangle, Info } from "lucide-react";
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
                <StyledText variant="gradient" /> Data Room
              </h1>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-foreground/70 max-w-2xl mx-auto">
                Explora módulos, circularidad, modelos de negocio y métricas ESG en tiempo real
              </p>

              {/* Security Warning Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300/60 rounded-xl p-4 sm:p-6 shadow-lg"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-amber-500 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-left space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-amber-900 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Aviso de Seguridad y Confidencialidad
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                      Este Data Room contiene <strong>información confidencial y datos ficticios</strong> con fines demostrativos. 
                      El acceso está restringido y todo el contenido es <strong>propiedad intelectual protegida</strong>. 
                      Cualquier uso no autorizado, reproducción o distribución está <strong>estrictamente prohibido</strong>.
                    </p>
                  </div>
                </div>
              </motion.div>
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
                Accede al <StyledText variant="gradient" className="text-2xl sm:text-3xl lg:text-4xl inline" /> Data Room
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

            {/* Security Notice Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-red-50 border-2 border-red-200 rounded-xl p-5 text-center"
              >
                <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h4 className="text-sm md:text-base font-bold text-red-900 mb-2">Datos Ficticios</h4>
                <p className="text-xs md:text-sm text-red-700 leading-relaxed">
                  Todas las empresas, métricas y proyectos son <strong>ficticios</strong> y creados únicamente para demostración.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 text-center"
              >
                <Lock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h4 className="text-sm md:text-base font-bold text-blue-900 mb-2">Acceso Restringido</h4>
                <p className="text-xs md:text-sm text-blue-700 leading-relaxed">
                  Requiere <strong>autenticación</strong>. Todo acceso queda registrado y es monitoreado para seguridad.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-purple-50 border-2 border-purple-200 rounded-xl p-5 text-center"
              >
                <Info className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h4 className="text-sm md:text-base font-bold text-purple-900 mb-2">Uso Responsable</h4>
                <p className="text-xs md:text-sm text-purple-700 leading-relaxed">
                  No compartir credenciales. <strong>Prohibido</strong> copiar, distribuir o usar información sin autorización.
                </p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <a
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 text-base sm:text-lg"
              >
                <Database className="w-5 h-5" />
                Ingresar al Dataroom
              </a>
              <p className="mt-4 text-xs md:text-sm text-foreground/60">
                🔒 Acceso seguro con credenciales · Todos los accesos son registrados
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Legal Disclaimers Footer */}
      <section className="py-12 bg-slate-100 border-t-2 border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-6xl mx-auto"
          >
            {/* Main Disclaimer */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-300 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-slate-600 flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h3 className="text-base md:text-lg font-bold text-slate-900">
                    Aviso Legal y Limitación de Responsabilidad
                  </h3>
                  <div className="text-xs md:text-sm text-slate-700 leading-relaxed space-y-2">
                    <p>
                      <strong>1. Propósito Demostrativo:</strong> Este Data Room es una <strong>demo técnica</strong> creada exclusivamente con fines ilustrativos y educativos. 
                      Todas las empresas mencionadas (<strong>DEMS, TechBuild, EcoPanel, Mexalit, Cempanel</strong>) son <strong>ficticias</strong> y cualquier similitud con entidades reales es mera coincidencia.
                    </p>
                    <p>
                      <strong>2. Datos No Reales:</strong> Todos los valores numéricos, métricas ESG, cálculos de CO₂, costos, tiempos y proyectos presentados son <strong>estimaciones simuladas</strong> 
                      basadas en supuestos teóricos. No deben ser utilizados para decisiones de inversión, planificación real o cualquier propósito comercial.
                    </p>
                    <p>
                      <strong>3. Propiedad Intelectual:</strong> Todo el contenido, código, diseño y metodologías son <strong>propiedad exclusiva</strong> del autor. 
                      Queda estrictamente prohibida la reproducción, distribución, modificación o uso comercial sin autorización expresa por escrito.
                    </p>
                    <p>
                      <strong>4. Confidencialidad:</strong> El acceso a este sistema implica el compromiso de mantener <strong>confidencialidad absoluta</strong> sobre todo el contenido visualizado. 
                      No está permitido compartir, copiar, fotografiar o distribuir información de ninguna forma.
                    </p>
                    <p>
                      <strong>5. Seguridad y Monitoreo:</strong> Todos los accesos son <strong>registrados y monitoreados</strong>. Cualquier intento de acceso no autorizado, 
                      extracción de datos o violación de términos será considerado una infracción grave y podrá ser reportado a las autoridades correspondientes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Legal Text */}
            <div className="text-center space-y-2">
              <p className="text-xs text-slate-600">
                © 2025 <StyledText variant="gradient" className="text-xs inline" /> Data Room · Demo Técnica
              </p>
              <p className="text-xs text-slate-500">
                Al acceder a este sistema, aceptas los términos de confidencialidad y uso responsable de la información.
              </p>
              <p className="text-xs text-slate-400">
                ⚠️ Sistema de demostración · Datos ficticios · Uso educativo únicamente
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
