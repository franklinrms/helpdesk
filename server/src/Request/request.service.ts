import prisma from "../../prisma/prisma";
import createNewMessage from "../Chat/chat.service";
import { ErrorTypes } from "../errors/catalog";
import { IRequest } from "./request.interfaces";

const read = async (type: string): Promise<IRequest[]> =>  await prisma.request.findMany(
    {
        where:{
            status:{
                [type]: "DONE",
            }
        }
    }
);

const readByUser = async (customerId: string, type: string): Promise<IRequest[]> =>  (
    await prisma.request.findMany(
        {
            where:{
                customerId,
                status:{
                    [type]: "DONE",
                }
            }
        }
    )
);

const readOne = async (id: string): Promise<IRequest> => {
    const request = await prisma.request.findUnique(
        {
            where: {
                id,
            },
            select: {
                title: true,
                status: true,
                assessment: true,
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
    await createNewMessage({
        message,
        requestId: newRequest.id,
        userId: customerId,
    })
    // socket.emit('update', '');
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

const assessment = async (id: string, assessment: string): Promise<void> => {
    const thereIsRequest = await readOne(id);
    if (thereIsRequest === null) throw new Error(ErrorTypes.EntityNotFound);

    await prisma.request.update({
        where: {
            id,
        },
        data: {
            assessment,
        }
    });
}

export default { read, readByUser, readOne, create, inProgress, done, assessment }
