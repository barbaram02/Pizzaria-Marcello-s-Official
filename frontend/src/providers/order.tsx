"use client" //Provider do modal order; || Context API depende do estado do usuário no navegador, por isso precisa ser do lado do servidor. 

import { createContext, ReactNode, useState } from 'react'
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export interface OrderItemProps{
    id: string;
    amount: number;
    created_at: string;
    order_id: string;
    product_id: string;
    products:{
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string;
        category_id: string;
    };
    orders:{
        id: string;
        table: number;
        name: string | null;
        draft: boolean;
        status: boolean;
    }
}

type OrderContextData = { //Tipo de formato que o context deve ter.
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>; //Função para abrir modal;
    onRequestClose: () => void; //Função para fechar modal; Ela não retorna nada
    order: OrderItemProps[];
    finishOrder: (order_id: string) => Promise<void>;
}

type OrderContextProps = {
    children: ReactNode;
}

export const orderContext = createContext({} as OrderContextData) //Criando o context e sinalizando que espere os valores com o formato declarado acima


export function OrderProvider({children}: OrderContextProps){

    const [isOpen, setIsOpen] = useState(false); //False pq o modal vai começar fechado!
    const [order, setOrder] = useState<OrderItemProps[]>([]) //define o tipo do estado. Um array de objetos do tipo OrderItemProps, e seu valor inicial é um array vazio.
    const router = useRouter();

    async function onRequestOpen(order_id:string){

        const token = await getCookieClient();

        const response = await api.get("/order/detail", {
            headers:{
                Authorization: `Bearer ${token}`
            },
            params:{
                order_id: order_id
            }
        })
        setOrder(response.data);
        setIsOpen(true); //Trocando o estado para abrir o modal
    }


    function onRequestClose(){
        setIsOpen(false);
    }

    async function finishOrder(order_id: string){
        const token = await getCookieClient();

        const data = {
            order_id: order_id,
        }

        try{
            await api.put("/order/finished", data, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
        }catch(err: any){
            console.log(err)
            toast.error("Falha Ao Finalizar!")
            return;
        }

        toast.success("Pedido Finalizado!")
        router.refresh();
        setIsOpen(false) //Fechando o modal
        
    }

    return(
        <orderContext.Provider  //Provider compartilha o estado e funções do modal com todos os componentes filhos
        value={{
            isOpen,
            finishOrder,
            onRequestOpen,
            onRequestClose,
            order
        }}
        >
            {children}
        </orderContext.Provider>
    )
}

