import  express, {Request, Response, NextFunction} from "express";
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';

import { router } from './routes' 
import fileUpload from "express-fileupload"; //Middleware simples em Express para upload de arquivos. 

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload({
    limits:{fileSize: 50 * 1024 * 1024}//No máximo 50mb
}))
app.use(router);

//Middleware do Express para arquivos estaticos - Serve acessar os arquivos que o usuário enviou pelo navegador.
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

//Middleware - Todas as urls vão passar aqui para verificação
app.use((err: Error, req: Request, res: Response, nextfunc: NextFunction) => {
    if ( err instanceof Error){
        return res.status(400).json({
            error: err.message, 
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    })
})


const PORT = Number(process.env.PORT) || 3333;
app.listen(PORT, () => console.log('Servidor Online!!!'))