import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController{
    async handle(req: Request, res: Response){
        const {order_id} = req.body;

        //Inicializar o servico
        const finishOrderService = new FinishOrderService() 

        const orderfinish = await finishOrderService.execute({
            order_id
        })

        return res.json({
            data: orderfinish,
            message: "Finalizado com sucesso!"
        });
    }
}

export {FinishOrderController}