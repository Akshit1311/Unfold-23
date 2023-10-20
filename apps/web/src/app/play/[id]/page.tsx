"use client";
import CardMemory from "@/components/Games/Card-Memory/card-memory";
import Cars from "@/components/Games/Cars/Cars";
import TetrisGame from "@/components/Games/Tetris/Tetris";
import Snake from "@/components/Games/Snake/Snake";
import { cn } from "@/utils/helpers";
// import { TChainClient, endGame, getUsers, startGame } from "op";
import React, { useState } from "react";
import { useNetwork } from "wagmi";
const games = {
  snake: <Snake />,
  cars: <Cars />,
  tetris: <TetrisGame />,
  "card-memory": <CardMemory />,
} as const;

type TGameState = "idle" | "ongoing";

const PageId = ({ params }: { params: { id: keyof typeof games } }) => {
  const { chain } = useNetwork();

  // const [users, setUsers] = useState<Awaited<ReturnType<typeof getUsers>>>([]);
  const [gameState, setGameState] = useState<TGameState>("idle");
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
    <section className=" text-black px-10 py-6 flex items-center w-full flex-col">
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

        <div className="w-[50%] h-full rounded-lg p-2">
          <div>
            <h1 className="text-heading text-xl font-semibold mb-1">
              Game State
            </h1>
            <div>{gameState.toUpperCase()}</div>
            <h1 className="text-heading text-xl font-semibold mb-1 mt-10">
              Chain
            </h1>
            <div>{chain?.name}</div>
          </div>
          <div className="mt-10">
            <h1 className="text-heading text-xl font-semibold mb-1">Actions</h1>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={gameState === "ongoing"}
                className={cn(
                  "bg-green-400 py-2 px-4 rounded-lg text-white",
                  gameState === "ongoing" && "opacity-50"
                )}
                // onClick={async () => {
                //   try {
                //     await startGame(chain?.network as TChainClient);
                //     setGameState("ongoing");
                //   } catch (error) {
                //     console.error(error);
                //   }
                // }}
              >
                Start Game
              </button>
              <button
                type="button"
                disabled={gameState === "idle"}
                className={cn(
                  "bg-red-500 py-2 px-4 rounded-lg text-white",
                  gameState === "idle" && "opacity-50"
                )}
                // onClick={async () => {
                //   try {
                //     await endGame(chain?.network as TChainClient);
                //     setGameState("idle");
                //   } catch (error) {
                //     console.error(error);
                //   }
                // }}
              >
                End Game
              </button>
              <button
                type="button"
                className="bg-yellow-400 text-white py-2 px-4 rounded-lg"
                // onClick={() => getUsers(chain?.network as TChainClient)}
              >
                Get Users
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-heading text-xl font-semibold mb-1">
              Leaderboard
            </h1>

            {/* {[...users]
              .sort((a, b) => (a.xp < b.xp ? 1 : -1))
              .filter(({ isOwner, xp }) => !isOwner && xp)
              .map(({ userAddress, xp }, i) => (
                <AboutGameStrip
                  AboutGameStripData={[
                    { title: "Rank", desc: `#${i + 1}` },
                    { title: "address", desc: userAddress },
                    { title: "XP", desc: xp.toString() },
                  ]}
                />
              ))} */}
          </div>
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
