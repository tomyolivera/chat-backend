import { chat } from '@prisma/client'
import { Request, Response } from 'express'
import Helper, { IValidation } from '../Helpers'
import Chat from '../Models/Chat'
import prisma from '../Utils/database'

class ChatController {
    static async getAll(req: Request, res: Response): Promise<Response>
    {
        const user = await Helper.getUserByToken(req)
        if(!user) return res.status(404).json("User not found")
        const chats = await prisma.chat.findMany({ where: { chat_user: { some: { id: user.id } } } })
        return res.json(chats)
    }

    static async create(req: Request, res: Response): Promise<Response>
    {
        const chat: chat = req.body

        const validation: IValidation = await Chat.validate(chat, Chat.schema)
        if(!validation.isValid) return res.status(400).json(validation.errors)

        const newChat = await prisma.chat.create({ data: chat })
        return res.status(201).json(newChat)
    }
}

export default ChatController