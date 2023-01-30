import { Router } from 'express';
import userRoutes from './User/user.routes';
import requestRoutes from './Request/request.routes';


const router = Router();


router.use('/', userRoutes)
router.use('/request', requestRoutes)

export default router;
