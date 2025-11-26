import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  FileText, 
  Building, 
  Recycle, 
  Handshake, 
  File, 
  LogOut,
  Menu,
  X,
  Gauge,
  Database,
  Workflow,
  FolderKanban,
  LayoutDashboard,
  ArrowLeft,
  Layers,
  Compass,
  Shield,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Lock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import StyledText from '../components/StyledText';
import { cn } from '../lib/utils';
import Simulador from './Simulador';
import CalculadoraESG from './CalculadoraESG';
import Proyectos from './Proyectos';
import Materiales from './Materiales';
import Cadena from './Cadena';

// Carrusel Component
const CarouselSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      icon: FolderKanban,
      color: 'from-blue-500 to-blue-600',
      title: '¿Qué es un Dataroom?',
      description: 'Un dataroom es un espacio digital seguro donde se concentra información clave para análisis, toma de decisiones y evaluación de proyectos. Aquí encontrarás documentación técnica, modelos financieros, simuladores, cadenas de valor y módulos interactivos.'
    },
    {
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      title: '¿Por qué es importante?',
      description: 'Permite evaluar rápida y cuidadosamente los componentes críticos de un proyecto: costo, tiempo, materiales, emisiones, eficiencia, riesgos y oportunidades. Todo en un solo lugar y actualizado en tiempo real.'
    },
    {
      icon: LayoutDashboard,
      color: 'from-purple-500 to-purple-600',
      title: 'Contenido del Dataroom DEMS',
      description: 'Arquitectura modular • Materiales y sistemas constructivos • Economía circular • Documentación técnica • Alianzas DEMS–Mexalit–Cempanel • Módulos interactivos (Simulador, ESG, Materiales)'
    },
    {
      icon: Compass,
      color: 'from-teal-500 to-teal-600',
      title: 'Cómo navegarlo',
      description: 'Usa el menú lateral para explorar las distintas categorías. Cada módulo interactivo se abre dentro de la misma vista. Puedes regresar a "Inicio" en cualquier momento para orientación general.'
    },
    {
      icon: Lock,
      color: 'from-indigo-500 to-indigo-600',
      title: 'Seguridad y Confidencialidad',
      description: 'Toda la información está protegida con cifrado de extremo a extremo. Acceso controlado por roles y auditoría completa de todas las acciones. Cumplimos con los estándares internacionales de protección de datos.'
    }
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      const next = prev + newDirection;
      if (next < 0) return slides.length - 1;
      if (next >= slides.length) return 0;
      return next;
    });
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Carrusel Container */}
      <div className="relative h-[420px] md:h-[380px] overflow-hidden rounded-[28px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 250, damping: 35 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full cursor-grab active:cursor-grabbing group/card"
          >
            <div className="bg-gradient-to-br from-white/95 to-blue-50/70 backdrop-blur-xl border-2 border-blue-500/20 rounded-[28px] p-8 md:p-12 lg:p-14 shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col justify-center transition-shadow duration-300">
              <motion.div 
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${slides[currentSlide].color} flex items-center justify-center mb-6 shadow-lg shadow-${slides[currentSlide].color.split('-')[1]}-500/30`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.1 
                }}
              >
                <CurrentIcon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 md:mb-5 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p 
                className="text-slate-700 text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {slides[currentSlide].description}
              </motion.p>
            </div>
            
            {/* Navigation Arrows - Solo visibles en hover */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-300/80 hover:border-blue-400 hover:bg-white flex items-center justify-center transition-all shadow-lg hover:shadow-xl z-10 opacity-0 group-hover/card:opacity-100"
              whileHover={{ scale: 1.15, x: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5 text-slate-700 group-hover:text-blue-600 transition-colors" />
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-300/80 hover:border-blue-400 hover:bg-white flex items-center justify-center transition-all shadow-lg hover:shadow-xl z-10 opacity-0 group-hover/card:opacity-100"
              whileHover={{ scale: 1.15, x: 3 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-blue-600 transition-colors" />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className="relative group"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={cn(
              "rounded-full transition-all duration-300",
              index === currentSlide
                ? "w-10 h-2.5 bg-gradient-to-r from-blue-500 to-blue-600 shadow-md shadow-blue-500/30"
                : "w-2.5 h-2.5 bg-slate-300 group-hover:bg-slate-400"
            )} />
          </motion.button>
        ))}
      </div>

      {/* Counter con estilo mejorado */}
      <motion.div 
        className="text-center mt-3 text-xs text-slate-400 font-medium tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span className="text-blue-600 font-bold">{currentSlide + 1}</span>
        <span className="mx-1.5">/</span>
        <span>{slides.length}</span>
      </motion.div>
    </div>
  );
};

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  isExternal?: boolean;
  externalPath?: string;
}

const categories: Category[] = [
  { id: 'home', name: 'Inicio', icon: <Home className="w-5 h-5" /> },
  { id: 'demos', name: 'Módulos Interactivos', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'business', name: 'Modelos de Negocio', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'technical', name: 'Documentación Técnica', icon: <FileText className="w-5 h-5" /> },
  { id: 'architecture', name: 'Arquitectura Modular', icon: <Building className="w-5 h-5" /> },
  { id: 'circular', name: 'Economía Circular', icon: <Recycle className="w-5 h-5" /> },
  { id: 'partnerships', name: 'Alianzas', icon: <Handshake className="w-5 h-5" /> },
  { id: 'pdfs', name: 'Archivos PDF', icon: <File className="w-5 h-5" /> },
];

const Dataroom = () => {
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedModule(null); // Reset module when changing category
    setSidebarOpen(false); // Cerrar sidebar en mobile al seleccionar
  };

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId);
    // Scroll to top when opening a module
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToModules = () => {
    console.log('🔙 Volver a Módulos clicked');
    setSelectedModule(null);
    setSelectedCategory('demos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/10 to-slate-100">
      {/* Pattern Background */}
      <div className="fixed inset-0 opacity-[0.01]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dataroom-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#0A3D62" strokeWidth="0.5"/>
              <circle cx="0" cy="0" r="1" fill="#0A3D62" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dataroom-grid)" />
        </svg>
      </div>

      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo with Hamburger */}
          <div className="flex items-center gap-3">
            {/* Hamburger Menu - Visible on mobile and tablet */}
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: sidebarOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {sidebarOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
              </motion.div>
            </motion.button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <StyledText variant="default" className="text-xl sm:text-2xl" />
            </div>
            <div className="hidden sm:block h-6 w-px bg-slate-300" />
            <span className="hidden sm:block text-sm text-slate-500 font-light">Dataroom</span>
          </div>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Cerrar Sesión</span>
          </Button>
        </div>
      </motion.header>

      <div className="flex pt-16 min-h-screen">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "hidden lg:block sticky top-16 h-[calc(100vh-4rem)] bg-white/60 backdrop-blur-xl border-r border-slate-200/50 transition-all duration-300 flex-shrink-0",
            sidebarCollapsed ? "w-20" : "w-64 xl:w-72"
          )}
        >
          {/* Toggle Collapse Button */}
          <div className="p-4 border-b border-slate-200/50">
            <motion.button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Menu className="w-4 h-4" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Colapsar</span>}
            </motion.button>
          </div>

          <nav className="p-4 space-y-1 h-[calc(100%-10rem)] overflow-y-auto">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={cn(
                  "w-full flex items-center rounded-xl text-left transition-all duration-200 relative group",
                  sidebarCollapsed ? "gap-0 px-3 py-3 justify-center" : "gap-3 px-4 py-3",
                  selectedCategory === category.id
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {category.icon}
                {!sidebarCollapsed && (
                  <span className="font-medium text-sm">{category.name}</span>
                )}
                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <span className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
                    {category.name}
                  </span>
                )}
              </motion.button>
            ))}
          </nav>

          {/* Desktop Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200/50 bg-white/60">
            {!sidebarCollapsed ? (
              <div className="text-xs text-slate-400 text-center">
                <p className="font-medium mb-1">Dataroom Seguro</p>
                <p>© 2025 <StyledText variant="default" className="text-xs inline" /></p>
              </div>
            ) : (
              <div className="text-xs text-slate-400 text-center">
                <p className="text-2xl">🔒</p>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
              />

              {/* Sidebar Panel */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-16 left-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl border-r border-slate-200/50 shadow-2xl z-40 lg:hidden"
              >
                <nav className="p-4 space-y-1 h-[calc(100%-5rem)] overflow-y-auto">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                        selectedCategory === category.id
                          ? "bg-blue-50 text-blue-600 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {category.icon}
                      <span className="font-medium text-sm">{category.name}</span>
                    </motion.button>
                  ))}
                </nav>

                {/* Mobile Sidebar Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200/50 bg-slate-50/50">
                  <div className="text-xs text-slate-400 text-center">
                    <p className="font-medium mb-1">Dataroom Seguro</p>
                    <p>© 2025 <StyledText variant="default" className="text-xs inline" /></p>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={cn(
          "flex-1 w-full transition-all duration-300 overflow-x-hidden",
          sidebarCollapsed ? "p-6 xl:p-10" : "p-6 lg:p-8 xl:p-10"
        )}>
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {selectedCategory === 'home' ? (
              <div className="w-full max-w-7xl mx-auto space-y-12">
                {/* Hero Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 lg:p-12 shadow-2xl"
                >
                  {/* Patrón arquitectónico de fondo */}
                  <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0A3D62" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#hero-grid)" />
                    </svg>
                  </div>
                  
                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
                    >
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Dataroom Seguro</span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4"
                    >
                      Bienvenido al Dataroom{' '}
                      <StyledText variant="gradient" className="text-4xl md:text-5xl lg:text-6xl inline" />
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed"
                    >
                      Una plataforma segura y centralizada para explorar decisiones técnicas, 
                      financieras y sustentables.
                    </motion.p>
                  </div>
                </motion.div>

                {/* Carrusel de Tarjetas Explicativas */}
                <CarouselSection />

                {/* Puntos Clave - KPIs */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    <h2 className="text-lg font-semibold text-slate-700">Puntos Clave</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Documentos', value: '150+', icon: FileText },
                      { label: 'Categorías', value: '8', icon: Layers },
                      { label: 'Módulos', value: '5', icon: LayoutDashboard },
                      { label: 'Actualizado', value: 'Hoy', icon: Database },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.0 + index * 0.1 }}
                        className="bg-gradient-to-br from-blue-50 to-white border border-blue-500/20 rounded-xl p-6 text-center hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : selectedCategory === 'demos' ? (
              // Módulos Interactivos Section
              <div className="w-full">
                {selectedModule ? (
                  // Show selected module component
                  <div className="w-full">
                    <div className="mb-8 relative z-10">
                      <button
                        onClick={handleBackToModules}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-blue-50 border-2 border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium cursor-pointer active:scale-95"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Volver a Módulos
                      </button>
                    </div>
                    {selectedModule === 'simulador' && <Simulador hideNavbar={true} />}
                    {selectedModule === 'esg' && <CalculadoraESG hideNavbar={true} />}
                    {selectedModule === 'proyectos' && <Proyectos hideNavbar={true} />}
                    {selectedModule === 'materiales' && <Materiales hideNavbar={true} />}
                    {selectedModule === 'cadena' && <Cadena hideNavbar={true} />}
                  </div>
                ) : (
                  // Show modules grid
                  <div className="w-full max-w-[1400px] mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-6 lg:p-8 shadow-lg shadow-slate-200/50 mb-8"
                    >
                      <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-3">
                        Módulos Interactivos
                      </h1>
                      <p className="text-slate-600 text-lg mb-0">
                        Accede a las herramientas de simulación, calculadoras y visualizaciones del ecosistema <StyledText variant="default" className="text-base inline" />.
                      </p>
                    </motion.div>

                    {/* Módulos Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                      {[
                        {
                          title: 'Simulador de Reconversión',
                          description: 'Modifica edificios y observa cambios en costo, tiempo y residuos',
                          icon: <Building className="w-8 h-8" />,
                          id: 'simulador',
                          color: 'from-blue-500 to-blue-600'
                        },
                        {
                          title: 'Calculadora ESG / CO₂',
                          description: 'Calcula emisiones evitadas e impacto ambiental',
                          icon: <Gauge className="w-8 h-8" />,
                          id: 'esg',
                          color: 'from-green-500 to-green-600'
                        },
                        {
                          title: 'Dashboard de Proyectos',
                          description: 'Visualiza proyectos activos y métricas en tiempo real',
                          icon: <FolderKanban className="w-8 h-8" />,
                          id: 'proyectos',
                          color: 'from-purple-500 to-purple-600'
                        },
                        {
                          title: 'Banco de Materiales',
                          description: 'Consulta materiales modulares y su disponibilidad',
                          icon: <Database className="w-8 h-8" />,
                          id: 'materiales',
                          color: 'from-orange-500 to-orange-600'
                        },
                        {
                          title: 'Cadena de Valor Circular',
                          description: 'Visualiza el ecosistema entre DEMS-Mexalit-Cempanel',
                          icon: <Workflow className="w-8 h-8" />,
                          id: 'cadena',
                          color: 'from-teal-500 to-teal-600'
                        },
                      ].map((module, index) => (
                        <motion.button
                          key={module.title}
                          onClick={() => handleModuleClick(module.id)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                          className="group bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 text-left flex flex-col h-full min-h-[280px]"
                        >
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                            {module.icon}
                          </div>
                          <h3 className="font-semibold text-slate-800 mb-3 text-lg leading-tight flex-shrink-0">{module.title}</h3>
                          <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">{module.description}</p>
                          <div className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all flex-shrink-0 mt-auto">
                            Abrir módulo →
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : selectedCategory === 'pdfs' ? (
              // Archivos PDF Section
              <div className="w-full max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-white/80 to-slate-50/50 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-6 lg:p-8 shadow-lg shadow-slate-200/50 mb-8"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-3">
                        Biblioteca de Documentos
                      </h1>
                      <p className="text-slate-600 text-lg">
                        Accede a toda la documentación técnica, comercial y regulatoria de <StyledText variant="default" className="text-base inline" />.
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2">
                        <p className="text-sm font-medium text-blue-700">24 Documentos</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative mt-6">
                    <input
                      type="text"
                      placeholder="Buscar documentos..."
                      className="w-full px-4 py-3 pl-12 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </motion.div>

                {/* PDF Categories Grid */}
                <div className="space-y-8">
                  {/* Categoría 1: Fichas Técnicas */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800">Fichas Técnicas</h2>
                        <p className="text-sm text-slate-500">Especificaciones de materiales y sistemas</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'Ficha Técnica Mexalit', size: '2.4 MB', date: '15 Nov 2024' },
                        { name: 'Ficha Técnica Cempanel', size: '1.8 MB', date: '12 Nov 2024' },
                        { name: 'Sistema de Fachadas Modulares', size: '3.1 MB', date: '08 Nov 2024' },
                        { name: 'Componentes Estructurales', size: '2.9 MB', date: '05 Nov 2024' },
                      ].map((doc, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          className="group bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 text-left"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                              <File className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors truncate">
                                {doc.name}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span>{doc.date}</span>
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Categoría 2: Manuales de Instalación */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800">Manuales de Instalación</h2>
                        <p className="text-sm text-slate-500">Guías paso a paso para implementación</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'Manual de Ensamblaje Modular', size: '5.2 MB', date: '20 Nov 2024' },
                        { name: 'Guía de Instalación Rápida', size: '1.5 MB', date: '18 Nov 2024' },
                        { name: 'Protocolo de Seguridad en Obra', size: '2.1 MB', date: '16 Nov 2024' },
                      ].map((doc, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          className="group bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-4 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1 transition-all duration-300 text-left"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                              <File className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-green-600 transition-colors truncate">
                                {doc.name}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span>{doc.date}</span>
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Categoría 3: Certificaciones */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800">Certificaciones y Normas</h2>
                        <p className="text-sm text-slate-500">Documentos regulatorios y cumplimiento</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'Certificación ISO 9001', size: '1.2 MB', date: '01 Nov 2024' },
                        { name: 'Normas NOM Vigentes', size: '3.8 MB', date: '28 Oct 2024' },
                        { name: 'Certificado de Sustentabilidad', size: '2.3 MB', date: '25 Oct 2024' },
                        { name: 'Ensayos de Laboratorio', size: '4.5 MB', date: '22 Oct 2024' },
                      ].map((doc, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.05 }}
                          className="group bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 text-left"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                              <File className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-purple-600 transition-colors truncate">
                                {doc.name}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span>{doc.date}</span>
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Categoría 4: Casos de Estudio */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800">Casos de Estudio</h2>
                        <p className="text-sm text-slate-500">Proyectos reales implementados</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'Hotel Boutique Playa del Carmen', size: '6.8 MB', date: '10 Nov 2024' },
                        { name: 'Centro Comercial Monterrey', size: '7.2 MB', date: '05 Nov 2024' },
                        { name: 'Residencial Sustentable CDMX', size: '5.9 MB', date: '01 Nov 2024' },
                      ].map((doc, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.05 }}
                          className="group bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-4 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 text-left"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                              <File className="w-6 h-6 text-orange-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-orange-600 transition-colors truncate">
                                {doc.name}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span>{doc.date}</span>
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Categoría 5: Propuestas Comerciales */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                        <Handshake className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800">Propuestas Comerciales</h2>
                        <p className="text-sm text-slate-500">Modelos de negocio y cotizaciones</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'Modelo de Negocio DEMS', size: '3.4 MB', date: '22 Nov 2024' },
                        { name: 'Catálogo de Precios 2025', size: '2.7 MB', date: '20 Nov 2024' },
                        { name: 'Propuesta de Valor Integrada', size: '4.1 MB', date: '18 Nov 2024' },
                        { name: 'Estructura Financiera Proyectos', size: '3.9 MB', date: '15 Nov 2024' },
                      ].map((doc, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.0 + index * 0.05 }}
                          className="group bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-4 hover:shadow-lg hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300 text-left"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                              <File className="w-6 h-6 text-teal-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-teal-600 transition-colors truncate">
                                {doc.name}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span>{doc.date}</span>
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            ) : selectedCategory === 'partnerships' ? (
              // Alianzas Estratégicas Section
              <div className="w-full max-w-7xl mx-auto space-y-12">
                {/* Hero Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 lg:p-12 shadow-2xl"
                >
                  {/* Patrón arquitectónico de fondo */}
                  <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="partnerships-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0A3D62" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#partnerships-grid)" />
                    </svg>
                  </div>
                  
                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
                    >
                      <Handshake className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Ecosistema de Colaboración</span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4"
                    >
                      Alianzas en Acción{' '}
                      <StyledText variant="gradient" className="text-4xl md:text-5xl lg:text-6xl inline" />
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed"
                    >
                      Un ecosistema en construcción de empresas, profesionales y proyectos explorando 
                      nuevas formas de colaborar en la construcción modular sustentable.
                    </motion.p>

                    {/* Mini Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="grid grid-cols-3 gap-4 mt-8"
                    >
                      {[
                        { label: 'Aliados potenciales', value: '3', icon: Handshake },
                        { label: 'Proyectos en exploración', value: '8+', icon: Building },
                        { label: 'Equipos involucrados', value: '30+', icon: TrendingUp },
                      ].map((stat, index) => (
                        <div key={index} className="bg-white/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 text-center">
                          <stat.icon className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                          <div className="text-xs text-slate-600 mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Empresas Aliadas */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    <h2 className="text-xl font-semibold text-slate-700">Empresas del Ecosistema</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        name: 'DEMS',
                        role: 'Diseño, ingeniería y modularidad',
                        color: 'from-blue-500 to-blue-600',
                        projects: 'Proyectos propios',
                        team: '12 profesionales',
                        areas: ['Arquitectura', 'Ingeniería', 'Prefabricación']
                      },
                      {
                        name: 'Mexalit',
                        role: 'Sistemas de fibrocemento',
                        color: 'from-orange-500 to-orange-600',
                        projects: 'Alianza en exploración',
                        team: 'Equipos técnicos',
                        areas: ['Cubiertas', 'Fachadas', 'Manufactura']
                      },
                      {
                        name: 'Cempanel',
                        role: 'Paneles estructurales',
                        color: 'from-teal-500 to-teal-600',
                        projects: 'Colaboración potencial',
                        team: 'Especialistas',
                        areas: ['Sistemas', 'Certificación', 'Instalación']
                      }
                    ].map((company, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="group bg-white/70 backdrop-blur-xl border-2 border-slate-200/50 rounded-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className={`w-full h-20 rounded-lg bg-gradient-to-br ${company.color} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
                          <span className="text-3xl font-bold text-white">{company.name}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">
                          {company.role}
                        </h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Building className="w-4 h-4 text-blue-600" />
                            <span>{company.projects}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span>{company.team}</span>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-200">
                          <p className="text-xs text-slate-500 mb-2 font-medium">Áreas de expertise:</p>
                          <div className="flex flex-wrap gap-2">
                            {company.areas.map((area, i) => (
                              <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Proyectos Colaborativos Activos */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    <h2 className="text-xl font-semibold text-slate-700">Proyectos de Exploración</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      {
                        name: 'Prototipo Hotelero Riviera Maya',
                        location: 'Quintana Roo',
                        status: 'Concepto',
                        partners: ['DEMS'],
                        area: '2,400 m²',
                        progress: 30
                      },
                      {
                        name: 'Modelo Comercial Modular',
                        location: 'Nuevo León',
                        status: 'Planificación',
                        partners: ['DEMS'],
                        area: '5,800 m²',
                        progress: 15
                      },
                      {
                        name: 'Vivienda Sustentable Prototipo',
                        location: 'Ciudad de México',
                        status: 'Diseño',
                        partners: ['DEMS'],
                        area: '3,200 m²',
                        progress: 40
                      },
                      {
                        name: 'Oficinas Modulares Tipo',
                        location: 'Jalisco',
                        status: 'Concepto',
                        partners: ['DEMS'],
                        area: '4,100 m²',
                        progress: 20
                      },
                      {
                        name: 'Campus Educativo Modular',
                        location: 'Puebla',
                        status: 'Planificación',
                        partners: ['DEMS'],
                        area: '6,500 m²',
                        progress: 25
                      },
                      {
                        name: 'Desarrollo Habitacional Demo',
                        location: 'Querétaro',
                        status: 'Diseño',
                        partners: ['DEMS'],
                        area: '1,800 m²',
                        progress: 35
                      },
                    ].map((project, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.0 + index * 0.05 }}
                        className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-800 text-sm mb-1 leading-tight">
                              {project.name}
                            </h3>
                            <p className="text-xs text-slate-500">{project.location}</p>
                          </div>
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ml-2",
                            project.status === 'Completado' && "bg-green-100 text-green-700",
                            project.status === 'En construcción' && "bg-blue-100 text-blue-700",
                            project.status === 'Planificación' && "bg-orange-100 text-orange-700",
                            project.status === 'Diseño' && "bg-purple-100 text-purple-700"
                          )}>
                            {project.status}
                          </span>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <Layers className="w-3.5 h-3.5" />
                            <span>{project.area}</span>
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {project.partners.map((partner, i) => (
                              <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                                {partner}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">Progreso</span>
                            <span className="font-bold text-blue-600">{project.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{ duration: 1, delay: 1.0 + index * 0.05 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Equipo y Miembros */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    <h2 className="text-xl font-semibold text-slate-700">Equipo DEMS y Contactos</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                      { name: 'Arq. María González', role: 'Directora de Diseño', company: 'DEMS', color: 'bg-blue-500' },
                      { name: 'Ing. Carlos Ramírez', role: 'Jefe de Ingeniería', company: 'DEMS', color: 'bg-blue-500' },
                      { name: 'Contacto Técnico', role: 'Representante', company: 'Mexalit', color: 'bg-orange-500' },
                      { name: 'Contacto Comercial', role: 'Enlace', company: 'Cempanel', color: 'bg-teal-500' },
                      { name: 'Ing. Sofia López', role: 'Sustentabilidad', company: 'DEMS', color: 'bg-blue-500' },
                      { name: 'Contacto Industrial', role: 'Manufactura', company: 'Mexalit', color: 'bg-orange-500' },
                      { name: 'Arq. Patricia Ruiz', role: 'Diseño Modular', company: 'DEMS', color: 'bg-blue-500' },
                      { name: 'Contacto Técnico', role: 'Certificaciones', company: 'Cempanel', color: 'bg-teal-500' },
                      { name: 'Téc. Laura Hernández', role: 'Control Calidad', company: 'DEMS', color: 'bg-blue-500' },
                      { name: 'Arq. Diego Fernández', role: 'Prefabricación', company: 'DEMS', color: 'bg-blue-500' },
                    ].map((member, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3 + index * 0.03 }}
                        className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
                      >
                        <div className={cn(
                          "w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg",
                          member.color
                        )}>
                          {member.name.split(' ')[1].charAt(0)}{member.name.split(' ')[2]?.charAt(0) || member.name.split(' ')[1].charAt(1)}
                        </div>
                        <h3 className="font-semibold text-slate-800 text-xs mb-1 leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-xs text-slate-600 mb-2">{member.role}</p>
                        <span className="inline-block text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                          {member.company}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Beneficios Concretos del Ecosistema */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    <h2 className="text-xl font-semibold text-slate-700">Beneficios del Ecosistema</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: TrendingUp, label: 'Eficiencia', value: 'Objetivo', description: 'Reducción en tiempos', color: 'blue' },
                      { icon: Recycle, label: 'Circularidad', value: 'Meta', description: 'Menos residuos en obra', color: 'green' },
                      { icon: Gauge, label: 'Calidad', value: 'Estándar', description: 'Control industrial', color: 'purple' },
                      { icon: Workflow, label: 'Integración', value: '3 empresas', description: 'Ecosistema potencial', color: 'orange' },
                    ].map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 + index * 0.05 }}
                        className="bg-gradient-to-br from-white/80 to-blue-50/30 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center"
                      >
                        <metric.icon className={`w-8 h-8 text-${metric.color}-600 mx-auto mb-3`} />
                        <div className={`text-3xl font-bold text-${metric.color}-600 mb-1`}>{metric.value}</div>
                        <div className="text-sm font-semibold text-slate-800 mb-2">{metric.label}</div>
                        <p className="text-xs text-slate-600">{metric.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Cierre */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="bg-gradient-to-br from-blue-50 to-white border border-blue-500/20 rounded-2xl p-8 lg:p-10 text-center"
                >
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-4">
                    Exploramos alianzas estratégicas para construir un ecosistema más eficiente, 
                    escalable y sustentable.
                  </p>
                  <p className="text-base md:text-lg text-slate-600 font-light">
                    Un modelo de colaboración en desarrollo para la arquitectura del futuro.
                  </p>
                </motion.div>
              </div>
            ) : selectedCategory === 'business' ? (
              // Modelos de Negocio Section
              <div className="w-full max-w-7xl mx-auto space-y-12">
                {/* Hero Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 lg:p-12 shadow-2xl"
                >
                  {/* Patrón arquitectónico de fondo */}
                  <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="business-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0A3D62" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#business-grid)" />
                    </svg>
                  </div>
                  
                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
                    >
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Modelos de Negocio</span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4"
                    >
                      Modelos de Negocio{' '}
                      <StyledText variant="gradient" className="text-4xl md:text-5xl lg:text-6xl inline" />
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed"
                    >
                      Estructuras de valor que definen cómo operamos, construimos y generamos impacto.
                    </motion.p>
                  </div>
                </motion.div>

                {/* Grid de 6 Modelos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Building,
                      title: 'EPC Modular (Diseño + Ingeniería + Construcción)',
                      description: 'Solución llave en mano que integra diseño arquitectónico, ingeniería, fabricación modular y montaje final.',
                      idealFor: 'Industria, turismo, salud, desarrollos institucionales.',
                      benefits: [
                        'Un solo proveedor responsable',
                        'Tiempos más cortos frente a obra tradicional',
                        'Control total de calidad y entrega'
                      ],
                      color: 'from-blue-500 to-blue-600'
                    },
                    {
                      icon: Layers,
                      title: 'Suministro de Sistemas Constructivos (Mexalit / Cempanel)',
                      description: 'Suministro técnico de láminas, paneles y soluciones de fibrocemento para arquitectura ligera.',
                      idealFor: 'Constructoras, desarrolladores y despachos de arquitectura.',
                      benefits: [
                        'Material certificado',
                        'Reducción de desperdicio',
                        'Mayor rendimiento y durabilidad'
                      ],
                      color: 'from-orange-500 to-orange-600'
                    },
                    {
                      icon: FolderKanban,
                      title: 'Arquitectura Modular On Demand',
                      description: 'Fabricación y venta de módulos personalizables para vivienda, comercio, oficinas o turismo.',
                      idealFor: 'Clientes con proyectos por fases o alta urgencia.',
                      benefits: [
                        'Montaje rápido',
                        'Escalabilidad real',
                        'Costos estables'
                      ],
                      color: 'from-purple-500 to-purple-600'
                    },
                    {
                      icon: Workflow,
                      title: 'Reconversión & Retrofit Sustentable',
                      description: 'Transformación de inmuebles existentes con sistemas modulares y materiales de alto desempeño.',
                      idealFor: 'Hoteles, naves industriales, plazas comerciales y oficinas.',
                      benefits: [
                        'Reducción de costos frente a demoler',
                        'Mejora térmica y acústica',
                        'Incremento del ciclo de vida útil'
                      ],
                      color: 'from-teal-500 to-teal-600'
                    },
                    {
                      icon: Gauge,
                      title: 'Servicios de Integración y Mantenimiento',
                      description: 'Servicios post-obra, mantenimiento programado y actualizaciones de módulos.',
                      idealFor: 'Empresas con infraestructura modular o multiproyecto.',
                      benefits: [
                        'Menores costos operativos',
                        'Prevención de fallos',
                        'Mayor vida útil del sistema'
                      ],
                      color: 'from-green-500 to-green-600'
                    },
                    {
                      icon: Recycle,
                      title: 'Economía Circular Aplicada a Materiales',
                      description: 'Programa de reutilización, reacondicionamiento y reintegración de módulos y paneles en nuevos proyectos.',
                      idealFor: 'Clientes con múltiples sedes o ciclos cortos de uso.',
                      benefits: [
                        'Cero residuos',
                        'Ahorros por reutilización',
                        'Alto valor ESG'
                      ],
                      color: 'from-indigo-500 to-indigo-600'
                    }
                  ].map((model, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="group bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300"
                    >
                      {/* Icono */}
                      <motion.div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${model.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        <model.icon className="w-6 h-6 text-white" />
                      </motion.div>

                      {/* Título */}
                      <h3 className="text-lg font-bold text-slate-800 mb-3 leading-tight">
                        {model.title}
                      </h3>

                      {/* Descripción */}
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {model.description}
                      </p>

                      {/* Ideal para */}
                      <div className="mb-4 pb-4 border-b border-slate-200">
                        <p className="text-xs font-semibold text-slate-500 mb-2">Ideal para:</p>
                        <p className="text-xs text-slate-700">
                          {model.idealFor}
                        </p>
                      </div>

                      {/* Beneficios */}
                      <div>
                        <p className="text-xs font-semibold text-slate-500 mb-3">Beneficios clave:</p>
                        <ul className="space-y-2">
                          {model.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Cierre */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="bg-gradient-to-br from-blue-50 to-white border border-blue-500/20 rounded-2xl p-8 lg:p-10 text-center"
                >
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-4">
                    Cada modelo está diseñado para adaptarse a las necesidades específicas de tu proyecto.
                  </p>
                  <p className="text-base md:text-lg text-slate-600 font-light">
                    Contáctanos para evaluar qué estructura de valor se ajusta mejor a tus objetivos.
                  </p>
                </motion.div>
              </div>
            ) : (
              // Other Category Content Placeholder
              <div className="w-full max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-6 lg:p-8 shadow-lg shadow-slate-200/50"
                >
                  <h1 className="text-3xl font-semibold text-slate-800 mb-3">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </h1>
                  <p className="text-slate-600 mb-6">
                    El contenido de esta sección estará disponible próximamente.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="bg-slate-50 border border-slate-200 rounded-lg p-6 hover:border-blue-300 transition-colors"
                      >
                        <div className="w-12 h-12 bg-slate-200 rounded-lg mb-3 animate-pulse" />
                        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2 animate-pulse" />
                        <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dataroom;
