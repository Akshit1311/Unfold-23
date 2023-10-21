"use client";
import Cars from "@/components/Games/Cars/Cars";
import TetrisGame from "@/components/Games/Tetris/Tetris";
import Snake from "@/components/Games/Snake/Snake";
import { cn } from "@/utils/helpers";

const CardMemory = dynamic(
  () => import("@/components/Games/Card-Memory/card-memory"),
  { ssr: false }
);
import React, { useState } from "react";
import GameStatus from "@/components/GameStatus/GameStatus";
import { gameBgMap } from "@/constants";
import dynamic from "next/dynamic";
const games = {
  snake: <Snake />,
  cars: <Cars />,
  tetris: <TetrisGame />,
  cards: <CardMemory />,
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

  const gameKeyMap = {
    snake: {
      w: "up",
      a: "left",
      s: "bottom",
      d: "right",
      p: "toggle pause",
    },
    tetris: {
      "w/x": "flip clockwise",
      z: "flip counterclockwise",
      s: "down",
      a: "left",
      d: "right",
      p: "toggle pause",
      shift: "hold",
    },
    cars: {
      w: "up",
      a: "left",
      s: "bottom",
      d: "right",
      r: "reset",
      k: "swipe camera",
    },
    cards: {
      "mouse-click/left-click": "select",
    },
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
            {/* "Game not started yet" */}
            {games[params.id]}
          </div>

          <GameStatus gameName={params.id} />
        </div>
      </div>

      <div className="mt-4">
        <div className="lowercase font-mono text-lg text-heading font-bold mb-4">
          Controls
        </div>
        <div className="flex items-center gap-8 flex-wrap w-2/3">
          {Object.entries(gameKeyMap[params.id]).map(([key, value], i) => (
            <KeyBox x={key} y={value} key={`keyboard-key-${i}`} />
          ))}
        </div>
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

const KeyBox = ({ x, y }: { x: string; y: string }) => (
  <div className="flex items-center space-x-2">
    <div className="px-4 py-2 font-roobert font-bold w-fit text-[#777] rounded-xl border-4 border-[#777] flex items-center justify-center h-10">
      {x}
    </div>

    <div className="text-lg text-[#777] font-bold">: {y}</div>
  </div>
);
