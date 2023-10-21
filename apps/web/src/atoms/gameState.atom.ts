import { atom, useAtom, useSetAtom } from "jotai";
import { z } from "zod";
const HashSchema = z.enum(["LOST", "PLAYING", "PAUSED", ""]);

export type TPoints = z.infer<typeof HashSchema>;

export const gameState = atom<TPoints>("");

export const setGameState = () => useSetAtom(gameState);

export const useGamwState = () => useAtom(gameState);
