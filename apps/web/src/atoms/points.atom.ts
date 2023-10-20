import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { z } from "zod";
const HashSchema = z.number();

export type TPoints = z.infer<typeof HashSchema>;

export const pointsAtom = atom<TPoints>(0);

export const setPointsAtom = () => useSetAtom(pointsAtom);

export const usePointsAtom = () => useAtom(pointsAtom);
