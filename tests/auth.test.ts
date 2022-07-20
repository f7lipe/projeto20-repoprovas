import app from '../src/app.js';
import supertest from 'supertest';


const validCredentials = {email: "devinho@t5.com", password:"BomDiaT5"};
const invalidEmail = {...validCredentials, email: "devinhot5.com"};
const invalidPassword = {...validCredentials, password: ""};

describe("Authentication tests", () => {
    it("Should login with valid credentials and return an valid token", async () => {
        const response = await supertest(app).post("/signin").send(validCredentials);
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    })
    it("Should not login with invalid email and return an error", async () => {
        const response = await supertest(app).post("/signin").send(invalidEmail);
        expect(response.status).toBe(400);
    })
    it("Should not login with invalid password and return an error", async () => {
        const response = await supertest(app).post("/signin").send(invalidPassword);
        expect(response.status).toBe(400);
    })
});