import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController{
    async handle(req: Request, res:Response){ //Sempre usar a ordem(req, res)

        const user_id = req.user_id;

        //Inicializar o serviço
        const detailUserService = new DetailUserService();

        //Executando o serviço
        const user = await detailUserService.execute(user_id);

        //Retornando os detalhes para o usuario
        return res.json(user);
    }
}

export {DetailUserController};