"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            //verificar se o email existe
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email,
                }
            });
            if (!user) {
                throw new Error("Email not exists!");
            }
            //Verificar se a senha esta correta
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new Error("Password is incorrect!");
            }
            //Gerando o JWT (Token) do usuario
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email, // << payload (dados dentro do token)
            }, process.env.JWT_SECRET, // << chave secreta para gerar assinatura
            {
                subject: user.id, // << define o "sub" (quem é o dono do token)
                expiresIn: '30d' // << expiração: 30 dias
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token,
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
