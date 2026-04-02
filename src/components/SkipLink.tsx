export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="absolute -top-[100px] left-1/2 -translate-x-1/2 bg-brand-600 text-white px-4 py-2 rounded-md font-medium z-[9999] focus:top-2.5 focus:outline-2 focus:outline-brand-300 focus:outline-offset-2 transition-[top] duration-200"
    >
      ข้ามไปยังเนื้อหาหลัก
    </a>
  );
}
