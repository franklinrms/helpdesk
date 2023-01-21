import { Request, Response, Router } from 'express';
import prisma from '../../prisma/prisma';


const router = Router();


router.get('/', (_req: Request, res: Response) => res.json({ on: "ok" }));

router.post('/requests', async (req: Request, res: Response) => {
    const { title, customerId, message } = req.body;
    const request = await prisma.request.create({
        data: {
            title,
            customerId,
        }
    });
    await prisma.message.create({
        data: {
            message,
            requestId: request.id,
            userId: customerId,
        }
    });
    return res.status(201).json(request);
} )


export default router;
