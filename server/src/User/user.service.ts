import md5 from 'md5';
import prisma from "../../prisma/prisma";
import generateToken from "../utils/generateToken";
import { ErrorTypes } from "../errors/catalog";
import { ILoginInputs, IRegisterInputs, IUser } from "./user.interfaces";

const getUserByEmail = async (email: string): Promise<IUser | null>  => await prisma.user
    .findFirst({
        where: {
            email: {
            equals: email,
    } },
});

const findUser = async ({ email, password }: ILoginInputs): Promise<string> => {
    const user = await getUserByEmail(email);
    if (user === null) throw new Error(ErrorTypes.EntityNotFound);

    if (user.password === md5(password)) {
      return generateToken({
        id: user.id,
        name: user.name,
        role: user.role,
      });
    } throw new Error(ErrorTypes.EntityNotFound);
};

const createNewUser = async ({ email, password, name, role }: IRegisterInputs): Promise<string> => {
    const emailAlreadyRegistered = await getUserByEmail(email);

    if (emailAlreadyRegistered !== null) throw new Error(ErrorTypes.EmailInvalid);

    const user:IUser = await prisma.user.create({ data: {
        email,
        password: md5(password),
        name,
        role: role ?? 'USER',
      },
    });

    return generateToken({
        id: user.id,
        name: user.name,
        role: user.role,
    });
};

export default { findUser, createNewUser };
