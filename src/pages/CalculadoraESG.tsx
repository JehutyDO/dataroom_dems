import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Gauge, Leaf, DollarSign, Recycle, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import KPI from "@/components/KPI";

const tiposProyecto = [
  { value: "turismo", label: "Turismo", factor: 1.2 },
  { value: "salud", label: "Salud", factor: 1.5 },
  { value: "retail", label: "Retail", factor: 1.0 },
  { value: "industrial", label: "Industrial", factor: 1.8 },
  { value: "residencial", label: "Residencial", factor: 0.9 },
  { value: "educativo", label: "Educativo", factor: 1.1 },
  { value: "corporativo", label: "Corporativo", factor: 1.3 },
];

const materiales = [
  { value: "mexalit", label: "Mexalit", circularidad: 95 },
  { value: "cempanel", label: "Cempanel", circularidad: 88 },
  { value: "acero", label: "Acero ligero", circularidad: 75 },
  { value: "mixto", label: "Mixto", circularidad: 90 },
];

interface CalculadoraESGProps {
  hideNavbar?: boolean;
}

const CalculadoraESG = ({ hideNavbar = false }: CalculadoraESGProps) => {
  const [m2, setM2] = useState("");
  const [tipoProyecto, setTipoProyecto] = useState("");
  const [material, setMaterial] = useState("");

  const tipoSeleccionado = tiposProyecto.find(t => t.value === tipoProyecto);
  const materialSeleccionado = materiales.find(m => m.value === material);

  // Cálculo de emisiones evitadas (ton CO₂)
  const co2Evitado = m2 && tipoSeleccionado 
    ? (parseFloat(m2) * tipoSeleccionado.factor * 0.65).toFixed(2)
    : "0.00";

  // Cálculo de ahorro económico estimado
  const ahorroEconomico = m2 && tipoSeleccionado
    ? Math.round(parseFloat(m2) * tipoSeleccionado.factor * 850)
    : 0;

  // Circularidad del material
  const circularidad = materialSeleccionado?.circularidad || 0;

  // Estado para mostrar si hay resultados
  const hayResultados = m2 && tipoProyecto && material;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {!hideNavbar && <Navbar />}
      
      <section className={hideNavbar ? "py-8" : "py-20 lg:py-24 scroll-mt-20 lg:scroll-mt-24"}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-5xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
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

            {/* Title Section */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Gauge className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
                  Simulador ESG / CO₂
                </h1>
                <p className="text-base sm:text-lg text-slate-600">
                  Demo Técnica — Métricas Ambientales y Circularidad
                </p>
              </div>
            </motion.div>

            {/* Sección Explicativa - Solo se muestra cuando NO hay resultados */}
            {!hayResultados && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200/50 rounded-2xl p-6 sm:p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                  ¿Qué hace este simulador?
                </h2>
                <p className="text-slate-700 text-base leading-relaxed mb-6">
                  Esta calculadora te permite estimar el <strong>impacto ambiental positivo</strong> y el 
                  <strong> ahorro económico</strong> al usar sistemas de construcción ligera y modular como 
                  <strong> Mexalit</strong> o <strong>Cempanel</strong>, comparado con métodos tradicionales.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Variable 1 */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-slate-200/50">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-2xl">📐</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Metros Cuadrados</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      El tamaño del proyecto impacta directamente en las emisiones y costos. 
                      A mayor superficie, mayor potencial de ahorro y reducción de CO₂.
                    </p>
                  </div>

                  {/* Variable 2 */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-slate-200/50">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-2xl">🏢</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Tipo de Proyecto</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Cada sector tiene necesidades distintas. Hospitales e industrias tienen factores 
                      más altos por su complejidad; residencial, factores menores.
                    </p>
                  </div>

                  {/* Variable 3 */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-slate-200/50">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-2xl">♻️</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Material Principal</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      La circularidad mide qué porcentaje del material es reutilizable. 
                      Mexalit alcanza 95%, reduciendo drásticamente residuos.
                    </p>
                  </div>
                </div>

                {/* Ejemplo predefinido */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-blue-300/50">
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="text-lg">💡</span>
                    Ejemplo: Hotel Boutique de 2,500 m²
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="text-sm">
                      <p className="text-slate-500 mb-1">Superficie</p>
                      <p className="font-semibold text-slate-800">2,500 m²</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-slate-500 mb-1">Tipo</p>
                      <p className="font-semibold text-slate-800">Turismo</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-slate-500 mb-1">Material</p>
                      <p className="font-semibold text-slate-800">Mexalit (95% circular)</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">1,950 ton</p>
                      <p className="text-xs text-slate-600 mt-1">CO₂ evitado</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">$2.55M</p>
                      <p className="text-xs text-slate-600 mt-1">Ahorro económico</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-teal-600">95%</p>
                      <p className="text-xs text-slate-600 mt-1">Circularidad</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Card de Inputs */}
            <motion.div 
              className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 p-6 sm:p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: hayResultados ? 0.2 : 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-slate-800">
                  {hayResultados ? "Tus Parámetros" : "Ingresa tus Parámetros"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Metros Cuadrados */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 block">
                    Metros Cuadrados
                  </label>
                  <Input
                    type="number"
                    placeholder="Ej. 1500 m²"
                    value={m2}
                    onChange={(e) => setM2(e.target.value)}
                    min="0"
                    className="h-12 text-base bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Tipo de Proyecto */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 block">
                    Tipo de Proyecto
                  </label>
                  <Select value={tipoProyecto} onValueChange={setTipoProyecto}>
                    <SelectTrigger className="h-12 text-base bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposProyecto.map((tipo) => (
                        <SelectItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Material Principal */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 block">
                    Material Principal
                  </label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger className="h-12 text-base bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Selecciona material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materiales.map((mat) => (
                        <SelectItem key={mat.value} value={mat.value}>
                          {mat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Info helper - Solo cuando faltan campos parcialmente */}
              {(m2 || tipoProyecto || material) && !hayResultados && (
                <motion.div 
                  className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-sm text-amber-700">
                    ⚠️ Completa todos los campos para calcular las métricas ambientales
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* KPIs - Resultados */}
            {hayResultados && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                  <h2 className="text-lg font-semibold text-slate-700">Resultados</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
                  {/* KPI 1 - Emisiones Evitadas */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <KPI 
                      title="Emisiones Evitadas"
                      value={`${co2Evitado} ton CO₂`}
                      icon={Leaf}
                      trend="Comparado con construcción tradicional"
                    />
                  </motion.div>

                  {/* KPI 2 - Ahorro Económico */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <KPI 
                      title="Ahorro Económico"
                      value={`$${ahorroEconomico.toLocaleString()} MXN`}
                      icon={DollarSign}
                      trend="Ahorro estimado por eficiencia y tiempos"
                    />
                  </motion.div>

                  {/* KPI 3 - Circularidad */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <KPI 
                      title="Circularidad del Material"
                      value={`${circularidad}%`}
                      icon={Recycle}
                      trend="Material reutilizable o reciclable"
                    />
                  </motion.div>
                </div>

                {/* Info Card Extra */}
                <motion.div 
                  className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200/50 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 mb-2">
                        ¿Qué tan sustentable es tu proyecto?
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Usando sistemas ligeros como <strong>Mexalit</strong> o <strong>Cempanel</strong>, 
                        reduces significativamente las emisiones de CO₂, optimizas tiempos de construcción 
                        y aprovechas materiales con alta circularidad. Una apuesta por la construcción eficiente y responsable.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CalculadoraESG;
