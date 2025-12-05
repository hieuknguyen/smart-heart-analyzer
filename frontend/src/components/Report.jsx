import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { Save } from "lucide-react";
import { UploadCloud } from "lucide-react";
import jsPDF from "jspdf";
import logo from "@/assets/image/logo.png";
import ECG from "@/assets/image/ECG.png";

export const CardioReport = () => {
  const reportRef = useRef();

  const sampleCardioData = {
    name: "Nguyễn Văn Minh",
    age: 52,
    birth: "12/03/1973",
    blood: "O+",
    weight: "71 kg",
    height: "168 cm",
    gender: "Nam",
    email: "minh.nguyen@example.com",
    address: "45 Trần Hưng Đạo, Q1, TP. Hồ Chí Minh",
    history: "Tăng huyết áp, cholesterol cao",
    ecgImage: ECG,
    // Kết quả phân loại ECG
    ecgClassification: "Nguy cơ cao",
    ecgConfidence: 62.5,
    // Kết quả phân loại triệu chứng
    symptomClassification: "Nguy cơ trung bình",
    symptomConfidence: 48.75,
    advice: [
      "Tập thể dục 30 phút/ngày.",
      "Hạn chế đồ ăn dầu mỡ.",
      "Kiểm tra huyết áp mỗi tuần.",
      "Theo dõi nhịp tim khi căng thẳng.",
      "Tái khám sau 1 tháng.",
    ],
  };

  const exportPDF = (fileName) => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * 210) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(fileName);
    });
  };

  return (
    <div className="p-6">
      {/* BUTTONS */}
      <div className="flex gap-3 mb-5">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded shadow flex items-center gap-2"
          onClick={() => exportPDF("Report_Save.pdf")}
        >
          <Save size={16} /> Lưu PDF
        </button>

        <button
          className="px-4 py-2 bg-red-600 text-white rounded shadow flex items-center gap-2"
          onClick={() => exportPDF("Report_Export.pdf")}
        >
          <UploadCloud size={16} /> Xuất PDF
        </button>
      </div>

      {/* REPORT CONTENT */}
      <div
        ref={reportRef}
        className="w-[800px] mx-auto bg-white p-10 border shadow"
      >
        {/* HEADER */}
        <div className="text-center border-b pb-4 flex items-center justify-between ">
          <img src={logo} className="w-40" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">BÁO CÁO BỆNH ÁN NỘI</h1>
            <h2 className="text-xl font-medium mt-1">KHOA TIM MẠCH</h2>
          </div>
        </div>

        {/* I. INFORMATION */}
        <h3 className="text-xl font-bold mt-8 border-b pb-1">
          I. THÔNG TIN BỆNH NHÂN
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-1">
            <p>
              <b>Họ tên:</b> {sampleCardioData.name}
            </p>
            <p>
              <b>Tuổi:</b> {sampleCardioData.age}
            </p>
            <p>
              <b>Ngày sinh:</b> {sampleCardioData.birth}
            </p>
            <p>
              <b>Nhóm máu:</b> {sampleCardioData.blood}
            </p>
            <p>
              <b>Cân nặng:</b> {sampleCardioData.weight}
            </p>
          </div>
          <div className="space-y-1">
            <p>
              <b>Email:</b> {sampleCardioData.email}
            </p>
            <p>
              <b>Giới tính:</b> {sampleCardioData.gender}
            </p>
            <p>
              <b>Địa chỉ:</b> {sampleCardioData.address}
            </p>
            <p>
              <b>Chiều cao:</b> {sampleCardioData.height}
            </p>
            <p>
              <b>Tiền sử bệnh:</b> {sampleCardioData.history}
            </p>
          </div>
        </div>

        {/* II. ECG CLASSIFICATION */}
        <h3 className="text-xl font-bold mt-8 border-b pb-1">
          II. KẾT QUẢ PHÂN LOẠI ECG
        </h3>
        <div className="mt-5 text-center">
          <img
            src={sampleCardioData.ecgImage}
            className="w-[600px] mx-auto border"
          />
        </div>
        <div className="mt-3 p-4 border bg-gray-100 rounded">
          <p>
            <b>Kết quả phân loại:</b>
          </p>
          <p className="mt-1">
            {sampleCardioData.ecgClassification} - Độ tin cậy:{" "}
            {sampleCardioData.ecgConfidence.toFixed(2)}%
          </p>
        </div>

        {/* III. SYMPTOM CLASSIFICATION */}
        <h3 className="text-xl font-bold mt-8 border-b pb-1">
          III. KẾT QUẢ PHÂN LOẠI TRIỆU CHỨNG
        </h3>
        <div className="mt-3 p-4 border bg-gray-50 rounded">
          <p>
            <b>Kết quả phân loại:</b>
          </p>
          <p className="mt-1">
            {sampleCardioData.symptomClassification} - Độ tin cậy:{" "}
            {sampleCardioData.symptomConfidence.toFixed(2)}%
          </p>
        </div>

        {/* IV. RECOMMENDATION */}
        <h3 className="text-xl font-bold mt-8 border-b pb-1">
          IV. KHUYẾN NGHỊ & PHÁC ĐỒ
        </h3>
        <ul className="list-disc ml-6 mt-3 space-y-1">
          {sampleCardioData.advice.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
