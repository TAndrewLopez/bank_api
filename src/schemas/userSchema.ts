import * as yup from "yup";

const registerSchema = yup.object({
  firstName: yup.string().lowercase().trim().required(),
  lastName: yup.string().lowercase().trim().required(),
  email: yup.string().email().lowercase().trim().required(),
  password: yup.string().min(6).trim().required(),
});

const loginSchema = yup.object({
  email: yup.string().lowercase().trim().required(),
  password: yup.string().trim().required(),
});

const forgotPasswordSchema = yup.object({
  email: yup.string().lowercase().trim().required(),
});

const resetPasswordSchema = yup.object({
  code: yup.string().trim().required(),
  email: yup.string().email().lowercase().trim().required(),
  password: yup.string().min(6).trim().required(),
});

const ValidationSchema = {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema
};

export default ValidationSchema;
