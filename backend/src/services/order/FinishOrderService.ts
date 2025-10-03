import prismaClient from "../../prisma";

interface OrderSendRequest{
    order_id:string;
}
class FinishOrderService{
    async execute({order_id}: OrderSendRequest){
        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                status: true
            }
        })
        return order;
    }
}

export {FinishOrderService}