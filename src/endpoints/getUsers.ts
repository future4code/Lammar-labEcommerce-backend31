import { Request, Response } from "express"
import { connection } from "../data/connection"

export default async function getUsers(req: Request, res: Response): Promise<void> {
    try {
        let usersList = await connection.select().table('labecommerce_users')
        let updatedUserList = []

        for (const user of usersList) {
            let purchaseList = await connection
                .table('labecommerce_purchases')
                .select()
                .where('user_id', '=', user.id)

            updatedUserList.push(Object.assign({}, user, { purchases: purchaseList }))
        }
        res.status(200).send(updatedUserList)
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