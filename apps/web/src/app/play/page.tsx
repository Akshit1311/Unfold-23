"use client";

import React from "react";
import { useRouter } from "next/navigation";

type pageProps = {};

const Play: React.FC<pageProps> = () => {
  // const { data: session, status } = useSession({ required: true });

  // if (status === "loading") return <div>Loading...</div>;

  const { push } = useRouter();

  const TestData = [
    { title: "Cars" },
    { title: "Pacman" },
    { title: "Card-Memory" },
  ];

  return (
    <section className="p-10 flex items-center justify-center gap-4 place-items-center h-full">
      {TestData.map(({ title }) => (
        <PLayStrip
          src={`/${title}.jpg`}
          key={`play-${title}`}
          title={title}
          onClick={() => push(`/play/${title.toLowerCase()}`)}
        />
      ))}

      {/* <div className="text-heading text-2xl font-semibold ">
        More Games Coming Soon!!
      </div> */}
    </section>
  );
};
export default Play;

interface PlayStripProps {
  title: string;
  src: string;
  onClick: () => void;
}

const PLayStrip: React.FC<PlayStripProps> = ({ title, onClick, src }) => (
  <button
    key={title}
    className=" text-black cursor-pointer border-2 border-black w-96 h-full text-center text-xl font-semibold  transition-all duration-300 ease-in-out rounded-md hover:scale-105"
    onClick={onClick}
  >
    <img src={src} alt={title} className="object-fill w-full h-full" />
    <div className="p-3 font-raleway font-xl font-semibold bg-[#F9E5C3] text-black rounded-bl-md rounded-md">
      {title}
    </div>
  </button>
);
