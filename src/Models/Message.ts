import { user } from "@prisma/client"

export interface IMessage {
    id: number
    text: string
    user: user
    created_at: Date

    is_mine: boolean
    is_read: boolean

    chat_id: number
    user_id: number
}