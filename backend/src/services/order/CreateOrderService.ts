import {prisma} from "../../../prisma.config";


interface OrderRequest{
    table: number;
    name?: string;
}

class CreateOrderService{
    async execute({table, name}: OrderRequest){

        //Verificar se o email ja esta cadastrado na plataforma
        const orderAlreadyExists = await prisma.order.findFirst({
            where:{
                table: table
            }
        })
        if (orderAlreadyExists){
            throw Error("Table already exists")
        }

        const order = await prisma.order.create({
            data: {
                table: table,
                name: name,
            }
        })
        return order;
    }
}

export {CreateOrderService}