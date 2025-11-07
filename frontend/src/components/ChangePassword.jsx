import React from "react";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }

    console.log("Đổi mật khẩu:", { currentPassword, newPassword });
    alert("Đổi mật khẩu thành công!");

    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 pt-16">
      <div className="w-full max-w-lg bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8">Đổi mật khẩu</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            name="currentPassword"
            placeholder="Mật khẩu hiện tại"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="Mật khẩu mới"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu mới"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
          />

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="w-1/2 px-4 py-3 border rounded-lg hover:bg-gray-100 text-lg"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="w-1/2 px-4 py-3 bg-red-700 text-white rounded-lg hover:bg-red-300 text-lg"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
