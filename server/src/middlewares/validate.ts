import type { NextFunction, Request, Response } from 'express'
import { AnyZodObject, z } from 'zod'

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const BodySchema = z.object({
      body: schema,
    })

    const parsed = await BodySchema.safeParseAsync({ body: req.body })

    if (!parsed.success) {
      throw parsed.error
    }

    return next()
  }
