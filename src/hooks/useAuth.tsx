import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { AuthModel } from "pocketbase";
import { useMemo } from "react";
import PocketBase from "pocketbase";

export function useAuth() {
  const client = useMemo(
    () => new PocketBase("https://pocketbells.fly.dev"),
    []
  );

  const { authStore } = client;
  const [user, setUser] = useState<AuthModel>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    return authStore.onChange((token: string, model: AuthModel) => {
      setToken(token);
      setUser(model);
    });
  }, []);

  const loginGithub = useCallback(async () => {
    return await client
      .collection("users")
      .authWithOAuth2({ provider: "github" });
  }, []);

  const loginEmail = useCallback(async (email: string, password: string) => {
    return await client.collection("users").authWithPassword(email, password);
  }, []);

  const registerEmail = useCallback(async (email: string, password: string) => {
    return await client
      .collection("users")
      .create({ email, password, passwordConfirm: password });
  }, []);

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
    loginGithub,
    loginEmail,
    logout,
  };
}
