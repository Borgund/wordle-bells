import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { client } from "./pocketbase";

const WORDLE_STATE_NAME = "wordleState";
const ISMUTED = "ISMUTED";
const ISLIGHT = "ISLIGHT";

export type Attempt = {
  slug: string;
  attempt: string;
  last?: boolean;
};

type WordleState = {
  wordleState?: Attempt[];
  gameState?: Attempt[];
  setActiveDay: (value: number) => void;
  saveWordleAttempt: (attempt: string, day: number, last?: boolean) => void;
  isMuted: boolean;
  toggleMute: () => void;
  thereWillBeLight: boolean;
  toggleLight: () => void;
};

const WordleContext = createContext<WordleState>({} as WordleState);

type WordleProviderProps = {
  children: React.ReactNode;
};

const getWordleState = async (day: number) => {
  const wordleState = await client
    .collection("attempts")
    .getList<Attempt>(1, 6, { filter: `slug='${day}'`, sort: "-created" });
  return wordleState;
};

const getGameState = async () => {
  const gameState = await client
    .collection("attempts")
    .getFullList<Attempt>({ sort: "-created" });
  return await gameState;
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
  const [gameState, setGameState] = useState();
  const [wordleState, setWordleState] = useState<Attempt[]>();
  const [activeDay, setActiveDay] = useState<number>(0);
  const [isMuted, setMute] = useState<boolean>(loadMuteState());
  const [thereWillBeLight, setLight] = useState(loadLightState());

  useEffect(() => {
    getWordleState(activeDay).then((res) => setWordleState(res.items));
  }, [activeDay]);

  const saveWordleAttempt = (attempt: string, day: number, last?: boolean) => {
    const data = {
      owner: client.authStore.model?.id,
      slug: "" + day,
      attempt: attempt,
      last: !!last,
    };
    const response = client
      .collection("attempts")
      .create(data)
      .then((res) =>
        setWordleState((old: any) => {
          if (old?.length) {
            return [res, ...old];
          }
          return [res];
        })
      );
    return response;
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
        wordleState,
        setActiveDay,
        gameState,
        saveWordleAttempt,
        isMuted,
        toggleMute,
        thereWillBeLight,
        toggleLight,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};
