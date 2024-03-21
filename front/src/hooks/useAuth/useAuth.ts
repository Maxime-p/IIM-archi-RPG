// This TypeScript file defines a custom React hook, `useAuth`, for managing authentication state
// in a React application. It utilizes React's `useState` for error state management, the `useNavigate`
// hook from 'react-router-dom' for navigation, and the `useAtom` hook from Jotai for global state management
// of user data. The `useAuth` hook provides two main functions: `handleLogin` for processing login attempts
// and `handleLogout` for clearing the user session. The `handleLogin` function attempts to authenticate a user
// by calling the `postApiLogin` service with the user's credentials. If successful, it stores the user data in
// localStorage and updates the global user state using the `userAtom`. It then navigates to the home page.
// The `handleLogout` function clears the user session from localStorage, resets the global user state, and
// navigates to the login page. The hook returns these functions along with any authentication error messages.

'use client'
import { useState } from 'react'
import { formLoginTypes } from './useAuth.d'
import { postApiLogin } from '../../services/auth/login.ts'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { userAtom } from './userAtom.ts'

interface useAuthProps {
  handleLogin: (formLogin: formLoginTypes) => void
  error: string | null
  handleLogout: () => void
}

export const useAuth = (): useAuthProps => {
  const [error, setError] = useState<string | null>(null)
  const [, setUser] = useAtom(userAtom)
  const navigate = useNavigate()
  const handleLogin = async (loginForm: formLoginTypes) => {
    try {
      setError(null)
      const response = await postApiLogin({
        identifier: loginForm.email,
        password: loginForm.password,
      })
      localStorage.setItem('userData', JSON.stringify(response))
      setUser(response)
      navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  const handleLogout = () => {
    navigate('/login')
    localStorage.clear()
    setUser(null)
  }

  return {
    handleLogin,
    error,
    handleLogout,
  }
}
