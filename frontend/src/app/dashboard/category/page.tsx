import styles from './styles.module.scss'
import {Button} from '@/app/dashboard/components/button'
import {api} from '@/services/api'
import {toast} from 'sonner'

import {getCookieServer} from '@/lib/cookieServer'
import { redirect } from 'next/navigation'

export default function Category(){ //Como e uma ágina, tem que ser export defaul: O prórpio next.js pede. Se fosse componente não precisaria do default.
    async function hanleRegisterCategory(formData : FormData){
        "use server" //Transformamos em server, para que ele execute do lado servidor e consiga acessar o banco de dados e não o lado client no qual foi declarado e chamado no botão. 
        const nameCategory = formData.get("name")

        if(nameCategory === "") return;

        const data = {
            name : nameCategory,
        }

        const token = await getCookieServer();

        const response = await api.post("/category", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .catch((err: any)=>{
            console.log(err.response?.data);
            return;
        })

        toast.success("Cadastrado Com Sucesso!")
        redirect("/dashboard")
    }

    return(
        <main className={styles.container}>
            <h1>Nova Categoria</h1>

            <form className={styles.form}
             action={hanleRegisterCategory}>

                <input
                type="text"
                name="name"
                placeholder="Nome da categoria. Ex: Pizza"
                required
                className={styles.input}
                />

                <Button name="Cadastrar"/> {/*Usamos o name para inserir a palavra no botão*/}
            </form>
        </main>
    )
}