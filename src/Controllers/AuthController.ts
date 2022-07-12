import { Request, Response, NextFunction } from 'express'

import prisma from '../Utils/database'
import User from '../Models/User'
import Helper, { IDecodedType, IValidation } from '../Helpers'
import { user } from '@prisma/client'

class AuthController {
    static async register(req: Request, res: Response): Promise<Response>
    {
        try {
            const user: user = req.body

            const validation: IValidation = await User.validate(user, User.schema)
            if(!validation.isValid) return res.status(400).json(validation.errors)

            const exists = await prisma.user.findFirst({ where: {username: user.username} })
            if(exists) return res.status(400).json("Username is already in use")

            user.password = await User.hashPassword(user.password)
            user.status = "offline"

            const newUser = await prisma.user.create({ data: user })
            return res.status(201).json(newUser)
        } catch (error) {
            return res.status(500).json(error)   
        }
    }

    static async login(req: Request, res: Response): Promise<Response>
    {
        try {
            const { username, password }: user = req.body

            // Validate if user exists
            const user = await prisma.user.findFirst({ where: { username } })
            if(!user) return res.status(404).json("User not found")
            if(!await User.comparePassword(password, user.password)) return res.status(404).json("User not found")

            // Create Token
            const {token, token_expiration_date} = Helper.createToken({ id: user.id })

            user.token = token
            user.token_expiration_date = token_expiration_date

            // Update user status
            if(!user.last_status){
                user.status = "online"
                user.last_status = "online"
            } else user.status = user.last_status

            await prisma.user.update({ where: { id: user.id }, data: user })

            return res.json(user.token)
        } catch (error) {
            return res.status(500).json(error)   
        }
    }

    static async logout(req: Request, res: Response): Promise<Response>
    {
        try {
            const token = req.headers["authorization"]?.replace("Bearer ", "")
            const { id }: IDecodedType = Helper.getSessionId(token as string)
            const user = await prisma.user.findFirst({ where: { id } })
            if(!user) return res.status(404).json("User not found")

            user.token = null
            user.token_expiration_date = null
            user.status = "offline"

            await prisma.user.update({ where: { id }, data: user })

            return res.json("Logged out")
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default AuthController