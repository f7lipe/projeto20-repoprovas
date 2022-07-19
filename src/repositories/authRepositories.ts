import { prisma } from '../config/database.js';
import { user } from '../schemas/authSchemas.js';

export async function createUser(user: user) {
    return await prisma.user.create({
        data: user
    });
}

export async function findUser(email: string) {
    return await prisma.user.findFirst({
        where: {
            email
        }
    });
}