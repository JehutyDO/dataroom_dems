import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const IntroRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, hasSeenIntro } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (hasSeenIntro) {
    return <Navigate to="/dataroom" replace />;
  }

  return <>{children}</>;
};

export const DataroomRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, hasSeenIntro } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!hasSeenIntro) {
    return <Navigate to="/intro-slides" replace />;
  }

  return <>{children}</>;
};
