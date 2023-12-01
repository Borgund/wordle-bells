import { create } from "zustand";
import { client } from "../pocketbase";
import { AuthModel } from "pocketbase";

export type AuthStore = {
  isLoading: boolean;
  error: boolean;
  user: AuthModel;
};

export type ModelType = {};

export const useWordleStore = create<AuthStore>((set, get) => ({
  isLoading: false,
  error: false,
  user: client.authStore.model,
}));
