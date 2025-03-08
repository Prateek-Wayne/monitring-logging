import express from 'express';
import { middleware } from './middleware';
import { requestCountMiddleWare } from './metrics/requestCount';
import client from 'prom-client';

const app = express();
app.use(express.json());
app.use(middleware);
app.use(requestCountMiddleWare);

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

app.get('/metrics', async (req, res) => {
  const metrics = await client.register.metrics();
  res.set('Content-Type', client.register.contentType);
  res.end(metrics);
});

app.listen(3000);
