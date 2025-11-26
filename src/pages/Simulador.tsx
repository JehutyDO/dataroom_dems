import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building, DollarSign, Clock, Trash2, Leaf, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";

interface SimuladorProps {
  hideNavbar?: boolean;
}

const Simulador = ({ hideNavbar = false }: SimuladorProps) => {
  const [m2, setM2] = useState([1000]);
  const [tipoReconversion, setTipoReconversion] = useState([2]);
  const [recuperacion, setRecuperacion] = useState([60]);
  const [velocidad, setVelocidad] = useState<'estandar' | 'acelerado' | 'fases'>('estandar');

  // Factores de reconversión según tipo
  const factoresReconversion = [0.8, 1.0, 1.2, 1.5, 1.8];
  const tiposReconversion = [
    { label: 'Ligera', descripcion: 'Cambio de envolvente, paneles e interiores ligeros' },
    { label: 'Media', descripcion: 'Interior completo + fachadas' },
    { label: 'Profunda', descripcion: 'Cambio integral + estructura ligera' },
    { label: 'Especializada', descripcion: 'Hospitales, laboratorios, turismo' },
    { label: 'Completa', descripcion: 'Todo lo anterior + infraestructura técnica' }
  ];

  // Cálculos
  const factor = factoresReconversion[tipoReconversion[0] - 1];
  const costoEstimado = Math.round(m2[0] * factor * 950);
  
  let tiempoBase = Math.round(m2[0] / 14);
  if (velocidad === 'acelerado') {
    tiempoBase = Math.round(tiempoBase * 0.8);
  } else if (velocidad === 'fases' && m2[0] > 2000) {
    const fases = Math.ceil(m2[0] / 2000);
    tiempoBase = Math.round((m2[0] / 2000) * (tiempoBase / fases)) + (fases * 15);
  }
  
  const residuosEvitados = (m2[0] * (recuperacion[0] / 100) * 0.25).toFixed(1);
  const co2Evitado = (m2[0] * (0.12 * tipoReconversion[0] * 0.4)).toFixed(1);
  const circularidad = recuperacion[0];

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
                  Volver al Dataroom
                </Button>
              </Link>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Building className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800">
                  Simulador de Reconversión Modular
                </h1>
                <p className="text-sm md:text-base text-slate-600">
                  Estima el impacto técnico, económico y ambiental de tu proyecto
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
                <p className="text-sm text-slate-700 leading-relaxed">
                  Este simulador permite estimar el impacto técnico, económico y ambiental de una 
                  reconversión modular usando sistemas híbridos, materiales ligeros y elementos sostenibles. 
                  Los valores son aproximados y sirven únicamente como referencia preliminar.
                </p>
              </div>
            </motion.div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-600">Costo Estimado</p>
                  <p className="text-2xl font-bold text-slate-800">
                    ${costoEstimado.toLocaleString('es-MX')}
                  </p>
                  <p className="text-xs text-slate-500">Valor aproximado según tipo de reconversión</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-600">Tiempo de Obra</p>
                  <p className="text-2xl font-bold text-slate-800">{tiempoBase} días</p>
                  <p className="text-xs text-slate-500">Incluye fabricación + montaje</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-600">Residuos Evitados</p>
                  <p className="text-2xl font-bold text-slate-800">{residuosEvitados} ton</p>
                  <p className="text-xs text-slate-500">Basado en recuperación de materiales</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-600">CO₂ Evitado</p>
                  <p className="text-2xl font-bold text-slate-800">{co2Evitado} ton</p>
                  <p className="text-xs text-slate-500">Comparado con obra tradicional</p>
                </div>
              </motion.div>
            </div>

            {/* Controles del Simulador */}
            <motion.div 
              className="bg-white/70 backdrop-blur-xl rounded-xl shadow-lg p-6 lg:p-8 border border-blue-500/20 space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-6">Parámetros del Proyecto</h2>

              {/* Superficie */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <label className="text-sm md:text-base font-medium text-slate-700 block mb-1">
                      Superficie a Intervenir: <span className="text-blue-600 font-bold">{m2[0].toLocaleString()} m²</span>
                    </label>
                    <p className="text-xs md:text-sm text-slate-500">Área total donde se realizará la reconversión modular</p>
                  </div>
                </div>
                <Slider 
                  value={m2}
                  onValueChange={setM2}
                  min={50}
                  max={10000}
                  step={50}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>50 m²</span>
                  <span>10,000 m²</span>
                </div>
              </div>

              {/* Tipo de Reconversión */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <label className="text-sm md:text-base font-medium text-slate-700 block mb-1">
                      Tipo de Reconversión: <span className="text-blue-600 font-bold">{tiposReconversion[tipoReconversion[0] - 1].label}</span>
                    </label>
                    <p className="text-xs md:text-sm text-slate-500">{tiposReconversion[tipoReconversion[0] - 1].descripcion}</p>
                  </div>
                </div>
                <Slider 
                  value={tipoReconversion}
                  onValueChange={setTipoReconversion}
                  min={1}
                  max={5}
                  step={1}
                  className="cursor-pointer"
                />
                <div className="grid grid-cols-5 gap-2 text-xs text-slate-400 text-center">
                  <span>Ligera</span>
                  <span>Media</span>
                  <span>Profunda</span>
                  <span>Especializada</span>
                  <span>Completa</span>
                </div>
              </div>

              {/* Recuperación de Materiales */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <label className="text-sm md:text-base font-medium text-slate-700 block mb-1">
                      Reutilización de Materiales: <span className="text-blue-600 font-bold">{recuperacion[0]}%</span>
                    </label>
                    <p className="text-xs md:text-sm text-slate-500">
                      Porcentaje de materiales extraídos que pueden reintegrarse mediante economía circular
                    </p>
                  </div>
                </div>
                <Slider 
                  value={recuperacion}
                  onValueChange={setRecuperacion}
                  min={0}
                  max={100}
                  step={5}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Velocidad del Proyecto */}
              <div className="space-y-4">
                <label className="text-sm md:text-base font-medium text-slate-700 block mb-3">
                  Velocidad del Proyecto
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setVelocidad('estandar')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      velocidad === 'estandar'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <p className="text-sm md:text-base font-semibold text-slate-800 mb-1">Estándar</p>
                    <p className="text-xs md:text-sm text-slate-600">Tiempos normales de fabricación y montaje</p>
                  </button>
                  
                  <button
                    onClick={() => setVelocidad('acelerado')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      velocidad === 'acelerado'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <p className="text-sm md:text-base font-semibold text-slate-800 mb-1">Acelerado</p>
                    <p className="text-xs md:text-sm text-slate-600">20% más rápido con optimización</p>
                  </button>
                  
                  <button
                    onClick={() => setVelocidad('fases')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      velocidad === 'fases'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <p className="text-sm md:text-base font-semibold text-slate-800 mb-1">Por Fases</p>
                    <p className="text-xs md:text-sm text-slate-600">Dividido en bloques de 2,000 m²</p>
                  </button>
                </div>
              </div>

              {/* Indicador de Circularidad */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-slate-700">Índice de Circularidad</p>
                  <p className="text-2xl font-bold text-teal-600">{circularidad}%</p>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${circularidad}%` }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Simulador;
