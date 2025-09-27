import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="relative w-screen h-screen">
        <div className="absolute inset-0 bg-[url('/mainbg.png')] bg-cover bg-center z-0">
          <div className="relative z-10 bg-[#EEF2F5] flex flex-col items-center justify-center mt-[50px] py-[50px] px-[30px] mx-[100px] rounded-[20px] shadow-2xl border-[7px] border-[#DFE2EC]">
            <div className="flex justify-between gap-[30px] w-full mb-[30px]">
              <div className="w-[70%]">
                <div className="h-[100px] w-[auto]">
                  <img src="/thumbnail.png" className="w-full h-full object-contain" />
                </div>
                <div className="text-[70px] font-bold mb-[20px]">
                  Challenge - Job Hunters
                </div>
                <div className="text-[17px] font-light text-[]">
                  Hành trình Job Hunter - nơi người chơi hóa thân thành ứng viên trên con đường tìm việc, vượt qua thử thách, tích lũy kỹ năng và cạnh tranh để trở thành ứng viên sáng giá nhất.
                </div>
                <div className="mt-[30px]">
                  {/* <button className="bg-[#5A74D2] hover:bg-[#5a74d2b1] py-[15px] w-full flex justify-center shadow-xl text-white font-semibold text-[17px] rounded-[40px] cursor-pointer">Chơi</button> */}
                  <div className="mt-[10px] flex gap-[20px]">
                    <div className="bg-[white] py-[15px] w-[50%] flex justify-center shadow-xl font-semibold text-[17px] rounded-[40px]">Thời gian còn lại: 1 ngày 20 giờ</div>
                    <div className="bg-[white] py-[15px] w-[50%] flex justify-center shadow-xl font-semibold text-[17px] rounded-[40px]">Số người tham gia: 15</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center w-[30%] py-10 px-[20px] bg-white rounded-[20px] shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                  Đăng nhập
                </h2>

                <LoginForm/>

                {/* Links */}
                <div className="text-center mt-4 text-sm text-gray-500">
                  <a href="#" className="hover:underline">
                    Quên mật khẩu?
                  </a>
                </div>
                {/* <div className="text-center mt-6 text-sm text-gray-700">
                  Create your Account{" "}
                  <a href="#" className="text-gray-900 font-medium hover:underline">
                    →
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}