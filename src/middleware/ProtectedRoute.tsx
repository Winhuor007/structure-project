import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import type { JSX } from 'react'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = useAuthStore((state) => state.token)
  return token ? children : <Navigate to="/auth/login" replace />
}
