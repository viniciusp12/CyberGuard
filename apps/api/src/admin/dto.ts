import { z } from "zod";
import { UsernameSchema } from "../auth/dto";

export const CreateEmployeeDto = z.object({
  username: UsernameSchema,
  displayName: z.string().min(1),
  department: z.string().min(1).optional(),
});
export type CreateEmployeeDto = z.infer<typeof CreateEmployeeDto>;
