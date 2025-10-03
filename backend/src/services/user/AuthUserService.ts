import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken"

interface AuthRequest{
    email: string,
    password: string,
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        //verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where: {  
                email: email,
            }
        })

        if (!user){
            throw new Error("Email not exists!");
        }

        //Verificar se a senha esta correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Password is incorrect!");
        }

        //Gerando o JWT (Token) do usuario
        const token = sign(
            {
                name: user.name,
                email: user.email, // << payload (dados dentro do token)
            },
            process.env.JWT_SECRET, // << chave secreta para gerar assinatura
            {
                subject: user.id, // << define o "sub" (quem é o dono do token)
                expiresIn: '30d'  // << expiração: 30 dias
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
        }
    }
}

export {AuthUserService};