import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AppRequest extends Request {
  auth?: Record<string, any>; // Adjust fields as needed
}

export const authMiddleWare = (
  req: AppRequest,
  res: Response,
  next: Function
) => {
  try {
    const authHeader = req.header('Authorization');
    const [, token] = authHeader?.split(' ') || [];
    req.auth = jwt.verify(token, process.env.JWT_SECRET!) as Record<
      string,
      any
    >;

    if (req.auth) next();
    else res.status(401).send({ error: "You're logged out" });
  } catch (err) {
    res.status(401).send({ error: 'Invalid token received' });
  }
};
