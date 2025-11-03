import { Orders } from "./components/orders";
import {api} from '@/services/api'
import { getCookieServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type";

async function getOrders(): Promise<OrderProps[] | []>{ //getOrders retorna um array de OrderProps (Propriedades do pedido) ou um array vazio

    try{ 
        const token = await getCookieServer();

        {/*Buscando os pedidos no banco de dados*/}
        const response = await api.get("/orders",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return response.data || [];

    }catch(err: any){
        console.log(err.response?.data);
        return [];
    }
}

export default async function Dashboard(){

    const orders = await getOrders(); {/*trazendo os pedidos buscados*/}
    
    return(
       <>
       <Orders orders={orders}/> {/*Mostrando os pedidos na tela dashboard*/}
       </>
    )
}