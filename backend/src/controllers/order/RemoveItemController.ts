import { Request, Response } from "express";
import { RemoveItemService } from "../../services/order/RemoveItemService";

class RemoveItemController{
    async handle(req: Request, res:Response){
        const item_id = req.query.item_id as string;
        //Inicializando o servico
        const removeItemService = new RemoveItemService()

        const item = await removeItemService.execute({
            item_id
        });
        return res.json({
            data: item,
            message: "Item deletado com sucesso com sucesso!"
        });
        
    }
}

export {RemoveItemController}