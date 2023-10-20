"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/helpers";

const Play: React.FC = () => {
  // const { data: session, status } = useSession({ required: true });

  // if (status === "loading") return <div>Loading...</div>;

  const { push } = useRouter();

  const TestData = [
    { title: "Cars" },
    { title: "Snake" },
    { title: "Tetris" },
    { title: "Card-Memory" },
  ];

  return (
    <section>
      <div className="pt-28 flex items-center justify-center gap-4 place-items-center h-full flex-wrap">
        {TestData.map(({ title }) => (
          <PLayStrip
            src={`/images/${title}.jpg`}
            key={`play-${title}`}
            title={title}
            onClick={() => push(`/play/${title.toLowerCase()}`)}
          />
        ))}
      </div>

      <div className="text-heading text-2xl font-semibold text-center">
        More Games Coming Soon!!
      </div>
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
    type="button"
    style={{
      backgroundImage: `url(${src})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    }}
    key={title}
    className={cn(
      "text-black cursor-pointer border-2 border-black w-[30rem] h-96 relative text-center text-xl font-semibold transition-all duration-300 ease-in-out rounded-md"
    )}
    onClick={onClick}
  >
    <div className="p-3 font-raleway font-xl font-semibold bg-[#F9E5C3] text-black rounded-bl-md rounded-br-md absolute bottom-0 w-full border-t-2 border-black">
      {title}
    </div>
  </button>
);
