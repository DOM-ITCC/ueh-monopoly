import { useState } from "react";

export const Dice = ({ rollingDiceSuccess, session }) => {
  const [dice, setDice] = useState(4);
  const [rolling, setRolling] = useState(false);
  const [diceImg, setDiceImg] = useState("/dice-4.jpg");

  const rollingDice = () => {
    if (rolling) return;
    setRolling(true);

    if (session.moves_left <= 0) 
    {
      setRolling(false);
      rollingDiceSuccess(0, session);
      return;
    }

    let counter = 0;
    const interval = setInterval(() => {
      const tmp = Math.floor(Math.random() * 6) + 1;
      setDice(tmp);
      setDiceImg(`/dice-${tmp}.jpg`);
      counter++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const result = Math.floor(Math.random() * 6) + 1;
      setDice(result);
      setDiceImg(`/dice-${result}.jpg`);

      fetch(`${import.meta.env.VITE_BASE_URL}/api/game-session/update`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sessionId: session.id,
          moves_left: session.moves_left - 1
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "success") {
            setRolling(false);
            rollingDiceSuccess(result, session);
          }
        })
    }, 1500)
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-[20px]">
            <span className="font-medium text-sm text-gray-700">
              Số lần tung xúc xắc còn lại
            </span>
            <span className="font-semibold">{session ? `${session.moves_left} / 5` : "- / 5"}</span>
          </div>

          <input
            type="range"
            min="0"
            max="5"
            value="4"
            readOnly
            className="
        w-full h-2 rounded-lg appearance-none cursor-default
        [&::-webkit-slider-runnable-track]:rounded-lg 
        [&::-webkit-slider-runnable-track]:h-2 
        [&::-webkit-slider-thumb]:hidden 
        [&::-moz-range-thumb]:hidden 
        [&::-ms-thumb]:hidden
      "
            style={{
              background: `linear-gradient(
                to right,
                #3b82f6 ${(session ? (session.moves_left / 5) * 100 : 0)}%,
                #e5e7eb ${(session ? (session.moves_left / 5) * 100 : 0)}%
              )`
            }}
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          <div className="w-16 h-16 rounded-[8px] overflow-hidden">
            <img
              src={diceImg}
              alt="Dice"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-2xl font-bold text-[#5A74D2]">{dice}</div>
        </div>

        <button
          className={`px-6 py-2 text-white font-medium rounded-lg shadow hover:bg-[#4a64c0] transition bg-[#5A74D2]`}
          onClick={rollingDice}
        >
          {rolling ? "..." : "🎲 Tung xúc xắc"}
        </button>
      </div>
    </>
  );
}