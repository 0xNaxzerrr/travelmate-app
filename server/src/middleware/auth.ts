import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { config } from '../config';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token required');
    }

    const decoded = jwt.verify(token, config.jwt.secret) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedException('Invalid token'));
  }
};