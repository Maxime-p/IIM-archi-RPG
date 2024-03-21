
// This TypeScript file defines a React functional component, `Login`, for the login page of a React application.
// It utilizes several hooks for functionality: useState from React for managing form state, useAuth custom hook
// for authentication logic, useAtom from Jotai for accessing the global user state, and useNavigate from
// 'react-router-dom' for navigation. The component integrates a custom FormInput component for rendering
// input fields. The state of the form is managed using a local state, `loginForm`, initialized with email
// and password fields. If a user is already logged in (determined by the presence of user state from userAtom),
// the user is redirected to the home page. The form submission is handled by `handleSubmit`, which prevents
// the default form submission event and calls the `handleLogin` function from the useAuth hook with the form's
// state. Input changes are managed by `handleInputChange`, which updates the form's state. The form consists
// of two `FormInput` components for email and password, and a submit button. Any authentication errors returned
// by the useAuth hook are displayed below the form.

import React, { FormEvent, useState } from 'react'
import style from './login.module.css'
import FormInput from '../../components/FormInput/FormInput.tsx'
import { useAuth } from '../../hooks/useAuth/useAuth.ts'
import { formLoginTypes } from '../../hooks/useAuth/useAuth.d'
import { useAtom } from 'jotai'
import { userAtom } from '../../hooks/useAuth/userAtom.ts'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {

  /*base hook navigation of React*/
  const navigate = useNavigate()
  /*State for the form login*/
  const [loginForm, setLoginForm] = useState<formLoginTypes>({
    email: '',
    password: '',
  })
    
  /*Check if user is already connected, if already connected we redirect the user on the home page*/
  const [user] = useAtom(userAtom)
  
  if (user) {
    navigate('/')
  }

  /*Import auth hook who contains login function and error message send from api*/
  const { handleLogin, error } = useAuth()

  /*Function on click for the form*/
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    handleLogin(loginForm)
  }

    
  /*Function who setState loginForm onChange of input*/
  const handleInputChange = (name: string, value: string) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <section className={style.container}>
      <aside>
        <h1>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormInput
            type={'email'}
            label={'Email'}
            placeholder={'test@gmail.com'}
            onChange={(value) => handleInputChange('email', value)}
            name={'email'}
          />
          <FormInput
            type={'password'}
            label={'Password'}
            onChange={(value) => handleInputChange('password', value)}
            name={'email'}
          />
          <button type={'submit'}>Login</button>
        </form>
        {error && <p>{error}</p>}
      </aside>
    </section>
  )
}

export default Login
