"use client" //Colocamos para executar no lado navegador (cliente), para podermos usar hook

import styles from './styles.module.scss'
import { useFormStatus } from 'react-dom'

interface Props{
    name: string
}

export function Button({name}: Props){ //Esse parametro name é para que sempre que criarmos um buton, podermos trocar o que ficará escrito nele. Tornando o button mais reutilizavél.
    const {pending} = useFormStatus(); {/*Descobre o estado do botão do formulário cadastrar*/}

    return(
        <button type="submit" disabled={pending} className={styles.button}>
            {pending ? "Carregando..." : name} {/*Se pending = true, mostre "Carregando..." no botão; Se não, mostre o nome do botão*/}
        </button>
    )
}