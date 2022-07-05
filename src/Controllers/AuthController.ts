import { Request, Response, NextFunction } from 'express'

class AuthController {
    static async register(req: Request, res: Response): Promise<Response>
    {
        return res.json("Register")
    }

    static async login(req: Request, res: Response): Promise<Response>
    {
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