import { createContext, useContext, useState } from "react";

const WORDLE_STATE_NAME = "wordleState";
const ISMUTED = "ISMUTED";

type WordleDay = {
  attempts: string[];
  isCompleted: boolean;
  isSuccessful: boolean;
};

type GameState = Record<number, WordleDay | undefined>;

type WordleState = {
  gameState: GameState;
  saveWordleDay: (wordleDay: WordleDay, day: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
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
const saveMuteState = (isMuted: boolean) => {
  window.localStorage.setItem(ISMUTED, JSON.stringify(isMuted));
};

const loadMuteState = () => {
  return JSON.parse(window.localStorage.getItem(ISMUTED) ?? "false");
};

export const useWordleContext = () => useContext(WordleContext);

export const WordleProvider = ({ children }: WordleProviderProps) => {
  const [gameState, setGameState] = useState<GameState>(getWordleState());
  const [isMuted, setMute] = useState<boolean>(loadMuteState());

  const saveWordleDay = (wordleDay: WordleDay, day: number) => {
    const newWordleState = { ...gameState, [day]: wordleDay };
    setGameState(newWordleState);
    saveWordleState(newWordleState);
  };

  const toggleMute = () => {
    setMute((prevState) => !prevState);
    saveMuteState(!isMuted);
  };

  return (
    <WordleContext.Provider
      value={{ gameState, saveWordleDay, isMuted, toggleMute }}
    >
      {children}
    </WordleContext.Provider>
  );
};
