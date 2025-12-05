import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Database, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StyledText from "@/components/StyledText";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/home", label: "Inicio" },
    { to: "/dataroom/simulador", label: "Simulador" },
    { to: "/dataroom/esg", label: "ESG" },
    { to: "/dataroom/proyectos", label: "Proyectos" },
    { to: "/dataroom/cadena", label: "Cadena" },
    { to: "/dataroom/materiales", label: "Materiales" },
    { to: "/dataroom", label: "Dataroom", highlight: true },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="border-b border-blue-500/20 bg-card/40 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/home" 
            className="flex items-center gap-2 text-base sm:text-lg font-semibold text-foreground hover:text-blue-500 transition-colors duration-300 group z-50"
            onClick={closeMobileMenu}
          >
            <Database className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
            <span className="hidden xs:inline">
              <StyledText /> Data Room
            </span>
            <span className="inline xs:hidden">
              <StyledText />
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  link.highlight
                    ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border border-blue-500/30"
                    : location.pathname === link.to
                    ? "bg-blue-500/10 text-blue-600"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors z-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-64 bg-white/95 backdrop-blur-xl border-l border-slate-200 shadow-2xl z-40 md:hidden"
            >
              <nav className="flex flex-col p-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      onClick={closeMobileMenu}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        link.highlight
                          ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border border-blue-500/30"
                          : location.pathname === link.to
                          ? "bg-blue-500/10 text-blue-600"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-50/50">
                <div className="text-xs text-slate-500 text-center">
                  <p className="font-medium mb-1">
                    <StyledText className="text-xs inline" />
                  </p>
                  <p>© 2025 Construcción Modular</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
