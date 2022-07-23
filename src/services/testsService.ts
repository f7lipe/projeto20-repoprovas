import * as testsRepository from '../repositories/testsRepositories.js';
import * as disciplineRepository from '../repositories/disciplineRepositories.js';
import * as categoryRepository from '../repositories/categoryRepositories.js';
import * as teacherRepository from '../repositories/teacherRepositories.js';
import * as teacherDisciplineRepository from '../repositories/teacherDisciplineRepositories.js';
import { test } from '../schemas/testSchemas.js';

export async function create(test: test) {

    const existingCatergory = await categoryRepository.getOne(test.categoryId);
    if (!existingCatergory)  throw { status: 404, message: 'Category not found' };

    const existingDiscipline = await disciplineRepository.getOne(test.disciplineId);
    if (!existingDiscipline)  throw { status: 404, message: 'Discipline not found' };

    const existingTeacher = await teacherRepository.getOne(test.teacherId);
    if (!existingTeacher)  throw { status: 404, message: 'Teacher not found' };

    const existingTeacherDiscipline = await teacherDisciplineRepository.getOne(test.teacherId, test.disciplineId); 
    if (!existingTeacherDiscipline)  throw { status: 404, message: 'Teacher not found on discipline'};
    
    await testsRepository.insert({
        name: test.name,
        pdfUrl: test.pdfUrl,
        categoryId: test.categoryId,
        teacherDisciplineId: existingTeacherDiscipline.id,
    });
}

export type groupBy =  'discipline' | 'teacher';

export async function get(groupBy: groupBy, name: string) {
    if (groupBy === 'discipline') {
        return await disciplineRepository.getTestsByDisciplines();
    }
    if (groupBy === 'teacher') {
        return await disciplineRepository.getTestByTeacher();
    }
}