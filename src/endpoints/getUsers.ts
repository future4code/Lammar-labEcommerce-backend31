import { Request, Response } from "express"
import { connection } from "../data/connection"

export default async function getUsers(req: Request, res: Response): Promise<void> {
    try {
        const result = await connection.select().table('labecommerce_users')
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