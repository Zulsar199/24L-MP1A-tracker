import * as Yup from "yup";
import { z } from "zod";

export const recordSchema = z.object({
  type: z
    .enum(["EXP", "INC"], {
      invalid_type_error: "Type must be 'EXP' or 'INC'",
    }),
  amount: z
    .number()
    .nonnegative("Amount cannot be negative")
    .refine((val) => val > 0, {
      message: "Amount must be greater than 0",
    }),
  category_id: z.string().nonempty("Category is required"),
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
  payee: z.string().nonempty("Payee is required"),
  note: z.string().optional(),
});

export const validateFormik = (values) => {
  try {
    recordSchema.parse(values);
    return {}; // No errors
  } catch (err) {
    const errors = {};
    err.errors.forEach(({ path, message }) => {
      if (path.length) {
        errors[path[0]] = message;
      }
    });
    return errors;
  }
};

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required *"),
  password: Yup.string()
    // .min(8, "Password must be at least 8 characters")
    .required("Password is required *"),
});

export const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required *"),
  email: Yup.string().email("Invalid email").required("Email is required *"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required *"),
  rePassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
export const amountSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required *"),
});
export const categorySchema = Yup.object().shape({
  title: Yup.string().required("Category name is required"),
});
