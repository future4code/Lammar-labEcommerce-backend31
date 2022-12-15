import { Request, Response } from "express"
import { connection } from "../data/connection"

export default async function getProducts(req: Request, res: Response): Promise<void> {
    try {
        let { order, search } = req.query

        if (!search) {
            search = '%'
        }

        const result = await connection
            .table('labecommerce_products')
            .select()
            .whereILike('name', `%${search}%`)
            .orderBy('name', `${order}`)

        res.status(200).send(result)
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