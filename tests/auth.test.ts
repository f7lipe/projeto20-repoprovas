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
    await prisma.$executeRaw`TRUNCATE TABLE tests`;
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
        
        
        it("Should create a test given valid info", async () =>  {
            const user = await supertest(app).post("/signin").send(validCredentials);
            const { token }  = user.body
            const response = await supertest(app)
                                      .post("/test")      
                                      .set("Authorization", `Bearer ${token}`)
                                      .send(validTest);
            expect(response.status).toBe(201);
        })

        it("Shouldn't create a test given invalid info", async () =>  {
            const user = await supertest(app).post("/signin").send(validCredentials);
            const { token }  = user.body
            const responseTest = await supertest(app)
                                      .post("/test")      
                                      .set("Authorization", `Bearer ${token}`)
                                      .send(invalidTest);
            expect(responseTest.status).toBe(400);
        })

        it("Shouldn't create a test when token is not sent", async () =>  {
            const responseTest = await supertest(app)
                                      .post("/test")   
                                      .send(validTest);
            expect(responseTest.status).toBe(403);
        })

        it("Shouldn't create a test with invalid token", async () =>  {
            const token = 0;
            const responseTest = await supertest(app)
                                      .post("/test")  
                                      .set("Authorization", `Bearer ${token}`) 
                                      .send(validTest);
            expect(responseTest.status).toBe(500);
        })

        it("Should return at least one test given a discipline filter", async () =>  {
            const user = await supertest(app).post("/signin").send(validCredentials);
            const { token }  = user.body
            const response = await supertest(app)
                            .get("/tests?groupby=discipline")
                            .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.tests.length).toBeGreaterThan(0);
        })
        it("Should return at least one test given a teacher filter", async () =>  {
            const user = await supertest(app).post("/signin").send(validCredentials);
            const { token }  = user.body
            const response = await supertest(app)
                            .get("/tests?groupby=teacher")
                            .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.tests.length).toBeGreaterThan(0);
        })

        it("Shouldn't return tests when no filter is passed", async () =>  {
            const user = await supertest(app).post("/signin").send(validCredentials);
            const { token }  = user.body
            const response = await supertest(app)
                            .get("/tests")
                            .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(400);
        })
    })

    afterAll(async () => {
        await prisma.$disconnect();
      });
});

