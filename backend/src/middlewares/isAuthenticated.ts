import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string,
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    //Verificar se enviou o token
    const verifToken = req.headers.authorization;

    if(!verifToken){
        return res.status(401).end();
    }
    //Desconstruindo para pegar apenas o token  [Primeiro item, segundo item[token]]
    const [, token] = verifToken.split(" ")

    try{
        //Validando o token com a função verify e a palavra chave 
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        )as Payload; //Se o token for valido, essa função retorna o payload (os dados dentro do token).

        //Recuperar o id do token e colocar dentro da variavel user_id do request = req
        req.user_id = sub;
        return next()

    } catch(err){
        return res.status(401).end();
    }

}
