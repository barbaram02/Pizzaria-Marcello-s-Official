"use client"

import styles from './styles.module.scss'
import { RefreshCw } from 'lucide-react'
import { OrderProps } from '@/lib/order.type';
import { Modal } from '../modal';
import { use } from 'react';
import { orderContext } from '@/providers/order';
import { useRouter } from 'next/navigation';
import {toast} from 'sonner'

interface Props{
    orders: OrderProps[];
}

export function Orders({orders}: Props){

    const {isOpen, onRequestOpen} = use(orderContext); //Pegando as informaçoes do context
    const router = useRouter();

    async function handleDetailOrder(order_id:string){
        await onRequestOpen(order_id)
    }

    function handleRefresh(){
        router.refresh();
        toast.success("Pedidos Atualizados!")
    }

    return(
        <>
        <main className={styles.container}>
            <section className={styles.containerHeader}>
                <h1>Últimos Pedidos</h1>
                <button onClick={handleRefresh}>
                    <RefreshCw size={24} color="#4ca63dff"/>
                </button>
            </section>

            <section className={styles.listOrders}>
                {orders.length === 0 && ( //Se o tamanho do array === 0, significa que ele esta vazio
                    <span className={styles.emptyItem}>
                        Nenhum pedido aberto no momento...
                    </span>
                )}

                {orders.map(order => (
                <button 
                key={order.id}
                className={styles.orderItem}
                onClick={() => handleDetailOrder(order.id)}
                >
                    <div className={styles.tag}></div>
                    <span>Mesa {order.table}</span>
                </button>
                ))}
            </section>
        </main>

        { isOpen && <Modal/>} {/* if isOpen for true, ele abre o modal*/}
        </>
    )
}