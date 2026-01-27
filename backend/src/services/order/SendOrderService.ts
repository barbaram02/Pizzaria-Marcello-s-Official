import {prisma} from "../../../prisma.config";

interface OrderSendRequest{
    order_id:string;
}
class SendOrderService{
    async execute({order_id}: OrderSendRequest){
        const order = await prisma.order.update({
            where: {
                id: order_id
            },
            data: {
                draft: false
            }
        })
        return order;
    }
}

export {SendOrderService}