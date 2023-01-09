import express from 'express';
// import prisma from './db/prismaClient';
import morgan from './middleware/morgan';

const app = express();

app.use(express.json());
app.use(morgan);

app.get('/ping', (_req, res) => {
  res.send('pong');
});

export default app;
