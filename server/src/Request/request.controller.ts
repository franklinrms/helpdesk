import { Request, Response  } from 'express';
import requestService from './request.service';

const unauthorized = 'You are not authorized to perform this action'


const create = async (req: Request, res: Response): Promise<Response> => {
    const { title, message } = req.body;
    const { user } = res.locals;

    const response = await requestService.create(title, message, user.id);

    return res.status(201).json(response);
};

const readAll = async (req: Request, res: Response): Promise<Response> => {
    const { filter } = req.query;
    const { user } = res.locals;

    if (user.role === 'USER') {
        const response = await requestService
            .readByUser(user.id, filter === 'DONE' ? 'equals' : 'not');
        return res.status(200).json(response);
    }
    const response = await requestService.read(filter === 'DONE' ? 'equals' : 'not');

    return res.status(200).json(response);
}

const readOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const response = await requestService.readOne(id);

    return res.status(200).json(response);
}

const requestInProgress = async (req: Request, res: Response): Promise<Response> => {
    const { user } = res.locals;

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
const requestAssessment = async (req: Request, res: Response): Promise<Response> => {
    const { assessment } = req.query;

    await requestService.assessment(req.params.id, assessment as string);

    return res.sendStatus(200);
}

export default { create, readAll, readOne, requestInProgress, requestDone, requestAssessment };
