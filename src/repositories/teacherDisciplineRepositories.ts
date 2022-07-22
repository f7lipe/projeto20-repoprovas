import { prisma } from "../config/database.js";

export async function getOne(teacherId: number, disciplineId: number) {
    return prisma.teacherDiscipline.findFirst({
        where: { AND: { disciplineId, teacherId } }
    });
}