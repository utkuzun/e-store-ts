import app from './app';
import { PORT } from './utils/config';

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

start();
