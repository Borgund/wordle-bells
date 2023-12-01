import { create } from "zustand";
import { client } from "../pocketbase";

export type WordleStore = {
  gameState?: Attempt[];
  activeDay: number;
  activeCorrectWord?: WordsCollectionType;
  fetchGameState: () => void;
  fetchCorrectWord: (day: number) => void;
  submitWordleAttempt: (attemptData: WordleAttemptType) => void;
  setActiveDay: (day: number) => void;
  isLoading: boolean;
  error: boolean;
};

export type Attempt = {
  slug: string;
  attempt: string;
  last?: boolean;
};

export type WordsCollectionType = {
  id: string;
  slug: string;
  body: { word: string; hint: string };
};

export type WordleAttemptType = {
  owner: string;
  slug: string;
  attempt: string;
  last: boolean;
  attemptNumber: number;
  isCorrect: boolean;
};

export const useWordleStore = create<WordleStore>((set, get) => ({
  isLoading: false,
  error: false,
  gameState: undefined,
  activeDay: 0,
  activeCorrectWord: undefined,
  fetchGameState: async () => {
    const { isLoading } = get();
    if (isLoading) {
      return;
    }
    try {
      set({ isLoading: true, error: false });
      const gameState = await client
        .collection("attempts")
        .getFullList<Attempt>({ sort: "-created" });
      set({ gameState: gameState });
    } catch (e) {
      set({ error: !!e });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchCorrectWord: async (day: number) => {
    const word = await client
      .collection("words")
      .getFirstListItem<WordsCollectionType>(`slug='${day}'`);
    set({ activeCorrectWord: word });
  },
  setActiveDay: (day: number) => set({ activeDay: day }),

  submitWordleAttempt: async (attemptData: WordleAttemptType) => {
    client.collection("attempts").create(attemptData);
    if (attemptData.last) {
      submitScore({
        slug: attemptData.slug,
        attempts: attemptData.attemptNumber,
        solved: attemptData.isCorrect,
      });
    }
  },
}));

const submitScore = async ({
  slug,
  attempts,
  solved,
}: {
  slug: string;
  attempts: number;
  solved: boolean;
}) => {
  const data = {
    slug: slug,
    username: client.authStore.model?.username ?? "",
    attempts: attempts,
    solved: solved,
  };
  return await client.collection("score").create(data);
};
