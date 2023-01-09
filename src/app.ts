import express from 'express';
require('express-async-errors');
// import prisma from './db/prismaClient';
import morgan from './middleware/morgan';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(morgan);

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use(notFound);
app.use(errorHandler);

export default app;
