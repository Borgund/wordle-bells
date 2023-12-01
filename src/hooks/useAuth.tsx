import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { AuthModel } from "pocketbase";
import { client } from "../pocketbase";

export function useAuth() {
  const { authStore } = client;
  const { isValid } = authStore;
  const [user, setUser] = useState<AuthModel>();
  const [hasVerifiedEmail, setHasVerifiedEmail] = useState<boolean>(true);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    if (isValid && !user) {
      setUser(authStore.model);
      checkVerifiedEmail();
    }
    return authStore.onChange((token: string, model: AuthModel) => {
      setToken(token);
      if (model) {
        setUser(model);
        setHasVerifiedEmail(model.verified);
      }
    });
  }, [user]);

  const checkVerifiedEmail = useCallback(async () => {
    if (isValid) {
      const userId = authStore.model?.id;
      const userData = await client.collection("users").getOne(userId);
      setHasVerifiedEmail(userData.verified);
    }
  }, []);

  const loginWithProvider = useCallback((provider: string) => {
    let w = window.open();
    return client.collection("users").authWithOAuth2({
      provider: provider ?? "github",
      urlCallback: (url: string) => {
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
    if (isValid && !hasVerifiedEmail) {
      const email = authStore.model?.email;
      return await client
        .collection("users")
        .requestVerification(email)
        .catch(console.error);
    }
  };

  const logout = useCallback(() => {
    client.authStore.clear();
  }, []);

  return {
    token,
    user,
    registerEmail,
    loginWithProvider,
    loginEmail,
    logout,
    hasVerifiedEmail,
    requestVerification,
    authStore,
  };
}
