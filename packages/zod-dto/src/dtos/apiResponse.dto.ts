import {z} from "zod";

export const ApiResponseDto = z.object({
    statusCode: z.number(),
    success: z.boolean(),
    message: z.string(),
    data: z.any().nullable().optional(),
    error: z.any().nullable().optional(),
});

export type IApiResponse<T = any> = z.infer<typeof ApiResponseDto> & {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T | null;
    error?: T | null;
};