import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-[url('/mainbg.png')] bg-cover bg-center z-0"></div>

      <div className="relative z-10 bg-[#EEF2F5] flex flex-col items-center justify-center mt-[30px] px-[30px] mx-[30px] rounded-[20px] shadow-2xl border-[7px] border-[#DFE2EC]">
        <Outlet />
      </div>
    </div>
  );
}
