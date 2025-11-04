import React from "react";

export const HeartSymptomAnalyze = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const form = Object.fromEntries(data.entries());

    console.log("Dữ liệu triệu chứng gửi đi:", form);
  };

  //  Xóa kết quả và reset form
  const handleReset = (e) => {
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50 to-white py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
          Phân Tích Triệu Chứng Tim Mạch
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Vui lòng <b>nhập chính xác</b> các thông tin sức khỏe của bạn. Sau đó
          nhấn <b>“Phân tích”</b> để xem đánh giá sơ bộ nguy cơ tim mạch.
        </p>

        {/* FORM DỮ LIỆU */}
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                name: "age",
                label: "Tuổi",
                note: "Nhập số tuổi (ví dụ: 35, 52...)",
              },
              {
                name: "sex",
                label: "Giới tính",
                note: "Nhập 1 = Nam, 0 = Nữ",
              },
              {
                name: "cp",
                label: "Loại đau ngực (1–4)",
                note: "1: Đau điển hình • 2: Không điển hình • 3: Không do tim • 4: Không đau ngực",
              },
              {
                name: "trestbps",
                label: "Huyết áp khi nghỉ (mmHg)",
                note: "Nhập giá trị đo được, ví dụ 120, 140. Bình thường 90–120 mmHg.",
              },
              {
                name: "chol",
                label: "Cholesterol toàn phần (mg/dL)",
                note: "Nhập giá trị xét nghiệm. Bình thường <200 mg/dL.",
              },
              {
                name: "fbs",
                label: "Đường huyết lúc đói",
                note: "Nhập 1 nếu >120 mg/dL, nhập 0 nếu ≤120 mg/dL.",
              },
              {
                name: "restecg",
                label: "Kết quả điện tâm đồ (ECG)",
                note: "0 = Bình thường • 1 = ST-T bất thường • 2 = Phì đại thất trái",
              },
              {
                name: "thalach",
                label: "Nhịp tim tối đa (bpm)",
                note: `Nhập nhịp tim cao nhất đo được khi gắng sức (đơn vị: bpm).
                        Bình thường khi đạt ≥85% của công thức (220 - tuổi).
                        Nếu thấp hơn 85% → tim đáp ứng kém, có thể liên quan đến bệnh mạch vành hoặc suy tim.`,
              },
              {
                name: "exang",
                label: "Đau thắt ngực khi gắng sức",
                note: "Nhập 1 nếu có, nhập 0 nếu không.",
              },
              {
                name: "oldpeak",
                label: "Độ chênh ST (mm)",
                note: `Nhập độ chênh xuống của đoạn ST trên điện tâm đồ (ECG) sau khi gắng sức.
                - 0.0 mm: Bình thường, không thiếu máu cơ tim.
                - 0.5–1.0 mm: Thiếu máu cơ tim nhẹ.
                - >1.0 mm: Thiếu máu cơ tim rõ rệt.
                - >2.0 mm: Thiếu máu cơ tim nặng, nên được kiểm tra chuyên sâu.`,
              },
              {
                name: "slope",
                label: "Độ dốc đoạn ST (1–3)",
                note: "1 = Lên dốc • 2 = Phẳng • 3 = Xuống dốc",
              },
              {
                name: "ca",
                label: "Số mạch vành tổn thương (0–3)",
                note: `Nhập số lượng mạch vành chính có vôi hóa (qua chụp fluoroscopy).
  0 = Bình thường • 1 = Tổn thương nhẹ (1 mạch) • 2 = Trung bình (2 mạch) • 3 = Nặng (3 mạch).`,
              },
              {
                name: "thal",
                label: "Thalassemia (3/6/7)",
                note: "3 = Bình thường • 6 = Cố định • 7 = Hồi phục",
              },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type="text"
                  className="border border-gray-300 rounded-lg px-3 py-2  text-sm"
                />
                {field.note && (
                  <p className="text-xs text-gray-500 mt-1 italic">
                    {field.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* NÚT HÀNH ĐỘNG */}
          <div className="mt-10 flex justify-center gap-4">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-300 text-white px-6 py-2 rounded-lg shadow font-medium"
            >
              Phân tích
            </button>
            <button
              type="reset"
              className="border border-red-600 text-red-600 px-6 py-2 rounded-lg hover:bg-black hover:text-white font-medium"
            >
              Xóa dữ liệu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
