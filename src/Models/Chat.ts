import { array, object, string } from "yup"
import Model from "./Model"

export default class Chat extends Model {
    static schema: any = object().shape({
        name: string().max(60).required(),
        description: string().max(255),
        avatar: string().max(255),
        users: array().required(),
        messages: array(),
    })
}