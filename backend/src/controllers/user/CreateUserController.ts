//Recebe as requisições 
import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

//Recebe e responde as requisições Http.
class CreateUserController{
    async handle(req: Request, res: Response){
        const {name, email, password} = req.body;

        //Inicializando o service
        const createUserService = new CreateUserService();

        //Passando as informações recebidos do bady para o service
        const user = await createUserService.execute({
            name,
            email,
            password,
        });

        return res.json(user)
    }

}

export {CreateUserController};