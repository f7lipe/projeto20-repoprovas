import app from '../src/app.js';
import supertest from 'supertest';
import { prisma } from '../src/config/database.js';
import { faker } from "@faker-js/faker";
import { test } from '../src/schemas/testSchemas.js';

const validCredentials = {email: "devinha@t5.com", password:"BomDiaT5"};
const invalidEmail = {...validCredentials, email: "devinhat5.com"};
const invalidPassword = {...validCredentials, password: ""};
const validTest: test = {
    name: faker.lorem.words(3),
    pdfUrl: faker.internet.url(),
    teacherId: 1,
    categoryId: 1,
    disciplineId: 1
}
const invalidTest = {...validTest, name: ""};


  
describe("Integration Tests", () => {

    beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });

    describe("Authentication Tests", () => {
        it("Should not create user with invalid email", async () => {
            const response = await supertest(app).post("/signup").send(invalidEmail);
            expect(response.status).toBe(400);
        })
    
        it("Should not create user with invalid password", async () => {
            const response = await supertest(app).post("/signup").send(invalidPassword);
            expect(response.status).toBe(400);
        })
    
        it("Should create a new user with valid credentials", async () => {
            const response = await supertest(app).post("/signup").send(validCredentials);
            expect(response.status).toBe(201);
        });
    
        it("Should not create a user if alredy exists", async () => {
            const response = await supertest(app).post("/signup").send(validCredentials);
            expect(response.status).toBe(400);
        })
    
        it("Should login with valid credentials and return an valid token", async () => {
            const response = await supertest(app).post("/signin").send(validCredentials);
            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
        })
    
        it("Should not login with invalid email", async () => {
            const response = await supertest(app).post("/signin").send(invalidEmail);
            expect(response.status).toBe(400);
        })
    
        it("Should not login with invalid password", async () => {
            const response = await supertest(app).post("/signin").send(invalidPassword);
            expect(response.status).toBe(400);
        })
    })
    
    describe("Tests suit", () => {
        
        
        it("Should creat a test given valid info", async () =>  {
            const user = await supertest(app).post("/signin").send(validCredentials);
            const { token }  = user.body
            const responseTest = await supertest(app)
                                      .post("/test")      
                                      .set("Authorization", `Bearer ${token}`)
                                      .send(validTest);
            expect(responseTest.status).toBe(201);
        })
    })

    afterAll(async () => {
        await prisma.$disconnect();
      });
});

