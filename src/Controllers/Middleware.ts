import { NextFunction, Request, Response } from "express"
import prisma from "../Utils/database"

export default class Middleware {
    static async isAuthenticated(req: Request, res: Response, next: NextFunction)
    {
        let token = req.headers["authorization"]
        if(!token || !token.includes("Bearer ")) return res.status(401).json("Unauthorized")
        
        token = token.replace("Bearer ", "")

        const user = await prisma.user.findFirst({ where: { token } })
        if(!user) return res.status(401).json("Unauthorized")

        if(user.token_expiration_date && user.token_expiration_date < new Date()) return res.status(403).json("Forbidden")

        return next();
    }
}