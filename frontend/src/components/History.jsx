import React from "react";
import { Eye, Download, Trash2 } from "lucide-react";

export const History = () => {
  const data = [
    {
      name: "Lịch sử kiểm tra 1.pdf",
      date: "2025-05-22 11:30:13",
      status: "Đã hoàn thành",
    },
    {
      name: "Lịch sử kiểm tra 2.pdf",
      date: "2025-05-20 10:15:40",
      status: "Đã hoàn thành",
    },
    {
      name: "Lịch sử kiểm tra 3.pdf",
      date: "2025-05-18 09:45:22",
      status: "Đã hoàn thành",
    },
  ];

  return (
    <div className="w-full p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Lịch sử</h2>

        <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left font-bold">Tên lịch sử</th>
              <th className="p-3 text-left font-bold">Ngày tạo</th>
              <th className="p-3 text-left font-bold">Trạng thái</th>
              <th className="p-3 text-center font-bold">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition border-t border-gray-300"
              >
                <td className="p-3 text-blue-600 font-medium cursor-pointer">
                  {item.name}
                </td>
                <td className="p-3">{item.date}</td>
                <td className="p-3 text-green-600 font-semibold">
                  {item.status}
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-3">
                    <button className="p-2 rounded-full bg-blue-200 hover:bg-blue-300">
                      <Download size={18} />
                    </button>

                    <button className="p-2 rounded-full bg-red-200 hover:bg-red-300">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
