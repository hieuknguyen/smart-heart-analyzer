import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/image/banner.webp";
import banner1 from "../../assets/image/banner1.jpg";
import banner2 from "../../assets/image/banner2.jpg";
import { useMutation } from "@tanstack/react-query";
import { loginWithToken } from "@/servers/authService";
import Cookies from "js-cookie";

import {
  HeartPulse,
  MessageCircle,
  ClipboardList,
  History,
} from "lucide-react";
export default function Home() {
  const mutation = useMutation({
    mutationFn: loginWithToken,
    onSuccess: (res) => {
      console.log("Login with token success:", res.data.token);
      // Lưu lại user info
      localStorage.setItem("isLogin", true);
    },
    onError: () => {
      console.log("Token invalid");
    },
  });
  useEffect(() => {
    mutation.mutate();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="font-sans text-gray-800">
      {/* --- CHÀO MỪNG --- */}
      <section className="max-w-[1400px] mx-auto px-6 py-4 text-center ">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          <span className="text-red-600">Heart Health AI</span> – Trợ lý tim
          mạch của bạn
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
          Nền tảng ứng dụng trí tuệ nhân tạo giúp bạn theo dõi, phân tích và
          chẩn đoán tình trạng sức khỏe tim mạch chính xác – mọi lúc, mọi nơi.
        </p>
        <button
          onClick={() => navigate("/diagnosis")}
          className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-all"
        >
          Bắt đầu ngay
        </button>
      </section>

      {/* --- TÍNH NĂNG CHÍNH --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
            Tính năng nổi bật
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <HeartPulse size={60} className="mx-auto text-red-500" />,
                title: "Tự Chẩn Đoán",
                desc: "Đánh giá sức khỏe tim mạch thông qua các câu hỏi y khoa và dữ liệu của bạn.",
                link: "/diagnosis",
              },
              {
                icon: (
                  <MessageCircle size={60} className="mx-auto text-red-500" />
                ),
                title: "Chatbot Tư Vấn",
                desc: "Trò chuyện cùng trợ lý ảo để hiểu rõ hơn về tình trạng sức khỏe của bạn.",
                link: "/chatbot",
              },
              {
                icon: <History size={60} className="mx-auto text-red-500" />,
                title: "Theo Dõi Lịch Sử",
                desc: "Lưu lại kết quả chẩn đoán và theo dõi tiến trình cải thiện sức khỏe tim mạch.",
                link: "/history",
              },
              {
                icon: (
                  <ClipboardList size={60} className="mx-auto text-red-500" />
                ),
                title: "Báo Cáo Chi Tiết",
                desc: "Xem thống kê và báo cáo chuyên sâu giúp bạn hiểu rõ tình trạng tim mạch của mình.",
                link: "/report",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => navigate(item.link)}
                className="bg-white shadow-md rounded-2xl p-6 text-center cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-red-600">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* --- GIỚI THIỆU --- */}
      <section className="relative py-20 bg-gradient-to-b from-white via-red-50 to-white overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/src/assets/image/heart_pattern.png')] bg-cover bg-center opacity-5"
          aria-hidden="true"
        ></div>

        <div className="relative max-w-[1000px] mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center justify-center bg-red-100 rounded-full p-4 mb-6 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-600 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21C12 21 6 16 6 10a6 6 0 1112 0c0 6-6 11-6 11z"
              />
            </svg>
          </div>

          <h2 className="text-4xl font-bold mb-4 text-red-600">
            Vì sao nên quan tâm đến sức khỏe tim mạch?
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
            Trái tim là trung tâm của sự sống — nơi khởi nguồn của mọi nhịp đập,
            mọi cảm xúc và năng lượng trong cơ thể. Việc theo dõi và đánh giá
            sức khỏe tim mạch định kỳ giúp phát hiện sớm dấu hiệu bất thường,
            phòng ngừa nguy cơ và duy trì cuộc sống khỏe mạnh, tràn đầy năng
            lượng
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-12">
            <div className="flex flex-col items-center text-center w-60 sm:w-64">
              <img
                src={banner}
                alt="Phát hiện sớm bệnh tim mạch"
                className="w-full h-56 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-gray-800 font-semibold mt-3">
                Phát hiện sớm bệnh tim mạch
              </p>
            </div>

            <div className="flex flex-col items-center text-center w-60 sm:w-64">
              <img
                src={banner1}
                alt="Theo dõi huyết áp & nhịp tim"
                className="w-full h-56 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-gray-800 font-semibold mt-3">
                Theo dõi huyết áp & nhịp tim
              </p>
            </div>

            <div className="flex flex-col items-center text-center w-60 sm:w-64">
              <img
                src={banner2}
                alt="Cải thiện lối sống lành mạnh"
                className="w-full h-56 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-gray-800 font-semibold mt-3">
                Cải thiện lối sống lành mạnh
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
