import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ทดสอบฟอนต์ DB Helvethaica X | ประชาธรรม",
  description: "หน้าทดสอบการแสดงผลฟอนต์ DB Helvethaica X ในน้ำหนักต่างๆ",
};

export default function FontTest() {
  return (
    <>
      {/* Hero Section with Background Image and Green Overlay */}
      <div
        className="relative min-h-[400px] h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('/images/hero-1-page-1.jpg')" }}
      >
        {/* Green Overlay */}
        <div className="absolute inset-0 bg-brand-600 opacity-70 z-[1]" />

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-[2]">
          <div className="flex flex-col gap-6 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
              ทดสอบฟอนต์ DB Helvethaica X
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
              หน้าทดสอบการแสดงผลฟอนต์ DB Helvethaica X ในน้ำหนักต่างๆ
              เพื่อให้เห็นความสวยงามและความอ่านง่ายของตัวอักษรไทย
            </p>
          </div>
        </div>
      </div>

      {/* Font Testing Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="flex flex-col gap-8 items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-700 mb-6">
              ทดสอบฟอนต์ DB Helvethaica X
            </h1>

            <div className="flex flex-col gap-6 items-start">
              <div>
                <p className="text-lg font-bold text-gray-700 mb-2">
                  Font Weight 400 (Regular):
                </p>
                <p className="text-xl font-normal">
                  เราคือกลุ่มคนที่ต้องการสนับสนุนให้เกิดการเปลี่ยนแปลงผ่านการสื่อสารจากคนในท้องถิ่นเอง
                </p>
              </div>

              <div>
                <p className="text-lg font-bold text-gray-700 mb-2">
                  Font Weight 500 (Medium):
                </p>
                <p className="text-xl font-medium">
                  มูลนิธิประชาธรรม
                  เป็นองค์กรที่มุ่งหวังสร้างการเปลี่ยนแปลงเชิงบวก
                </p>
              </div>

              <div>
                <p className="text-lg font-bold text-gray-700 mb-2">
                  Font Weight 700 (Bold):
                </p>
                <p className="text-xl font-bold">
                  สนับสนุนให้ผู้คนบอกเล่าเรื่องราวด้วยตัวเอง
                </p>
              </div>

              <div className="mt-8">
                <p className="text-lg font-bold text-gray-700 mb-2">
                  Heading Examples:
                </p>
                <div className="flex flex-col gap-3 items-start">
                  <h1 className="text-4xl font-bold">Heading Size 2XL</h1>
                  <h2 className="text-2xl md:text-3xl font-bold">Heading Size XL</h2>
                  <h3 className="text-xl md:text-2xl font-bold">Heading Size LG</h3>
                  <h4 className="text-lg font-bold">Heading Size MD</h4>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-lg font-bold text-gray-700 mb-2">
                  Mixed Thai and English Text:
                </p>
                <p className="text-lg leading-relaxed">
                  The DB Helvethaica X font supports both Thai (ไทย) and English
                  text seamlessly. ฟอนต์ DB Helvethaica X
                  รองรับทั้งข้อความไทยและอังกฤษได้อย่างลงตัว สำหรับการใช้งานใน
                  website ของมูลนิธิประชาธรรม.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
