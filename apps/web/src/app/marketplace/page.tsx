"use client";

import React from "react";

// Helpers
import { cn } from "@/utils/helpers";
import ThreeDButton from "@/components/common/ThreeDButton";
import { useWallet } from "@suiet/wallet-kit";

import { TransactionBlock } from "@mysten/sui.js/transactions";

const Marketplace: React.FC = () => {
  const car = "Cars";

  const wallet = useWallet();

  async function handleSignAndExecuteTxBlock(
    name: string,
    description: string,
    image: string,
  ) {
    if (!wallet.connected) return;

    // define a programmable transaction
    const tx = new TransactionBlock();
    const packageObjectId =
      "0xc4ff062aec27c8d2bf5b88690e2b9592efa8c8842dfd79a31d40b80ec4ea63fb";
    tx.moveCall({
      target: `${packageObjectId}::nft_example::mint_to_sender`,
      arguments: [tx.pure(name), tx.pure(description), tx.pure(image)],
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

  const nftsToBeMinted = [
    {
      name: "Cars Power-Up",
      description: "Gives you 10x the amount of points, you'll earn otherwise",
      image: "https://media0.giphy.com/media/B1CrvUCoMxhy8/giphy.gif",
    },
    {
      name: "Snake Power-Up",
      description: "Gives you 50x the amount of points, you'll earn otherwise",
      image: "https://www.icegif.com/wp-content/uploads/snake-icegif.gif",
    },
    {
      name: "Tetris Power-Up",
      description: "Gives you 15x the amount of points, you'll earn otherwise",
      image:
        "https://cdn.dribbble.com/users/4154326/screenshots/10882476/media/304c188ae3781c0e834f63283736458e.gif",
    },
    {
      name: "Cards Memory Power-Up",
      description: "Gives you 30x the amount of points, you'll earn otherwise",
      image:
        "https://i.pinimg.com/originals/82/17/d4/8217d41e709fe811fd57d55120fee6f6.gif",
    },
  ] as const;

  return (
    <section className="pt-28 font-mono">
      <div className="px-10 flex flex-wrap items-center justify-center gap-2">
        {nftsToBeMinted.map(({ name, image, description }, i) => (
          <MarketplaceCard
            key={`marketplace-${i}`}
            title={name}
            description={description}
            onClick={() =>
              handleSignAndExecuteTxBlock(name, description, image)
            }
            src={image}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(Marketplace);

interface MarketplaceCardProps {
  title: string;
  description: string;
  onClick: () => void;
  src: string;
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({
  title,
  description,
  onClick,
  src,
}) => (
  <div
    style={{
      backgroundImage: `url(${src})`,
      backgroundPosition: "center top",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
    }}
    key={title}
    className={cn(
      "text-black cursor-pointer border-2 border-black w-96 h-96 relative  text-xl font-semibold transition-all duration-300 ease-in-out rounded-md",
    )}
  >
    <div className="p-3 font-raleway font-xl font-semibold bg-white text-black rounded-bl-md rounded-br-md absolute bottom-0 w-full border-t-2 border-black">
      <div className="text-start mb-1 font-bold text-2xl">{title}</div>
      <div className="text-start mb-1 font-bold text-lg">{description}</div>

      <div className="flex items-center justify-between w-full">
        <div>
          <div className="text-medium text-base text-[#777]">Price</div>
          <div className="text-medium text-lg">1 SUI</div>
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
