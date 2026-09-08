# ⚡ ใช้ AI ทำอะไรดี · พลังของ Prompt — การบ้าน 6 แง่

การบ้านวิชา **GenAI 1 · Week 4 พลังของ Prompt** — ฝึกเขียนพรอมป์ 2 รอบ (zero-shot → few-shot) ใน 6 แง่
หน้าหลักคือเว็บ **ai-arai-dee** ต้นฉบับ + เมนูบน 6 บทเรียน แต่ละบทเรียนเปิดหน้าของตัวเอง (Astro + React + framer-motion)

**เว็บไซต์:** https://fiezdev.github.io/genai-prompt-lab/

## โครงสร้างหน้า
| เส้นทาง | เนื้อหา |
|---|---|
| `/` | หน้าหลัก ai-arai-dee (ใช้ AI ทำอะไรดี) + เมนูบทเรียนด้านบน |
| `/lesson/image/` | แง่ 1 · ภาพด้วย AI (Higgsfield) |
| `/lesson/desmos/` | แง่ 2 · กราฟคณิตศาสตร์ (Desmos) |
| `/lesson/mermaid/` | แง่ 3 · ไดอะแกรม (Mermaid) |
| `/lesson/latex/` | แง่ 4 · บทความ (LaTeX/Tectonic) |
| `/lesson/slides/` | แง่ 5 · สไลด์สรุป (NotebookLM) |
| `/lesson/web/` | แง่ 6 · เว็บไซต์บน GitHub Pages (โบนัสรวมแง่ 1–5) |
| `/slides.html` | สไลด์ทบทวน Week 4 จำนวน 10 หน้า |
| `/canva-mcp-guide.html` | คู่มือตั้งค่า/ใช้งาน Canva MCP |

## โครงของแต่ละบทเรียน
พรอมป์แรก (zero-shot) + ผลลัพธ์แรก → ถาม-ตอบเพิ่มรายละเอียด → พรอมป์ใหม่ (few-shot) + ผลลัพธ์ใหม่ → สะท้อนการเรียนรู้ (เทียบก่อน-หลัง)

## โครงสร้าง repo
```
├── index.html            # หน้าหลัก (ai-arai-dee build)
├── lesson/<id>/          # 6 หน้าบทเรียน
├── _astro/               # JS/CSS/สื่อจาก build
├── slides.html           # สไลด์สรุป Week 4
├── canva-mcp-guide.html  # คู่มือ Canva MCP
├── credits.md            # เครดิตการสร้างสื่อ
├── deck/                 # สไลด์ส่งงาน 30 หน้า (.pptx) + สคริปต์สร้าง
└── tools/                # สคริปต์ Higgsfield / Desmos capture
```

## พัฒนาต่อ
ซอร์ส Astro อยู่ที่ `~/Dev/prompt-lab-astro` บนเครื่อง Mac (ฐานจาก ai-arai-dee)
เนื้อหาบทเรียนแก้ที่ `src/lessons.ts` ที่เดียว · `npm run build` → คัดลอก `dist/*` มา repo นี้ → push
