import { cn } from "@/utils/helpers";
import React, { useState } from "react";
import ThreeDButton from "../ThreeDButton";
import { TGameType } from "@/constants";

const emojis: Record<TGameType, string> = {
  cars: "🚘",
  snake: "🐍",
  tetris: "🟦🟪",
  cards: "🃏",
};

type Props = {
  title?: string;
  gameType?: TGameType;
};

const GlassGate = ({ title, gameType }: Props) => {
  const [isGlassDoorOpen, setIsGlassDoorOpen] = useState(false);

  return (
    <div
      className={cn(
        "font-proto grid place-items-center bg-slate-500/50 backdrop-blur-lg fixed inset-0 z-50 transition-all ease-in  duration-500",
        isGlassDoorOpen && "-translate-y-full"
      )}
    >
      <div className="text-center">
        <div className=" text-9xl font-semibold uppercase mb-10">
          {title || "retroarc"} {gameType ? emojis[gameType] : "👾"}
        </div>
        <ThreeDButton
          variant="btn-magick"
          className="text-3xl py-5 px-10 rounded-lg my-4 text-white"
          onClick={() => setIsGlassDoorOpen(true)}
          title="Sign In 🌍"
        />
      </div>
    </div>
  );
};

export default GlassGate;
