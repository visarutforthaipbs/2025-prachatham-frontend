import Link from "next/link";

export const metadata = {
  title: "ไม่พบหน้า | ประชาธรรม",
};

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center bg-gray-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <svg className="w-16 h-16 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-4xl font-bold text-gray-800">404</h1>
          <h2 className="text-2xl font-bold text-gray-800">
            ไม่พบหน้าที่คุณต้องการ
          </h2>
          <p className="text-gray-600 text-lg">
            หน้านี้อาจถูกย้ายหรือลบไปแล้ว กรุณาตรวจสอบ URL อีกครั้ง
          </p>
          <Link href="/" className="btn-primary">
            กลับสู่หน้าแรก
          </Link>
        </div>
      </div>
    </div>
  );
}
