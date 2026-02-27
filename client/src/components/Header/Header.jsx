export const Header = () => {
  return (
    <header className="w-full flex items-center justify-between py-3">
      <div className="flex items-center gap-2">
        <div className="w-[40px] h-[auto]">
          <img
            src="/favicon.ico"
            alt="Logo"
            className="w-full h-full object-cover translate-y-[-5px]"
          />
        </div>
        <span className="font-normal text-[25px] text-black">UEH Monopoly</span>
      </div>

      <nav className="flex items-center gap-6 text-[20px] font-medium text-gray-800">
        <a
          href="/"
          className="px-4 py-1 rounded-full hover:bg-gray-300 transition"
        >
          Trang chủ
        </a>
        <a
          href="#"
          className="px-4 py-1 rounded-full hover:bg-gray-300 transition"
        >
          Cách chơi
        </a>
      </nav>
    </header>
  );
};
