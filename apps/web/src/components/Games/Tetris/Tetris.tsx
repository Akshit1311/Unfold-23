import React from "react";
import Tetris from "react-tetris";

type TetrisProps = {};

const TetrisGame: React.FC<TetrisProps> = () => {
  return (
    <div>
      <Tetris>
        {({
          Gameboard,
          HeldPiece,
          PieceQueue,
          controller,
          linesCleared,
          points,
          state,
        }) => (
          <div className="flex items-start gap-10 w-full">
            <HeldPiece />

            <Gameboard />

            <PieceQueue />

            {state === "LOST" ? (
              <div>
                <div>Game Over</div>
                <div>Your Points: {points}</div>
                <div
                  role="presentation"
                  className="cursor-pointer"
                  onClick={() => controller.restart()}
                >
                  New Game
                </div>
              </div>
            ) : null}
          </div>
        )}
      </Tetris>
    </div>
  );
};
export default TetrisGame;
