import { FaRedo } from 'react-icons/fa';
import { toast } from 'sonner';
import Swal from 'sweetalert2'

export const ResetButton = ({ session, userInfo }) => {
  const handleReset = () => {
    if (userInfo.play_remaining <= 0)
    {
      toast.error("Bạn đã hết lượt chơi!");
      return;
    }

    Swal.fire({
      title: "Xác nhận reset game?",
      text: "Bạn sẽ mất 1 lượt chơi",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Xác nhận",
      denyButtonText: `Hủy`
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/game-session/close`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            sessionId: session.id
          })
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status == "success") {
              window.location.reload();
            }
          })
      }
    });
  }

  return (
    <>
      <button
        className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        onClick={handleReset}
      >
        <FaRedo />
        <span className="text-sm font-medium">Reset</span>
      </button>
    </>
  );
}