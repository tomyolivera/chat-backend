import { ValidationError, AnySchema } from "yup"

import { IValidation } from "../Helpers"

export default class Model {
    static async validate(model: any, schema: AnySchema): Promise<IValidation>
    {
        const v = {} as IValidation

        await schema.validate(model)
            .then(() => {
                v.errors = {}
                v.isValid = true
            })
            .catch((err: ValidationError) => {
                v.errors = err.message
                v.isValid = false
            })

        return v
    }
}