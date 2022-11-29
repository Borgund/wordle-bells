import { createContext, useContext, useState } from "react";

const WORDLE_STATE_NAME = "wordleState";

type WordleDay = {
  attempts: string[];
  isCompleted: boolean;
  isSuccessful: boolean;
};

type GameState = Record<number, WordleDay | undefined>;

type WordleState = {
  gameState: GameState;
  saveWordleDay: (wordleDay: WordleDay, day: number) => void;
};

const WordleContext = createContext<WordleState>({} as WordleState);

type WordleProviderProps = {
  children: React.ReactNode;
};

const getWordleState = () => {
  const wordleState = window.localStorage.getItem(WORDLE_STATE_NAME) ?? "{}";
  const parsedWordleState = JSON.parse(wordleState) as GameState;
  return parsedWordleState;
};

const saveWordleState = (wordleState: GameState) => {
  window.localStorage.setItem(WORDLE_STATE_NAME, JSON.stringify(wordleState));
};

export const useWordleContext = () => useContext(WordleContext);

export const WordleProvider = ({ children }: WordleProviderProps) => {
  const [gameState, setGameState] = useState<GameState>(getWordleState());

  const saveWordleDay = (wordleDay: WordleDay, day: number) => {
    const newWordleState = { ...gameState, [day]: wordleDay };
    setGameState(newWordleState);
    saveWordleState(newWordleState);
  };

  return (
    <WordleContext.Provider value={{ gameState, saveWordleDay }}>
      {children}
    </WordleContext.Provider>
  );
};
