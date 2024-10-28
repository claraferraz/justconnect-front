import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface Props {
  children: ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const { token } = useAuthStore();
  if (token) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
}
