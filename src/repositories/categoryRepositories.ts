import { prisma } from "../config/database.js";

export async function getOne(id: number) {
  return prisma.category.findFirst({
    where: {
      id,
    },
  });
}