import { Request, Response } from "express"
import { connection } from "../data/connection"
import { userType } from "../types"


export default async function userRegister(req: Request, res: Response): Promise<void> {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            res.statusCode = 422
            throw "Please inform user name, email and password."
        }

        const newuser: userType = {
            "id": Date.now().toString(),
            "name": name,
            "email": email,
            "password": password
        }

        await connection("labecommerce_users").insert(newuser)

        res.status(201).send('User added.')

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