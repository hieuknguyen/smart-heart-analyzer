import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postECGAnalyze } from "@/servers/AnalyzeService";
import { toast } from "sonner";

export const HeartSymptomAnalyze = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: postECGAnalyze,
    onSuccess: (res) => {
      toast.success(res.data.message);
      toast.success("Phân tích triệu chứng thành công!");
    },
    onError: (error) => {
      console.log(error.data.message);
      toast.error("Phân tích triệu chứng thất bại!");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const form = Object.fromEntries(data.entries());
    console.log(form);

    mutation.mutate(form);
  };

  //  Xóa kết quả và reset form
  // const handleReset = (e) => {
  //   e.target.reset();
  // };

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
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* age */}
            <div>
              <label className="block mb-1 font-medium">Tuổi *</label>
              <input
                type="number"
                name="age"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                Nhập số tuổi (ví dụ: 35, 52...)
              </p>
            </div>

            {/* sex */}
            <div>
              <label className="block mb-1 font-medium">Giới tính *</label>
              <input
                type="text"
                name="sex"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                Nhập Male = Nam • Female = Nữ
              </p>
            </div>

            {/* cp */}
            <div>
              <label className="block mb-1 font-medium">
                Loại đau ngực (CP) *
              </label>
              <input
                type="text"
                name="cp"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                Typical Angina: Đau điển hình • Atypical Angina: Không điển hình • Non-Angina: Không do tim • Asymptomatic:
                Không đau ngực
              </p>
            </div>

            {/* trestbps */}
            <div>
              <label className="block mb-1 font-medium">
                Huyết áp khi nghỉ (mmHg) *
              </label>
              <input
                type="number"
                name="trestbps"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                Bình thường từ 90–120 mmHg.
              </p>
            </div>

            {/* chol */}
            <div>
              <label className="block mb-1 font-medium">
                Cholesterol (mg/dL) *
              </label>
              <input
                type="number"
                name="chol"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                Bình thường &lt; 200 mg/dL.
              </p>
            </div>

            {/* fbs */}
            <div>
              <label className="block mb-1 font-medium">
                Đường huyết lúc đói *
              </label>
              <input
                type="text"
                name="fbs"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                Nhập False nếu &gt;120 mg/dL • Nhập True nếu ≤120 mg/dL.
              </p>
            </div>

            {/* restecg */}
            <div>
              <label className="block mb-1 font-medium">
                Điện tâm đồ (ECG) *
              </label>
              <input
                type="text"
                name="restecg"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                Normal = Bình thường • ST-T Abnormality = ST-T bất thường • Left Ventricular Hypertrophy =Phì đại tâm thất
              </p>
            </div>

            {/* thalach */}
            <div>
              <label className="block mb-1 font-medium">
                Nhịp tim tối đa (bpm) *
              </label>
              <input
                type="number"
                name="thalach"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                Nhịp tim cao nhất khi gắng sức. Bình thường ≥ 85% (220 - tuổi).
              </p>
            </div>

            {/* exang */}
            <div>
              <label className="block mb-1 font-medium">
                Đau ngực khi gắng sức *
              </label>
              <input
                type="text"
                name="exang"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                Yes = Có • No = Không
              </p>
            </div>

            {/* oldpeak */}
            <div>
              <label className="block mb-1 font-medium">
                Độ chênh ST (mm) *
              </label>
              <input
                type="number"
                step="0.1"
                name="oldpeak"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                0.0 = Bình thường • 0.5–1.0 = Nhẹ • &gt;1 = Rõ rệt • &gt;2 =
                Nặng.
              </p>
            </div>

            {/* slope */}
            <div>
              <label className="block mb-1 font-medium">Độ dốc đoạn ST *</label>
              <input
                type="text"
                name="slope"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                UPsloping = Lên dốc • Flat = Phẳng • DownSLoping = Xuống dốc
              </p>
            </div>

            {/* ca */}
            <div>
              <label className="block mb-1 font-medium">
                Số mạch vành tổn thương *
              </label>
              <input
                type="number"
                name="ca"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                0 = Bình thường • 1–3 = Mức độ tổn thương tăng dần
              </p>
            </div>

            {/* thal */}
            <div>
              <label className="block mb-1 font-medium">Thalassemia *</label>
              <input
                type="text"
                name="thal"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                Normal = Bình thường • Fixed Default = Cố định • Reversible Defect = Hồi phục
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={() => navigate("/result-symptom")}
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
