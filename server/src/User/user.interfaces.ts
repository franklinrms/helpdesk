export interface IUser {
    id: string;
    email?: string;
    password?: string;
    name: string;
    role: string;
}

export interface ILoginInputs {
    email: string;
    password: string;
}

export interface IRegisterInputs extends ILoginInputs {
    name: string;
    role?: string;
}
