# Sistema de Autenticación y Dataroom - dems ECO

Sistema completo de login, onboarding y acceso al dataroom seguro de **dems ECO**.

## 🔐 Flujo de Autenticación

```
┌─────────────┐
│   Login     │  ← Credenciales: admin / 1234
│  /login     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Intro Slides│  ← 4 slides de introducción
│/intro-slides│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Dataroom   │  ← Panel principal con categorías
│ /dataroom   │
└─────────────┘
```

## 📱 Páginas del Sistema

### 1. **Login** (`/login`)
- **Diseño**: Glassmorphism con patrón geométrico de fondo
- **Credenciales válidas**:
  - Usuario: `admin`
  - Contraseña: `1234`
- **Características**:
  - Inputs minimalistas con iconos (User, Lock)
  - Validación en tiempo real
  - Mensaje de error discreto
  - Animaciones suaves con Framer Motion
  - Fondo con degradados y elementos decorativos animados

### 2. **Intro Slides** (`/intro-slides`)
Onboarding con 4 slides informativos:

**Slide 1 - ¿Qué es un Dataroom?**
- Explicación del concepto de dataroom
- Ícono: Database

**Slide 2 - ¿Qué encontrarás aquí?**
- Lista de 8 categorías de contenido
- Grid de 2 columnas
- Ícono: FileText

**Slide 3 - Propósito del Dataroom**
- Objetivo y beneficios
- Ícono: Target

**Slide 4 - Navegación y experiencia**
- Instrucciones de uso
- Botón final: "Ir al Dataroom →"
- Ícono: Compass

**Navegación:**
- Flechas anterior/siguiente
- Indicadores de puntos (dots)
- Contador "X de 4"

### 3. **Dataroom** (`/dataroom`)
Panel principal del sistema:

**Header:**
- Logo dems ECO
- Botón "Cerrar Sesión" (vuelve a /login)
- Menú hamburguesa en móvil

**Sidebar (7 categorías):**
1. 🏠 Inicio
2. 💼 Modelos de Negocio
3. 📄 Documentación Técnica
4. 🏢 Arquitectura Modular
5. ♻️ Economía Circular
6. 🤝 Alianzas
7. 📁 Archivos PDF

**Contenido Principal:**
- Página de inicio con estadísticas:
  - 150+ Documentos
  - 7 Categorías
  - Actualizado: Hoy
- 4 tarjetas informativas (Acceso Seguro, Actualización, Búsqueda, Soporte)
- Placeholders para contenido de categorías

## 🎨 Sistema de Diseño

### Colores
```css
/* Primarios */
--blue-light: #4A90E2
--blue-deep: #0A3D62
--slate-warm: #f8fafc → #f1f5f9

/* Fondos */
bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100
```

### Tipografía
- **Marca**: Conthrax SemiBold (StyledText component)
- **UI**: Inter (sistema)
- **Pesos**: Light (300), Medium (500), Semibold (600)

### Efectos
- **Glassmorphism**: `bg-white/70 backdrop-blur-xl`
- **Sombras**: `shadow-2xl shadow-slate-200/50`
- **Bordes**: `border border-slate-200/50 rounded-2xl`
- **Patrones**: Grid SVG con opacidad muy baja (0.01-0.02)

### Animaciones (Framer Motion)
```tsx
// Entrada de elementos
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Orbes decorativos
animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
transition={{ duration: 8, repeat: Infinity }}

// Hover en inputs
animate={{ scale: focused ? 1.02 : 1 }}
```

## 🔒 Protección de Rutas

### AuthContext
Gestiona el estado de autenticación:
```tsx
interface AuthContextType {
  isAuthenticated: boolean;
  hasSeenIntro: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  completeIntro: () => void;
}
```

### Route Guards
- **IntroRoute**: Requiere login, redirige si ya vio intro
- **DataroomRoute**: Requiere login + haber visto intro
- **Login público**: Redirige a /dataroom si ya está autenticado

## 🚀 Uso

### Credenciales de Acceso
```
Usuario: admin
Contraseña: 1234
```

### Navegación
1. Ir a `/` o `/login`
2. Ingresar credenciales
3. Ver los 4 slides de introducción
4. Acceder al Dataroom
5. Explorar categorías
6. Cerrar sesión cuando termine

## 📂 Estructura de Archivos

```
src/
├── contexts/
│   └── AuthContext.tsx          # Estado de autenticación
├── pages/
│   ├── Login.tsx                # Pantalla de login
│   ├── IntroSlides.tsx          # Slides de onboarding
│   └── Dataroom.tsx             # Panel principal
├── components/
│   ├── ProtectedRoute.tsx       # Guards de rutas
│   └── StyledText.tsx           # Componente de marca "dems"
└── App.tsx                      # Configuración de rutas
```

## 🎯 Características Implementadas

✅ Login con validación de credenciales (admin/1234)  
✅ Glassmorphism y diseño minimalista premium  
✅ 4 slides de introducción con navegación interactiva  
✅ Dataroom con sidebar responsive y 7 categorías  
✅ Protección de rutas con AuthContext  
✅ Animaciones fluidas con Framer Motion  
✅ Patrones geométricos de fondo arquitectónicos  
✅ Responsive completo (mobile, tablet, desktop)  
✅ Botón de cerrar sesión funcional  
✅ Redirección automática según estado de auth  

## 🎨 Inspiración de Diseño

- **Estilo**: Arquitectura modular high-end
- **Referencias**: Construcción modular, materiales claros, líneas finas
- **Sensación**: Premium, ordenado, profesional, seguro
- **Paleta**: Blancos cálidos, grises suaves, azules tenues

## 🔧 Configuración Técnica

```bash
# Dependencias ya instaladas
- react-router-dom (navegación)
- framer-motion (animaciones)
- lucide-react (iconos)
- shadcn/ui (componentes)

# No se requieren instalaciones adicionales
```

## 📝 Notas de Desarrollo

- El sistema usa **localStorage** implícito vía React state
- Para persistencia entre recargas, implementar localStorage en AuthContext
- Las categorías del dataroom son placeholders, listas para conectar con backend
- Los íconos son de `lucide-react` (outline style)
- Todos los efectos glassmorphism usan `backdrop-blur-xl`

## 🌐 Rutas Disponibles

| Ruta | Descripción | Requiere Auth |
|------|-------------|---------------|
| `/login` | Pantalla de login | No |
| `/intro-slides` | Slides de introducción | Sí (sin intro vista) |
| `/dataroom` | Panel principal | Sí (con intro vista) |
| `/` | Redirige a `/login` | No |
| `/home` | Demo original (HomePage) | No |
| `/simulador` | Demo simulador | No |
| Otras... | Demos originales | No |

---

**Hecho con ⚡ por el equipo dems usando React + TypeScript + Framer Motion**
