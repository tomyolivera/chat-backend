import bcrypt from 'bcrypt'
import prisma from '../Utils/database'

export type TStatus = "online" | "offline" | "away" | "invisible"

export interface IUser {
    id: number,
    name: string,
    username: string,
    password: string,
    status: TStatus,
    last_connected?: Date,
    avatar?: string,
    phone: string,
    token: string,
    token_expiration_date: Date
}

export default class User {
    static async hashPassword(password: string): Promise<string>
    {
        return bcrypt.hash(password, 10)
    }

    static async comparePassword(password: string, hash: string): Promise<boolean>
    {
        return bcrypt.compare(password, hash)
    }
}