import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { AuthModel } from "pocketbase";
import { client } from "../pocketbase";

export function useAuth() {
  const { authStore } = client;
  const [user, setUser] = useState<AuthModel>();
  const [hasVerifiedEmail, setHasVerifiedEmail] = useState<boolean>(true);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    checkVerifiedEmail();

    if (isLoggedIn() && !user) {
      setUser(authStore.model);
    }
    return authStore.onChange((token: string, model: AuthModel) => {
      setToken(token);
      setUser(model);
      setHasVerifiedEmail(model?.verified);
    });
  }, [user]);

  const checkVerifiedEmail = useCallback(async () => {
    if (isLoggedIn()) {
      const userId = authStore.model?.id;
      const userData = await client.collection("users").getOne(userId);
      setHasVerifiedEmail(userData.verified);
    }
  }, []);

  const loginWithProvider = useCallback((provider: string) => {
    let w = window.open();
    return client.collection("users").authWithOAuth2({
      provider: provider ?? "github",
      useCallback: (url: string) => {
        w!.location.href = url;
      },
    });
  }, []);

  const loginEmail = useCallback(async (email: string, password: string) => {
    return await client
      .collection("users")
      .authWithPassword(email, password)
      .catch(console.error);
  }, []);

  const registerEmail = useCallback(
    async (email: string, password: string, username?: string) => {
      return await client
        .collection("users")
        .create({
          email,
          password,
          passwordConfirm: password,
          username: username,
        })
        .then(() => loginEmail(email, password))
        .catch(console.error);
    },
    []
  );

  const requestVerification = async () => {
    if (isLoggedIn() && !hasVerifiedEmail) {
      const email = authStore.model?.email;
      return await client
        .collection("users")
        .requestVerification(email)
        .catch(console.error);
    }
  };

  const isLoggedIn = useCallback(() => {
    return authStore.isValid;
  }, []);

  const logout = useCallback(() => {
    client.authStore.clear();
  }, []);

  return {
    isLoggedIn,
    token,
    user,
    registerEmail,
    loginWithProvider,
    loginEmail,
    logout,
    hasVerifiedEmail,
    requestVerification,
  };
}
