import { useState, useRef } from "react";
import { Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigator = useNavigate();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    const file = formData.get("image");
    if (file && file.name) {
      formValues.image = file.name;
    } else {
      formValues.image = previewImage;
    }

    console.log("Dữ liệu cập nhật:", formValues);
  };

  return (
    <main className="relative max-w-7xl mx-auto mt-8 mb-8 bg-white rounded-xl shadow-md overflow-hidden border">
      {/* nút X để đóng */}
      <button
        type="button"
        onClick={() => navigator("/")}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        <X size={22} />
      </button>

      <div className="bg-gray-100 px-4 py-2 font-semibold text-gray-800 border-b">
        Thông tin cá nhân
      </div>

      <form className="flex p-6 gap-6" onSubmit={handleSubmit}>
        {/* Ảnh trái */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={
              previewImage ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="admin"
            className="w-40 h-48 object-cover border rounded-md cursor-pointer hover:opacity-80"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setPreviewImage(URL.createObjectURL(file));
            }}
            className="hidden"
          />
          <p className="text-xs text-gray-500">Click vào ảnh để đổi</p>
        </div>

        {/* Form bên phải */}
        <div className="grid grid-cols-2 gap-4 text-sm w-full">
          <div>
            <label className="font-semibold block mb-1">Họ tên:</label>
            <input
              type="text"
              name="fullName"
              defaultValue="Nguyễn Văn A"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              defaultValue="admin@example.com"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Số điện thoại:</label>
            <input
              type="text"
              name="phone"
              defaultValue="0901234567"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Địa chỉ:</label>
            <input
              type="text"
              name="address"
              defaultValue="123 Lê Lợi, Q.1, TP.HCM"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Chức vụ:</label>
            <input
              type="text"
              name="role"
              defaultValue="Quản trị viên"
              className="w-full border rounded px-3 py-2"
              disabled
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Trạng thái:</label>
            <input
              type="text"
              name="status"
              defaultValue="Đang hoạt động"
              className="w-full border rounded px-3 py-2"
              disabled
            />
          </div>

          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              <Save size={18} />
              Cập nhật
            </button>

            <button
              type="button"
              onClick={() => navigator("/profile/ChangePassword")}
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              <Save size={18} />
              Thay đổi mật khẩu
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};
