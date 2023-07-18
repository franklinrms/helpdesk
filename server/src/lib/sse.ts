import { Response } from 'express'

export function prepStream(res: Response) {
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')
  res.flushHeaders()

  res.on('close', () => {
    res.end()
  })
}

export function sendEvent(res: Response, event: string, data: {}) {
  res.write(`id: ${Math.floor(Date.now() * Math.random()).toString(36)}\n`)
  res.write(`event: ${event}\n`)
  res.write(`data: ${JSON.stringify(data)}\n\n`)
  res.flush()
}
