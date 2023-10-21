"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Components
import { useWallet } from "@suiet/wallet-kit";
import ThreeDButton from "./ThreeDButton";
// import { getUsers, startGame, endGame } from "evm";

const Navbar: React.FC = () => {
  const router = useRouter();

  const [localStorageAddr, setLocalStorageAddr] = useState("");

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

  useEffect(() => {
    setLocalStorageAddr(localStorage.getItem("userAddress") || "");
  }, []);

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
        {/* <ConnectButton /> */}
        {/* <button
          // onClick={() => router.push("/items")}
          className="bg-purple-900 border-2 border-black py-2 px-4 rounded-lg my-4"
        >
          Login with Gmail
        </button> */}

        <div className="font-bold text-lg">
          {(localStorageAddr || wallet?.address)?.slice(0, 6)}
        </div>
        {(localStorageAddr || wallet.connected) && (
          <ThreeDButton
            variant="btn-danger"
            className="text-lg py-1 px-3 rounded-lg my-4 text-white"
            onClick={() => {
              if (localStorageAddr) {
                localStorage?.removeItem("userAddress");
                setLocalStorageAddr("");
              } else wallet.disconnect();
            }}
            title="disconnect"
          />
        )}
      </div>
    </header>
  );
};
export default React.memo(Navbar);
