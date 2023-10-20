import { setPointsAtom } from "@/atoms/points.atom";
import React from "react";
import { Context, SnakeGame } from "react-game-snake";

const Snake: React.FC = () => {
  const setPoints = setPointsAtom();
  return (
    <SnakeGame
      colors={{
        field: "#262626",
        food: "#d03535",
        snake: "#2fb83a",
      }}
      countOfHorizontalFields={43}
      countOfVerticalFields={31}
      fieldSize={20}
      loopTime={200}
      pauseAllowed={true}
      onLoopStart={(context: Context) => setPoints(context.game.points)}
      restartAllowed={true}
      onLoose={(context: Context) => {
        setPoints(context.game.points);
        context.updateGame({ pause: true });
      }}
    />
  );
};
export default Snake;
