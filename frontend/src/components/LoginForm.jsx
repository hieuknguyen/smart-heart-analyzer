import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeartPulse, FaEye, FaEyeSlash } from "react-icons/fa6";
import Google from "../assets/image/logo_google.png";
import Facebook from "../assets/image/logo_facebook.png";
import Twitter from "../assets/image/logo_Twitter.png";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/servers/authService";
import { toast } from "sonner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: loginService,
    onSuccess: (res) => {
      toast.success("Đăng nhập thành công!");
      localStorage.setItem("isLogin", true);
      localStorage.setItem("user", JSON.stringify(res.data));
      console.log(res.data);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (error) => {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    } else {
      const data = {
        email: email,
        password: password,
      };
      mutation.mutate(data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 via-white to-red-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/image/heart_pattern.png')] opacity-5 bg-cover"></div>

        {/* Header */}
        <div className="relative text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-red-100 p-3 rounded-full">
              <FaHeartPulse className="text-red-500 text-3xl animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Heart Health Login
          </h2>
          <p className="text-gray-500 text-sm">
            Đăng nhập để bắt đầu chẩn đoán sức khỏe tim mạch của bạn
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 relative">
          <input
            type="email"
            name="email"
            placeholder="Nhập email của bạn"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mật khẩu"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
              aria-label="Toggle password"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-500 transition"
          >
            Đăng nhập
          </button>
        </form>

        {/* Hoặc đăng nhập bằng mạng xã hội */}
        <div className="flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-sm text-gray-500">Hoặc đăng nhập với</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100">
            <img src={Google} alt="Google" className="w-6 h-6" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100">
            <img src={Facebook} alt="Facebook" className="w-6 h-6" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100">
            <img src={Twitter} alt="Twitter" className="w-6 h-6" />
          </button>
        </div>

        {/* Link tạo tài khoản */}
        <p className="text-center text-sm text-gray-600 relative">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
