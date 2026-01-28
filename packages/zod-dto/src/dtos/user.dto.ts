import {z} from "zod";

export const UserDto = z.object({
    id: z.string().uuid(),
    username: z.string().min(3).max(30),
    name : z.string().min(1).max(100),
    password: z.string().min(8),
    createdAt : z.date(),
    updatedAt : z.date().optional(),
});

const CreateUserDto = UserDto.omit({id: true, createdAt: true, updatedAt: true});

const SignInDDto = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(8),
});

export type IUserDto = z.infer<typeof UserDto>;
export type ICreateUserDto = z.infer<typeof CreateUserDto>;
export type ISignInDto = z.infer<typeof SignInDDto>;

export {CreateUserDto, SignInDDto};