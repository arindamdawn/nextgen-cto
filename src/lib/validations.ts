import { z } from "zod";

// Waitlist form validation schema
export const waitlistFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  name: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

export type WaitlistFormData = z.infer<typeof waitlistFormSchema>;

// Form validation helper functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Form submission states
export type FormSubmissionState = 'idle' | 'loading' | 'success' | 'error';

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  data?: unknown;
}