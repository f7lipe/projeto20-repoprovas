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

export async function getTestByTeacher() {
  return prisma.teacherDiscipline.findMany({
    where: {
      AND: { teacher: {  }, tests: { some: {} } },
    },
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
}