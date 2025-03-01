import { Request, Response } from 'express';
import { db } from './utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { signupSchema } from './utils/schemas';
import { httpErrorResponse, throwHttpError } from './utils/error';
import HttpError from './utils/HttpError';

import { sendMessage } from 'shared/build/streams.js';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = await signupSchema
      .validate(req.body)
      .catch(throwHttpError(400));

    const [exists] = await db('auth_users').where({ email });

    if (exists) throw new HttpError(400, 'An account exists with this email');

    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await db('auth_users').insert({
      email,
      name,
      password: hashedPassword,
    });

    sendMessage('auth.signup', { email, name, id: userId });

    res.status(201).json({ msg: 'User created successfully', userId });
  } catch (err) {
    httpErrorResponse(res, err);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await db('auth_users').where({ email }).first();

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new HttpError(401, 'Invalid credentials');

    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    console.log(user);
    sendMessage('auth.login', user);

    res.json({ msg: 'Login successful', token });
  } catch (err) {
    httpErrorResponse(res, err);
  }
};

export const logout = async (req: Request, res: Response) => {
  // Usually, logout involves token management on the client side
  res.json({ msg: 'Logged out successfully' });
};
