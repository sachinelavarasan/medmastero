import { z } from 'zod';
import validator from 'validator';

export const LoginSchema = z.object({
  email: z.string().email('The email you entered is invalid'),
  password: z.string(),
});

export const SignUpSchema = z.object({
  email: z.string().email('The email you entered is invalid'),
  name: z
    .string()
    .transform((value) => value.replaceAll(' ', ''))
    .pipe(
      z.string().min(3, {
        message: 'Name should be atleast 3 letters',
      }),
    ),
  phone: z
    .string()
    .refine(
      (value) => validator.isMobilePhone(value, ['en-IN'], { strictMode: true }),
      'Type your valid phone number',
    ),
  otp: z
    .string()
    .transform((value) => value.replaceAll(' ', ''))
    .pipe(
      z.string().length(6, {
        message: 'Please enter your 6 digit otp',
      }),
    ),
  password: z
    .string()
    .transform((value) => value.replaceAll(' ', ''))
    .pipe(
      z.string().min(8, {
        message: 'Password should be atleast 8 characters',
      }),
    ),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('The email you entered is invalid'),
});

export const ResetPasswordOtpSchema = z.object({
  otp: z
    .string()
    .transform((value) => value.replaceAll(' ', ''))
    .pipe(
      z.string().length(6, {
        message: 'Please enter your 6 digit otp',
      }),
    ),
});
export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .transform((value) => value.replaceAll(' ', ''))
      .pipe(
        z.string().min(8, {
          message: 'Password should be atleast 8 characters',
        }),
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });
