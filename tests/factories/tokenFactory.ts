import jwt from "jsonwebtoken";
import * as userFactory from "./userFactory";

export async function tokenFactory() {
  const user = userFactory.fakeUserFactory();

  const createdUser = await userFactory.userFactory(user);

  return jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET);
}
