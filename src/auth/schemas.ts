import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(8)
  .max(100)
  .transform((str) => str.trim())

export const phone = z
  .string()
  .min(10)
  .max(16)
  .transform((str) => str.trim())
  .transform((str) => str.replace(/\s/g, ""))

export const name = z
  .string()
  .min(5)
  .max(32)
  .transform((str) => str.trim())

export const Signup = z.object({
  email,
  password,
  phone,
  name,
})

export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
