import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { logger } from '../config/logger';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method
  });

  if (error instanceof HttpException) {
    return res.status(error.status).json({
      status: 'error',
      message: error.message
    });
  }

  if (error.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      status: 'error',
      message: 'Database operation failed'
    });
  }

  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  });
};