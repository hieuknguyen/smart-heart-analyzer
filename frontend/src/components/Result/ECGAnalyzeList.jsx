import { useState } from "react";
import { ResultDisplay } from "../Result/ResultDisplay";
import { useSearchParams } from "react-router-dom";

export const HeartECGAnalazyeList = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleOnChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    setKeyword(value);
    setSearchParams({ search: keyword, status: value });
  };

  return (
    <div className="min-w-screen max-w-[1400px] mx-auto px-4 sm:px-6 py-6 ">
      {/* Tiêu đề căn trái */}
      <h1 className="text-[32px] font-bold text-red-700 mb-6 px-6 text-center mt-4">
        Kết quả phân tích hình ảnh ECG
      </h1>

      {/* Bộ lọc */}
      <div className="mb-6 flex  ml-[200px]">
        <select
          value={statusFilter}
          className="w-[240px] h-[44px] p-2 bg-white rounded-[10px] shadow-md outline-none border border-gray-200"
          onChange={handleOnChange}
        >
          <option value="">Tất cả kết quả</option>
          <option value="normal">Bình thường</option>
          <option value="abnormal">Bất thường</option>
        </select>
      </div>

      {/* Nội dung */}
      <ResultDisplay keyword={keyword} status={statusFilter} />
    </div>
  );
};
