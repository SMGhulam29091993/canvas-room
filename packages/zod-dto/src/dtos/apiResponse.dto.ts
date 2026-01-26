import { z } from "zod";

export const ApiResponseDto = z.object({
  statusCode: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: z.any().nullable().optional(),
  error: z.any().nullable().optional(),
});

export type { IApiResponse } from "@repo/lib";
