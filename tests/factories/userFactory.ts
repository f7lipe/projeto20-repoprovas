import bcrypt from 'bcrypt';
import { prisma } from '../../src/config/database.js';
import { user } from '../../src/schemas/authSchemas.js';

export default async function userFactory(data: user) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
  return user;
}