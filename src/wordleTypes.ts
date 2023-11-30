export type ScoreEntry = {
  id: string;
  slug: string;
  username: string;
  attempts: number;
  solved: boolean;
};

export type WordleDay = {
  attempts: string[];
  isCompleted: boolean;
  isSuccessful: boolean;
};

export type GameState = Record<number, WordleDay | undefined>;

export type WordleState = {
  gameState: GameState;
  saveWordleDay: (wordleDay: WordleDay, day: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
  thereWillBeLight: boolean;
  toggleLight: () => void;
  nukeWordleState: () => void;
};

export type WordleProviderProps = {
  children: React.ReactNode;
};
