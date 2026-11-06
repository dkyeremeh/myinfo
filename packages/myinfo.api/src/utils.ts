import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { INTERNAL_API_KEY_HEADER } from 'shared/build/http';

export interface AppRequest extends Request {
  auth?: Record<string, any>; // Adjust fields as needed
}

export const requireInternalKey = (req: Request, res: Response, next: Function) => {
  if (req.header(INTERNAL_API_KEY_HEADER) !== process.env.INTERNAL_API_KEY) {
    res.status(401).send({ error: 'Invalid internal API key' });
    return;
  }
  next();
};

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
    console.log(err);
    res.status(401).send({ error: 'Invalid token received' });
  }
};
