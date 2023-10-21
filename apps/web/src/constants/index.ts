export const gameBgMap = {
  snake: "#bdc3c7",
  cars: "bg-transparent",
  tetris: "bg-transparent",
  cards: "bg-[#01B2AD]",
} as const;

export type TGameType = keyof typeof gameBgMap;
