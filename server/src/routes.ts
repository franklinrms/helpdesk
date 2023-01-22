import {  Router } from 'express';
import userRoutes from './User/user.routes';
// import prisma from '../../prisma/prisma';


const router = Router();


router.use('/', userRoutes)


export default router;


// router.get('/requests', async (_req: Request, res: Response) => {
//     const request = await prisma.request.findMany();

//     return res.status(200).json(request);
// });

// router.get('/requests/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const messages = await prisma.message.findMany(
//         {
//             where: {
//                 requestId: id,
//             },
//         }
//     );

//     return res.status(200).json(messages);
// });
// router.post('/requests', async (req: Request, res: Response) => {
//     const { title, customerId, message } = req.body;
//     const request = await prisma.request.create({
//         data: {
//             title,
//             customerId,
//         }
//     });
//     await prisma.message.create({
//         data: {
//             message,
//             requestId: request.id,
//             userId: customerId,
//         }
//     });
//     return res.status(201).json(request);
// } )


