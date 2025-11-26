import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Workflow, Factory, Truck, Building2, Users, Recycle, Package, TrendingUp, Leaf, DollarSign, Clock, Info, ChevronDown, ChevronUp } from "lucide-react";
import StyledText from "@/components/StyledText";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";

// Estructura completa de la cadena con lógica real
const etapasData = [
  {
    id: 1,
    etapa: "Origen: Fabricación Mexalit",
    icon: Factory,
    color: "from-purple-500 to-purple-600",
    tiempo: { min: 14, max: 28 }, // días
    actores: ["Mexalit (Fabricante)", "Proveedores de Aluminio Reciclado", "Proveedores de Polietileno"],
    procesos: [
      "Recepción de aluminio reciclado post-consumo",
      "Extrusión de núcleo de polietileno",
      "Laminado de capas de aluminio",
      "Control de calidad y certificación",
      "Almacenamiento en planta"
    ],
    impacto: {
      materialReciclado: 75, // % de contenido reciclado
      co2VsTradicional: -60, // % reducción vs aluminio virgen
      residuosGenerados: 2, // % del total
    },
    costoPorM2: { min: 180, max: 250 }, // MXN
    capacidadProduccion: 15000, // m2/mes
  },
  {
    id: 2,
    etapa: "Logística: Hub DEMS",
    icon: Truck,
    color: "from-orange-500 to-orange-600",
    tiempo: { min: 3, max: 7 },
    actores: ["DEMS Logistics", "Transportistas Certificados", "Centro de Distribución"],
    procesos: [
      "Consolidación de pedidos por proyecto",
      "Optimización de rutas y cargas",
      "Transporte con flota eco-eficiente",
      "Recepción en obra con inventario digital",
      "Trazabilidad mediante códigos QR"
    ],
    impacto: {
      emisionesOptimizadas: 35, // % vs logística tradicional
      entregas: 98, // % entregas a tiempo
      mermaTransporte: 0.5, // %
    },
    costoPorM2: { min: 25, max: 45 },
    capacidadLogistica: 50000, // m2/mes
  },
  {
    id: 3,
    etapa: "Construcción: Obras DEMS",
    icon: Building2,
    color: "from-blue-500 to-blue-600",
    tiempo: { min: 28, max: 84 }, // depende del proyecto
    actores: ["DEMS Construction", "Constructoras Aliadas", "Supervisores de Calidad"],
    procesos: [
      "Pre-ensamblaje de módulos en taller",
      "Instalación de estructura modular",
      "Montaje de paneles Mexalit",
      "Sistemas MEP integrados",
      "Inspecciones y pruebas de desempeño"
    ],
    impacto: {
      tiempoVsTradicional: -40, // % reducción
      desperdicioObra: 15, // % vs 30% tradicional
      trabajadores: 60, // % vs obra tradicional
    },
    costoPorM2: { min: 650, max: 1200 },
    proyectosConcurrentes: 8,
  },
  {
    id: 4,
    etapa: "Vida Útil: Operación",
    icon: Users,
    color: "from-green-500 to-green-600",
    tiempo: { min: 7300, max: 18250 }, // 20-50 años
    actores: ["Usuarios Finales", "Facility Management", "Mantenimiento DEMS"],
    procesos: [
      "Uso y ocupación del edificio",
      "Mantenimiento preventivo trimestral",
      "Reconfiguraciones según necesidad",
      "Monitoreo de eficiencia energética",
      "Actualizaciones de sistemas"
    ],
    impacto: {
      eficienciaEnergetica: 30, // % ahorro vs tradicional
      reconfiguraciones: 3, // promedio en vida útil
      mantenimientoReducido: 25, // % vs tradicional
    },
    costoPorM2: { min: 80, max: 150 }, // anual
    vidaUtil: 35, // años promedio
  },
  {
    id: 5,
    etapa: "Fin de Vida: Desmontaje",
    icon: Recycle,
    color: "from-teal-500 to-teal-600",
    tiempo: { min: 7, max: 14 },
    actores: ["DEMS Recovery", "Técnicos Especializados", "Clasificadores de Material"],
    procesos: [
      "Auditoría pre-desmontaje",
      "Desmontaje no destructivo",
      "Clasificación de materiales",
      "Evaluación de estado y calidad",
      "Documentación digital de componentes"
    ],
    impacto: {
      recuperacionMaterial: 92, // % del total
      componentesReutilizables: 85, // % directamente
      tiempoVsDemolicion: -70, // %
    },
    costoPorM2: { min: 45, max: 80 },
    capacidadDesmontaje: 8000, // m2/mes
  },
  {
    id: 6,
    etapa: "Circularidad: Banco de Materiales",
    icon: Package,
    color: "from-indigo-500 to-indigo-600",
    tiempo: { min: 0, max: 0 }, // proceso continuo
    actores: ["DEMS Material Bank", "Plataforma Digital", "Red de Reuso"],
    procesos: [
      "Catalogación en plataforma digital",
      "Certificación de calidad de componentes",
      "Almacenamiento en hub circular",
      "Matching con nuevos proyectos",
      "Reintegración a cadena productiva"
    ],
    impacto: {
      materialesDisponibles: 12000, // m2 en inventario
      tasaReuso: 78, // % de material reusado
      valorRecuperado: 65, // % del valor original
    },
    costoPorM2: { min: -120, max: -80 }, // crédito por material
    rotacionInventario: 4.5, // veces/año
  },
];

