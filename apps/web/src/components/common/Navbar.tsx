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
// import { getUsers, startGame, endGame } from "evm";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

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
      <div className="flex items-center gap-4">
        <ConnectButton />

        {session && (
          <button
            type="button"
            className="bg-zinc-800 py-2 px-4 rounded-lg"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
};
export default React.memo(Navbar);
