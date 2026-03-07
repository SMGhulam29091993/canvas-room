import { prismaClient } from "@repo/db/dist/index.js";
import { sendResponse } from "@repo/lib/dist/helper.js";
import { NextFunction, Request, Response } from "express";



export const createRoom = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const {slug, capacity} = req.body;
        if(!slug) {
            return sendResponse(res, 400, false, "Slug is required");
        } 
        if (capacity === undefined || capacity === null) {
            return sendResponse(res, 400, false, "Capacity is required");
        }

        const roomData = {
            slug : slug,
            ownerId : req.userId as string,
            isAvailable : true,
            capacity,
        }

        const createdRoom = await prismaClient.room.create({data : roomData});
        if(!createdRoom) {
            return sendResponse(res, 500, false, "Failed to create room");
        }
        sendResponse(res, 201, true, "Room created successfully", createdRoom);
    } catch (error) {
        next(error);
    }
};
