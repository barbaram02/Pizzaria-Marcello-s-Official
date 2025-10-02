import { cookies } from "next/headers";

export async function getCookieServer(){
    const cookiesStore = await cookies()
    const token = cookiesStore.get("session")?.value;  //Session é a palavra chave para token no navegador.

    return token || null;
}

//Buscar o cookie do lado servidor