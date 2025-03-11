import { z } from "zod";

export type PostData = {
  id: string;
  content: string;
  time: Date;
  fileOne: FileEssential;
  fileTwo: FileEssential;
  fileThree: FileEssential;
  fileFour: FileEssential;
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

export type ClassName = string;

export const FileTypes = {
  Other: 0,
  Image: 1,
  Video: 2,
};

export type FileEssential = {
  url: string;
  name: string;
  type: number;
};
