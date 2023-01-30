import prisma from "../../prisma/prisma";
import { IMessage } from "../Request/request.interfaces";

const createNewMessage = async ({ message, requestId, userId }: IMessage): Promise<IMessage> => {
    return await prisma.message.create({
        data: {
            message,
            requestId,
            userId,
        }
    });
};

export default createNewMessage;
