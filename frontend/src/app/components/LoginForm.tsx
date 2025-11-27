'use client'

import { useFormState } from 'react-dom'

type LoginState = { error?: string }

const initialState: LoginState = {}

type Props = {
  action: (prevState: LoginState, formData: FormData) => Promise<LoginState>
  inputClass: string,
  buttonClass: string,
  errorClass: string,
  toastClass: string
}

export function LoginForm({ action, inputClass, buttonClass,errorClass, toastClass }: Props) {

  const [state, formAction] = useFormState<LoginState, FormData>(action, initialState)

  return (
    <>
      {state.error && <p className={`${errorClass} ${toastClass}`} key={state.error}>
      {state.error}</p>}
      <form action={formAction}>
      <input
          type='Email'
          required
          name='Email'
          placeholder='Digite seu email: '
          className={inputClass}
          />
          <input
          type='Password'
          required  
          name='Password'
          placeholder='***************'
          className={inputClass}
          />

          <button type='submit' className={buttonClass}>
            Acessar
          </button>
        </form>
    </>
  )
}