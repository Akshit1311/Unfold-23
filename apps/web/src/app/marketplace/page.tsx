"use client";

import React from "react";

// Helpers
import { cn } from "@/utils/helpers";
import ThreeDButton from "@/components/common/ThreeDButton";

const Marketplace: React.FC = () => {
  const car = "Cars";
  return (
    <section className="pt-28 font-mono">
      <div className="px-10 flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <MarketplaceCard
            key={`marketplace-${i}`}
            title="test"
            onClick={() => alert("todo")}
            src={`/images/${car}.jpg`}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(Marketplace);

interface MarketplaceCardProps {
  title: string;
  onClick: () => void;
  src: string;
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({
  title,
  onClick,
  src,
}) => (
  <div
    style={{
      backgroundImage: `url(${src})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    }}
    key={title}
    className={cn(
      "text-black cursor-pointer border-2 border-black w-96 h-96 relative  text-xl font-semibold transition-all duration-300 ease-in-out rounded-md"
    )}
  >
    <div className="p-3 font-raleway font-xl font-semibold bg-white text-black rounded-bl-md rounded-br-md absolute bottom-0 w-full border-t-2 border-black">
      <div className="text-start mb-1 font-bold text-lg">{title}</div>

      <div className="flex items-center justify-between w-full">
        <div>
          <div className="text-medium text-base text-[#777]">Price</div>
          <div className="text-medium text-lg">1 eth</div>
        </div>
        <ThreeDButton
          variant="btn-primary"
          onClick={onClick}
          title="Buy Now"
          className="px-3 py-1.5 text-white"
        />
      </div>
    </div>
  </div>
);
