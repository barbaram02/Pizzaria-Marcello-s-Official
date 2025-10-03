import prismaClient from "../../prisma";
import {hash} from 'bcryptjs'; 

// Ele é responsavel por fazer a manipulação de dados e pelo lógica.
interface UserRequest{
    name: string,
    email: string,
    password:string
}

class CreateUserService{
    async execute({name, email, password} : UserRequest){

        //Verificar se enviou o email
        if(!email){
            throw Error("Email incorrect")
        }

        //Verificar se o email ja esta cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if (userAlreadyExists){
            throw Error("Email already exists")
        }

        //Criptografando a senha (variavel da senha, salts=Nível de segurança)
        const passwordHash = await hash(password, 8)

        //Adicionando usuario no banco de dados
        const user = await prismaClient.user.create({
            //Dados/informacoes
            data:{
                name: name,
                email:email,
                password:passwordHash,
            },
            //selecionar quais vou mostrar
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export {CreateUserService};