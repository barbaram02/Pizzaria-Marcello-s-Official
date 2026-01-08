import {prisma} from "../../../prisma.config";


class ListCategoryService{
    async execute(){
        const category = await prisma.category.findMany({
            select:{
                id: true,
                name: true,
                created_at: true
            }
        })

        return category;
    }
}

export {ListCategoryService}