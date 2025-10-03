import prismaClient from "../../prisma";

interface ListByCategoryRequest{ //Vou precisar que o usuário me envie o id da categoria atraves dessa propriedade
    category_id: string
}

class ListByCategoryService{
    async execute({category_id}:ListByCategoryRequest){
        
        const listbycategory = await prismaClient.product.findMany({
            where:{
                category_id: category_id
            }
        })

        return listbycategory;
    }
}

export {ListByCategoryService};