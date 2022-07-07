import { Request, Response, NextFunction } from 'express'
import { sign } from 'jsonwebtoken'

import prisma from '../Utils/database'
import User, { IUser } from '../Models/User'
import Helper from '../Helpers'

class AuthController {
    static async register(req: Request, res: Response): Promise<Response>
    {
        
        return res.json("Register")
    }

    static async login(req: Request, res: Response): Promise<Response>
    {
        const { username, password }: IUser = req.body

        const user = await prisma.user.findFirst({ where: { username } })
        if(!user) return res.status(404).json("User not found")

        if(!await User.comparePassword(password, user.password)) return res.status(404).json("User not found")

        const token = Helper.createToken({ id: user.id })

        return res.json("Login")
    }

    static async logout(req: Request, res: Response): Promise<Response>
    {
        return res.json("Logout")
    }

    static async isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<Response>
    {
        return res.json("Is authenticated")
    }
}

export default AuthController