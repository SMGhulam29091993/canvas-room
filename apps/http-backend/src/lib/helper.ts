import { Response } from 'express';
import { ApiResponse } from '../interface/IResponse.interface';

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T | null,
  error?: T | null
): Response => {
  const resposne: ApiResponse<T> = {
    statusCode,
    success,
    message,
    data: data || null,
    error: error || null,
  };
  return res.status(statusCode).json(resposne);
};
