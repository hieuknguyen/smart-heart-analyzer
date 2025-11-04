import React, { useState } from "react";

export const ECGAnalyze = () => {
  const [images, setImages] = useState([]);
  const [urlInput, setUrlInput] = useState("");
  const [previewImg, setPreviewImg] = useState(null);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      format: file.name.split(".").pop(),
      source: "Thiết bị",
      url: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
  };

  // 🌐 Thêm ảnh từ URL
  const handleAddFromURL = () => {
    if (!urlInput.trim()) return;
    const newImg = {
      id: Date.now(),
      name: "Ảnh từ URL",
      size: "-",
      format: "jpg/png",
      source: "URL",
      url: urlInput,
    };
    setImages([...images, newImg]);
    setUrlInput("");
  };

  const handleRemove = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const handleClear = () => {
    setImages([]);
  };

  const handleAnalyze = () => {
    alert("Đang phân tích ảnh...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50 to-white py-6 sm:py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-red-600 mb-6 sm:mb-8">
          Upload ảnh ECG để phân tích
        </h1>

        {/* Ô chọn ảnh từ máy */}
        <div className="mb-6 sm:mb-8">
          <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
            Chọn ảnh từ máy:
          </label>

          <input
            id="fileUpload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <label
            htmlFor="fileUpload"
            className="inline-block cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2 rounded-lg shadow transition-all font-medium text-sm sm:text-base"
          >
            Thêm ảnh từ thiết bị
          </label>
        </div>

        {/* Ô thêm ảnh từ URL */}
        <div className="mb-8">
          <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
            Hoặc thêm ảnh từ URL:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Nhập URL ảnh"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base"
            />
            <button
              onClick={handleAddFromURL}
              className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2 rounded-lg shadow transition-all text-sm sm:text-base"
            >
              Thêm ảnh từ URL
            </button>
          </div>
        </div>

        {/* Hiển thị ảnh đã chọn */}
        {images.length > 0 && (
          <>
            {/* Danh sách ảnh */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-8 justify-items-center">
              {images.map((img, i) => (
                <div
                  key={img.id}
                  className="bg-white shadow-md rounded-xl p-3 text-center relative border border-gray-100 w-[140px]"
                >
                  {/* Nút xóa */}
                  <button
                    onClick={() => handleRemove(img.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition"
                  >
                    ×
                  </button>

                  {/* Ảnh xem trước */}
                  <img
                    src={img.url}
                    alt={img.name}
                    onClick={() => setPreviewImg(img.url)}
                    className="w-32 h-32 sm:w-24 sm:h-24 object-contain mx-auto mb-2 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                  />
                  <p className="font-semibold text-gray-700 text-xs sm:text-sm">
                    Ảnh {i + 1}
                  </p>
                </div>
              ))}
            </div>

            {/* Bảng thông tin ảnh */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 sm:p-6 mb-8 overflow-x-auto">
              <p className="text-red-600 font-semibold mb-4 text-sm sm:text-base">
                Tổng ảnh đã chọn: {images.length} ảnh
              </p>
              <table className="w-full min-w-[400px] border-collapse text-xs sm:text-sm text-left">
                <thead>
                  <tr className="border-b border-gray-300 text-red-600">
                    <th className="pb-2">Tên ảnh</th>
                    <th className="pb-2">Kích thước</th>
                    <th className="pb-2">Định dạng</th>
                    <th className="pb-2">Nguồn</th>
                  </tr>
                </thead>
                <tbody>
                  {images.map((img, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-2">{img.name}</td>
                      <td className="py-2">{img.size}</td>
                      <td className="py-2">{img.format}</td>
                      <td className="py-2">{img.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Nút hành động */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={handleAnalyze}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 sm:px-6 py-2 rounded-md shadow transition-all text-sm sm:text-base"
              >
                Phân tích
              </button>
              <button
                onClick={handleClear}
                className="border border-red-600 text-red-600 font-medium px-5 sm:px-6 py-2 rounded-md hover:bg-red-50 transition-all text-sm sm:text-base"
              >
                Xóa tất cả
              </button>
            </div>
          </>
        )}

        {/* Nếu chưa có ảnh */}
        {images.length === 0 && (
          <div className="text-center text-gray-500 italic mt-8 text-sm sm:text-base">
            Chưa có ảnh nào được chọn. Vui lòng thêm ảnh để bắt đầu phân tích.
          </div>
        )}
      </div>

      {/* ✅ Modal xem trước ảnh */}
      {previewImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreviewImg(null)}
        >
          <img
            src={previewImg}
            alt="Preview"
            className="w-[950px] h-[700px] rounded-lg shadow-2xl border-4 border-white"
          />
        </div>
      )}
    </div>
  );
};
