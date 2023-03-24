import express from 'express';
require('express-async-errors');
import cookieParser from 'cookie-parser';
// import fileUpload from 'express-fileupload';

// import prisma from './db/prismaClient';
import morgan from './middleware/morgan';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';

import authRouter from './routes/authRoute';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';
import { JWT_SECRET } from './utils/config';

const app = express();

app.use(express.json());
app.use(cookieParser(JWT_SECRET));
app.use(morgan);

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
