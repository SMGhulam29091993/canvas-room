
import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { config } from "@repo/config";
import { Logger } from "../utils/logger";
import { sendResponse } from "../lib/helper";

export type userId = string;

export const authMiddleware = (req : Request, res : Response, next : NextFunction) => {
    try {

        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return sendResponse(res, 401, false, 'Unauthorized Action', null, 'No token provided');
        }

        //verifying the token logic goes here
        const decodedToken = jwt.verify(token, config.jwtSecret) as { userId: userId };
        if (!decodedToken) {
            return sendResponse(res, 401, false, 'Unauthorized Action', null, 'Invalid token');
        }
        req.userId = decodedToken.userId as userId;
        next();

    } catch (error) {
        Logger.error('Error in auth middleware:', error);
        const errorMessage = error instanceof Error ? error.message : 'Authorization error';
        return sendResponse(res, 500, false, 'Auth Error', null, errorMessage );
    }
}