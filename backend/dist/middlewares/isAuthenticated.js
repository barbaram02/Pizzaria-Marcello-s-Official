"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    //Verificar se enviou o token
    const verifToken = req.headers.authorization;
    if (!verifToken) {
        return res.status(401).end();
    }
    //Desconstruindo para pegar apenas o token  [Primeiro item, segundo item[token]]
    const [, token] = verifToken.split(" ");
    try {
        //Validando o token com a função verify e a palavra chave 
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET); //Se o token for valido, essa função retorna o payload (os dados dentro do token).
        //Recuperar o id do token e colocar dentro da variavel user_id do request = req
        req.user_id = sub;
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
