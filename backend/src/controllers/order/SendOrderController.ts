import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController{
    async handle(req: Request, res: Response){
        const {order_id} = req.body

        //Inicializar o servico
        const sendOrderService = new SendOrderService() 

        const ordersend = await sendOrderService.execute({
            order_id
        })

        return res.json({
            data: ordersend,
            message: "Atualizado com sucesso!"
        });
    }
}

export {SendOrderController}