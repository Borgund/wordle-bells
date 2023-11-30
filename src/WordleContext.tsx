import { createContext, useContext, useState } from "react";
import {
  WordleDay,
  GameState,
  WordleState,
  WordleProviderProps,
} from "./wordleTypes";

const WORDLE_STATE_NAME = "wordleState";
const ISMUTED = "ISMUTED";
const ISLIGHT = "ISLIGHT";

const WordleContext = createContext<WordleState>({} as WordleState);

const getWordleState = () => {
  const wordleState = window.localStorage.getItem(WORDLE_STATE_NAME) ?? "{}";
  const parsedWordleState = JSON.parse(wordleState) as GameState;
  return parsedWordleState;
};

const nukeWordleState = () => {
  window.localStorage.setItem(WORDLE_STATE_NAME, '""');
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

const loadLightState = () => {
  return JSON.parse(window.localStorage.getItem(ISLIGHT) ?? "false");
};

const saveLightState = (isLight: boolean) => {
  window.localStorage.setItem(ISLIGHT, JSON.stringify(isLight));
};

export const useWordleContext = () => useContext(WordleContext);

export const WordleProvider = ({ children }: WordleProviderProps) => {
  const [gameState, setGameState] = useState<GameState>(getWordleState());
  const [isMuted, setMute] = useState<boolean>(loadMuteState());
  const [thereWillBeLight, setLight] = useState(loadLightState());

  const saveWordleDay = (wordleDay: WordleDay, day: number) => {
    const newWordleState = { ...gameState, [day]: wordleDay };
    setGameState(newWordleState);
    saveWordleState(newWordleState);
  };

  const toggleMute = () => {
    setMute((prevState) => !prevState);
    saveMuteState(!isMuted);
  };

  const toggleLight = () => {
    setLight((old: boolean) => !old);
    saveLightState(!thereWillBeLight);
  };

  return (
    <WordleContext.Provider
      value={{
        gameState,
        saveWordleDay,
        isMuted,
        toggleMute,
        thereWillBeLight,
        toggleLight,
        nukeWordleState,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};
