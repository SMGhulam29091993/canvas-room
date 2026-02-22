import { Response } from "express";
import * as jwt from 'jsonwebtoken';
import { config } from '@repo/config';

export interface IApiResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T | null;
  error?: T | null;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T | null,
  error?: T | null,
): Response => {
  const response: IApiResponse<T> = {
    statusCode,
    success,
    message,
    data: data ?? null,
    error: error ?? null,
  };
  return res.status(statusCode).json(response);
};




export const genrateToken = (userId : string) : { accessToken: string, refreshToken: string } => {
  const payload = { userId };
  const secretKey = config.jwtSecret;
  const refreshSecretKey = config.refreshJwtSecret;

  const accessToken = jwt.sign(payload, secretKey, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, refreshSecretKey, { expiresIn: '7d' });
  
  return { accessToken, refreshToken };
}
