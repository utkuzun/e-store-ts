import express from 'express';
// import prisma from './db/prismaClient';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

export default app;
