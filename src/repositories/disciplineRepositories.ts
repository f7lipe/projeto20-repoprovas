import { prisma } from "../config/database.js";


export async function getOne(id: number) {
  return prisma.discipline.findFirst({
    where: {
      id,
    },
  });
}