import { Request,  Response } from "express";
import * as authServices from "../services/authServices.js";

import { user } from "../schemas/authSchemas.js";

export async function signup(req: Request, res: Response) {
    const user: user = req.body;
    await authServices.createUser(user);
    res.status(201).send({})
}