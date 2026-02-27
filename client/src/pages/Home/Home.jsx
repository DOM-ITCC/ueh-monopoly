"use client"

import { Header } from "./../../components/Header/Header";
import { LeaderBoard } from "./../../components/LeaderBoard/LeaderBoard";
import { useEffect, useState } from "react";
import { Toaster } from "sonner"
import { PlayButton } from "../../components/Button/PlayButton/PlayButton";

export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerNum, setPlayerNum] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/leaderboard/top`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          setLeaderboard(data.leaderboard);
        }
      })

    fetch(`${import.meta.env.VITE_BASE_URL}/api/leaderboard/player-num`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          setPlayerNum(data.playerNum);
        }
      })
  }, [])

  return (
    <>
      <Toaster/>
      <Header />
      <div className="flex justify-between gap-[50px] w-full mb-[50px]">
        <div className="flex-1">
          <div className="h-[100px] w-[auto]">
            <img src="/thumbnail.png" className="w-full h-full object-contain" />
          </div>
          <div className="text-[85px] font-bold">
            Challenge - Job Hunters
          </div>
          <div className="text-[17px] font-light">
            Hành trình Job Hunter - nơi người chơi hóa thân thành ứng viên trên con đường tìm việc, vượt qua thử thách, tích lũy kỹ năng và cạnh tranh để trở thành ứng viên sáng giá nhất.
          </div>
          <div className="mt-[30px]">
            <PlayButton/>
            <div className="mt-[10px] flex gap-[20px]">
              <div className="bg-[white] py-[15px] w-[50%] flex justify-center shadow-xl font-semibold text-[17px] rounded-[40px]">Thời gian còn lại: 1 ngày 20 giờ</div>
              <div className="bg-[white] py-[15px] w-[50%] flex justify-center shadow-xl font-semibold text-[17px] rounded-[40px]">Số người tham gia: {playerNum}</div>
            </div>
          </div>
        </div>
        {leaderboard.length > 0 &&
          <LeaderBoard
            leaderboard={leaderboard}
          />}
      </div>
    </>
  );
}