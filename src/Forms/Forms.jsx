import { useFormik } from "formik";
import * as Yup from "yup";

import s from "./Forms.module.css";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const RegistrationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").required("Required"),
  number: Yup.string()
    .matches(phoneRegExp, "invalid number")
    .required("Required"),
});

export default function Forms({ getSubmit }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
    },
    validationSchema: RegistrationSchema,

    onSubmit: (values, { resetForm }) => {
      getSubmit(values);
      resetForm();
    },
  });

  return (
    <div className={s.inputContainer}>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.inputContainer}>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className={s.input}
            autoComplete="off"
          />
          {formik.errors.name}
          <label htmlFor="name" className={s.label}>
            Name:
          </label>
        </div>
        <div className={s.inputContainer}>
          <input
            type="tel"
            name="number"
            onChange={formik.handleChange}
            value={formik.values.number}
            className={s.input}
          />
          {formik.errors.number}
          <label className={s.label}>Number:</label>
        </div>
        <button type="submit" className={s.borderButton}>
          add contact
        </button>
      </form>
    </div>
  );
}
