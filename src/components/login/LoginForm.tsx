import React from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "./AuthFlow";
import { useAuth } from "../../hooks/useAuth";
import styles from "./LoginForm.module.scss";

export const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { loginEmail } = useAuth();
  const onSubmit = ({ email, password }: FormValues) => {
    loginEmail(email, password);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <fieldset>
          <legend>Login</legend>
          <label>
            E-mail
            <input
              type="email"
              placeholder="E-mail"
              {...register("email", {
                required: true,
              })}
            ></input>
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 8 })}
            ></input>
          </label>
          <button type="submit">Login</button>
        </fieldset>
      </form>
    </>
  );
};
