"use client"

import { ChangeEvent, useState} from 'react'
import styles from './styles.module.scss'
import { UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/app/dashboard/components/button'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'
import {toast} from 'sonner'
import { useRouter } from 'next/navigation'

interface CategoriesProps{
    id: string; //{ id: 'f69077aa-015f-458b-942c-44199f18f714', name: 'Pizzas' },
    name: string;
}

interface Props{
    categories: CategoriesProps[];
}

export function Form({categories}: Props){
    const router = useRouter();
    const [image, setImage] = useState<File>()
    const[previewImage, setPreviewImage] = useState("")

    async function handleRegisterProduct(formData: FormData){
        const categoryIndex = formData.get("category")
        const name = formData.get("name")
        const price = formData.get("price")
        const description = formData.get("description")

        if(!name || !categoryIndex || !price || !description || !image){
            toast.warning("Preencha todos os campos!")
            return;
        }

        const data = new FormData();

        data.append("name", name)
        data.append("price", price)
        data.append("category_id", categories[Number(categoryIndex)].id) //pegando o id convertido em numero
        data.append("description", description)
        data.append("file", image)

        const token = await getCookieClient();

        //Salvando no banco de dados
        await api.post("/products", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .catch((err: any) => {
            console.log(err.data.response);
            toast.warning("Falha ao cadastrar esse produto!")
            return;
        })

        toast.success("Produto cadastrado com sucesso!")
        router.push("/dashboard")

    }

    function handleFile(e: ChangeEvent<HTMLInputElement>){

        if(e.target.files && e.target.files[0]){ //Verificando se tem imagem. O [0] significa a posição inicial da imagem
            const image = e.target.files[0];

            if(image.type !== "image/png" && image.type !=="image/jpeg"){
                toast.warning("Formato de imagem inválido!")
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image)) //Criando url para preview
        }

    }

    return(
        <main className={styles.container}>
            <h1>Novo Produto</h1>

            <form className={styles.form} action={handleRegisterProduct}>
                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color="#fff"/>
                    </span>

                    <input type="file"
                    accept="image/png, image/jpeg"
                    required
                    onChange={handleFile} //Só usa Onchang em use client
                    />

                    {previewImage && (
                        <Image
                        alt="Imagem de preview"
                        src={previewImage}
                        className={styles.preview}
                        fill={true}
                        quality={100}
                        priority={true}
                    />
                    )}
                </label>

                <select name="category">
                   {categories.map((category, index) => ( //Map percorre o array de category e mostra cada uma separado
                    <option key={category.id} value={index}>
                        {category.name}
                    </option>
                   ))}
                </select>

                <input 
                type="text"
                name="name"
                placeholder="Digite o nome do produto: "
                required
                className={styles.input}
                />

                <input 
                type="text"
                name="price"
                placeholder="Preço do produto: "
                required
                className={styles.input}
                />

                <textarea
                name="description"
                placeholder="Digite a descrição do produto..."
                required
                className={styles.input}
                ></textarea>

                <Button name="Cadastrar Produto"/>


            </form>
        </main>
    )
}