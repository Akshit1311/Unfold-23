import { cn } from "@/utils/helpers";
import React from "react";

const GlassGate = () => {
  return (
    <div
      className={cn(
        "font-proto grid place-items-center bg-slate-800/70 backdrop-blur-md fixed inset-0 z-30 transition-all ease-in-out delay-150 duration-600",
        "-translate-y-full"
        // !!session && "-translate-y-full"
      )}
    >
      <div className="text-center">
        <div className="text-heading text-6xl font-semibold uppercase">
          retroarc 👾
        </div>
        {/* <button
          className="bg-purple-900 border-2 border-black py-2 px-4 rounded-lg my-4"
          onClick={() => signIn()}
        >
          Sign In 🌍
        </button> */}
      </div>
    </div>
  );
};

export default GlassGate;
