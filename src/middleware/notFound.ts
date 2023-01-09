import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) =>
  res.status(404).send(`${req.url} not found!!`);

export default notFound;
