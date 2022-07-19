import { Router } from "express";
import * as authSchemas from "../schemas/authSchemas.js";
import * as schemaValidator from "../middlewares/schemaValidatorMiddleware.js";
import * as authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post(
    "/signup",
    schemaValidator.validateSchema(authSchemas.userSchema),
    authController.signup
)


export default authRouter