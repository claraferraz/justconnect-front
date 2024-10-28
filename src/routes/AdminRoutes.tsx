import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useProfileStore } from '../store/profileStore';
import { Role } from '../interface/UserInterface';

interface Props {
  children: ReactNode;
}

export function AdminRoute({ children }: Props) {
  const { role } = useProfileStore();
  if (role === Role.ADMIN) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
}
