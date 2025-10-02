import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "./lib/cookieServer";
import { headers } from "next/headers";
import { api } from "./services/api";

export async function middleware(req: NextRequest){

    const { pathname } = req.nextUrl //Esse pathname será sempre o complementos das url's(/contato, /dashboard, /orders...)

    if(pathname.startsWith("/_next") || pathname === "/"){
        return NextResponse.next();
    }

    const token = await getCookieServer();  //Usamos o cookie server pois está se comunicando com o lado servidor. 

    if(pathname.startsWith("/dashboard")){
        if(!token){
            return NextResponse.redirect(new URL("/", req.url)) //Se não tiver token quando entrarmos em /dashboard, ele me redirecionará para a página principal
        }

        const isValid = await validateToken(token)//Passando o token recebido para a funcao validar
        console.log(isValid);

        if(!isValid){
            return NextResponse.redirect(new URL("/", req.url)) //Se o token for invalido ele redireciona para a pagina principal
        }
    }

    return NextResponse.next();
}

async function validateToken(token:string){ //Validando o token
    if (!token) return false;

    try{
        await api.get("/me", {
            headers:{
                Authorization: `Bearer ${token}` 
            }
        })
        return true; //Retorna true pois o token é válido
    }catch(err){
        return false;
    }
}