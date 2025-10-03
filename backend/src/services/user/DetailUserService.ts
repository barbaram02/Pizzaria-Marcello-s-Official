import prismaClient from "../../prisma"; //acessar e manipular seu banco de dados

class DetailUserService{
    async execute(user_id: string){ //Depois de passar por toda a autenticacao, o user_id vai fornecer dados.
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            select:{
                id: true,
                name: true,
                email:true,
            }
        })

        return user;
    }
}

export {DetailUserService};
