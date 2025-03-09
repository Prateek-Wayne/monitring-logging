import express from 'express';
import { middleware } from './middleware';
import { requestCountMiddleWare } from './metrics/requestCount';
import client from 'prom-client';
import { requuestGaugeMiddleware } from './metrics/requestGauge';
import { requestHistoGramMiddleWare } from './metrics/requestHistorgram';
import { getRandomNumber } from './dice';
import winston, { log } from 'winston';

const logger = winston.createLogger();

const app = express();
app.use(express.json());
app.use(middleware);
app.use(requestCountMiddleWare);
app.use(requuestGaugeMiddleware);
app.use(requestHistoGramMiddleWare);

app.get('/user', (req, res) => {
  res.send({
    name: 'Prateek Verma',
    age: '23',
  });
});

app.post('/user', (req, res) => {
  const user = req.body;
  res.send({
    ...user,
    id: Math.random() * 0.1,
  });
});

app.get('/rolldice', (req, res) => {
  res.send(getRandomNumber(1, 6).toString());
});

app.get('/metrics', async (req, res) => {
  const metrics = await client.register.metrics();
  res.set('Content-Type', client.register.contentType);
  res.end(metrics);
});

app.listen(3000, () => {
  logger.info('Listening for request on http:localhost:3000');
});
