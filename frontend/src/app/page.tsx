import styles from './page.module.scss'
import logoImg from '../../public/marcello-pizza-logo-compacto.svg'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/api'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { LoginForm } from './components/LoginForm'

type LoginState = { error?: string }

export default function Home() {

  const initialState: LoginState = { error: undefined }

  async function handleLogin(prevState: LoginState | undefined, formData : FormData){ //Sempre que for função assincrona usamos AWAIT
    "use server"

    const email = formData.get("Email")
    const password =  formData.get("Password")

    if(email === ""|| password === ""){
      return { error: 'Informe o e-mail e a senha.' };
    }

    try {
      
      const response = await api.post("/sessions", {
        email,
        password,
      })

      if(!response.data.token){
        return { error: 'E-mail ou senha inválidos.' };
      }

      console.log(response.data);

      //Salvando o token no cookies para facilitar no acesso do usuario
      const expressTime = 60 * 60 * 24 * 30;
      const cookieStore = await cookies();
      
      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

    }catch (err: any) {
      console.log(err.response?.data); // <-- aqui está o que o backend retornou
      return  { error: 'Email ou senha incorreta.' };
    }
    redirect("/dashboard")
  }

  return (
   <>
    <div className={styles.containerCenter}>
      <Image
       src={logoImg} 
       alt='Logo da Pizzaria' 
       width={500}   // largura em px
      />

      <section className={styles.login}>
          <LoginForm 
          action={handleLogin} 
          inputClass={styles.input}
          buttonClass={styles.button}
          errorClass={styles.error}
          toastClass={styles.toast}
          />
          <Link href='/signup' className={styles.text}>
            Não possui uma conta? Cadastre-se.
          </Link>

      </section>


    </div>
   </>
  );
}
