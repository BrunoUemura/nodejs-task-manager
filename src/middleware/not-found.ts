import { Request, Response } from 'express';

const notFound = (request: Request, response: Response) => response.status(404).send('Route does not exist');

export { notFound };
