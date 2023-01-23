import prisma from "../../prisma/prisma";
import { ErrorTypes } from "../errors/catalog";
import { IRequest } from "./request.interfaces";


const readAll = async (): Promise<IRequest[]> =>  await prisma.request.findMany();

const readOne = async (id: string): Promise<IRequest> => {
    const request = await prisma.request.findUnique(
        {
            where: {
                id,
            },
            select: {
                title: true,
                status: true,
                customer: {
                    select: { name : true, id: true },
                },
                messages: true,
            },
        }
    );
    if (request === null) throw new Error(ErrorTypes.EntityNotFound);
    return request;
};

const create = async (title: string, message: string, customerId: string): Promise<string> => {
    const newRequest = await prisma.request.create({
        data: {
            title,
            customerId,
        }
    });
    await prisma.message.create({
        data: {
            message,
            requestId: newRequest.id,
            userId: customerId,
        }
    });
    return newRequest.id;
};

const inProgress = async (id: string): Promise<void> => {
    const thereIsRequest = await readOne(id);
    if (thereIsRequest === null) throw new Error(ErrorTypes.EntityNotFound);

    await prisma.request.update({
        where: {
            id,
        },
        data: {
            status: "IN_PROGRESS",
        }
    });
}

const done = async (id: string): Promise<void> => {
    const thereIsRequest = await readOne(id);
    if (thereIsRequest === null) throw new Error(ErrorTypes.EntityNotFound);

    await prisma.request.update({
        where: {
            id,
        },
        data: {
            status: "DONE",
        }
    });
}

export default { readAll, readOne, create, inProgress, done }