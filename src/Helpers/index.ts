import { user } from "@prisma/client";
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import prisma from "../Utils/database";

export interface IValidation {
    errors: Object,
    isValid: Boolean
}

export interface IDecodedType {
    id: number
}

export interface IToken {
    token: string,
    token_expiration_date: Date
}

export default class Helper {
    static createToken(value: any, expiresIn: number = 1): IToken
    {
        const token = sign(value, process.env.JWT_SECRET || "JWT_SECRET", { expiresIn: expiresIn + 'h' })
        const token_expiration_date = new Date(Date.now() + (expiresIn * 60 * 60 * 1000))

        return { token, token_expiration_date }
    }

    static getSessionId(token: string): IDecodedType
    {
        return verify(token, process.env.JWT_SECRET || "JWT_SECRET") as IDecodedType
    }

    static async getUserByToken(req: Request): Promise<user | null>
    {
        const token = req.headers["authorization"]?.replace("Bearer ", "")
        const { id }: IDecodedType = Helper.getSessionId(token as string)
        return await prisma.user.findFirst({ where: { id } })
    }

    // static async isValidToken(token: string): Promise<boolean>
    // {
    //     return await verify(token, process.env.JWT_SECRET || "JWT_SECRET") ? true : false
    // }
}