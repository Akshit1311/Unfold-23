import { TGameState } from "@/app/play/[id]/page";
import { cn } from "@/utils/helpers";
import React, { useState } from "react";
import { useNetwork } from "wagmi";
import ThreeDButton from "../common/ThreeDButton";
import { pointsAtom, usePointsAtom } from "@/atoms/points.atom";

const GameStatus = () => {
  const [gameState, setGameState] = useState<TGameState>("idle");

  const [points] = usePointsAtom();
  const { chain } = useNetwork();
  return (
    <div className="w-[50%] h-full rounded-lg p-2 lowercase font-mono">
      <div className="flex items-center justify-between w-[70%]">
        <div>
          <h1 className="text-heading text-xl font-bold mb-1">Score</h1>
          <div className="text-[#777]">{points}</div>
        </div>

        <div>
          <div className="text-heading text-xl font-bold mb-1">Best</div>
          <div className="text-[#777]">number</div>
        </div>

        {chain?.name && (
          <>
            <h1 className="text-heading text-xl font-semibold mb-1 mt-10">
              Chain
            </h1>
            <div>{chain?.name}</div>
          </>
        )}
      </div>{" "}
      <div className="mt-10">
        <div className="flex gap-2">
          <ThreeDButton
            variant="btn-info"
            className="px-5 py-2.5 text-white"
            onClick={() => ""}
            title="Start Game"
          />
          <ThreeDButton
            variant="btn-danger"
            className="px-5 py-2.5 text-white"
            onClick={() => ""}
            title="End Game"
          />
          <ThreeDButton
            variant="btn-success"
            className="px-5 py-2.5 text-white"
            onClick={() => ""}
            title="Get Users"
          />
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-heading text-xl font-bold mb-1">Leaderboard</h1>

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
  );
};
export default GameStatus;
