"use client";

import { useEffect } from "react";

export default function PostsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Posts page error:", error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold text-red-800 mb-2">
          ไม่สามารถโหลดบทความได้
        </h2>
        <p className="text-red-700 mb-4">
          เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง
        </p>
        <button
          className="btn-primary"
          onClick={() => reset()}
        >
          ลองใหม่
        </button>
      </div>
    </div>
  );
}
