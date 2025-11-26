import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import StyledText from '../components/StyledText';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);
    if (success) {
      navigate('/intro-slides');
    } else {
      setError('Usuario o contraseña incorrectos');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0A3D62" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Login Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <StyledText variant="default" className="text-4xl" />
            </div>
            <p className="text-sm text-slate-500 font-light tracking-wide">Secure Dataroom Access</p>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-2xl shadow-slate-200/50 p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div className="relative">
                <motion.div
                  animate={{ 
                    scale: focusedField === 'username' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                      focusedField === 'username' ? 'text-blue-500' : 'text-slate-400'
                    }`} />
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Usuario"
                      className="pl-11 h-12 bg-slate-50/50 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                      required
                    />
                  </div>
                </motion.div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <motion.div
                  animate={{ 
                    scale: focusedField === 'password' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                      focusedField === 'password' ? 'text-blue-500' : 'text-slate-400'
                    }`} />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Contraseña"
                      className="pl-11 h-12 bg-slate-50/50 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                      required
                    />
                  </div>
                </motion.div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 text-center bg-red-50 border border-red-100 rounded-lg py-2 px-3"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
              >
                Ingresar al Dataroom
              </Button>
            </form>

            {/* Help Text */}
            <motion.div 
              className="mt-6 text-center text-xs text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Acceso privado · <StyledText variant="default" className="text-xs inline" /> ©
            </motion.div>
          </motion.div>

          {/* Decorative line */}
          <motion.div 
            className="mt-8 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-300"></div>
            <div className="h-1 w-1 rounded-full bg-slate-300"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-slate-300"></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
