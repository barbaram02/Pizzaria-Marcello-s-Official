import crypto from 'crypto';
import multer from 'multer';

import { extname, resolve } from 'path';

//Configuração de upload de arquivos - Multer é uma biblioteca Node para lidar com uploads no Express 
export default{
    upload(folder: string){ //folder (nome da pasta onde salvar o arquivo)
        return{
            storage: multer.diskStorage({
                destination : resolve(__dirname, '..', '..', folder), // destination → Onde o arquivo será salvo. (diretorio, 'volta 2 pastas', pasta de destino)
                filename : (request, file, callback) => { // filename → Como o arquivo será nomeado.
                    const fileHash = crypto.randomBytes(16).toString("hex"); //Gerando nome único em hexatecimal(do tipo string, contento numeros e letras) para não ter conflito
                    const fileName = `${fileHash} - ${file.originalname}` //Junta o hash + nome original do arquivo enviado.

                    return callback(null, fileName)
                }
            })
        }
    }
}
// O Multer pode armazenar arquivos de diferentes formas, e diskStorage significa que os arquivos serão salvos no disco local (HD/SSD).

// O diskStorage precisa de dois parâmetros obrigatórios:



