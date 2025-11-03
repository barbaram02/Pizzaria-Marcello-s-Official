import { Header } from './components/header'
import { OrderProvider } from '@/providers/order'

export default function DashboardLayout({children} : {children: React.ReactNode}){
    return(
        <>
            <Header/>
            <OrderProvider> 
            {children}
            </OrderProvider>
        </>
    )
}

//children é uma propriedade especial = Tudo o que você coloca dentro de um componente.