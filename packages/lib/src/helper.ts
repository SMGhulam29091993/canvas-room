import { Response } from "express";
import * as jwt from 'jsonwebtoken';
import { config } from '@repo/config';
import * as crypto from 'crypto';

// Interface for standardized API response
export interface IApiResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T | null;
  error?: T | null;
}

// Helper function to send a standardized API response
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

// Function to generate access and refresh tokens for a given user ID
export const genrateToken = (userId : string) : { accessToken: string, refreshToken: string } => {
  const payload = { userId };
  const secretKey = config.jwtSecret;
  const refreshSecretKey = config.refreshJwtSecret;

  const accessToken = jwt.sign(payload, secretKey, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, refreshSecretKey, { expiresIn: '7d' });
  
  return { accessToken, refreshToken };
}

//generate random code of given length using crypto
export const generateRandomCode = (length: number) => {
  let min = 10 ** (length - 1);
  let max = 10 ** length;
  return crypto.randomInt(min, max ).toString();
}
