import app from './app';

const PORT = 5000;

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server is running pn ${PORT}`);
  });
};

start();
