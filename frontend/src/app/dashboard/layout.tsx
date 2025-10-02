import { Header } from './components/header'

export default function DashboardLayout({children} : {children: React.ReactNode}){
    return(
        <>
            <Header/>
            {children} 
        </>
    )
}

//children é uma propriedade especial = Tudo o que você coloca dentro de um componente.