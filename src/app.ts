import express from 'express';
require('express-async-errors');
import cookieParser from 'cookie-parser';

// import prisma from './db/prismaClient';
import morgan from './middleware/morgan';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';

import authRouter from './routes/authRoute';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan);

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/v1/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
