import { Request, Response } from "express";
import * as testsService from "../services/testsService.js";
import { test } from "../schemas/testSchemas.js";

export async function create(req: Request, res: Response) {
  const test: test = req.body;
  await testsService.create(test);
  res.sendStatus(201)
}