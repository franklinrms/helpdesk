/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import requestController from './request.controller';
import validateToken from '../middlewares/validateToken';

const requestRoute = Router();

requestRoute.post('/', validateToken, requestController.create);
requestRoute.get('/', validateToken, requestController.readAll);
requestRoute.get('/:id', validateToken, requestController.readOne);
requestRoute.patch('/:id/progress', validateToken, requestController.requestInProgress);
requestRoute.patch('/:id/done', validateToken, requestController.requestDone);
requestRoute.patch('/:id/assessment', validateToken, requestController.requestAssessment);


export default requestRoute;
