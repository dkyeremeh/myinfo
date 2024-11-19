import yup from 'yup';

export const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .noUnknown();

export const signupSchema = loginSchema
  .concat(
    yup.object({
      repassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required(),
    })
  )

  .noUnknown();
