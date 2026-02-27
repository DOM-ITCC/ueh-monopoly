import { useEffect, useState } from "react";

const board = [
  // Hàng trên (1-7)
  { id: 1, name: "🚩", type: "start" },
  { id: 2, name: "❓", type: "quiz" },
  { id: 3, name: "❓", type: "quiz" },
  { id: 4, name: "❓", type: "quiz" },
  { id: 5, name: "🎁", type: "bonus" },
  { id: 6, name: "⚡", type: "penalty" },
  { id: 7, name: "❓", type: "quiz" },

  // Cạnh phải (8-12)
  { id: 8, name: "❓", type: "quiz" },
  { id: 9, name: "❓", type: "quiz" },
  { id: 10, name: "❓", type: "quiz" },
  { id: 11, name: "🎁", type: "bonus" },
  { id: 12, name: "⚡", type: "penalty" },

  // Hàng dưới (13-19)
  { id: 13, name: "❓", type: "quiz" },
  { id: 14, name: "❓", type: "quiz" },
  { id: 15, name: "❓", type: "quiz" },
  { id: 16, name: "❓", type: "quiz" },
  { id: 17, name: "🎁", type: "bonus" },
  { id: 18, name: "⚡", type: "penalty" },
  { id: 19, name: "❓", type: "quiz" },

  // Cạnh trái (20-24)
  { id: 20, name: "❓", type: "quiz" },
  { id: 21, name: "❓", type: "quiz" },
  { id: 22, name: "❓", type: "quiz" },
  { id: 23, name: "🎁", type: "bonus" },
  { id: 24, name: "⚡", type: "penalty" },
];

export const Board = ({ dice }) => {
  function generateBoardMatrix(board) {
    const size = 7;
    const matrix = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );

    let index = 0;

    // top row
    for (let col = 0; col < size; col++) {
      matrix[0][col] = board[index++];
    }

    // right col
    for (let row = 1; row < size - 1; row++) {
      matrix[row][size - 1] = board[index++];
    }

    // bottom row
    for (let col = size - 1; col >= 0; col--) {
      matrix[size - 1][col] = board[index++];
    }

    // left col
    for (let row = size - 2; row > 0; row--) {
      matrix[row][0] = board[index++];
    }

    return matrix;
  }

  const matrix = generateBoardMatrix(board);

  const [playerPos, setPlayerPos] = useState(0);

  useEffect(() => {
    if (dice > 0) {
      setPlayerPos((prev) => (prev + dice) % board.length);
    }
  }, [dice]);

  return (
    <>
      <div className="grid grid-cols-7 grid-rows-7 gap-1 w-[550px] h-[550px] bg-[#FFFCDB] relative">
        {matrix.flat().map((cell, i) =>
          cell ? (
            <div
              key={i}
              className="flex items-center justify-center text-[15px] bg-white border rounded shadow text-center relative"
            >
              {cell.name}
              {cell.id === board[playerPos].id && (
                <div className="absolute bottom-[1/2+15px] left-[1/2+15px] w-[30px] h-[30px]">
                  <img src="/player.png" />
                </div>
              )}
            </div>
          ) : (
            <div key={i} className=""></div>
          )
        )}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 w-[300px]">
          <img src="/thumbnail.png" className="w-full h-auto" />
        </div>
      </div>
    </>
  );
};
