import { setGameState } from "@/atoms/gameState.atom";
import { setPointsAtom } from "@/atoms/points.atom";
import React, { useEffect } from "react";
import Tetris from "react-tetris";

const TetrisGame: React.FC = () => {
  const setAtom = setPointsAtom();
  const seState = setGameState();
  return (
    <div>
      <Tetris
        keyboardControls={{
          w: "FLIP_CLOCKWISE",
          x: "FLIP_CLOCKWISE",
          s: "MOVE_DOWN",
          a: "MOVE_LEFT",
          d: "MOVE_RIGHT",
          z: "FLIP_COUNTERCLOCKWISE",
        }}
      >
        {({
          Gameboard,
          HeldPiece,
          PieceQueue,
          controller,
          linesCleared,
          points,
          state,
        }) => {
          setAtom(points);
          seState(state);

          return (
            <div className="flex items-start gap-10 w-full">
              <HeldPiece />

              <Gameboard />

              <PieceQueue />

              {state === "LOST" ? (
                <div>
                  <div>Game Over</div>
                  <div>Your Points</div>
                  <div
                    role="presentation"
                    className="cursor-pointer"
                    onClick={() => {
                      controller.restart();
                    }}
                  >
                    New Game
                  </div>
                </div>
              ) : null}
            </div>
          );
        }}
      </Tetris>
    </div>
  );
};
export default TetrisGame;
