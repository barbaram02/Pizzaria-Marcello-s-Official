"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload")); //Middleware simples em Express para upload de arquivos. 
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } //No máximo 50mb
}));
app.use(routes_1.router);
//Middleware do Express para arquivos estaticos - Serve acessar os arquivos que o usuário enviou pelo navegador.
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
//Middleware - Todas as urls vão passar aqui para verificação
app.use((err, req, res, nextfunc) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

app.listen(process.env.PORT, () => console.log('Servidor Online!!!'));
