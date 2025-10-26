import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.jpg";
import icon_nav_menu from "../../assets/image/nav menu.png";
import icon_search from "../../assets/image/icon_search.png";
import user from "../../assets/icons/user.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="w-[90px] lg:w-[130px] cursor-pointer"
          >
            <img
              src={logo}
              alt="HeartCare Logo"
              className="block max-w-full object-contain"
            />
          </div>

          {/* NAVBAR */}
          <ul className="hidden lg:flex items-center space-x-8 text-gray-700 text-[17px] font-medium">
            <li className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] hover:after:scale-x-100 after:scale-x-0 after:w-full after:transition-all after:duration-300">
              <Link to="/">Home</Link>
            </li>
            <li className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] hover:after:scale-x-100 after:scale-x-0 after:w-full after:transition-all after:duration-300">
              <Link to="/diagnosis">Cardiology</Link>
            </li>
            <li className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] hover:after:scale-x-100 after:scale-x-0 after:w-full after:transition-all after:duration-300">
              <Link to="/chatbot">Chatbot</Link>
            </li>
            <li className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] hover:after:scale-x-100 after:scale-x-0 after:w-full after:transition-all after:duration-300">
              <Link to="/history">History</Link>
            </li>
            <li className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] hover:after:scale-x-100 after:scale-x-0 after:w-full after:transition-all after:duration-300">
              <Link to="/report">Report</Link>
            </li>
            <li className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] hover:after:scale-x-100 after:scale-x-0 after:w-full after:transition-all after:duration-300">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          {/* SEARCH + USER + MENU */}
          <div className="flex items-center gap-4">
            {/* Nút tìm kiếm */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="block"
            >
              <img src={icon_search} alt="Search" className="w-6 h-6" />
            </button>

            {/* User icon */}
            <Link to="/login">
              <img src={user} alt="User" className="w-6 h-6" />
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="block lg:hidden"
            >
              <img src={icon_nav_menu} alt="Menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {isMobileSearchOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsMobileSearchOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 w-full bg-white z-50 px-4 py-4 shadow-md animate-slide-down">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Tìm kiếm</span>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>
            <form className="flex items-center border border-gray-300 rounded-full px-3 h-10 w-full">
              <img src={icon_search} alt="Search" className="w-4 h-4 mr-2" />
              <input
                type="text"
                placeholder="Tìm thông tin về sức khỏe tim mạch..."
                className="w-full text-sm focus:outline-none"
              />
            </form>
          </div>
        </>
      )}

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 w-64 h-full bg-white text-black z-50 p-6 space-y-6 shadow-lg">
            <ul className="space-y-5 text-base text-black divide-y divide-gray-300">
              <li>
                <Link to="/">Trang Chủ</Link>
              </li>
              <li>
                <Link to="/diagnosis">Tự Chẩn Đoán</Link>
              </li>
              <li>
                <Link to="/knowledge">Kiến Thức Tim Mạch</Link>
              </li>
              <li>
                <Link to="/tips">Lời Khuyên Sức Khỏe</Link>
              </li>
              <li>
                <Link to="/contact">Liên Hệ</Link>
              </li>
            </ul>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute mx-3 py-1 text-xs px-2 -top-0 right-0 bg-black text-white rounded-xl border-2"
            >
              ✕
            </button>
          </div>
        </>
      )}
    </header>
  );
}
