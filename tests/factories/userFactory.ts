import bcrypt from 'bcrypt';
import { prisma } from '../../src/config/database.js';
import { user } from '../../src/schemas/authSchemas.js';
import { faker } from "@faker-js/faker";

export  async function userFactory(data: user) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
  return user;
}

export function fakeUserFactory(): user {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}