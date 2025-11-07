import React from "react";
import { MessageCirclePlus } from "lucide-react";

/**
 * ChatAdd component
 * - Dùng để hiển thị nút "Thêm đoạn chat mới" (new conversation)
 *
 * Props:
 *  - onAdd: hàm xử lý khi bấm tạo chat mới
 */
export const ChatAdd = ({ onAdd }) => {
  return (
    <button
      onClick={onAdd}
      className="flex items-center gap-2 px-4 py-2 w-full text-sm font-medium 
                 text-white bg-blue-600 hover:bg-blue-700 
                 rounded-lg shadow transition duration-200"
    >
      <MessageCirclePlus className="w-5 h-5" />
      <span>Tạo đoạn chat mới</span>
    </button>
  );
};
