import {z} from 'zod';

export const RoomDto = z.object({
    id : z.uuid(),
    slug : z.string().min(1).max(100),
    capacity : z.number().int().min(1),
    isAvailable : z.boolean().default(true).optional(),
    ownerId : z.string().min(1).max(50),
    chats : z.array(z.string()).default([]),
    createdAt : z.date().default(() => new Date()),
    updatedAt : z.date().optional(),
});

export const CreateRoomDto = RoomDto.omit({id: true, createdAt: true, updatedAt: true});

export type IRoomDto = z.infer<typeof RoomDto>; 
export type ICreateRoomDto = z.infer<typeof CreateRoomDto>;