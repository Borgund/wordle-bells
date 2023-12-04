import { create } from "zustand";
import { client } from "../pocketbase";
import { RecordModel } from "pocketbase";

export type PocketStore = {
  getData: () => void;
  isLoading: boolean;
  error: boolean;
  wordList: WordsCollectionType[];
};

export type WordsCollectionType = {
  id: string;
  slug: string;
  body: { word: string; hint: string };
};

export const usePocketStore = create<PocketStore>((set, get) => ({
  isLoading: false,
  error: false,
  wordList: [],
  getData: async () => {
    const { isLoading, wordList } = get();
    if (isLoading || wordList.length > 0) return;
    set({ isLoading: true, error: false });
    try {
      const words = await client
        .collection("words")
        .getFullList<WordsCollectionType>();
      set({ wordList: words, isLoading: false });
    } catch (e) {
      set({ error: true });
    } finally {
      set({ isLoading: false });
    }
  },
}));
