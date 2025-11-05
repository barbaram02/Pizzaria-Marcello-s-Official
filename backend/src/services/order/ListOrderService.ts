import prismaClient from "../../prisma";

class ListOrderService{
    async execute(){
        const orders = await prismaClient.order.findMany({
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