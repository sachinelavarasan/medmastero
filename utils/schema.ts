import { z } from 'zod';
import validator from 'validator';

export const LoginSchema = z.object({
  email: z.string().email('The email you entered is invalid'),
  password: z.string().min(8, {
    message: 'Password should be atleast 8 characters',
  }),
});

export const SignUpSchema = z.object({
  email: z.string().email('The email you entered is invalid'),
  name: z.string().min(3, {
    message: 'Name should be atleast 3 letters',
  }),
  phone: z
    .string()
    .refine(
      (value) => validator.isMobilePhone(value, ['en-IN'], { strictMode: true }),
      'Type your valid phone number',
    ),
  otp: z.string().length(6, {
    message: 'Please enter your 6 digit otp',
  }),
  password: z.string().min(8, {
    message: 'Password should be atleast 8 characters',
  }),
});
