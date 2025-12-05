import React from "react";

export const SuccessMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Icon check */}
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>

      {/* Mô tả */}
      <p className="text-gray-500 text-center">
        Your submission has been sent.
      </p>
    </div>
  );
};
