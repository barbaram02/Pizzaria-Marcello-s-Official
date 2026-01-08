import {prisma} from "../../../prisma.config";

interface OrderRequest{
    order_id: string;
}

class RemoveOrderService{
    async execute({order_id}: OrderRequest){
        
        const orderRemove = await prisma.order.delete({
            where:{
                id : order_id
            }
        })

        return orderRemove;
    }
}

export {RemoveOrderService}