import { Response, Request } from 'express';
import morgan from 'morgan';

morgan.token('body', (req: Request, _res: Response) => {
  if (req.body.password) {
    delete req.body.password;
  }

  if (req.body.newPassword) {
    delete req.body.newPassword;
  }

  if (req.body.oldPassword) {
    delete req.body.oldPassword;
  }
  return JSON.stringify(req.body);
});

export default morgan(
  ':method :url :status :res[content-length] - :response-time ms :body'
);
