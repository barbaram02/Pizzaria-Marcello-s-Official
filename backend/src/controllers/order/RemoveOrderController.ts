import { Request, Response } from "express";
import { RemoveOrderService } from "../../services/order/RemoveOrderService";

class RemoveOrderController{
    async handle(req: Request, res: Response){
        const order_id = req.query.order_id as string;

        //Inicializando o servico
        const removeOrderService = new RemoveOrderService()

        const remove = await removeOrderService.execute({
            order_id
        });
        return res.json({
            data: remove,
            message: "Deletado com sucesso!"
        });
    }
}

export {RemoveOrderController}