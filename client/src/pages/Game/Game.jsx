import { useEffect, useState } from "react";
import { FaMusic } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { Dice } from "../../components/Dice/Dice";
import { Board } from "../../components/Board/Board";
import { ResetButton } from "../../components/Button/ResetButton/ResetButton";
import { ExitButton } from "../../components/Button/ExitButton/ExitButton";
import { MusicButton } from "../../components/Button/MusicButton/MusicButton";

export default function Game() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const [dice, setDice] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/user/verifyToken`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          if (data.userInfo.play_remaining <= 0) {
            fetch(`${import.meta.env.VITE_BASE_URL}/api/user/logout`, {
              credentials: "include"
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status == "success") {
                  toast.error("Bạn đã hết lượt chơi");
                  navigate("/");
                }
              })
            return;
          }
          setIsAuth(true);
          setUserInfo(data.userInfo);
        } else {
          setIsAuth(false);
          navigate("/account/login");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  const [session, setSession] = useState(null);
  useEffect(() => {
    if (isAuth) {
      fetch(`${import.meta.env.VITE_BASE_URL}/api/game-session/create`, {
        method: "POST",
        credentials: "include"
      })
        .then((res) => res.json())
        .then((data) => {
          setSession({
            id: data.sessionId,
            tokens: 0,
            moves_left: 5
          });
          setUserInfo((prev) => ({
            ...prev,
            play_remaining: prev.play_remaining - 1
          }))
        })
    }
  }, [isAuth])

  if (loading) return <p className="">Đang kiểm tra đăng nhập...</p>

  if (!isAuth) return null;

  return (
    <>
      <Toaster />
      <div className="h-[50px] w-[auto]">
        <img src="/thumbnail.png" className="w-full h-full object-contain" />
      </div>
      <div className="mt-[20px] flex w-full justify-around items-center">
        <div className="bg-white rounded-2xl shadow-md p-6 w-[300px] flex flex-col gap-4">
          <div className="text-center text-[20px]">
            Hi {userInfo && userInfo.fullname}!
          </div>
          <div className="flex items-center gap-3">
            <img
              src="/user.png"
              alt="Player Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{userInfo && userInfo.fullname}</h3>
              <p className="text-sm text-gray-500">MSSV: {userInfo && userInfo.student_id}</p>
            </div>
          </div>

          {/* Token */}
          <div className="flex items-center justify-between bg-[#F5F8FF] rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">🪙</span>
              <span className="text-gray-700 font-medium">Tokens</span>
            </div>
            <span className="font-bold text-blue-500">0</span>
          </div>

          {/* Số lượt chơi còn lại */}
          <div className="bg-[#F5F8FF] rounded-lg p-3 flex flex-col gap-2 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-gray-700">Số lần chơi còn lại</span>
              <span className="font-semibold">{userInfo && userInfo.play_remaining} / 3</span>
            </div>
            <div>
              <input
                type="range"
                min="0"
                max="3"
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
                #3b82f6 ${(userInfo ? (userInfo.play_remaining / 3) * 100 : 0)}%,
                #e3e7eb ${(userInfo ? (userInfo.play_remaining / 3) * 100 : 0)}%
              )`
                }}
              />
            </div>
          </div>

          {/* Ô hiện tại */}
          <div className="bg-[#F5F8FF] rounded-lg p-3 flex justify-between items-center shadow-sm">
            <p className="text-sm text-gray-600">Ô hiện tại:</p>
            <p className="font-semibold text-gray-800">
              📘 Tin tuyển dụng
            </p>
          </div>

          {/* Thời gian còn lại */}
          <div className="flex items-center justify-between bg-[#F5F8FF] rounded-lg p-3 shadow-sm">
            <span className="font-medium text-gray-700">Thời gian</span>
            <span className="font-bold text-black">00:08</span>
          </div>

          <div className="text-center text-xs text-gray-500 italic">
            Chúc bạn may mắn!
          </div>
        </div>

        <Board
          dice={dice}
        />

        <div className="flex flex-col gap-[20px]">
          <Dice
            rollingDiceSuccess={(value) => {
              setDice(value);
              setSession((prev) => ({
                ...prev,
                moves_left: prev.moves_left > 0 ? prev.moves_left - 1 : 0
              }));
            }}
            session={session}
          />
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3">
            <h3 className="font-semibold text-gray-800 text-sm">Game</h3>

            <div className="grid grid-cols-2 gap-3">
              <ExitButton
                session={session}
              />

              <ResetButton
                session={session}
                userInfo={userInfo}
              />
            </div>

            <h3 className="font-semibold text-gray-800 text-sm">Nhạc nền</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                      <FaVolumeMute />
                      <span className="text-sm font-medium">Mute</span>
                    </button> */}

              <MusicButton/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}