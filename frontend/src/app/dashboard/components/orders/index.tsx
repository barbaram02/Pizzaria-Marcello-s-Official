import styles from './styles.module.scss'
import { RefreshCw } from 'lucide-react'

export function Orders(){
    return(
        <main className={styles.container}>
            
            <section className={styles.containerHeader}>
                <h1>Pedidos</h1>
                <button>
                    <RefreshCw size={24} color="#4ca63dff"/>
                </button>
            </section>

            <section className={styles.listOrders}>

                <button className={styles.orderItem}>
                    <div className={styles.tag}></div>
                        <span>Mesa 10</span>
                </button>

                <button className={styles.orderItem}>
                    <div className={styles.tag}></div>
                        <span>Mesa 20</span>
                </button>
                
            </section>


        </main>
    )
}