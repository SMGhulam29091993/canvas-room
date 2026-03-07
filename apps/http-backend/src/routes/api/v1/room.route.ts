import { CreateRoomDto, zodValidator } from "@repo/zod-dto/dist/index.js";
import express from "express";
import { createRoom } from "src/controller/room.controller.js";
import { authMiddleware } from "src/middleware/auth.middleware.js";

const route : express.Router = express.Router();

route.post("/create", authMiddleware, zodValidator(CreateRoomDto), createRoom);

export default route;