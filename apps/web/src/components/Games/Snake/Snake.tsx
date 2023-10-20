import React from "react";
import { Context, SnakeGame } from "react-game-snake";

type SnakeProps = {};

const Snake: React.FC<SnakeProps> = () => {
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
      restartAllowed={true}
      onLoose={(context: Context) => console.log(context)}
      onPause={(context: Context) => console.log(context)}
      onRestart={(context: Context) => console.log(context)}
      onResume={(context: Context) => console.log(context)}
      onWin={(context: Context) => console.log(context)}
    />
  );
};
export default Snake;
