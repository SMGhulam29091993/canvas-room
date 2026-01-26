import { Response } from "express";

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
