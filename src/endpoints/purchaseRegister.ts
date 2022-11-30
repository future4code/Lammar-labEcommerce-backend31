import { Request, Response } from "express"
import { connection } from "../data/connection"

export default async function purchaseRegister(req: Request, res: Response): Promise<void> {
    try {
        const { user_id, product_id, quantity } = req.body

        if (!user_id || !product_id || !quantity) {
            res.statusCode = 422
            throw "Please inform user id, product id and quantity."
        }

        const getPrice = async (id: string): Promise<any> => {
            const price = await connection
                .select('price')
                .from('labecommerce_products')
                .where('id', '=', `${product_id}`)
            return price
        }
        let value = await getPrice(product_id)
        value = value[0].price

        const newProduct = {
            id: Date.now().toString(),
            user_id,
            product_id,
            quantity,
            total_price: value * quantity
        }

        await connection('labecommerce_purchases').insert(newProduct)
        res.status(201).send('Purchase registered.')

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