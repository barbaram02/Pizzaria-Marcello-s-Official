import Image from "next/image"
import Link from "next/link"
import styles from '../page.module.scss'
import logoImg from '/public/marcello-pizza-logo-compacto.svg'
import {api} from "@/services/api"
import { redirect } from "next/navigation"


export default function Signup(){

  //Pegando o dado adicionado no input 
  async function handleRegister(formData: FormData){
    "use server"

    const name = formData.get("Name")
    const email = formData.get("Email")
    const password = formData.get("Password")

    if(name === ""||email === ""||password === ""){
      console.log("PREENCHA TODOS OS CAMPOS")
      return;
    }


    try{ //Fazendo a requisição HTTP POST para o servidor Backend criar o usuário
      await api.post("/users", {
        name,
        email,
        password
      })

    }catch(err:any){
      console.log("Error")
      console.log(err.response?.data)
    }
    redirect("/")
  }



    return(
        <>
        <div className={styles.containerCenter}>
      <Image
       src={logoImg} 
       alt='Logo da Pizzaria' 
       width={500}   // largura em px
      />

      <section className={styles.login}>
        <h1>Criando sua conta</h1>
        <form action={handleRegister}>
            <input
          type='Name'
          required
          name='Name'
          placeholder='Digite seu nome: '
          className={styles.input}
          />
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
            Criar
          </button>
        </form>

          <Link href='/' className={styles.text}>
            Já possui uma conta? Faça login.
          </Link>

      </section>
    </div>
        </>
    )
}