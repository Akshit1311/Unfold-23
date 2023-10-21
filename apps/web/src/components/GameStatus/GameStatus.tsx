import { TGameState } from "@/app/play/[id]/page";
import { cn } from "@/utils/helpers";
import React, { useState } from "react";
import { useNetwork } from "wagmi";
import ThreeDButton from "../common/ThreeDButton";
import { pointsAtom, usePointsAtom } from "@/atoms/points.atom";
import { useWallet } from "@suiet/wallet-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";

type Props = {
  gameName: string;
};
const GameStatus = ({ gameName }: Props) => {
  const [gameState, setGameState] = useState<TGameState>("idle");

  const [points] = usePointsAtom();
  const { chain } = useNetwork();
  const wallet = useWallet();

  async function handleSignAndExecuteTxBlock() {
    if (!wallet.connected) return;

    // define a programmable transaction
    const tx = new TransactionBlock();
    const packageObjectId =
      "0xdf48f102966d92cf2c86ed7eb5f27883c6c0da0bb5ec5696890d91c0a12ca263";
    tx.moveCall({
      target: `${packageObjectId}::user::start_game`,
      arguments: [
        tx.pure(gameName),
        tx.pure(
          "0x6a84e7c9a2767c378d1750b3b24f083a09bd43d96cd4ad081d59322e14d0ddec",
        ),
        tx.pure(
          "0x30fd42f1f171e732207d920c5a6c370b3c1d61de99ff085d7c7196cdd13dfbca",
        ),
      ],
    });

    try {
      // execute the programmable transaction
      const resData = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log("nft minted successfully!", resData);
      alert("Congrats! your nft is minted!");
    } catch (e) {
      console.error("nft mint failed", e);
    }
  }

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
            onClick={handleSignAndExecuteTxBlock}
            title="Start Game"
          />
          <ThreeDButton
            variant="btn-danger"
            className="px-5 py-2.5 text-white"
            onClick={handleSignAndExecuteTxBlock}
            title="End Game"
          />
          <ThreeDButton
            variant="btn-success"
            className="px-5 py-2.5 text-white"
            onClick={handleSignAndExecuteTxBlock}
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