interface CadenaProps {
  hideNavbar?: boolean;
}

const Cadena = ({ hideNavbar = false }: CadenaProps) => {
  const [escalaProyecto, setEscalaProyecto] = useState([2000]); // m2
  const [etapaExpandida, setEtapaExpandida] = useState<number | null>(null);
  const [vidasUtilSimuladas, setVidasUtilSimuladas] = useState([2]);

  // Cálculos dinámicos basados en escala
  const calcularMetricas = () => {
    const m2 = escalaProyecto[0];
    const ciclos = vidasUtilSimuladas[0];
    
    // Costos por etapa
    const costoFabricacion = m2 * 215;
    const costoLogistica = m2 * 35;
    const costoConstruccion = m2 * 925;
    const costoOperacion = (m2 * 115 * 35) / ciclos; // 35 años promedio
    const costoDesmontaje = m2 * 62.5;
    const creditoReuso = m2 * -100;
    
    const costoTotal = costoFabricacion + costoLogistica + costoConstruccion + costoOperacion + costoDesmontaje + creditoReuso;
    const costoSinCircular = costoFabricacion + costoLogistica + costoConstruccion + costoOperacion + (m2 * 180); // demolición tradicional
    const ahorroCircular = costoSinCircular - costoTotal;
    
    // Tiempos
    const tiempoFabricacion = Math.round((m2 / 15000) * 21);
    const tiempoLogistica = 5;
    const tiempoConstruccion = Math.round((m2 / 500) * 14);
    const tiempoDesmontaje = Math.round((m2 / 8000) * 10.5);
    const tiempoTotalPorCiclo = tiempoFabricacion + tiempoLogistica + tiempoConstruccion + tiempoDesmontaje;
    
    // Impacto ambiental
    const co2Fabricacion = m2 * 12.5; // kg CO2
    const co2Logistica = m2 * 2.8;
    const co2Construccion = m2 * 18.5;
    const co2Operacion = (m2 * 8.2 * 35) / ciclos;
    const co2Desmontaje = m2 * 1.2;
    const co2Evitado = m2 * 35; // vs demolición + nuevo material virgen
    
    const co2Total = co2Fabricacion + co2Logistica + co2Construccion + co2Operacion + co2Desmontaje - co2Evitado;
    const co2Tradicional = m2 * 145; // construcción tradicional completa
    const reduccionCO2 = ((co2Tradicional - co2Total) / co2Tradicional) * 100;
    
    // Material circular
    const materialNuevo = m2;
    const materialRecuperado = m2 * 0.92 * ciclos;
    const materialReusado = materialRecuperado * 0.78;
    const tasaCircularidad = (materialReusado / (materialNuevo + materialReusado)) * 100;
    
    return {
      costos: {
        fabricacion: costoFabricacion,
        logistica: costoLogistica,
        construccion: costoConstruccion,
        operacion: costoOperacion,
        desmontaje: costoDesmontaje,
        creditoReuso,
        total: costoTotal,
        ahorro: ahorroCircular,
      },
      tiempos: {
        fabricacion: tiempoFabricacion,
        logistica: tiempoLogistica,
        construccion: tiempoConstruccion,
        desmontaje: tiempoDesmontaje,
        totalPorCiclo: tiempoTotalPorCiclo,
      },
      ambiental: {
        co2Total: co2Total / 1000, // toneladas
        co2Tradicional: co2Tradicional / 1000,
        reduccion: reduccionCO2,
      },
      circular: {
        materialNuevo,
        materialRecuperado,
        materialReusado,
        tasaCircularidad,
      },
    };
  };

  const metricas = calcularMetricas();

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
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Workflow className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-800">
                  Cadena de Valor Circular <StyledText className="inline" />-Mexalit
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-slate-600">
                  Ecosistema integrado de fabricación, construcción y recuperación de materiales
                </p>
              </div>
            </div>

            {/* Explicación Educativa */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300/50 rounded-xl p-6 lg:p-8 space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-bold text-slate-800">¿Qué es una Cadena de Valor Circular?</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Es un modelo económico donde los materiales <strong>nunca se desperdician</strong>, sino que 
                    circulan continuamente a través de diferentes usos. A diferencia del modelo tradicional 
                    (extraer → fabricar → usar → tirar), el modelo circular crea un <strong>ciclo cerrado</strong> 
                    donde todo se recupera y reutiliza.
                  </p>
                </div>
              </div>

              {/* Comparación Visual */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Modelo Lineal (Tradicional) */}
                <div className="bg-white/80 rounded-lg p-5 border border-red-200">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
                      <span className="text-white text-lg">✕</span>
                    </div>
                    <h4 className="font-bold text-slate-800">Modelo Lineal (Tradicional)</h4>
                  </div>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">1️⃣</span>
                      <span>Extraer materias primas vírgenes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">2️⃣</span>
                      <span>Fabricar productos nuevos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">3️⃣</span>
                      <span>Usar el edificio 20-30 años</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">4️⃣</span>
                      <span><strong>Demoler y tirar todo a la basura</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">5️⃣</span>
                      <span>Repetir desde cero con material virgen</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-red-200">
                      <p className="text-xs text-red-600 font-semibold">
                        ❌ Alto desperdicio | ❌ Alta contaminación | ❌ Costos repetidos
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modelo Circular (DEMS-Mexalit) */}
                <div className="bg-white/80 rounded-lg p-5 border-2 border-green-300">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                      <span className="text-white text-lg">♻️</span>
                    </div>
                    <h4 className="font-bold text-slate-800">Modelo Circular (<StyledText className="inline" />-Mexalit)</h4>
                  </div>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">1️⃣</span>
                      <span><strong>Mexalit</strong> fabrica paneles con 75% aluminio reciclado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">2️⃣</span>
                      <span><strong><StyledText className="inline" /></strong> construye el edificio modular</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">3️⃣</span>
                      <span>Usar el edificio 35+ años (adaptable)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">4️⃣</span>
                      <span><strong>Desmontar sin destruir (92% recuperación)</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">5️⃣</span>
                      <span>Banco de Materiales cataloga y reutiliza 78%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">🔄</span>
                      <span className="font-semibold text-green-700">Los materiales vuelven a construir otro edificio</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <p className="text-xs text-green-600 font-semibold">
                        ✅ Cero desperdicio | ✅ Menos CO₂ | ✅ Ahorro en cada ciclo
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ¿Por qué es importante? */}
              <div className="bg-white/80 rounded-lg p-5 space-y-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  ¿Por qué es Importante?
                </h4>
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="font-semibold text-slate-800">Ahorro Económico</p>
                    <p className="text-xs text-slate-600">
                      Cada vez que reutilizas materiales, ahorras el costo de producir nuevos. 
                      Un panel de Mexalit puede usarse <strong>3-5 veces</strong>, multiplicando su valor.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-teal-600" />
                    </div>
                    <p className="font-semibold text-slate-800">Impacto Ambiental</p>
                    <p className="text-xs text-slate-600">
                      La construcción genera <strong>40% de residuos globales</strong>. Con este modelo, 
                      evitas demoliciones contaminantes y reduces emisiones de CO₂ hasta 60%.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="font-semibold text-slate-800">Velocidad</p>
                    <p className="text-xs text-slate-600">
                      Como los materiales están diseñados para <strong>desmontarse fácilmente</strong>, 
                      puedes recuperar un edificio en días (vs meses de demolición tradicional).
                    </p>
                  </div>
                </div>
              </div>

              {/* Cómo funciona este simulador */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 border border-indigo-200">
                <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <span className="text-2xl">🔬</span>
                  ¿Qué Hace Este Simulador?
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  Te permite <strong>experimentar con diferentes escalas de proyecto</strong> (desde 500 hasta 20,000 m²) 
                  y ver cómo cambian los números cuando los materiales circulan <strong>1, 2, 3, 4 o 5 veces</strong>.
                </p>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <p><strong>Mueves los sliders</strong> y los cálculos se actualizan en tiempo real</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <p><strong>Ves el ahorro acumulado</strong> de recuperar y reusar materiales múltiples veces</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <p><strong>Comparas reducción de CO₂</strong> vs construir con materiales vírgenes cada vez</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <p><strong>Entiendes el flujo completo</strong>: desde Mexalit → DEMS → Usuario → Recuperación → Banco de Materiales → vuelve a empezar</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Controles de Simulación */}
            <motion.div 
              className="bg-white/70 backdrop-blur-xl rounded-xl shadow-lg p-6 lg:p-8 border border-indigo-500/20 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Parámetros de Simulación</h2>
                <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                  Ajusta y ve los resultados en tiempo real ⚡
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <label className="text-base font-medium text-slate-700 block mb-1">
                      Escala del Proyecto: <span className="text-indigo-600 font-bold">{escalaProyecto[0].toLocaleString()} m²</span>
                    </label>
                    <p className="text-xs text-slate-500">Superficie total a construir con el sistema modular</p>
                  </div>
                </div>
                <Slider 
                  value={escalaProyecto}
                  onValueChange={setEscalaProyecto}
                  min={500}
                  max={20000}
                  step={500}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>500 m²</span>
                  <span>20,000 m²</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <label className="text-base font-medium text-slate-700 block mb-1">
                      Ciclos de Vida Simulados: <span className="text-indigo-600 font-bold">{vidasUtilSimuladas[0]}</span>
                    </label>
                    <p className="text-xs text-slate-500">Número de veces que el material circula (construcción → uso → recuperación → reuso)</p>
                  </div>
                </div>
                <Slider 
                  value={vidasUtilSimuladas}
                  onValueChange={setVidasUtilSimuladas}
                  min={1}
                  max={5}
                  step={1}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>1 ciclo (lineal)</span>
                  <span>5 ciclos (máximo circular)</span>
                </div>
              </div>
            </motion.div>

            {/* KPIs Principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-600">Ahorro vs Lineal</p>
                  <p className="text-2xl font-bold text-slate-800">
                    ${Math.round(metricas.costos.ahorro).toLocaleString('es-MX')}
                  </p>
                  <p className="text-xs text-slate-500">Por recuperación y reuso de materiales</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-600">Tiempo por Ciclo</p>
                  <p className="text-2xl font-bold text-slate-800">{metricas.tiempos.totalPorCiclo} días</p>
                  <p className="text-xs text-slate-500">Fabricación + construcción + desmontaje</p>
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
                  <p className="text-sm font-medium text-slate-600">Reducción CO₂</p>
                  <p className="text-2xl font-bold text-slate-800">{metricas.ambiental.reduccion.toFixed(1)}%</p>
                  <p className="text-xs text-slate-500">vs construcción tradicional lineal</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-600">Circularidad</p>
                  <p className="text-2xl font-bold text-slate-800">{metricas.circular.tasaCircularidad.toFixed(1)}%</p>
                  <p className="text-xs text-slate-500">Material reusado vs total usado</p>
                </div>
              </motion.div>
            </div>

            {/* Etapas Detalladas */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <h2 className="text-2xl font-semibold text-slate-800">Etapas del Ecosistema</h2>
              
              {etapasData.map((etapa, index) => {
                const Icon = etapa.icon;
                const isExpanded = etapaExpandida === etapa.id;
                
                // Calcular métricas específicas de la etapa
                const tiempoEtapa = etapa.tiempo.min === etapa.tiempo.max 
                  ? "Proceso continuo" 
                  : `${etapa.tiempo.min}-${etapa.tiempo.max} días`;
                
                const costoEtapa = (() => {
                  switch(etapa.id) {
                    case 1: return metricas.costos.fabricacion;
                    case 2: return metricas.costos.logistica;
                    case 3: return metricas.costos.construccion;
                    case 4: return metricas.costos.operacion;
                    case 5: return metricas.costos.desmontaje;
                    case 6: return metricas.costos.creditoReuso;
                    default: return 0;
                  }
                })();

                return (
                  <motion.div
                    key={etapa.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + (index * 0.1) }}
                    className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <button
                      onClick={() => setEtapaExpandida(isExpanded ? null : etapa.id)}
                      className="w-full p-6 text-left flex items-center gap-4 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${etapa.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-slate-800 mb-1">
                          {etapa.etapa.includes("dems") || etapa.etapa.includes("DEMS") ? (
                            <>
                              {etapa.etapa.split("DEMS")[0]}
                              <StyledText className="inline" />
                              {etapa.etapa.split("DEMS")[1]}
                            </>
                          ) : (
                            etapa.etapa
                          )}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-xs text-slate-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {tiempoEtapa}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            ${Math.abs(Math.round(costoEtapa)).toLocaleString('es-MX')}
                          </span>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-slate-200/50"
                        >
                          <div className="p-6 space-y-6">
                            {/* Actores */}
                            <div>
                              <h4 className="text-sm font-semibold text-slate-700 mb-3">Actores Involucrados</h4>
                              <div className="flex flex-wrap gap-2">
                                {etapa.actores.map((actor, i) => (
                                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                                    {actor.includes("DEMS") ? (
                                      <>
                                        {actor.split("DEMS")[0]}
                                        <StyledText className="inline" />
                                        {actor.split("DEMS")[1]}
                                      </>
                                    ) : (
                                      actor
                                    )}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Procesos */}
                            <div>
                              <h4 className="text-sm font-semibold text-slate-700 mb-3">Procesos Clave</h4>
                              <ul className="space-y-2">
                                {etapa.procesos.map((proceso, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
                                    {proceso.includes("DEMS") ? (
                                      <>
                                        {proceso.split("DEMS")[0]}
                                        <StyledText className="inline" />
                                        {proceso.split("DEMS")[1]}
                                      </>
                                    ) : (
                                      proceso
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Impacto */}
                            <div>
                              <h4 className="text-sm font-semibold text-slate-700 mb-3">Indicadores de Impacto</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {Object.entries(etapa.impacto).map(([key, value], i) => (
                                  <div key={i} className="p-3 bg-slate-50 rounded-lg">
                                    <p className="text-xs text-slate-500 mb-1 capitalize">
                                      {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </p>
                                    <p className="text-lg font-bold text-slate-800">
                                      {typeof value === 'number' ? (
                                        value >= 1000 ? value.toLocaleString() : value
                                      ) : value}
                                      {typeof value === 'number' && key.toLowerCase().includes('porcentaje') === false && '%'}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Resumen de Valor Circular */}
            <motion.div 
              className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-xl p-6 lg:p-8 text-white space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">Valor Generado por el Ecosistema Circular</h2>
                <p className="text-indigo-100 text-sm">
                  Resumen del impacto económico y ambiental con los parámetros seleccionados
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-indigo-100 text-sm font-medium">Material en Circulación</p>
                  <p className="text-3xl font-bold">{metricas.circular.materialReusado.toLocaleString()} m²</p>
                  <p className="text-xs text-indigo-100">Recuperado y reintegrado al ciclo</p>
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <p className="text-xs text-white/90">
                      💡 <strong>Ejemplo:</strong> {vidasUtilSimuladas[0] > 1 ? `Con solo ${escalaProyecto[0].toLocaleString()} m² de material nuevo, construiste efectivamente ${(escalaProyecto[0] * vidasUtilSimuladas[0]).toLocaleString()} m² de edificios` : 'Aumenta los ciclos para ver el efecto multiplicador'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-indigo-100 text-sm font-medium">Valor Económico Preservado</p>
                  <p className="text-3xl font-bold">${Math.round(metricas.circular.materialReusado * 180).toLocaleString('es-MX')}</p>
                  <p className="text-xs text-indigo-100">En materiales que evitan producción nueva</p>
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <p className="text-xs text-white/90">
                      💡 <strong>Ejemplo:</strong> Si tuvieras que comprar paneles nuevos de Mexalit cada vez, gastarías esto. Al reusar, ese dinero se ahorra.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-indigo-100 text-sm font-medium">CO₂ Total Evitado</p>
                  <p className="text-3xl font-bold">{(metricas.ambiental.co2Tradicional - metricas.ambiental.co2Total).toFixed(1)} ton</p>
                  <p className="text-xs text-indigo-100">Por {vidasUtilSimuladas[0]} ciclo(s) completo(s)</p>
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <p className="text-xs text-white/90">
                      💡 <strong>Equivale a:</strong> Plantar {Math.round((metricas.ambiental.co2Tradicional - metricas.ambiental.co2Total) * 45).toLocaleString()} árboles o sacar {Math.round((metricas.ambiental.co2Tradicional - metricas.ambiental.co2Total) / 4.6)} autos de la circulación por un año
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparación directa */}
              <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm">
                <h3 className="font-bold text-lg mb-4">📊 Comparación: Lineal vs Circular</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="text-indigo-200 font-semibold">❌ Si fuera Modelo Lineal:</p>
                    <ul className="space-y-1.5 text-indigo-100">
                      <li>• Material usado 1 sola vez → {escalaProyecto[0].toLocaleString()} m²</li>
                      <li>• Costo total: ${Math.round(metricas.costos.total + metricas.costos.ahorro).toLocaleString('es-MX')}</li>
                      <li>• CO₂ emitido: {metricas.ambiental.co2Tradicional.toFixed(1)} ton</li>
                      <li>• Residuos al final: {(escalaProyecto[0] * 0.25).toFixed(1)} ton</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white font-semibold">✅ Con Modelo Circular:</p>
                    <ul className="space-y-1.5 text-white/90">
                      <li>• Material reutilizado: {metricas.circular.materialReusado.toLocaleString()} m²</li>
                      <li>• Costo real: ${Math.round(metricas.costos.total).toLocaleString('es-MX')} <span className="text-green-300 font-bold">(Ahorro: ${Math.round(metricas.costos.ahorro).toLocaleString('es-MX')})</span></li>
                      <li>• CO₂ emitido: {metricas.ambiental.co2Total.toFixed(1)} ton <span className="text-green-300 font-bold">({metricas.ambiental.reduccion.toFixed(1)}% menos)</span></li>
                      <li>• Residuos al final: {(escalaProyecto[0] * 0.02).toFixed(1)} ton <span className="text-green-300 font-bold">(92% menos)</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="text-center pt-4">
                <p className="text-sm text-indigo-100">
                  🔄 <strong>Prueba ajustando los ciclos a 5</strong> para ver cómo el valor se multiplica exponencialmente
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Cadena;
