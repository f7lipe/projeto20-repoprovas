import * as authRepositories from '../repositories/authRepositories.js';
import { user } from '../schemas/authSchemas.js';
import bcrypt from 'bcrypt';

export async function createUser(user: user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const exisitngUser = await authRepositories.findUser(user.email);
    if (exisitngUser) throw { status: 400, message: "User already exists" };
    const newUser = {...user, password: hashedPassword};
    return authRepositories.createUser(newUser);
}

export async function login(email: string, password: string) {
    const foundUser = await authRepositories.findUser(email);
    const descryptedPassword = await bcrypt.compare(password, foundUser.password);
    if (!descryptedPassword) throw { status : 401 };
    return foundUser;
}
