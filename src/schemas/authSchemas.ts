import Joi from "joi";
import { User } from "@prisma/client";  

export type user = Omit<User, "id">;

export const userSchema = Joi.object<user>({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    })