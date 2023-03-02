import { Request, Response, RequestHandler } from 'express';

export const getlAllProducts: RequestHandler = (
  _req: Request,
  res: Response
) => {
  res.send('get all products');
  return;
};

export const getSingleProduct: RequestHandler = (
  _req: Request,
  res: Response
) => {
  res.send('get single products');
  return;
};

export const createProduct: RequestHandler = (_req: Request, res: Response) => {
  res.send('create products');
  return;
};

export const updateProduct: RequestHandler = (_req: Request, res: Response) => {
  res.send('update products');
  return;
};

export const deleteProduct: RequestHandler = (_req: Request, res: Response) => {
  res.send('get all products');
  return;
};

export const uploadImage: RequestHandler = (_req: Request, res: Response) => {
  res.send('upload image to products');
  return;
};
