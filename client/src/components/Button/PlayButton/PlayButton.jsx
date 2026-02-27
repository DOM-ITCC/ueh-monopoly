import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const PlayButton = () => {
  const navigate = useNavigate();
  
  const handlePlay = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/user/verifyToken`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          if (data.userInfo.play_remaining > 0) navigate("/game");
          else {
            toast.error("Bạn đã hết lượt chơi!");
            fetch(`${import.meta.env.VITE_BASE_URL}/api/user/logout`, {
              credentials: "include"
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status == "success") {
                  setTimeout(() => {
                    toast.success("Đã đăng xuất!");
                  }, 1200);
                }
              })
          }
        }
        else if (data.status == "error") {
          toast.error(data.message);
          setTimeout(() => {
            navigate("/account/login")
          }, 1200);
        }
      })
  }

  return (
    <>
      <button
        className="bg-[#5A74D2] hover:bg-[#5a74d2b1] py-[15px] w-full flex justify-center shadow-xl text-white font-semibold text-[17px] rounded-[40px] cursor-pointer"
        onClick={handlePlay}
      >
        Chơi
      </button>
    </>
  );
}