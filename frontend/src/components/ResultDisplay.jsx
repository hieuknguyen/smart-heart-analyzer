import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Bình thường", value: 86.27 },
  { name: "Nguy cơ", value: 13.73 },
];
const COLORS = ["#2ecc71", "#e74c3c"];

export const ResultDisplay = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      {/* Tiêu đề */}
      <h1 className="text-5xl font-bold mb-10 text-center">
        Kết quả phân tích hình ảnh EGC
      </h1>

      {/* Hàng chứa ảnh và biểu đồ */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
        <div className="flex flex-col items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzw1PTnLXyZDfg798W3WgV9rCEWHBU02gUmw&s"
            alt="X-ray"
            className="w-[300px] h-auto border-2 border-gray-300 rounded-lg shadow-md"
          />
        </div>

        {/* Cột biểu đồ và kết quả */}
        <div className="flex flex-col items-center">
          <ResponsiveContainer width={280} height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>

          <div className="text-center mt-4">
            <p className="text-lg font-semibold">Kết quả phân loại</p>
            <p className="text-green-600 font-bold text-xl mt-2">
              NORMAL - Độ tin cậy: 86.27%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
