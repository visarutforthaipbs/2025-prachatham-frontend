#!/usr/bin/env python3
"""Generate EMBED.md (Thai newsroom guide) from data.json so no number is retyped by hand.
   python3 build_embed.py
"""
import json, pathlib, struct
H = pathlib.Path(__file__).parent
d = json.loads((H / "data.json").read_text(encoding="utf-8")); A, B = d["chartA"], d["chartB"]
hv, mk = A["villages"]
def png(n):
    w, h = struct.unpack(">II", (H / f"{n}.png").read_bytes()[16:24]); return w, h
n = lambda v: f"{v:,.0f}"
def t1(v):  # truncate to 1 decimal like the chart (5.55 -> 5.5), same rule as fmtT in _shared.js
    t = int(v * 10 + 1e-9) / 10; return f"{t:,.1f}".rstrip("0").rstrip(".") if t % 1 else f"{t:,.0f}"
PER_RAI_H, FLOW_H = 1000, 2000   # no-JS fallback = desktop-sized; the auto-height listener corrects phones
alt_a = (f"{A['title']}: {hv['name']} ได้ราว {n(hv['per_rai'])} บาทต่อไร่ต่อปี "
         f"(ถ้าไม่นับเงินคาร์บอนเหลือราว {n(hv['per_rai_state_only'])}) ส่วน{mk['name']} ได้ราว {t1(mk['per_rai'])} บาทต่อไร่ต่อปี")
alt_b = (f"{B['title']}: แผนผังหกแหล่งเงินดูแลไฟ ใครส่ง ส่งผ่านใคร ติดเงื่อนไขอะไร และมาถึงเมื่อไร "
         f"พร้อมงบไฟป่าและฝุ่นควัน จ.เชียงใหม่ ปีงบประมาณ 2569")
def iframe(slug, title, h):
    return (f'<iframe\n  src="/infographics/green-inequality/{slug}.html"\n  title="{title}"\n  loading="lazy"\n'
            f'  width="100%" height="{h}"\n  style="width:100%;height:{h}px;border:0;border-radius:8px"\n></iframe>')
def img(slug, alt):
    w, h = png(slug)
    return f'<img src="https://cms.prachatham.com/wp-content/uploads/YYYY/MM/{slug}.png" alt="{alt}" width="{w}" height="{h}" loading="lazy" />'
def tr(cells): return "<tr>" + "".join(f"<td>{c}</td>" for c in cells) + "</tr>"
def th(cells): return "<tr>" + "".join(f"<th>{c}</th>" for c in cells) + "</tr>"
tbl_a = ["<figure class=\"wp-block-table\"><table>", "<thead>" + th(["พื้นที่ / แหล่งเงิน", "บาทต่อไร่ต่อปี", "บาทต่อปี"]) + "</thead>", "<tbody>"]
for s in hv["sources"]: tbl_a.append(tr([f"{hv['name']} · {s['name']}", t1(s["per_rai"]), n(s["baht"])]))
tbl_a.append(tr([f"<strong>{hv['name']} รวม</strong> ({n(hv['rai'])} ไร่)", n(hv["per_rai"]), n(hv["baht_year"])]))
tbl_a.append(tr([f"{mk['name']} · {mk['sources'][0]['name']} ({n(mk['rai'])} ไร่)", t1(mk["per_rai"]), n(mk["baht_year"])]))
tbl_a += ["</tbody></table></figure>"]
tbl_b = ["<figure class=\"wp-block-table\"><table>", "<thead>" + th(["กลุ่ม", "แหล่งเงิน", "ส่งผ่าน", "ขนาด", "เงื่อนไขที่ติดมา", "มาถึงเมื่อไร"]) + "</thead>", "<tbody>"]
for f in B["flows"]:
    tbl_b.append(tr(["เงินเอกชน" if f["group"] == "private" else "เงินรัฐ", f["source"], f["via"], f["size"], " · ".join(f["rules"]), f["arrival_text"]]))
