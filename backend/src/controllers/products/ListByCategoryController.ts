import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/products/ListByCategoryService";

class ListByCategoryController{
    async handle(req: Request, res: Response){

        const category_id = req.query.category_id as string; //Um campo vindo dos parâmetros de query string da URL.

        //Inicializando o service
        const listByCategoryService = new ListByCategoryService();

        const productbycategory = await listByCategoryService.execute({
            category_id
        }); 

        return res.json(productbycategory);
    }
}

export {ListByCategoryController};