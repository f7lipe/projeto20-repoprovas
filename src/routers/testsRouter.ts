import { Router } from "express";
import * as schemaValidator from "../middlewares/schemaValidatorMiddleware.js";
import { testSchema } from "../schemas/testSchemas.js";
import { validToken } from "../middlewares/tokenValidatorMiddleware.js";
import * as testController from "../controllers/testController.js";

const testsRouter = Router();
testsRouter.post(
    "/test",
    schemaValidator.validateSchema(testSchema),
    validToken,
    testController.create
)

testsRouter.get(
    "/tests",
    validToken,
    testController.get
)

export default testsRouter;