import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Database, Package, Layers, CheckCircle2, Info, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import StyledText from "@/components/StyledText";

interface MaterialesProps {
  hideNavbar?: boolean;
}

const Materiales = ({ hideNavbar = false }: MaterialesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', name: 'Todos los Materiales' },
    { id: 'paneles', name: 'Paneles Estructurales' },
    { id: 'cubiertas', name: 'Sistemas de Cubierta' },
    { id: 'fachadas', name: 'Elementos de Fachada' },
    { id: 'modulares', name: 'Componentes Modulares' }
  ];

  const materiales = [
    {
      id: 1,
      nombre: 'Panel EcoPanel Estructural',
      categoria: 'paneles',
      proveedor: 'EcoPanel',
      especificaciones: '1.22m × 2.44m × 9mm',
      disponibilidad: 'Disponible',
      certificaciones: ['NOM-008', 'ISO 9001'],
      aplicaciones: ['Muros interiores', 'Divisiones', 'Revestimientos'],
      sustentabilidad: 'Bajo contenido de carbono, reciclable',
      color: 'from-slate-400 to-slate-500'
    },
    {
      id: 2,
      nombre: 'Lámina TechBuild Compuesta',
      categoria: 'cubiertas',
      proveedor: 'TechBuild',
      especificaciones: '0.92m × 2.50m × 7mm',
      disponibilidad: 'Disponible',
      certificaciones: ['NOM-189', 'Certificación Ambiental'],
      aplicaciones: ['Cubiertas', 'Techados', 'Fachadas ventiladas'],
      sustentabilidad: 'Materiales reciclados, larga vida útil',
      color: 'from-slate-400 to-slate-500'
    },
    {
      id: 3,
      nombre: 'Panel Arquitectónico Ligero',
      categoria: 'fachadas',
      proveedor: 'EcoPanel',
      especificaciones: '1.25m × 3.05m × 11mm',
      disponibilidad: 'Bajo pedido',
      certificaciones: ['NOM-008', 'LEED Compatible'],
      aplicaciones: ['Fachadas', 'Revestimientos exteriores'],
      sustentabilidad: 'Reducción de peso estructural, eficiencia térmica',
      color: 'from-slate-500 to-slate-600'
    },
    {
      id: 4,
      nombre: 'Sistema de Cubierta TechBuild Pro',
      categoria: 'cubiertas',
      proveedor: 'TechBuild',
      especificaciones: '1.08m × 2.55m × 8mm',
      disponibilidad: 'Disponible',
      certificaciones: ['NOM-189', 'Certificación Sísmica'],
      aplicaciones: ['Cubiertas industriales', 'Comerciales', 'Residenciales'],
      sustentabilidad: 'Resistencia UV, baja huella de carbono',
      color: 'from-slate-500 to-slate-600'
    },
    {
      id: 5,
      nombre: 'Módulo Prefabricado Base',
      categoria: 'modulares',
      proveedor: 'DEMS',
      especificaciones: '3.00m × 6.00m × 2.80m',
      disponibilidad: 'Bajo pedido',
      certificaciones: ['Ingeniería DEMS', 'Certificación Estructural'],
      aplicaciones: ['Vivienda', 'Oficinas', 'Comercio'],
      sustentabilidad: 'Reutilizable, desmontable, modular',
      color: 'from-blue-400 to-blue-500'
    },
    {
      id: 6,
      nombre: 'Panel de Fachada Ventilada',
      categoria: 'fachadas',
      proveedor: 'TechBuild',
      especificaciones: '1.22m × 2.45m × 13mm',
      disponibilidad: 'Disponible',
      certificaciones: ['NOM-008', 'Certificación Térmica'],
      aplicaciones: ['Fachadas ventiladas', 'Sistemas de aislamiento'],
      sustentabilidad: 'Eficiencia energética, reciclable',
      color: 'from-slate-400 to-slate-500'
    }
  ];

  const filteredMaterials = selectedCategory === 'todos' 
    ? materiales 
    : materiales.filter(m => m.categoria === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {!hideNavbar && <Navbar />}
      
      <section className={hideNavbar ? "py-8" : "py-20 lg:py-24 scroll-mt-20 lg:scroll-mt-24"}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-7xl mx-auto space-y-8"
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
                  Volver al Data Room
                </Button>
              </Link>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Database className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800">
                  Banco de Materiales <StyledText variant="default" className="inline" />
                </h1>
                <p className="text-sm md:text-base text-slate-600">
                  Catálogo de materiales modulares y sistemas constructivos
                </p>
              </div>
            </div>

            {/* Bloque informativo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50/50 backdrop-blur-sm border border-blue-200/50 rounded-xl p-5 lg:p-6"
            >
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  Este banco de materiales presenta el catálogo de componentes disponibles para 
                  proyectos de arquitectura modular. Incluye paneles estructurales, sistemas de 
                  cubierta y elementos prefabricados de nuestro ecosistema de proveedores.
                </p>
              </div>
            </motion.div>

            {/* Stats rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Materiales catalogados', value: '6', icon: Package },
                { label: 'Proveedores', value: '3', icon: Layers },
                { label: 'Certificaciones', value: '8+', icon: CheckCircle2 },
                { label: 'Disponibilidad', value: '85%', icon: Database },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300"
                >
                  <stat.icon className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-slate-800">{stat.value}</div>
                  <div className="text-xs md:text-sm text-slate-600 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Barra de búsqueda y filtros */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar materiales..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedCategory === cat.id
                          ? 'bg-slate-700 text-white shadow-md'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Grid de Materiales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material, index) => (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Header con icono */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${material.color} flex items-center justify-center`}>
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      material.disponibilidad === 'Disponible'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {material.disponibilidad}
                    </span>
                  </div>

                  {/* Título y proveedor */}
                  <h3 className="text-sm md:text-base font-bold text-slate-800 mb-2">
                    {material.nombre}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 font-medium mb-4">
                    {material.proveedor}
                  </p>

                  {/* Especificaciones */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-slate-500 mb-1">Especificaciones</p>
                      <p className="text-xs md:text-sm text-slate-700">{material.especificaciones}</p>
                    </div>

                    <div>
                      <p className="text-xs md:text-sm font-semibold text-slate-500 mb-1">Aplicaciones</p>
                      <div className="flex flex-wrap gap-1.5">
                        {material.aplicaciones.map((app, i) => (
                          <span key={i} className="text-xs md:text-sm bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs md:text-sm font-semibold text-slate-500 mb-1">Certificaciones</p>
                      <div className="flex flex-wrap gap-1.5">
                        {material.certificaciones.map((cert, i) => (
                          <span key={i} className="text-xs md:text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sustentabilidad */}
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-xs md:text-sm font-semibold text-slate-500 mb-1">Sustentabilidad</p>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      {material.sustentabilidad}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Materiales;
