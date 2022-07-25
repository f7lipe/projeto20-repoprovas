import { Request, Response } from "express";
import * as testsService from "../services/testsService.js"
import { test } from "../schemas/testSchemas.js";

export async function create(req: Request, res: Response) {
  const test: test = req.body;
  await testsService.create(test);
  console.log(test);
  res.sendStatus(201)
}

import { groupBy } from "../services/testsService.js";

export async function get(req: Request, res: Response) {
  const { groupby, name }  = req.query;
  const tests  = await testsService.get(groupby as groupBy, name as string);
  res.status(200).send(tests);
}