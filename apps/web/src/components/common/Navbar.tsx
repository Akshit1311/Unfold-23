"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { signIn, signOut, useSession } from "next-auth/react";

// Assets
import { Moon, Sun } from "@/assets/icons";

// Components
import { toast } from "react-hot-toast";
import { cn } from "@/utils/helpers";
import { googleSignIn } from "@/app/actions";
import { useWallet } from "@suiet/wallet-kit";
import ThreeDButton from "./ThreeDButton";
// import { getUsers, startGame, endGame } from "evm";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { push } = useRouter();

  // Data
  const NavbarData = [
    {
      title: "Play Games",
      route: "/play",
    },
    {
      title: "Marketplace",
      route: "/marketplace",
    },
  ];

  const Heading = "Retroarc";

  const wallet = useWallet();

  return (
    <header className="border-b border-black absolute w-full bg-white top-0 z-10 backdrop-blur-md px-10 py-5 flex items-center justify-between">
      <div className="flex items-center  gap-8">
        <h1
          className="text-[#453A21] uppercase font-bold text-4xl font-proto cursor-pointer relative -translate-y-1"
          role="presentation"
          onClick={() => push("/")}
        >
          {Heading}
        </h1>

        <div>
          <ul className=" text-black flex items-center">
            {NavbarData.map(({ route, title }) => (
              <li
                key={`navbar-${title}`}
                className="text-lg font-raleway font-semibold tracking-widest cursor-pointer first:ml-0 ml-4 uppercase"
                onClick={() => push(route)}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <form action={googleSignIn} className="flex items-center gap-4">
        <ConnectButton />
        <button
          // onClick={() => router.push("/items")}
          className="bg-purple-900 border-2 border-black py-2 px-4 rounded-lg my-4"
        >
          Login with Gmail
        </button>

        <div className="font-bold text-lg">{wallet?.address?.slice(0, 6)}</div>
        {wallet.connected && (
          <ThreeDButton
            variant="btn-danger"
            className="text-lg py-1 px-3 rounded-lg my-4 text-white"
            onClick={wallet.disconnect}
            title="disconnect"
          />
        )}
      </form>
    </header>
  );
};
export default React.memo(Navbar);
