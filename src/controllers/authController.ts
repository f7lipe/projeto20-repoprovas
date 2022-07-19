import { Request,  Response } from "express";
import * as authServices from "../services/authServices.js";
import "../config/envConfig.js";
import jwt from "jsonwebtoken";

import { user } from "../schemas/authSchemas.js";

export async function signup(req: Request, res: Response) {
    const user: user = req.body;
    await authServices.createUser(user);
    res.status(201).send({})
}


export async function signin(req: Request, res: Response) {
    const { email, password } = req.body;
    const foundUser = await authServices.login(email, password);
    const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {expiresIn: "1d"});
    res.status(200).send({ token });
}