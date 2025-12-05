import { useState, useRef, useEffect } from "react";
import { Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { profileEdit } from "@/servers/authService";
import { toast } from "sonner";

export const Profile = () => {
  const navigator = useNavigate();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");
  const [userData, setUserData] = useState(null);
  const mutation = useMutation({
    mutationFn: profileEdit,
    onSuccess: (res) => {
      console.log(res.data);
      toast.success("Hồ sơ đã được chỉnh sửa");
      const updatedUser = res.data; 
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setUserData(updatedUser);
      if (updatedUser.avatar) setPreviewImage(updatedUser.avatar);
    },
    onError: () => {
      toast.error("Lỗi");
    },
    retry: false,
  });

  // LẤY USER TỪ LOCALSTORAGE
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);

      // Nếu có avatar thì load
      if (user.avatar) setPreviewImage(user.avatar);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = userData?.id;
    if (!id) return toast.error("ID người dùng không hợp lệ");

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    const file = formData.get("image");
    if (file && file.name) {
      formValues.image = file.name;
    } else {
      formValues.image = previewImage;
    }

    //
    mutation.mutate(formValues);
  };

  if (!userData) {
    return (
      <div className="text-center mt-20 text-gray-600 text-xl">
        Đang tải dữ liệu ...
      </div>
    );
  }

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
              userData.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="avatar"
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
            <label className="font-semibold block mb-1">Tên :</label>
            <input
              type="string"
              name="first_name"
              defaultValue={userData.first_name || ""}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Họ:</label>
            <input
              type="string"
              name="last_name"
              defaultValue={userData.last_name || ""}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Giới tính:</label>
            <input
              type="string"
              name="gender"
              defaultValue={userData.gender || ""}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              defaultValue={userData.email || ""}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Tuổi:</label>
            <input
              type="number"
              name="age"
              defaultValue={userData.age || ""}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Chiều cao:</label>
            <input
              type="number"
              name="height_cm"
              defaultValue={userData.height_cm || ""}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Cân nặng:</label>
            <input
              type="number"
              name="weight_kg"
              defaultValue={userData.weight_kg || ""}
              className="w-full border rounded px-3 py-2"
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
