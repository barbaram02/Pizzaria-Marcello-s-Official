import { api } from '@/services/api'
import styles from './page.module.scss'
import logoImg from '/public/marcello-pizza-logo-compacto.svg'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'

export default function Home() {

  async function handleLogin(formData : FormData){ //Sempre que for função assincrona usamos AWAIT
    "use server"

    const email = formData.get("Email")
    const password =  formData.get("Password")

    if(email === ""|| password === ""){
      return;
    }

    try {
      
      const response = await api.post("/sessions", {
        email,
        password,
      })

      if(!response.data.token){
        return;
      }

      console.log(response.data);

      //Salvando o token no cookies para facilitar no acesso do usuario
      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookieStore = await cookies();
      
      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

    }catch (err: any) {
      console.log(err.response?.data); // <-- aqui está o que o backend retornou
      return;
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
        <form action={handleLogin}>
          <input
          type='Email'
          required
          name='Email'
          placeholder='Digite seu email: '
          className={styles.input}
          />
          <input
          type='Password'
          required  
          name='Password'
          placeholder='***************'
          className={styles.input}
          />

          <button type='submit' className={styles.button}>
            Acessar
          </button>
        </form>

          <Link href='/signup' className={styles.text}>
            Não possui uma conta? Cadastre-se.
          </Link>

      </section>


    </div>
   </>
  );
}
