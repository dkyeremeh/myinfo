import { object, ref, string } from 'yup';
export const loginSchema = object({
    email: string().email().required(),
    name: string().min(5).required(),
    password: string().min(6).required(),
}).noUnknown();
export const signupSchema = loginSchema
    .concat(object({
    repassword: string()
        .oneOf([ref('password')], 'Passwords must match')
        .required(),
}))
    .noUnknown();
