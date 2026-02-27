import { FaWindowClose } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export const ExitButton = ({ session }) => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    Swal.fire({
      title: "Xác nhận thoát game?",
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
              navigate("/");
            }
          })
      }
    });
  }

  return (
    <>
      <button
        className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        onClick={handleClose}
      >
        <FaWindowClose />
        <span className="text-sm font-medium">Thoát</span>
      </button>
    </>
  );
}