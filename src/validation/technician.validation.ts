import z from "zod";

export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const MAX_ADDITIONAL_FILES = 5;

export const MAX_BIO_LENGTH = 1000;

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

export function isAcceptedFileSize(fileSize: number) {
  return fileSize <= MAX_FILE_SIZE_BYTES;
}

export function isAcceptedFileType(fileType: string) {
  return ACCEPTED_FILE_TYPES.includes(fileType);
}

export const getCustomFileSchema = <T>(message: string) =>
  z.custom<T>(
    (value) =>
      value === null ||
      (value instanceof File &&
        isAcceptedFileSize(value.size) &&
        isAcceptedFileType(value.type)),
    {
      message,
    },
  );

export const technicianApplicationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters long"),

  email: z.email("Please enter a valid email address"),

  phone: z.string().trim().min(5, "Contact number is invalid"),

  address: z.string().trim(),

  experienceYears: z
    .string()
    .trim()
    .refine((value) => /^\d+$/.test(value), {
      message: "Years of experience must be whole value",
    })
    .refine((value) => Number(value) >= 0, {
      message: "Years of experience cannot be negative",
    }),

  bio: z
    .string()
    .trim()
    .max(MAX_BIO_LENGTH, `Bio cannot exceed ${MAX_BIO_LENGTH} characters`),

  resume: getCustomFileSchema<File | null>(
    `Resume must be a PDF, DOC, DOCX or an image file under ${MAX_FILE_SIZE}MB`,
  ).refine((value) => value instanceof File, {
    message: "A resume or CV is required",
  }),
});


export const updateTechnicianProfileSchema = z.object({
  address: z.string().trim().min(5, "Address must be at least 5 characters long"),
  bio: z.string().trim().max(1000, "Bio cannot exceed 1000 characters"),
  contactNumber: z.string().trim().min(5, "Contact number is invalid"),
  experienceYears: z.number().int().min(0, "Experience years cannot be negative"),
});