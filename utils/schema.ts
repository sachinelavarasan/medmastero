import { z } from 'zod';
import validator from 'validator';
import errorMap from 'zod/locales/en.js';

enum Gender {
  Male = 'male',
  Famale = 'female',
  Transgender = 'transgender',
}

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

export const ProfileSchema = z.object({
  email: z.string().email('The email you entered is invalid'),
  username: z
    .string()
    .refine(
      (value) => !(value.length && value.includes(' ')),
      'Username should not be include space',
    )
    .optional(),
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
  address: z
    .string()
    .transform((value) => value.replaceAll(' ', ''))
    .pipe(
      z
        .string()
        .min(3, {
          message: 'Please enter your full address',
        })
        .optional(),
    ),
  pincode: z
    .string()
    .transform((value) => value.replaceAll(' ', ''))
    .pipe(
      z.string().length(6, {
        message: 'Please enter your pincode',
      }),
    ),
  state: z.string(),
  district: z.string(),
  gender: z
    .nativeEnum(Gender, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case 'invalid_type':
            return { message: 'Please choose correct gender' };
          case 'invalid_enum_value':
            return { message: 'Please choose correct gender' };
          default:
            return { message: 'Please choose correct gender' };
        }
      },
    })
    .or(z.literal(''))
    .optional(),
});

export const ShopProfileSchema = z.object({
  shopName: z
    .string()
    .transform((value) => value.replaceAll(' ', ''))
    .pipe(
      z.string().min(3, {
        message: 'Shop Name should be atleast 3 letters',
      }),
    ),
  branchCount: z.coerce.number().optional(),
  gstNumber: z
    .string()
    .transform((value) => value.replaceAll(' ', ''))
    .pipe(
      z.string().length(6, {
        message: 'Please enter your GST number',
      }),
    ),
  branches: z.array(
    z.object({
      branchName: z.string(),
      branchMailId: z.string(),
      branchWebsite: z.string(),
      branchLocation: z.string(),
      branchPhoneNo: z
        .string()
        .refine(
          (value) => validator.isMobilePhone(value, ['en-IN'], { strictMode: true }),
          'Type your valid phone number',
        ),
      branchAddress: z
        .string()
        .transform((value) => value.replaceAll(' ', ''))
        .pipe(
          z
            .string()
            .min(3, {
              message: 'Please enter your full address',
            })
            .optional(),
        ),
      branchPincode: z
        .string()
        .transform((value) => value.replaceAll(' ', ''))
        .pipe(
          z.string().length(6, {
            message: 'Please enter your pincode',
          }),
        ),
      branchState: z.string(),
      branchDistrict: z.string(),
    }),
  ),
});
