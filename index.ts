import express from 'express';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

const start = () => {
  app.listen(5000, () => {
    console.log('app running on port');
  });
};

start();
