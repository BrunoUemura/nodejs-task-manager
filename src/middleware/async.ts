import { NextFunction, Request, Response } from 'express';

const asyncWrapper = (fn: any) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await fn(request, response, next);
    } catch (error) {
      next(error);
    }
  };
};

export { asyncWrapper };
