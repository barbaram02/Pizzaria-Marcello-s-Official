import {prisma} from "../../../prisma.config";


interface RemoveItemRequest{
    item_id: string
}

class RemoveItemService{
    async execute({item_id}: RemoveItemRequest){
        
        const itemRemove = await prisma.item.delete({
            where:{
                id : item_id
            }
        })
        return itemRemove;
    }
}

export {RemoveItemService}