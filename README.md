# ⚡ Prompt Lab — การบ้าน 6 แง่: ฝึกใช้ Prompt

การบ้านวิชา **GenAI 1 · Week 4 พลังของ Prompt** — ฝึกเขียนพรอมป์ 2 รอบ (zero-shot → few-shot) ใน 6 แง่ พร้อมสะท้อนการเรียนรู้

**เว็บไซต์:** https://fiezdev.github.io/genai-prompt-lab/

## โครงของแต่ละแง่
1. Prompt แรก (zero-shot) → 2. ผลลัพธ์แรก → 3. ถาม-ตอบเพิ่มรายละเอียด → 4. Prompt ใหม่ (few-shot) → 5. ผลลัพธ์ใหม่ → 6. สะท้อนการเรียนรู้

## 6 แง่ + เครื่องมือที่ใช้จริง
| แง่ | เครื่องมือ | ผลลัพธ์ |
|---|---|---|
| 1. รูปด้วย AI | Higgsfield (nano_banana_pro) | ภาพ 2 รอบ (1k/2k) |
| 2. กราฟคณิตศาสตร์ | Desmos | กราฟ sin → เส้นโค้งการลืม + sliders |
| 3. Diagrams | Mermaid | flowchart 4 กล่อง → วงจร 2 รอบมีสี |
| 4. บทความ LaTeX | Tectonic (XeLaTeX) + fontspec ไทย | PDF 2 ฉบับ |
| 5. สไลด์สรุป | เวิร์กโฟลว์ NotebookLM (พร้อมพรอมป์ทำซ้ำ) | slides.html 10 หน้า |
| 6. เว็บไซต์ | HTML/CSS + GitHub Pages | เว็บนี้ (พร้อมโบนัสรวมแง่ 1–5) |

## โบนัสพิเศษ
เว็บนี้มีเมนูบนเลือก 6 แง่ และรวมผลงานแง่ 1–5 ไว้ในเว็บเดียว ธีมต่อเนื่อง "การเรียนรู้กับ AI"

## โครงสร้าง
```
├── index.html            # เว็บหลัก (เมนู 7 แท็บ)
├── slides.html           # สไลด์สรุป Week 4 (แง่ที่ 5)
├── canva-mcp-guide.html  # คู่มือ Canva MCP
└── assets/
    ├── img/              # ภาพ Higgsfield 2 รอบ
    ├── desmos/           # ภาพหน้าจอ Desmos จริง (Playwright)
    ├── mermaid/          # ไดอะแกรม + โค้ด .mmd
    └── latex/            # PDF + .tex + ภาพหน้ากระดาษ
```
