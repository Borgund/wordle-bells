import { useAuth } from "../../hooks/useAuth";
import styles from "./LoginForm.module.scss";
import { useState } from "react";
import { RegistrationForm } from "./registrationForm";
import { LoginForm } from "./LoginForm";

export const AuthFlow = ({ children }: { children: React.ReactNode }) => {
  const [emailRegistation, setEmailRegistation] = useState(false);
  const [emailLogin, setEmailLogin] = useState(false);
  const {
    isLoggedIn,
    logout,
    loginWithProvider,
    hasVerifiedEmail,
    requestVerification,
  } = useAuth();

  if (!isLoggedIn()) {
    return (
      <>
        <p>You need to be logged in so santa can keep an eye on you</p>
        <div className={styles.loginOptions}>
          <button onClick={() => loginWithProvider("github")}>
            Login with GitHub 🐙
          </button>
          <button
            onClick={() => {
              setEmailLogin((old) => !old);
              setEmailRegistation(false);
            }}
          >
            Login with E-mail 📧
          </button>
          <>
            or
            <button
              onClick={() => {
                setEmailRegistation((old) => !old);
                setEmailLogin(false);
              }}
            >
              Register with E-mail 📧
            </button>
          </>
          {emailLogin && (
            <>
              <LoginForm />
            </>
          )}
          {emailRegistation && <RegistrationForm />}
        </div>
      </>
    );
  } else {
    return (
      <>
        {!hasVerifiedEmail ? (
          <>
            Please verify your email:
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

export type FormValues = {
  email: string;
  password: string;
  username: string;
  avatar: string;
};
