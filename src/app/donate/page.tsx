import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ร่วมทำงานกับเรา | ประชาธรรม สื่อสิ่งแวดล้อมไทย",
  description:
    "ร่วมสนับสนุนและทำงานกับประชาธรรม เพื่อการสื่อสารสิ่งแวดล้อมที่ยั่งยืน",
  openGraph: {
    title: "ร่วมทำงานกับเรา | ประชาธรรม สื่อสิ่งแวดล้อมไทย",
    description:
      "ร่วมสนับสนุนและทำงานกับประชาธรรม เพื่อการสื่อสารสิ่งแวดล้อมที่ยั่งยืน",
  },
  twitter: {
    card: "summary_large_image",
    title: "ร่วมทำงานกับเรา | ประชาธรรม สื่อสิ่งแวดล้อมไทย",
    description:
      "ร่วมสนับสนุนและทำงานกับประชาธรรม เพื่อการสื่อสารสิ่งแวดล้อมที่ยั่งยืน",
    images: ["/images/hero-1-page-1.jpg"],
  },
};

export default function DonatePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
          <Link href="/" className="hover:text-brand-600">
            หน้าแรก
          </Link>
          <span className="dark:text-gray-600">/</span>
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            ร่วมทำงานกับเรา
          </span>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-700 dark:text-brand-400 mb-4">
            ร่วมทำงานกับเรา
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            มาร่วมเป็นส่วนหนึ่งของการสร้างการเปลี่ยนแปลงด้านสิ่งแวดล้อม
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Support Our Work */}
          <div className="card">
            <div className="p-6">
              <div className="flex flex-col gap-4">
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-brand-700 mb-2">
                    สนับสนุนงานของเรา
                  </h2>
                  <span className="badge-brand text-sm px-3 py-1">
                    การสนับสนุนทุกรูปแบบมีค่า
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed text-center">
                  เราสนับสนุนให้ผู้คนบอกเล่าเรื่องสิ่งแวดล้อมด้วยตัวเอง
                  การสนับสนุนของคุณจะช่วยให้เราสามารถดำเนินงานต่อไป
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.facebook.com/prachatham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-center text-lg py-3 w-full"
                  >
                    ติดต่อเราเพื่อสนับสนุน
                  </a>

                  <p className="text-sm text-gray-500 text-center">
                    หรือติดต่อผ่านช่องทางโซเชียลมีเดีย
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Our Team */}
          <div className="card">
            <div className="p-6">
              <div className="flex flex-col gap-4">
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-brand-700 mb-2">
                    ร่วมทีมกับเรา
                  </h2>
                  <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full font-medium">
                    ไม่เปิดรับสมัครในขณะนี้
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed text-center">
                  ขณะนี้เรายังไม่เปิดรับสมัครตำแหน่งใดๆ
                  แต่หากคุณมีความสนใจในด้านสิ่งแวดล้อมและการสื่อสาร
                  สามารถติดตามข่าวสารการรับสมัครงานของเราได้ทางโซเชียลมีเดีย
                </p>

                <a
                  href="https://www.facebook.com/prachatham"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-green text-center text-lg py-3 w-full"
                >
                  ติดตามข่าวสารบน Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Our Projects */}
        <div className="card">
          <div className="p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-700 mb-6 text-center">
              โครงการที่คุณจะได้ร่วมสนับสนุน
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  โครงการสร้างนักสื่อสารสิ่งแวดล้อมเชิงรุก
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  ฝึกอบรมและพัฒนาทักษะการสื่อสารให้กับชุมชน
                  เพื่อให้สามารถนำเสนอปัญหาสิ่งแวดล้อมได้อย่างมีประสิทธิภาพ
                </p>
                <Link
                  href="/causes"
                  className="text-brand-600 font-medium hover:text-brand-700 hover:underline"
                >
                  เรียนรู้เพิ่มเติม →
                </Link>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  การผลิตเนื้อหาสื่อสิ่งแวดล้อม
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  สร้างเนื้อหาคุณภาพเพื่อเผยแพร่ความรู้และสร้างความตระหนัก
                  ด้านสิ่งแวดล้อมให้กับสังคมไทย
                </p>
                <Link
                  href="/posts"
                  className="text-brand-600 font-medium hover:text-brand-700 hover:underline"
                >
                  อ่านบทความของเรา →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-brand-50 rounded-lg p-5 sm:p-8 text-center border border-brand-200">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-brand-700">
            พร้อมร่วมทำงานกับเราแล้วหรือยัง?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            เราเชื่อว่าการสื่อสารที่ดีสามารถสร้างการเปลี่ยนแปลงได้
            มาร่วมเป็นส่วนหนึ่งของการเปลี่ยนแปลงนี้
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="mailto:info@prachatham.com"
              className="btn-primary text-base sm:text-lg px-6 py-3 w-full sm:w-auto"
            >
              ติดต่อเรา
            </a>
            <Link
              href="/about"
              className="btn-outline-green text-base sm:text-lg px-6 py-3 w-full sm:w-auto"
            >
              เรียนรู้เพิ่มเติม
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
