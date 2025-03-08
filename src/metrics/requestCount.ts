import { NextFunction, Request, Response } from 'express';
import client from 'prom-client';

const requestCounter = new client.Counter({
  name: 'http-request_total',
  help: 'Total number of HTTP requests',
  labelNames: ['methods', 'route', 'status_code'],
});

export const requestCountMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  res.on('finish', () => {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);
    requestCounter.inc({
      methods: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
  });
  next();
};
