import { getCookie } from "cookies-next";

export function getCookieClient(){
    const token = getCookie("session") //Session é a palavra chave para token no navegador.
    return token;
}

//Buscar o cookie do lado client