import { Request, Response  } from 'express';
import userService from './user.service';


const create = async (req: Request, res: Response): Promise<Response> => {
    const token = await userService.createNewUser(req.body);
    return res.status(201).json(token);
};

const find = async (req: Request, res: Response): Promise<Response> => {
    const response = await userService.findUser(req.body);
    return res.status(200).json(response);
};

const validate = (_req: Request, res: Response): Response => {
    const { user } = res.locals;

    return res.status(200).json({
        userId: user.id,
        name: user.name,
        role: user.role,
    });
};

export default { create, find, validate};
