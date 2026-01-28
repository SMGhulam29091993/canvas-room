import {z} from 'zod';

export const RoomDto = z.object({
    id : z.uuid(),
    name : z.string().min(1).max(100),
    capacity : z.number().int().min(1).optional(),
    isAvailable : z.boolean().default(true),
    createdBy : z.string().min(1).max(50),
    createdAt : z.date().default(() => new Date()),
    updatedAt : z.date().optional(),
});

export const CreateRommDto = RoomDto.omit({id: true, createdAt: true, updatedAt: true});

export type IRoomDto = z.infer<typeof RoomDto>; 
export type ICreateRoomDto = z.infer<typeof CreateRommDto>;