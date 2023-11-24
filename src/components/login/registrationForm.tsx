import { useForm } from "react-hook-form";
import { FormValues } from "./AuthFlow";
import styles from "./LoginForm.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { makeUserName } from "../../utils";
import { useEffect } from "react";

export const RegistrationForm = () => {
  const avatarBaseUrl = "https://api.dicebear.com/7.x/big-smile/svg?seed=";

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormValues>();

  const onSubmit = ({ email, password, username }: FormValues) => {
    registerEmail(email, password, username);
  };

  const { registerEmail } = useAuth();

  useEffect(() => {
    reset();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <fieldset>
        <legend>or with plain good old e-mail</legend>
        <img
          src={avatarBaseUrl + watch("username")}
          className={styles.avatar}
        />
        <label title="username">
          My santa name
          <input
            type="text"
            readOnly
            {...register("username", {
              required: true,
              value: makeUserName(),
            })}
          ></input>
          <div>
            <button
              onClick={() => {
                setValue("username", makeUserName());
              }}
            >
              🔀
            </button>
          </div>
        </label>
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
        <button type="submit">Register</button>
      </fieldset>
    </form>
  );
};
