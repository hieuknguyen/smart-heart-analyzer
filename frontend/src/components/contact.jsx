import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import Banner4 from "../assets/image/banner4.jpg";
import { SuccessMessage } from "./SucessMessage";

export const Contact = () => {
  const [state, handleSubmit] = useForm("xeokwkeg");

  if (state.succeeded) {
    return <SuccessMessage />;
  }

  return (
    <div className="">
      <div className="text-center text-2xl pt-10 border-t md:px-4 md:py-4">
        <div className="inline-flex gap-2 items-center mb-3">
          <span className="text-gray-500 font-medium">
            Liên hệ về chúng tôi
          </span>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 px-4 md:px-0">
        {/* Ảnh minh họa */}
        <img
          className="w-full  md:max-w-[480px] rounded-lg object-cover"
          src={Banner4}
          alt="heart health"
        />

        {/* Form */}
        <div className="flex flex-col justify-center items-start gap-6 w-full sm:w-[500px]">
          <p className="font-semibold text-lg text-gray-700">
            Nhập thông tin để hệ thống chẩn đoán:
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
            {/* Email */}
            <label htmlFor="email" className="font-medium">
              Email của bạn
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="border p-2 rounded"
              placeholder="Nhập email để nhận kết quả..."
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />

            {/* Triệu chứng */}
            <label htmlFor="message" className="font-medium">
              Triệu chứng hoặc cảm giác bất thường
            </label>
            <textarea
              id="message"
              name="message"
              className="border p-2 rounded"
              rows="4"
              placeholder="Ví dụ: đau ngực, khó thở, mệt mỏi, chóng mặt..."
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />

            {/* Nút gửi */}
            <button
              type="submit"
              className="bg-red-600 text-white border rounded px-8 py-2 text-sm hover:bg-red-500 transition-all duration-300"
              disabled={state.submitting}
            >
              Gửi thông tin chẩn đoán
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
