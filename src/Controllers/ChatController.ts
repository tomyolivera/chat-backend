import { Request, Response } from 'express'

class ChatController {
    static async getAll(req: Request, res: Response): Promise<Response>
    {
        return res.json("All chats")
    }
}

export default ChatController