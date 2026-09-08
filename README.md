# ⚡ พลังของ Prompt — การบ้าน 6 แง่

การบ้านวิชา **GenAI 1 · Week 4 พลังของ Prompt** — ฝึกเขียนพรอมป์ 2 รอบ (zero-shot → few-shot) ใน 6 แง่
เว็บสร้างบนฐานธีม **ai-arai-dee** (Astro + React + framer-motion parallax)

**เว็บไซต์:** https://fiezdev.github.io/genai-prompt-lab/

## โครงของแต่ละแง่ (ครบทั้ง 6 บนหน้าเว็บ)
พรอมป์แรก (zero-shot) → ผลลัพธ์แรก → ถาม-ตอบเพิ่มรายละเอียด → พรอมป์ใหม่ (few-shot) → ผลลัพธ์ใหม่ → สะท้อนการเรียนรู้

## 6 แง่ + เครื่องมือที่ใช้จริง
| แง่ | เครื่องมือ | ผลลัพธ์ |
|---|---|---|
| 1. รูปด้วย AI | Higgsfield (nano_banana_pro) | ภาพ 2 รอบ (1k/2k) |
| 2. กราฟคณิตศาสตร์ | Desmos | sin → เส้นโค้งการลืม + sliders |
| 3. Diagrams | Mermaid | flowchart 2 รอบมีสี + โค้ด .mmd |
| 4. บทความ LaTeX | Tectonic (XeLaTeX) | PDF 2 ฉบับ + โค้ด .tex |
| 5. สไลด์สรุป | NotebookLM เวิร์กโฟลว์ | slides.html 10 หน้า |
| 6. เว็บไซต์ | GitHub Pages | เว็บนี้ (โบนัสรวมแง่ 1–5) |

## โครงสร้าง repo
```
├── index.html            # เว็บหลัก (Astro build จากธีม ai-arai-dee)
├── _astro/               # JS/CSS/สื่อ จาก build
├── slides.html           # สไลด์สรุป Week 4 (แง่ที่ 5)
├── canva-mcp-guide.html  # คู่มือ Canva MCP
├── credits.md            # เครดิตการสร้างสื่อ
├── deck/                 # สไลด์ส่งงาน 30 หน้า (.pptx) + สคริปต์สร้าง
└── tools/                # สคริปต์ Higgsfield / Desmos capture
```

## พัฒนาต่อ
ซอร์ส Astro อยู่ที่ `~/Dev/prompt-lab-astro` บนเครื่อง Mac (โคลนจาก ai-arai-dee)
`npm run build` → คัดลอก `dist/*` มาที่ repo นี้ → push
