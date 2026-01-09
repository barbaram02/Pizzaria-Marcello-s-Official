import {prisma} from "../../../prisma.config";


interface AddItemRequest{
    order_id: string;
    product_id: string;
    amount: number;
}

class AdditemService{
    async execute({order_id, product_id, amount}: AddItemRequest){

        const addItem = await prisma.item.create({
            data: {
                order_id,
                product_id,
                amount
            }
        })
        return addItem;
    }
}

export {AdditemService}