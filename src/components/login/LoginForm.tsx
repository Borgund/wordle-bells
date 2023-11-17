import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import styles from "./LoginForm.module.scss";

export const LoginForm = ({ children }: { children: React.ReactNode }) => {
  const {
    isLoggedIn,
    logout,
    loginWithProvider,
    loginEmail,
    registerEmail,
    hasVerifiedEmail,
    requestVerification,
  } = useAuth();

  type FormValues = {
    email: string;
    password: string;
  };

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit = ({ email, password }: FormValues) => {
    loginEmail(email, password);
  };
  const onRegister = ({ email, password }: FormValues) => {
    registerEmail(email, password);
  };

  if (!isLoggedIn()) {
    return (
      <>
        <p>You need to be logged in so santa can keep an eye on you</p>
        <button onClick={() => loginWithProvider("github")}>
          Login with GitHub 🐙
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <fieldset>
            <legend>or with plain good old email</legend>
            <label>
              E-mail
              <input
                type="email"
                placeholder="E-mail"
                {...register("email")}
              ></input>
            </label>
            <label>
              Password
              <input
                type="password"
                placeholder="Password"
                minLength={8}
                {...register("password")}
              ></input>
            </label>
            <button type="submit">Login</button>
            <button type="button" onClick={handleSubmit(onRegister)}>
              or Register
            </button>
          </fieldset>
        </form>
      </>
    );
  } else {
    if (!hasVerifiedEmail) {
      return (
        <>
          Please verify your email:{" "}
          <button onClick={requestVerification}>Send verification email</button>
          or log out: <button onClick={logout}>Logout</button>
        </>
      );
    } else {
      return <>{children}</>;
    }
  }
};
