import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCallback } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";

export const LoginForm = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, loginGithub, loginEmail } = useAuth();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const bindInput = (
    callback: Dispatch<SetStateAction<string | undefined>>,
    { target: { value } }: React.ChangeEvent<HTMLInputElement>
  ) => callback(value);
  if (!isLoggedIn()) {
    return (
      <>
        <p>You need to be logged in so santa can keep an eye on you</p>
        <button onClick={loginGithub}>Login with Github 🐙</button>
        {/*  <p>or with plain good old email</p>
        <input
          type="email"
          value={email}
          onChange={(event) => bindInput(setEmail, event)}
        ></input>
        <input
          type="password"
          value={password}
          onChange={(event) => bindInput(setPassword, event)}
        ></input>
        <button onClick={() => loginEmail("", "")}></button> */}
      </>
    );
  } else {
    return <>{children}</>;
  }
};
