import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

// Màu cho biểu đồ
const COLORS = ["#2ecc71", "#e74c3c"];

// Có thể nhận props từ form thực tế
const sampleResult = {
  probability: 62.5,
  label: "Nguy cơ cao",
  formData: {
    age: 52,
    sex: "male",
    cp: "3%",
    trestbps: 150,
    chol: 240,
    fbs: 0,
    restecg: 1,
    thalach: 130,
    exang: 1,
    oldpeak: 1.5,
    slope: 2,
    ca: 1,
    thal: 7,
  },
};

export const SymptomResult = ({ result = sampleResult }) => {
  const { probability, label, formData } = result;

  const pieData = [
    { name: "Bình thường", value: 100 - probability },
    { name: "Nguy cơ", value: probability },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center  px-6 py-4">
      {/*  DESKTOP  */}
      <div className="hidden lg:flex flex-row justify-center items-start gap-12 w-full">
        {/* Cột 1 */}
        <div className="bg-gray-50 border p-6 rounded-lg shadow-md w-[350px]">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Thông tin người dùng
          </h2>
          <ul className="text-gray-700 space-y-2">
            {Object.entries(formData).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span className="capitalize">{key}</span>
                <span className="font-medium">{value || "-"}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 2 */}
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
        </div>

        {/* Cột 3 */}
        <div className="text-center mt-4 w-[250px]">
          <p className="text-lg font-semibold">Kết quả phân loại</p>
          <p
            className={`font-bold text-xl mt-2 ${
              label === "Bình thường" ? "text-green-600" : "text-red-600"
            }`}
          >
            {label} - Độ tin cậy: {probability.toFixed(2)}%
          </p>
        </div>
      </div>

      {/*  MOBILE*/}
      <div className="flex lg:hidden flex-col items-center gap-8 w-full">
        {/* Bảng */}
        <div className="bg-gray-50 border p-6 rounded-lg shadow-md w-[350px]">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Thông tin người dùng
          </h2>
          <ul className="text-gray-700 space-y-2">
            {Object.entries(formData).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span className="capitalize">{key}</span>
                <span className="font-medium">{value || "-"}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Biểu đồ */}
        <div className="flex flex-col items-center">
          <ResponsiveContainer width={250} height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Kết quả */}
        <div className="text-center w-full">
          <p className="text-lg font-semibold">Kết quả phân loại</p>
          <p
            className={`font-bold text-xl mt-2 ${
              label === "Bình thường" ? "text-green-600" : "text-red-600"
            }`}
          >
            {label} - Độ tin cậy: {probability.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};
