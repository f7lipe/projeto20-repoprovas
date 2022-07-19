import { Request, Response, NextFunction } from "express";


const errorDict = {
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed",
    "406": "Not Acceptable",
    "409": "Conflict",
    "500": "Internal Server Error",
    "Unique constraint failed on the fields: (`email`)": "User already exists",
}

 export default function handleErrors(
    err,
    req: Request,
    res: Response,
    next: NextFunction) {
    const {status, message} = err;
    if(err) res.status(status || 500).send(message || "Internal server error");
    next()
}


