import {prisma} from "../../../prisma.config";
interface ListByCategoryRequest{ //Vou precisar que o usuário me envie o id da categoria atraves dessa propriedade
    category_id: string
}

class ListByCategoryService{
    async execute({category_id}:ListByCategoryRequest){
        
        const listbycategory = await prisma.product.findMany({
            where:{
                category_id: category_id
            }
        })

        return listbycategory;
    }
}

export {ListByCategoryService};