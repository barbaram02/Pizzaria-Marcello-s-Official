"use client"

import styles from './styles.module.scss'
import { orderContext } from '@/providers/order'
import { use } from 'react'
import { X } from 'lucide-react'
import {calculateTotalOrder} from '@/lib/helper'

export function Modal(){
    const {onRequestClose, order, finishOrder} = use(orderContext);

    async function handleFinishOrder(){
        await finishOrder(order[0].orders.id)

    }

    return(
        <dialog className={styles.dialogContainer}>

            <section className={styles.dialogContent}>
                <button 
                className={styles.closeButton} 
                onClick={onRequestClose}
                >
                    <X size={40} color="#FF3f4b"/>
                </button>

                <article className={styles.container}>
                    <h2>Detalhes do Pedido</h2>

                    <span className={styles.table}>
                        Mesa <b>{order[0].orders.table}</b>
                    </span>

                    {order[0].orders?.name && (
                        <span className={styles.name}>
                        Cliente: <b>{order[0].orders.name}</b>
                        </span>
                    )}

                    {order.map( item => (
                        <section className={styles.item} key={item.id}>
                            <span>Qtd: {item.amount} - <b>{item.products.name}</b>- R$ {parseFloat(item.products.price)* item.amount}</span>
                            <span className={styles.description}>{item.products.description}</span>
                        </section>
                    ))}

                    <h3 className={styles.total}>Valor Total: R$ {calculateTotalOrder(order)}</h3>
                    <button 
                    className={styles.buttonOrder}
                    onClick={handleFinishOrder}
                    >
                        Concluir Pedido
                    </button>
                </article>
            </section>

        </dialog>
    )
}