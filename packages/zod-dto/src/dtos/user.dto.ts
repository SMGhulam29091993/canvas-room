import {z} from "zod";

export const UserDto = z.object({
    id: z.uuid(),
    email: z.string().min(3).max(30),
    name : z.string().min(1).max(100).optional(),
    password: z.string().min(8),
    chats : z.array(z.number()).optional(),
    rooms : z.array(z.number()).optional(),
    createdAt : z.date(),
    updatedAt : z.date().optional(),
});

const CreateUserDto = UserDto.omit({id: true, createdAt: true, updatedAt: true});

const SignInDto = z.object({
    email: z.string().min(3).max(30),
    password: z.string().min(8),
});

export type IUserDto = z.infer<typeof UserDto>;
export type ICreateUserDto = z.infer<typeof CreateUserDto>;
export type ISignInDto = z.infer<typeof SignInDto>;

export {CreateUserDto, SignInDto};