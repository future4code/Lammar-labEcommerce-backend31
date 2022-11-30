import { Request, Response } from "express"
import { connection } from "../data/connection"

export default async function purchaseHistory(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.user_id

        const result = await connection
            .select()
            .from('labecommerce_purchases')
            .where('user_id', '=', `${userId}`)

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