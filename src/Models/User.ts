import bcrypt from 'bcrypt'
import Model from './Model'
import { object, string } from "yup"

export type TStatus = "online" | "offline" | "away" | "invisible"

export interface IUser {
    id: number,
    name: string,
    username: string,
    password: string,
    status: TStatus,
    last_status?: TStatus,
    last_connected?: Date,
    avatar?: string,
    phone: string,
    token: string,
    token_expiration_date: Date
}

export default class User extends Model {
    static schema: any = object().shape({
        name: string().max(60).required(),
        username: string().max(50).required(),
        password: string().min(8).required(),
        phone: string().max(50).required(),
    })

    static async hashPassword(password: string): Promise<string>
    {
        return bcrypt.hash(password, 10)
    }

    static async comparePassword(password: string, hash: string): Promise<boolean>
    {
        return bcrypt.compare(password, hash)
    }
}