import { Prisma } from "@prisma/client";
import { prisma } from "../config/database.js";


export async function insert(test: Prisma.TestUncheckedCreateInput) {

  return prisma.test.create({
    data: {
      ...test,
    },
  });
}

export async function getOne(id: number) {
  return prisma.test.findFirst({
    where: {
      id,
    },
  });
}