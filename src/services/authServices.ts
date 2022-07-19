import * as authRepositories from '../repositories/authRepositories.js';
import { user } from '../schemas/authSchemas.js';
import bcrypt from 'bcrypt';

export async function createUser(user: user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = {...user, password: hashedPassword};
    return authRepositories.createUser(newUser);
}
