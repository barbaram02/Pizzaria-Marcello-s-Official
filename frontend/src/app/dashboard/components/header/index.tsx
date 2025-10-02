"use client" //Usei cliente no Header usa coisas que só existem no browser, como: useState, action ...

import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import logoImg from '/public/marcello-pizza-logo-compacto.svg'
import {LogOutIcon} from 'lucide-react'
import {deleteCookie} from 'cookies-next' //Import para usar na funcao de deletar o cookie e fazer o logout
import {useRouter} from 'next/navigation' //Import para dar o replace e quando fizer o logout ele ir para a página de login. Usar apenas quando for Use Client

export function Header(){
    const router = useRouter();

    async function handleLogout(){
        deleteCookie("session", {path: "/"})

        router.replace("/")
    }

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image
                        alt="Logo Pizzaria Marcello"
                        src={logoImg}
                        priority={true}
                        quality={100}
                        className={styles.logo}
                    />
                </Link>

                <nav>
                    <Link href="/dashboard/category">
                        Categoria
                    </Link>
                    <Link href="/dashboard/product">
                        Produto
                    </Link>

                    <form action={handleLogout}>
                        <button type='submit'>
                            <LogOutIcon size={24} color="#fff"/>
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}

//npm install lucide-react (biblioteca de icones)