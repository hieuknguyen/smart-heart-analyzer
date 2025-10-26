import React from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0d1b2a] to-[#000814] text-white pt-20 pb-10">
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="flex flex-wrap justify-between border-b border-gray-700 pb-10 mb-8">
          {/* Logo & Intro */}
          <div className="w-full md:w-1/3 mb-10 md:mb-0">
            <p className="text-sm text-gray-300 leading-relaxed">
              Ứng dụng <strong>Heart Analyzer</strong> giúp người dùng tự đánh
              giá tình trạng sức khỏe tim mạch, theo dõi chỉ số và nhận khuyến
              nghị chăm sóc tim hợp lý.
            </p>
            <div className="flex space-x-4 mt-5">
              <a href="#" aria-label="Facebook">
                <FaFacebookF className="text-xl hover:text-red-400 transition-colors" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-xl hover:text-red-400 transition-colors" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn className="text-xl hover:text-red-400 transition-colors" />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube className="text-xl hover:text-red-400 transition-colors" />
              </a>
              <a href="#" aria-label="Email">
                <FaEnvelope className="text-xl hover:text-red-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="w-1/2 md:w-1/5 mb-10 md:mb-0">
            <h4 className="text-base font-semibold mb-5 uppercase">
              Giới thiệu
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#">Về Dự Án</a>
              </li>
              <li>
                <a href="#">Nhóm Phát Triển</a>
              </li>
              <li>
                <a href="#">Tầm Nhìn & Sứ Mệnh</a>
              </li>
            </ul>
          </div>

          <div className="w-1/2 md:w-1/5 mb-10 md:mb-0">
            <h4 className="text-base font-semibold mb-5 uppercase">Hỗ trợ</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#">Câu hỏi thường gặp</a>
              </li>
              <li>
                <a href="#">Liên hệ hỗ trợ</a>
              </li>
              <li>
                <a href="#">Chính sách quyền riêng tư</a>
              </li>
            </ul>
          </div>

          <div className="w-1/2 md:w-1/5">
            <h4 className="text-base font-semibold mb-5 uppercase">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Email: support@heartanalyzer.vn</li>
              <li>Hotline: 1900 1234</li>
              <li>Địa chỉ: TP. Hồ Chí Minh</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-sm text-gray-500">
          © 2025 Heart Analyzer. All Rights Reserved. Developed with by Team
          Smart Health.
        </div>
      </div>
    </footer>
  );
}