tbl_b += ["</tbody></table></figure>"]
bud = ["<figure class=\"wp-block-table\"><table>", "<thead>" + th(["งบเกี่ยวกับไฟป่าและฝุ่นควัน จ.เชียงใหม่ ปีงบ 2569", "ล้านบาท"]) + "</thead>", "<tbody>"]
for b in B["budget_cm_2569_million"]: bud.append(tr([b["label"], f"{b['value']:,.1f}"]))
bud += ["</tbody></table></figure>"]
fence = "```"
md = f"""# วิธีใส่กราฟ "ความเหลื่อมล้ำของเงินดูแลไฟ" ลงในบทความ (สำหรับกอง บก.)

ไฟล์นี้สร้างอัตโนมัติจาก `data.json` ด้วย `python3 build_embed.py` อย่าแก้ตัวเลขในไฟล์นี้ด้วยมือ
ถ้าตัวเลขเปลี่ยน ให้แก้ที่ต้นทาง (`export_data.py`) แล้วรัน `build.py`, `render_png.py`, `build_embed.py` ตามลำดับ

## ภาพรวม: กราฟ 1 ตัว = 3 ชิ้นในโพสต์
1. **กราฟโต้ตอบ** (iframe) สำหรับคนอ่านบนเว็บ
2. **ภาพ PNG** วางใต้กราฟ สำหรับ LINE / Facebook / Google และคนที่ปิด JavaScript
3. **ตาราง** (บล็อกตารางของ WordPress) ให้คนที่อ่านด้วยโปรแกรมอ่านหน้าจอ และให้ Google เห็นตัวเลข

บทความเป็นโพสต์ปกติบน prachatham.com กราฟอยู่ในโพสต์นั้นเลย ไม่ต้องมีหน้าแยก

## ขั้นตอน (ทำซ้ำสำหรับกราฟแต่ละตัว)
1. อัปโหลดไฟล์ PNG (`per-rai.png`, `money-flow.png`) เข้า Media Library ของ WordPress
2. ในโพสต์ เพิ่มบล็อก **Custom HTML** ตรงตำแหน่งที่อยากให้กราฟขึ้น แล้ววางโค้ด "iframe" ด้านล่าง
3. ใต้บล็อกนั้น เพิ่มบล็อก **Custom HTML** อีกอัน วางโค้ด "ภาพ PNG" (เปลี่ยน `YYYY/MM` ให้ตรงกับที่อัปโหลด หรือใช้บล็อก "รูปภาพ" ของ WordPress แล้วกรอก Alt ตามข้อความด้านล่างก็ได้)
4. ใต้ภาพ เพิ่มบล็อก **ตาราง** แล้ววางข้อมูลตามด้านล่าง (หรือวางโค้ดตารางผ่าน Custom HTML)
5. กด "ดูตัวอย่าง" ตรวจทั้งมือถือและคอมพิวเตอร์ก่อนเผยแพร่

> ห้ามเปลี่ยน `src` และห้ามใส่ `<script>` ในโพสต์ ระบบจะตัดทิ้ง ตัวกราฟทำงานในกรอบ iframe เอง

## กราฟที่ 1: เงินดูแลไฟต่อไร่ ({A['title']})

### 1) iframe (บล็อก Custom HTML)
{fence}html
{iframe('per-rai', A['title'], PER_RAI_H)}
{fence}

### 2) ภาพ PNG + Alt (บล็อก Custom HTML ใต้ iframe)
{fence}html
{img('per-rai', alt_a)}
{fence}

### 3) ตาราง (บล็อก Custom HTML)
{fence}html
{chr(10).join(tbl_a)}
{fence}

## กราฟที่ 2: เส้นทางเงินดูแลไฟ ({B['title']})

### 1) iframe (บล็อก Custom HTML)
{fence}html
{iframe('money-flow', B['title'], FLOW_H)}
{fence}

### 2) ภาพ PNG + Alt (บล็อก Custom HTML ใต้ iframe)
{fence}html
{img('money-flow', alt_b)}
{fence}

### 3) ตาราง (บล็อก Custom HTML)
{fence}html
{chr(10).join(tbl_b)}
{chr(10).join(bud)}
{fence}

## เรื่องความสูงของกรอบ (iframe)
- ค่า `height` ในโค้ดด้านบน ({PER_RAI_H} และ {FLOW_H}) คือ **ค่าสำรอง** ขนาดพอดีกับหน้าจอคอมพิวเตอร์ ถ้าเว็บไม่มีตัวปรับความสูงอัตโนมัติ กราฟก็ยังแสดงผลได้ไม่พัง
- เมื่อเว็บมีตัวปรับความสูง (`src/components/InfographicAutoHeight.tsx`) กราฟจะบอกความสูงจริงให้หน้าเว็บ กรอบจึงพอดีเนื้อหาทั้งบนมือถือและคอมพิวเตอร์ และไม่มีแถบเลื่อนซ้อนในกรอบ
- ระบบกรองของเว็บ (`src/lib/sanitize.ts`) อนุญาตให้ใส่ความสูงเป็นตัวเลขพิกเซลเท่านั้น จึงเขียนความสูงที่ปรับตามหน้าจอในโค้ดโพสต์ไม่ได้ ให้ใช้ค่าสำรองตามนี้

## ข้อควรรู้
- กราฟเปลี่ยนสีตามโหมดมืด/สว่างของเว็บอัตโนมัติ
- ภาพ PNG เป็นโหมดสว่างเสมอ ความกว้าง 1,440 px (ขนาดจริง {png('per-rai')[0]}×{png('per-rai')[1]} และ {png('money-flow')[0]}×{png('money-flow')[1]})
- ตัวเลขและข้อความทั้งหมดมาจาก `data.json` ที่ตรวจกับต้นฉบับบทความแล้ว ห้ามแก้ตัวเลขในกราฟด้วยมือ ถ้าต้นฉบับบทความเปลี่ยนให้แจ้งทีมเว็บ
- ถ้ากราฟไม่ขึ้น: ตรวจว่า `src` ขึ้นต้นด้วย `/infographics/` และไม่มีช่องว่างแปลก ๆ ในโค้ด
"""
(H / "EMBED.md").write_text(md, encoding="utf-8"); print("EMBED.md", len(md.encode()), "bytes")
