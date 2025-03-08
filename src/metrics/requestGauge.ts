import { NextFunction, Request, Response } from 'express';
import client from 'prom-client';

const activeRequestGauge = new client.Gauge({
  name: 'active_requests',
  help: 'Number of active requests',
  labelNames: ['methods', 'route', 'status_code'],
});

export const requuestGaugeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  activeRequestGauge.inc({
    methods: req.method,
    route: req.route ? req.route.path : req.path,
    status_code: res.statusCode,
  });
  res.on('finish', () => {
    activeRequestGauge.dec({
      methods: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
  });
  next();
};
