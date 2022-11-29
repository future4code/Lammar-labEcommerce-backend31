import { Response, Request } from "express"
import { connection } from "../data/connection"
import { productType } from "../types"

export default async function addProduct(req: Request, res: Response): Promise<void> {
    try {
        const { name, price, image_url } = req.body

        if (!name || !price || !image_url) {
            res.statusCode = 422
            throw "Please inform user name, price and image url."
        }

        const newProduct: productType = {
            "id": Date.now().toString(),
            "name": name,
            "price": price,
            "image_url": image_url
        }

        await connection("labecommerce_products").insert(newProduct)

        res.status(201).send("Product added.")

    } catch (error: any) {
        console.log(error)
        if (typeof error === 'string') {
            res.send(error)
        } else {
            console.log(error.sqlMessage || error.message)
            res.status(500).send("Unexpected error.")
        }
    }
}