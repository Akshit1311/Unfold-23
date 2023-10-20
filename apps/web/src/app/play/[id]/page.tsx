"use client";
import CardMemory from "@/components/Games/Card-Memory/card-memory";
import Cars from "@/components/Games/Cars/Cars";
import TetrisGame from "@/components/Games/Tetris/Tetris";
import Snake from "@/components/Games/Snake/Snake";
import { cn } from "@/utils/helpers";
// import { TChainClient, endGame, getUsers, startGame } from "op";
import React, { useState } from "react";
import GameStatus from "@/components/GameStatus/GameStatus";
const games = {
  snake: <Snake />,
  cars: <Cars />,
  tetris: <TetrisGame />,
  "card-memory": <CardMemory />,
} as const;

export type TGameState = "idle" | "ongoing";

const PageId = ({ params }: { params: { id: keyof typeof games } }) => {
  // const [users, setUsers] = useState<Awaited<ReturnType<typeof getUsers>>>([]);

  // useEffect(() => {
  //   (async () => {
  //     const _users = await getUsers(chain?.network as TChainClient);
  //     console.log({ _users });

  //     setUsers(_users);
  //   })();
  // }, [gameState]);

  const gameBgMap = {
    snake: "#bdc3c7",
    cars: "bg-transparent",
    tetris: "bg-transparent",
    "card-memory": "bg-[#01B2AD]",
  } as const;

  return (
    <section className="px-10 py-6">
      <div className=" text-black  flex items-center w-full flex-col ">
        <h1 className="text-[#453A21] text-5xl font-bold mb-10 uppercase">
          {params.id}
        </h1>
        <div className="flex items-center w-full gap-4 h-[41rem]">
          <div
            className={cn(
              "w-[80%] h-full flex justify-center items-center border-2 border-black rounded-lg",
              gameBgMap[params.id]
            )}
          >
            {games[params.id]}
          </div>

          <GameStatus />
        </div>
      </div>

      <div className="mt-4">
        <div className="lowercase font-mono text-lg text-heading font-bold">
          Controls
        </div>

        <button
          type="button"
          className="px-4 py-2 rounded-xl border-4 border-[#777] flex items-center justify-center h-10 shadow-xl"
        >
          W
        </button>
      </div>
    </section>
  );
};
export default React.memo(PageId);

interface AboutGameStripProps {
  AboutGameStripData: {
    title: string;
    desc: string;
  }[];
  className?: string;
}

const AboutGameStrip: React.FC<AboutGameStripProps> = ({
  className,
  AboutGameStripData,
}) => (
  <div
    className={cn(
      " border border-custom-2 p-2.5 rounded-lg flex items-center justify-between w-full",
      className
    )}
  >
    {AboutGameStripData?.map(({ desc, title }) => (
      <div key={`about-game-${title}`}>
        <div className="text-base font-semibold text-heading">{title}</div>
        <div className="text-sm font-normal">{desc}</div>
      </div>
    ))}
  </div>
);
