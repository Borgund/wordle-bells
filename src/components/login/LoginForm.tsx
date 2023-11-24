import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import styles from "./LoginForm.module.scss";
import { makeUserName } from "../../utils";
import { useEffect, useState } from "react";

export const LoginForm = ({ children }: { children: React.ReactNode }) => {
  const [emailRegistation, setEmailRegistation] = useState(false);
  const avatarBaseUrl = "https://api.dicebear.com/7.x/big-smile/svg?seed=";
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
    username: string;
    avatar: string;
  };

  const { register, handleSubmit, setValue, reset, watch } =
    useForm<FormValues>();
  const onSubmit = ({ email, password }: FormValues) => {
    loginEmail(email, password);
  };
  const onRegister = ({ email, password, username }: FormValues) => {
    registerEmail(email, password, username);
  };

  useEffect(() => {
    reset();
  }, []);

  if (!isLoggedIn()) {
    return (
      <>
        <p>You need to be logged in so santa can keep an eye on you</p>
        <div className={styles.loginOptions}>
          <button onClick={() => loginWithProvider("github")}>
            Login with GitHub 🐙
          </button>
          {!emailRegistation ? (
            <button onClick={() => setEmailRegistation((old) => !old)}>
              Login with E-mail 📧
            </button>
          ) : (
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
                <button type="submit">Login</button>
                <button onClick={handleSubmit(onRegister)}>or Register</button>
              </fieldset>
            </form>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        {!hasVerifiedEmail ? (
          <>
            Please verify your email:{" "}
            <button onClick={requestVerification}>
              Send verification email
            </button>
            or log out: <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>{children}</>
        )}
      </>
    );
  }
};
