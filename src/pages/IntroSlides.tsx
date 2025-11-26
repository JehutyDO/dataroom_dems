import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Database, FileText, Target, Compass } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import StyledText from '../components/StyledText';

interface Slide {
  id: number;
  title: string;
  content: string | string[];
  icon: React.ReactNode;
  isLastSlide?: boolean;
}

const slides: Slide[] = [
  {
    id: 1,
    title: '¿Qué es un Dataroom?',
    content: 'Un dataroom es un espacio seguro donde se concentran todos los documentos clave, información técnica y material estratégico de un proyecto para evaluar, comparar, decidir y avanzar con claridad.',
    icon: <Database className="w-16 h-16" />,
  },
  {
    id: 2,
    title: '¿Qué encontrarás aquí?',
    content: [
      'Modelos de negocio',
      'Documentación técnica',
      'Planos, renders y layouts',
      'Análisis de economía circular',
      'Propuestas arquitectónicas',
      'Estrategias dems',
      'Alianzas con proveedores',
      'PDFs, imágenes y desgloses críticos',
    ],
    icon: <FileText className="w-16 h-16" />,
  },
  {
    id: 3,
    title: 'Propósito del Dataroom',
    content: 'Proveer información confiable, organizada y actualizada para facilitar decisiones estratégicas entre dems, aliados técnicos, inversionistas y colaboradores clave.',
    icon: <Target className="w-16 h-16" />,
  },
  {
    id: 4,
    title: 'Navegación y experiencia',
    content: 'Explora por categorías, abre cada documento en visualizador, descárgalo o compáralo. La interfaz está diseñada para ser clara, ligera y segura.',
    icon: <Compass className="w-16 h-16" />,
    isLastSlide: true,
  },
];

const IntroSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { completeIntro } = useAuth();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleFinish = () => {
    completeIntro();
    navigate('/dataroom');
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="intro-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="#0A3D62" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#intro-grid)" />
        </svg>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-400/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Logo */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-2">
            <StyledText variant="default" className="text-3xl" />
          </div>
          <p className="text-xs text-slate-400 font-light mt-1 tracking-wider">DATAROOM</p>
        </motion.div>

        {/* Slide Container */}
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-2xl shadow-slate-200/50 p-8 md:p-12"
            >
              {/* Icon */}
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-blue-500/80">
                  {slide.icon}
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2 
                className="text-3xl md:text-4xl font-semibold text-slate-800 text-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {slide.title}
              </motion.h2>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-slate-600 text-center space-y-4"
              >
                {Array.isArray(slide.content) ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
                    {slide.content.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg leading-relaxed max-w-2xl mx-auto">
                    {slide.content}
                  </p>
                )}
              </motion.div>

              {/* Action Button for Last Slide */}
              {slide.isLastSlide && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 flex justify-center"
                >
                  <Button
                    onClick={handleFinish}
                    className="h-12 px-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
                  >
                    Ir al Dataroom →
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between">
            {/* Previous Button */}
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`h-10 px-4 rounded-xl transition-all duration-300 ${
                currentSlide === 0 
                  ? 'opacity-0 pointer-events-none' 
                  : 'opacity-100 bg-white/80 hover:bg-white border border-slate-200 hover:border-blue-500/50 text-slate-700 hover:text-blue-600 shadow-sm hover:shadow-md'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Anterior
            </Button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? 'w-8 h-2 bg-blue-500'
                      : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`h-10 px-4 rounded-xl transition-all duration-200 ${
                currentSlide === slides.length - 1
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30'
              }`}
            >
              Siguiente
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>

          {/* Progress Text */}
          <motion.div 
            className="mt-6 text-center text-sm text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {currentSlide + 1} de {slides.length}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default IntroSlides;
