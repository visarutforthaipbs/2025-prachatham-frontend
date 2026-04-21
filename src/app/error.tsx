"use client";

import { useEffect } from "react";

export default function RootErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root error:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center bg-gray-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <svg className="w-16 h-16 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800">
            เกิดข้อผิดพลาด
          </h2>
          <p className="text-gray-600 text-lg">
            ขออภัย เกิดข้อผิดพลาดขึ้น กรุณาลองใหม่อีกครั้ง
          </p>
          <div className="flex gap-3">
            <button
              className="btn-primary"
              onClick={() => reset()}
            >
              ลองใหม่
            </button>
            <button
              className="btn-secondary"
              onClick={() => window.location.reload()}
            >
              โหลดหน้าใหม่
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
