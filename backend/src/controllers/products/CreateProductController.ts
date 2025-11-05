import { Request, Response } from "express"
import { CreateProductService } from "../../services/products/CreateProductService";
import {UploadedFile} from 'express-fileupload'

import {v2 as cloudinary, UploadApiResponse} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

class CreateProductController{
    async handle(req: Request, res: Response){
        const {name, price, description, banner, category_id} = req.body
        //Inicializando o serviço
        const createProductService = new CreateProductService()

        if(!req.files || Object.keys(req.files).length === 0){ //Ao carregar um arquivo com a biblioteca express-fileupload, ele ficará acessível em req.files.
            throw new Error("Error upload file image")
        }else{
            const file: UploadedFile = req.files['file']

            //Enviando para a api do cloudinary a imagem
            const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({}, function(error, result){ 
                    if(error){ //Se a Promise retornar error, essa função callback vai rejeitar.
                        reject(error);
                        return;
                    }

                    resolve(result)//Se não, ele vai resolver passando a resposta de result
                }).end(file.data) //Passando o buff da imagem
            })

            const product = await createProductService.execute({
                name,
                price,
                description,
                banner: resultFile.url,
                category_id,  
            });

            return res.json(product)
        }   
    }
}

export{ CreateProductController }; 