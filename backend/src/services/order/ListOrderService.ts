import {prisma} from "../../../prisma.config";


class ListOrderService{
    async execute(){
        const orders = await prisma.order.findMany({
            where:{
                draft: false,
                status: false, //Vai listar os pedidos quando o status estiver em false. O status estando true significa que o pedido já foi concluido.
            },
            orderBy:{
                created_at: 'desc',
            }
        })
        return orders;
    }
}

export {ListOrderService}