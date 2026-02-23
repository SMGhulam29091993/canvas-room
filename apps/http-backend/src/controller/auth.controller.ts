import { prismaClient } from '@repo/db';
import { sendResponse } from '@repo/lib';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await prismaClient.user.findUnique({ where: { email } });
    if (existingUser) {
      return sendResponse(res, 400, true, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      email,
      password: hashedPassword,
    }

    const newUser = await prismaClient.user.create({
      data: userData,
    });

    if (!newUser) sendResponse(res, 400, false, 'Failed to create user');

    sendResponse(res, 201, false, 'User created successfully', { userId: newUser.id });

  } catch (error) {
    next(error);
  }
};


export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) {
      return sendResponse(res, 400, true, 'Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, 400, true, 'Invalid email or password');
    }

    sendResponse(res, 200, false, 'Sign in successful', { userId: user.id });
  } catch (error) {
    next(error);
  }
};
