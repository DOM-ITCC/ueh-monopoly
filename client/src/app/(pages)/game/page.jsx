import { FaPause, FaRedo, FaVolumeMute, FaMusic } from "react-icons/fa";
import { Toaster } from "sonner";

export default function Game() {
  return (
    <>
      <Toaster/>
      <div className="relative w-screen h-screen">
        <div className="absolute inset-0 bg-[url('/mainbg.png')] bg-cover bg-center z-0">
          <div className="relative z-10 bg-[#EEF2F5] flex flex-col items-center justify-center mt-[30px] py-[20px] px-[50px] mx-[100px] rounded-[20px] shadow-2xl border-[7px] border-[#DFE2EC]">
            <div className="h-[100px] w-[auto]">
              <img src="/thumbnail.png" className="w-full h-full object-contain" />
            </div>
            <div className="mt-[20px] flex items-start justify-between gap-[50px]">
              <div className="bg-white rounded-2xl shadow-md p-6 w-[300px] flex flex-col gap-4">
                <div className="text-center text-[20px]">
                  Hi Alex!
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="/user.png"
                    alt="Player Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">Alex</h3>
                    <p className="text-sm text-gray-500">MSSV: 1</p>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-[#F5F8FF] rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">🪙</span>
                    <span className="text-gray-700 font-medium">Tokens</span>
                  </div>
                  <span className="font-bold text-blue-500">0</span>
                </div>

                <div className="bg-[#F5F8FF] rounded-lg p-3 flex flex-col gap-2 shadow-sm">
                  <div className="flex justify-between items-center border-b-[#a3a0a0] border-b-[1px] pb-[10px]">
                    <span className="font-medium text-sm text-gray-700">Số lần chơi còn lại</span>
                    <span className="font-semibold">1 / 3</span>
                  </div>
                </div>

                <div className="bg-[#F5F8FF] rounded-lg p-3 flex justify-between items-center shadow-sm">
                  <p className="text-sm text-gray-600">Ô hiện tại:</p>
                  <p className="font-semibold text-gray-800">
                    📘 Tin tuyển dụng
                  </p>
                </div>

                <div className="flex items-center justify-between bg-[#F5F8FF] rounded-lg p-3 shadow-sm">
                  <span className="font-medium text-gray-700">Thời gian</span>
                  <span className="font-bold text-black">00:08</span>
                </div>

                <div className="text-center text-xs text-gray-500 italic">
                  Chúc bạn may mắn!
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-[430px] h-[430px] bg-white rounded-xl shadow-md flex items-center justify-center overflow-hidden">
                  <img className="w-full h-full object-cover" src="/chessboard.jpg" />
                </div>
              </div>

              <div className="flex flex-col gap-[20px]">
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-[20px]">
                      <span className="font-medium text-sm text-gray-700">
                        Số lần tung xúc xắc còn lại
                      </span>
                      <span className="font-semibold">4 / 5</span>
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
                        background: `linear-gradient(to right, #3b82f6 ${(4 / 5) * 100}%, #e5e7eb ${(4 / 5) * 100}%)`
                      }}
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center gap-3">
                    <div className="w-16 h-16 rounded-[8px] overflow-hidden">
                      <img
                        src="/dice-4.jpg"
                        alt="Dice"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-2xl font-bold text-[#5A74D2]">4</div>
                  </div>

                  <button className="px-6 py-2 bg-[#5A74D2] text-white font-medium rounded-lg shadow hover:bg-[#4a64c0] transition">
                    🎲 Tung xúc xắc
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3">
                  <h3 className="font-semibold text-gray-800 text-sm">Game</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                      <FaPause />
                      <span className="text-sm font-medium">Pause</span>
                    </button>

                    <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                      <FaRedo />
                      <span className="text-sm font-medium">Reset</span>
                    </button>
                  </div>

                  <h3 className="font-semibold text-gray-800 text-sm">Nhạc nền</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {/* <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                      <FaVolumeMute />
                      <span className="text-sm font-medium">Mute</span>
                    </button> */}

                    <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                      <FaMusic />
                      <span className="text-sm font-medium">Music On</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}