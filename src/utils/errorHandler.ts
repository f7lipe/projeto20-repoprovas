import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import Joi from "joi";

const errorDict = {
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed",
    "406": "Not Acceptable",
    "409": "Conflict",
    "500": "Internal Server Error"
}

 export default function handleErrors(
    err,
    req: Request,
    res: Response,
    next: NextFunction) {
        console.log(err);
    const {status} = err;
    const joiError = err as Joi.ValidationError;
    const prismaError = err instanceof Prisma.PrismaClientKnownRequestError
    if (joiError.isJoi) {
        const errors = joiError.details.map(detail => detail.message);
        return res.status(400).send(errors)
    }
    if (prismaError) {
        return res.status(401).send(err.message)
    }
    if(err) res.status(status || 500).send(errorDict[status] || errorDict[500]);
    next()
}


