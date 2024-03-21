import React, { FormEvent, useState } from 'react'
import style from './login.module.css'
import FormInput from '../../components/FormInput/FormInput.tsx'
import { useAuth } from '../../hooks/useAuth/useAuth.ts'
import { formLoginTypes } from '../../hooks/useAuth/useAuth.d'
const Login: React.FC = () => {
  const [loginForm, setLoginForm] = useState<formLoginTypes>({
    email: '',
    password: '',
  })

  const { handleLogin, error } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    handleLogin(loginForm)
  }

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
            type={'text'}
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
