import { cn } from "@/utils/helpers";
import React from "react";
type Props = {};

const GlassGate = (props: Props) => {
  return (
    <div
      className={cn(
        "font-proto grid place-items-center bg-slate-800/70 backdrop-blur-md fixed inset-0 z-30 transition-all ease-in-out delay-150 duration-600",
        "-translate-y-full"
      )}
    >
      <div className="text-center">
        <div className="text-heading text-6xl font-semibold uppercase">
          retroarc 1.0 👾
        </div>
      </div>
    </div>
  );
};

export default GlassGate;
