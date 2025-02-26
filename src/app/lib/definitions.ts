import { z } from "zod";

export type PostData = {
  id: string;
  content: string;
  time: Date;
  fileNameOne: string;
  fileNameTwo: string;
  fileNameThree: string;
  fileNameFour: string;
};

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  password: z.string().trim(),
});

export const SignUpFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  password: z.string().trim(),
  repeatPassword: z.string().trim(),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SignUpFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        repeatPassword?: string[];
      };
      message?: string;
    }
  | undefined;
