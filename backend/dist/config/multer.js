"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
//Configuração de upload de arquivos - Multer é uma biblioteca Node para lidar com uploads no Express 
exports.default = {
    upload(folder) {
        return {
            storage: multer_1.default.diskStorage({
                destination: (0, path_1.resolve)(__dirname, '..', '..', folder), // destination → Onde o arquivo será salvo. (diretorio, 'volta 2 pastas', pasta de destino)
                filename: (request, file, callback) => {
                    const fileHash = crypto_1.default.randomBytes(16).toString("hex"); //Gerando nome único em hexatecimal(do tipo string, contento numeros e letras) para não ter conflito
                    const fileName = `${fileHash} - ${file.originalname}`; //Junta o hash + nome original do arquivo enviado.
                    return callback(null, fileName);
                }
            })
        };
    }
};
// O Multer pode armazenar arquivos de diferentes formas, e diskStorage significa que os arquivos serão salvos no disco local (HD/SSD).
// O diskStorage precisa de dois parâmetros obrigatórios:
