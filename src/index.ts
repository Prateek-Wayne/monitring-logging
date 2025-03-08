import express from 'express';
import { middleware } from './middleware';

const app = express();
app.use(express.json());
app.use(middleware);

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

app.listen(3000);
