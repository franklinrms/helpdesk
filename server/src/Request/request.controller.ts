import { Request, Response  } from 'express';
import requestService from './request.service';

const unauthorized = 'You are not authorized to perform this action'


const create = async (req: Request, res: Response): Promise<Response> => {
    const { title, message } = req.body;
    const { user } = res.locals;

    const response = await requestService.create(title, message, user.id);

    return res.status(201).json(response);
};

const readAll = async (_req: Request, res: Response): Promise<Response> => {
    // const { user } = res.locals;

    // if (user.role === 'USER') {
    //     return res.status(403).json({ message: unauthorized });
    // }
    const response = await requestService.readAll();

    return res.status(200).json(response);
}

const readOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const response = await requestService.readOne(id);

    return res.status(200).json(response);
}

const requestInProgress = async (req: Request, res: Response): Promise<Response> => {
    const { user } = res.locals;

    console.log("🚀 ~ file: request.controller.ts:42 ~ requestInProgress ~ req.params.id", req.params.id)
    if (user.role === 'USER') {
        return res.status(403).json({ message: unauthorized });
    }
    await requestService.inProgress(req.params.id);

    return res.sendStatus(200);
}

const requestDone = async (req: Request, res: Response): Promise<Response> => {
    const { user } = res.locals;

    if (user.role === 'USER') {
        return res.status(403).json({ message: unauthorized });
    }
    await requestService.done(req.params.id);

    return res.sendStatus(200);
}

export default { create, readAll, readOne, requestInProgress, requestDone };
