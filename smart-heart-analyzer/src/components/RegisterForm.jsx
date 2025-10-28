import React, { useState } from "react";
import { Link } from "react-router-dom";
import Google from "../assets/image/logo_google.png";
import Facebook from "../assets/image/logo_facebook.png";
import Twitter from "../assets/image/logo_Twitter.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //   const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!first_name || !last_name || !email || !password || !confirmPassword) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }

    toast.success("Đăng ký thành công! Hãy đăng nhập để tiếp tục 💖");
    // setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#F2F0F1] px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-500 text-sm mt-2">
              Hãy tạo tài khoản để bắt đầu hành trình chăm sóc sức khỏe tim mạch
              ❤️
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500"
                aria-label="Toggle confirm password"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-500 transition"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-sm text-gray-500">Or sign up with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Register */}
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

          {/* Login link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
