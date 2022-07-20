import app from '../src/app.js';
import supertest from 'supertest';
import { prisma } from '../src/config/database.js';


const validCredentials = {email: "devinha@t5.com", password:"BomDiaT5"};
const invalidEmail = {...validCredentials, email: "devinhat5.com"};
const invalidPassword = {...validCredentials, password: ""};

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });
  

describe("Authentication tests", () => {

    it("Should not create user with invalid email", async () => {
        const response = await supertest(app).post("/signup").send(invalidEmail);
        expect(response.status).toBe(400);
    })

    it("Should not create user with invalid password", async () => {
        const response = await supertest(app).post("/signup").send(invalidPassword);
        expect(response.status).toBe(400);
    })

    it("Should not create a user if alredy exists", async () => {
        const response = await supertest(app).post("/signup").send(validCredentials);
        expect(response.status).toBe(500);
    })

    it("Should create a new user with valid credentials", async () => {
        const response = await supertest(app).post("/signup").send(validCredentials);
        expect(response.status).toBe(201);
    });

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
});

afterAll(async () => {
  await prisma.$disconnect();
});