'use client'
import { useState } from 'react'
import { formLoginTypes } from './useAuth.d'
interface useAuthProps {
  handleLogin: (formLogin: formLoginTypes) => void
  error: string | null
  handleLogout: () => void
}

export const useAuth = (): useAuthProps => {
  const [error, setError] = useState<string | null>(null)
  const handleLogin = async (formLogin: formLoginTypes) => {
    console.log(formLogin)
  }
  const handleLogout = () => {}

  return {
    handleLogin,
    error,
    handleLogout,
  }
}
