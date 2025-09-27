"use client"

import JustValidate from "just-validate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaEnvelope, FaAddressBook, FaUser } from "react-icons/fa";
import { toast, Toaster } from "sonner";

export const LoginForm = () => {
  const router = useRouter();

  useEffect(() => {
    const validation = new JustValidate('#login-form');

    validation
      .addField('#fullname', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập họ và tên!'
        },
      ], {
        errorsContainer: '#email-container'
      })
      .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập email!'
        },
        {
          rule: 'email',
          errorMessage: 'Email sai định dạng!',
        },
      ], {
        errorsContainer: '#email-container'
      })
      .addField('#student_id', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập MSSV!'
        },
      ], {
        errorsContainer: '#email-container'
      })
      .onSuccess((event) => {
        const fullname = event.target.fullname.value;
        const email = event.target.email.value;
        const student_id = event.target.student_id.value;

        const finalData = {
          fullname: fullname,
          email: email,
          student_id: student_id
        };

        const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(finalData)
        })
          .then((res) => res.json())
          .then((data) => {
            return data;
          });

        toast.promise(promise, {
          loading: "Đang xử lý...",
          success: (data) => {
            if (data.status == "success") {
              setTimeout(() => {
                router.push("/game");
              }, 1200);
            }
            return data.message;
          },
          error: (data) => data.message
        })
      })
  }, [])

  return (
    <>
      <Toaster />
      <form id="login-form" className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-full border-[1px] border-[grey]">
          <FaUser className="text-gray-500" />
          <input
            type="text"
            id="fullname"
            placeholder="Họ và tên"
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-full border-[1px] border-[grey]">
          <FaEnvelope className="text-gray-500" />
          <input
            type="email"
            id="email"
            placeholder="Email sinh viên"
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-full border-[1px] border-[grey]">
          <FaAddressBook className="text-gray-500" />
          <input
            type="text"
            id="student_id"
            placeholder="Mã số sinh viên"
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>

        <button
          type="submit"
          className="mt-2 py-3 rounded-full bg-[#5A74D2] text-white font-semibold text-sm hover:bg-[#5a74d2b1] transition"
        >
          LOGIN
        </button>
        <div id="email-container" className="text-[10px] text-center flex flex-col gap-[2px]"></div>
      </form>
    </>
  );
}