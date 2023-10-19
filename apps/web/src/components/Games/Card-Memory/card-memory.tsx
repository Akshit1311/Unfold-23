import React from "react";
import MemoryGame from "react-card-memory-game";

const CardMemory: React.FC = () => {
  return (
    <div className="w-full">
      <MemoryGame gridNumber={4} />
    </div>
  );
};
export default CardMemory;
