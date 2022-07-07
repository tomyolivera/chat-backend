import { sign, verify } from "jsonwebtoken";

export default class Helper {
    static createToken(value: any, expiresIn: string = "1h"): string
    {
        return sign(value, process.env.JWT_SECRET || "JWT_SECRET", { expiresIn })
    }

    static isValidToken(token: string): boolean
    {
        return verify(token, process.env.JWT_SECRET || "JWT_SECRET") ? true : false
    }
}