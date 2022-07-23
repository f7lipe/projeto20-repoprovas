import { prisma } from "../config/database.js";


export async function getOne(id: number) {
  return prisma.discipline.findFirst({
    where: {
      id,
    },
  });
}

export async function getTestsByDisciplines() {
  return prisma.term.findMany({
    where: {
      disciplines: {
        some: {
          AND: {
            teacherDisciplines: { some: { tests: { some: {} } } },
          },
        },
      },
    },
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}