import prismaClient from "../../prisma";

interface CategoryRequest{
    name: string;
}

class CreateCategoryService{
    async execute({name} : CategoryRequest){
        //Verificar o name recebido
        if(name === ''){
            throw new Error("Name Invalid")
        }

        //Salvar o nome no banco de dados

        const category = await prismaClient.category.create({
            data:{
                name : name
            },
            select:{
                id: true,
                name: true
            }
        })

        return category;
    }
}

export {CreateCategoryService}