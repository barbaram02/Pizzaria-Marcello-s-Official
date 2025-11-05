import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient();

export default prismaClient;

//Com o prismaclient consigo acessar todos os models, usuarios, fazer um CRUD dos usuarios