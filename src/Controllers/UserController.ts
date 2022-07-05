import { Request, Response } from 'express'

class UserController {
    static async getAll(req: Request, res: Response): Promise<Response>
    {
        return res.json("All users")
    }
}

export default UserController