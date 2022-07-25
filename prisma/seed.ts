import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import { prisma } from "../src/config/database.js";

// create admin user
async function main(){
  const SALT = 10;
  const hashedPassword = bcrypt.hashSync("admin", SALT);

	// cria se já não existe -> se já existe, faz nada
  await prisma.user.upsert({
    where: { email: "admin@mail.com" },
    update: {},
    create: {
      email: "admin@mail.com",
      password: hashedPassword
    }
  });

  const terms = [
		{
			number: 1,
		},
		{
			number: 2,
		},
		{
			number: 3,
		},
		{
			number: 4,
		},
		{
			number: 5,
		},
		{
			number: 6,
		},
	];
	const categories = [
		{
			name: 'Projeto',
		},
		{
			name: 'Prática',
		},
		{
			name: 'Recuperação',
		},
	];
	const teachers = [
		{
			name: 'Diego Pinho',
		},
		{
			name: 'Bruna Hamori',
		},
	];
	const disciplines = [
		{
			name: 'HTML e CSS',
			termId: 1,
		},
		{
			name: 'JavaScript',
			termId: 2,
		},
		{
			name: 'React',
			termId: 3,
		},
		{
			name: 'Humildade',
			termId: 4,
		},
		{
			name: 'Planejamento',
			termId: 5,
		},
		{
			name: 'Autoconfiança',
			termId: 6,
		},
	];
	const teachersDisciplines = [
		{
			teacherId: 1,
			disciplineId: 1,
		},
		{
			teacherId: 1,
			disciplineId: 2,
		},
		{
			teacherId: 1,
			disciplineId: 3,
		},
		{
			teacherId: 2,
			disciplineId: 4,
		},
		{
			teacherId: 2,
			disciplineId: 5,
		},
		{
			teacherId: 2,
			disciplineId: 6,
		},
	];

	const tests = [
		{
			name: 'Prova HTML e CSS',
			pdfUrl: faker.internet.url(),
			categoryId: 1,
			teacherDisciplineId: 1,
		},
		{
			name: 'Prova JavaScript',
			pdfUrl: faker.internet.url(),
			categoryId: 2,
			teacherDisciplineId: 2,
		},
		{
			name: 'Projeto Planejamento',
			pdfUrl: faker.internet.url(),
			categoryId: 1,
			teacherDisciplineId: 5,
		},
		{
			name: 'Prática Autoconfiança',
			pdfUrl: faker.internet.url(),
			categoryId: 2,
			teacherDisciplineId: 6,
		},
	];

	await prisma.term.createMany({ data: terms, skipDuplicates: true });
	await prisma.category.createMany({
		data: categories,
		skipDuplicates: true,
	});
	await prisma.teacher.createMany({
		data: teachers,
		skipDuplicates: true,
	});
	await prisma.discipline.createMany({
		data: disciplines,
		skipDuplicates: true,
	});
	await prisma.teacherDiscipline.createMany({
		data: teachersDisciplines,
		skipDuplicates: true,
	});
	await prisma.test.createMany({ data: tests, skipDuplicates: true });
};


main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})