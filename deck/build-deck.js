const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE";
p.author = "อิทธิพล วงศ์อภัย";
p.title = "พลังของ Prompt: จาก Zero-shot สู่ Few-shot ใน 6 แง่";

// palette (same as website)
const BG="0F0E1D", CARD="1D1B33", CARD2="232040", INK="E8E6F5", MUTED="9D99C0",
      AMBER="F5B942", GREEN="4ADE80", LINE="312E56", DARKTXT="1A1205";
const F = "Leelawadee UI";
const W=13.33, H=7.5, M=0.55;
const A = "assets"; // deck run from site/ dir

const bu = () => ({ code:"25B8", indent:12, color:"8A86B8" });
const shadow = () => ({ type:"outer", color:"000000", blur:7, offset:2, angle:60, opacity:0.28 });

function base(){
  const s = p.addSlide();
  s.background = { color: BG };
  return s;
}
function ghostNum(s, n){ // oversized ghost aspect number, top-right
  s.addText(n, { x:W-2.6, y:-0.42, w:2.3, h:1.9, fontSize:120, bold:true,
    color:"2A2747", fontFace:F, align:"right", margin:0 });
}
function kicker(s, txt, y=M, color=AMBER){
  s.addText(txt, { x:M, y:y, w:9, h:0.32, fontSize:12, bold:true, color:color,
    charSpacing:4, fontFace:F, margin:0 });
}
function title(s, txt, y=M+0.34, size=31, color=INK, w=11.5){
  s.addText(txt, { x:M, y:y, w:w, h:0.72, fontSize:size, bold:true, color:color, fontFace:F, margin:0 });
}
function pageFoot(s, idx){
  s.addText(`Prompt Lab · GenAI 1 · ${idx}/30`, { x:W-3.2, y:H-0.42, w:2.7, h:0.28,
    fontSize:10, color:"6E6A99", fontFace:F, align:"right", margin:0 });
}
function promptCard(s, o){ // {x,y,w,h,tag,who,text,v2}
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x:o.x, y:o.y, w:o.w, h:o.h, rectRadius:0.09,
    fill:{color:"12101F"}, line:{color:o.v2?"2E5C43":LINE, width:1}, shadow:shadow() });
  s.addShape(p.shapes.OVAL, { x:o.x+0.22, y:o.y+0.26, w:0.34, h:0.34,
    fill:{color:o.v2?GREEN:AMBER} });
  s.addText(o.tag, { x:o.x+0.68, y:o.y+0.22, w:o.w-0.9, h:0.4, fontSize:11.5, bold:true,
    color:o.v2?GREEN:AMBER, fontFace:F, margin:0, valign:"middle" });
  s.addText(o.text, { x:o.x+0.28, y:o.y+0.68, w:o.w-0.56, h:o.h-0.92, fontSize:o.fs||14,
    color:INK, fontFace:F, margin:0, valign:"top", lineSpacingMultiple:1.18 });
}
function bubble(s, o){ // {x,y,w,h,me,who,text}
  const cMe = {fill:"3A2F10", line:"6B5416"}, cAi = {fill:CARD2, line:LINE};
  const c = o.me ? cMe : cAi;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x:o.x, y:o.y, w:o.w, h:o.h, rectRadius:0.11,
    fill:{color:c.fill}, line:{color:c.line, width:1} });
  s.addText([
    { text:o.who+"  ", options:{ fontSize:10.5, bold:true, color:o.me?AMBER:"8FA7E8", breakLine:false } },
    { text:o.text, options:{ fontSize:12.5, color:o.me?INK:MUTED, breakLine:false } },
  ], { x:o.x+0.2, y:o.y+0.08, w:o.w-0.4, h:o.h-0.16, fontFace:F, margin:0, valign:"middle", lineSpacingMultiple:1.12 });
}
function imgBox(s, path, o){ // {x,y,w,h} frame + cover via sizing
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x:o.x-0.06, y:o.y-0.06, w:o.w+0.12, h:o.h+0.12,
    rectRadius:0.09, fill:{color:"0B0A16"}, line:{color:LINE,width:1}, shadow:shadow() });
  s.addImage({ path, x:o.x, y:o.y, w:o.w, h:o.h, sizing:{ type:"cover", w:o.w, h:o.h } });
}
function capText(s, txt, o){ // {x,y,w,h}
  s.addText(txt, { x:o.x, y:o.y, w:o.w, h:o.h, fontSize:11.5, color:MUTED, fontFace:F,
    margin:0, valign:"top", lineSpacingMultiple:1.15 });
}
function reflectSlide(idx, no, toolName, bullets, before, after, note){
  const s = base();
  ghostNum(s, no);
  kicker(s, `สะท้อนการเรียนรู้ · แง่ที่ ${parseInt(no)} · ${toolName}`, M, "C4B5FD");
  title(s, "สิ่งที่ได้เรียนรู้จากการวนปรับพรอมป์");
  s.addText(bullets.map((t,i)=>({ text:t, options:{ bullet:bu(), breakLine:i<bullets.length-1 } })),
    { x:M, y:1.62, w:7.3, h:3.5, fontSize:14.5, color:INK, fontFace:F, margin:0,
      paraSpaceAfter:10, valign:"top", lineSpacingMultiple:1.15 });
  // before/after cards
  const cy=5.15, cw=5.95, ch=1.75;
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x:M, y:cy, w:cw, h:ch, rectRadius:0.1,
    fill:{color:CARD}, line:{color:LINE,width:1} });
  s.addText("ผลลัพธ์แรก · zero-shot", { x:M+0.25, y:cy+0.14, w:cw-0.5, h:0.3, fontSize:11.5,
    bold:true, color:MUTED, fontFace:F, margin:0 });
  s.addText(before, { x:M+0.25, y:cy+0.48, w:cw-0.5, h:ch-0.6, fontSize:13, color:MUTED,
    fontFace:F, margin:0, valign:"top", lineSpacingMultiple:1.12 });
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x:M+cw+0.25, y:cy, w:cw, h:ch, rectRadius:0.1,
    fill:{color:"12291B"}, line:{color:"2E5C43",width:1} });
  s.addText("ผลลัพธ์ใหม่ · few-shot", { x:M+cw+0.5, y:cy+0.14, w:cw-0.5, h:0.3, fontSize:11.5,
    bold:true, color:GREEN, fontFace:F, margin:0 });
  s.addText(after, { x:M+cw+0.5, y:cy+0.48, w:cw-0.5, h:ch-0.6, fontSize:13, color:INK,
    fontFace:F, margin:0, valign:"top", lineSpacingMultiple:1.12 });
  s.addNotes(note);
  pageFoot(s, idx);
  return s;
}

/* ============ 1 · COVER ============ */
{
const s = base();
s.addImage({ path:`${A}/img/fewshot-web.png`, x:7.35, y:0, w:5.98, h:7.5,
  sizing:{type:"cover",w:5.98,h:7.5} });
s.addShape(p.shapes.RECTANGLE, { x:6.55, y:0, w:1.5, h:H, fill:{color:BG, transparency:35}, line:{type:"none"} });
kicker(s, "การบ้าน · GENAI 1 · WEEK 4 พลังของ PROMPT", 1.05);
s.addText("พลังของ Prompt", { x:M, y:1.5, w:6.6, h:1.15, fontSize:60, bold:true, color:INK, fontFace:F, margin:0 });
s.addText([
  { text:"จาก ", options:{ color:MUTED, breakLine:false } },
  { text:"Zero-shot", options:{ color:AMBER, bold:true, breakLine:false } },
  { text:" สู่ ", options:{ color:MUTED, breakLine:false } },
  { text:"Few-shot", options:{ color:GREEN, bold:true, breakLine:false } },
  { text:" ใน 6 แง่", options:{ color:MUTED, breakLine:false } },
], { x:M, y:2.72, w:6.4, h:0.6, fontSize:26, fontFace:F, margin:0 });
s.addText("ทดลองเขียนพรอมป์สองรอบในหกเครื่องมือ — ภาพ AI · Desmos · Mermaid · LaTeX · NotebookLM · เว็บไซต์ GitHub — พร้อมสะท้อนการเรียนรู้ทุกแง่",
  { x:M, y:3.5, w:6.1, h:1.0, fontSize:15, color:MUTED, fontFace:F, margin:0, lineSpacingMultiple:1.25 });
s.addText([
  { text:"อิทธิพล วงศ์อภัย", options:{ bold:true, color:INK, breakLine:true } },
  { text:"ส่ง 13 กันยายน 2569 · เว็บประกอบ: fiezdev.github.io/genai-prompt-lab", options:{ color:"6E6A99", breakLine:false } },
], { x:M, y:6.1, w:6.3, h:0.85, fontSize:13.5, fontFace:F, margin:0, lineSpacingMultiple:1.3 });
s.addNotes("เปิดด้วยธีมของการบ้าน: ทุกแง่ทำสองรอบ zero-shot แล้ว few-shot และใช้ธีมเดียวกันคือการเรียนรู้กับ AI");
}

/* ============ 2 · METHOD ============ */
{
const s = base();
kicker(s, "วิธีทำงาน");
title(s, "วงจรเดียวกันทั้ง 6 แง่: เขียน → ดูผล → ถามต่อ → เขียนใหม่");
const steps = [
  ["1","พรอมป์แรก (zero-shot)","สั่งสั้น ๆ ครั้งเดียว ไม่มีตัวอย่าง"],
  ["2","ผลลัพธ์แรก","บันทึกภาพ/ไฟล์จริง จุดอ่อนของผลลัพธ์"],
  ["3","ถาม–ตอบ","คุยกับ AI เพื่อหาสิ่งที่ต้องระบุเพิ่ม"],
  ["4","พรอมป์ใหม่ (few-shot)","ใส่บทบาท+บริบท+รูปแบบ+ข้อจำกัด"],
];
steps.forEach((st,i)=>{
  const y = 1.75 + i*1.32;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x:M, y:y, w:8.1, h:1.12, rectRadius:0.1,
    fill:{color:CARD}, line:{color:LINE,width:1} });
  s.addText(st[0], { x:M+0.18, y:y+0.12, w:0.9, h:0.9, fontSize:40, bold:true, color:AMBER, fontFace:F, margin:0, align:"center", valign:"middle" });
  s.addText([
    { text:st[1], options:{ fontSize:16, bold:true, color:INK, breakLine:true } },
    { text:st[2], options:{ fontSize:12.5, color:MUTED, breakLine:false } },
  ], { x:M+1.15, y:y+0.12, w:6.7, h:0.9, fontFace:F, margin:0, valign:"middle", lineSpacingMultiple:1.15 });
});
imgBox(s, `${A}/mermaid/v2-fewshot-big.png`, { x:9.15, y:1.45, w:2.5, h:5.55 });
capText(s, "แผนภาพ Mermaid ของวงจร (แง่ที่ 3)", { x:9.15, y:7.02, w:3.6, h:0.3 });
pageFoot(s, 2);
s.addNotes("อธิบายว่าทุกแง่ใช้วงจรเดียวกันตามนี้ สไลด์ถัดไปจะเริ่มแง่ที่ 1");
}

/* ============ helpers for aspect slides ============ */
function slideA(idx, no, tool, promptTxt, img, imgAspect, cap, note){
  const s = base(); ghostNum(s, no);
  kicker(s, `แง่ที่ ${parseInt(no)} · ${tool}`);
  title(s, "พรอมป์แรก (zero-shot) และผลลัพธ์");
  promptCard(s, { x:M, y:1.7, w:5.1, h:2.1, tag:"ZERO-SHOT", who:"", text:promptTxt, fs:15 });
  // image right
  const iw = 6.7, ih = iw/imgAspect; // cover crop ok
  imgBox(s, img, { x:6.0, y:1.7, w:6.75, h:3.79 });
  capText(s, cap, { x:M, y:4.05, w:5.1, h:1.6 });
  s.addText("จุดอ่อนของผลแรกถูกจดไว้เป็นวงเล็บคำถาม เพื่อไปถามต่อในขั้นถัดไป",
    { x:M, y:5.9, w:11.8, h:0.5, fontSize:12.5, color:"6E6A99", fontFace:F, margin:0 });
  s.addNotes(note); pageFoot(s, idx);
}
function slideB(idx, no, tool, dialog){
  const s = base(); ghostNum(s, no);
  kicker(s, `แง่ที่ ${parseInt(no)} · ${tool}`, M, "8FA7E8");
  title(s, "ถาม–ตอบ เพื่อปรับพรอมป์ให้ดีขึ้น");
  const wMe = 8.6, wAi = 8.6;
  dialog.forEach((d,i)=>{
    const y = 1.72 + i*1.22;
    if (d[0]==="me") bubble(s, { x:W-M-wMe, y:y, w:wMe, h:1.06, me:true, who:"ฉัน", text:d[1] });
    else bubble(s, { x:M, y:y, w:wAi, h:1.06, me:false, who:"AI", text:d[1] });
  });
  s.addText("คำถามแต่ละรอบดึง 'สิ่งที่ต้องระบุ' ออกจากผลลัพธ์แรก — ได้เป็นวัตถุดิบของพรอมป์ใหม่",
    { x:M, y:6.85, w:12, h:0.4, fontSize:12.5, color:"6E6A99", fontFace:F, margin:0 });
  pageFoot(s, idx);
}
function slideC(idx, no, tool, promptTxt, img, cap, note, imgW, imgH){
  const s = base(); ghostNum(s, no);
  kicker(s, `แง่ที่ ${parseInt(no)} · ${tool}`, M, GREEN);
  title(s, "พรอมป์ใหม่ (few-shot) และผลลัพธ์");
  promptCard(s, { x:M, y:1.7, w:5.1, h:2.55, tag:"FEW-SHOT · ใส่บทบาท+บริบท+รูปแบบ+ข้อจำกัด", who:"", text:promptTxt, v2:true, fs:13 });
  imgBox(s, img, { x:6.0, y:1.7, w:imgW||6.75, h:imgH||3.79 });
  capText(s, cap, { x:M, y:4.5, w:5.1, h:2.2 });
  s.addNotes(note); pageFoot(s, idx);
}

/* ============ 3-6 · ASPECT 1 IMAGE ============ */
slideA(3, "01", "การสร้างรูปด้วย AI · Higgsfield",
  "นักเรียนกำลังเรียนหนังสือด้วย AI",
  `${A}/img/zeroshot-web.png`, 1.792,
  "ผลแรก: ห้องเรียนอนาคตแบบทั่วไป — นักเรียนหลายคน แสงสม่ำเสมอ ตัวอักษรบนจอเพี้ยน ไม่ใช่บรรยากาศกลางคืนตามที่คิด (nano_banana_pro · 1k)",
  "แง่ที่ 1 รอบแรก ใช้พรอมป์ไทยสั้น ๆ ผลออกมา generic");
slideB(4, "01", "การสร้างรูปด้วย AI", [
  ["me","ภาพออกมาเป็นห้องเรียนทั่วไปเกินไป อยากได้บรรยากาศกลางคืน คนเดียว เงียบ ๆ จะเขียนยังไง?"],
  ["ai","ลองระบุเวลา/แสง (กลางคืน โคมไฟอุ่น) จำนวนคน (นักเรียน 1 คน) และอารมณ์ภาพ (เงียบ โฟกัส)"],
  ["me","อยากให้เห็นชัดว่า AI ช่วยเรียน ต้องใส่อะไรเพิ่ม?"],
  ["ai","ระบุองค์ประกอบ AI เช่น แผงโฮโลแกรมลอยเหนือแล็ปท็อป และเขียนเป็นภาษาอังกฤษเพราะคำศัพท์ภาพ (lighting, composition) แม่นกว่า"],
]);
slideC(5, "01", "การสร้างรูปด้วย AI · Higgsfield",
  "Cinematic photorealistic scene of a Thai high school student studying at a wooden desk in a dark bedroom at night, warm amber desk lamp glow on the left, translucent glowing holographic AI interface above the laptop, deep indigo shadows, film grain, 16:9 with negative space on the right, no text, no watermark",
  `${A}/img/fewshot-web.png`,
  "ผลใหม่: นักเรียนคนเดียวยามค่ำ โคมไฟอุ่นซ้าย โฮโลแกรม AI ลอยเหนือแล็ปท็อป เว้นที่ว่างขวาใส่หัวข้อ — ใช้เป็นภาพหลักของเว็บและสไลด์นี้ได้ทันที (nano_banana_pro · 2k)",
  "รอบสองใช้โครงสร้าง subject→scene→lighting→composition→constraints และภาษาอังกฤษ");
reflectSlide(6, "01", "Higgsfield", [
  "พรอมป์ไทยสั้น ๆ ให้ความหมายแต่ไม่ให้ภาพ — โมเดลต้องเดาทุกอย่างเอง จึงได้ภาพที่ใครก็ใช้ได้แต่ไม่ใช่ของเรา",
  "โครงสร้าง subject → scene → lighting → composition → constraints ทำให้คุมผลลัพธ์ได้เกือบทั้งหมด",
  "ข้อจำกัดเชิงลบ (no text, no watermark) คือการกันเหนียวที่ประหยัดรอบแก้ภาพเสีย",
  "เศรษฐศาสตร์ของพรอมป์: ทดสอบด้วย 1k ก่อน ค่อยจ่าย 2k เมื่อมั่นใจ",
], "ห้องเรียนทั่วไป · ตัวอักษรเพี้ยน · ใช้งานจริงไม่ได้",
   "ตรงคอนเซปต์ · แสงและมุมคุมได้ · เป็นภาพหลักของงานทันที",
  "สรุปแง่ 1: ความจำเพาะของพรอมป์คือสิ่งที่ล็อกคุณภาพภาพ");

/* ============ 7-10 · ASPECT 2 DESMOS ============ */
slideA(7, "02", "กราฟคณิตศาสตร์ · Desmos",
  "สร้างกราฟ y = sin x",
  `${A}/desmos/desmos-v1.png`, 1.538,
  "ผลแรก: นิพจน์เดียว เส้นเดียว — ถูกต้องแต่ไม่ได้สื่อสารอะไรเลย ไม่มีพารามิเตอร์ให้ลอง ไม่มีจุดเปรียบเทียบ และไม่เกี่ยวกับความสัมพันธ์ที่เราสนใจ",
  "แง่ที่ 2 รอบแรก ขอกราฟเดี่ยว ได้เส้น sin ธรรมดาบน Desmos จริง");
slideB(8, "02", "กราฟคณิตศาสตร์ · Desmos", [
  ["me","อยากได้กราฟที่สื่อการลืมบทเรียนตามทฤษฎี Ebbinghaus ต้องใช้สมการอะไร?"],
  ["ai","ใช้ R(t) = A·e^(−t/S) โดย A คือความจำตอนเรียนจบ (100%) และ S คือความแข็งแรงของความจำเป็นวัน — ทบทวนมาก S ใหญ่ กราฟลดช้า"],
  ["me","อยากให้เพื่อนเลื่อนค่าดูเองได้ ต้องพิมพ์ยังไงใน Desmos?"],
  ["ai","พิมพ์ A=100 และ S=7 ก่อน — Desmos สร้าง slider อัตโนมัติ แล้วค่อยนิยาม R(t) ที่ใช้ตัวแปรทั้งสอง"],
]);
slideC(9, "02", "กราฟคณิตศาสตร์ · Desmos",
  "สร้างกราฟเส้นโค้งการลืม R(t) = A·e^(−t/S)\nกำหนด slider A=100 (ความจำเริ่มต้น %)\nและ slider S=7 (ความแข็งแรงความจำ วัน)\nเพิ่มเส้น y=50 เป็นเส้นวิกฤตการลืม\nให้นักเรียนเลื่อน S ดูว่าทบทวนทำให้กราฟลดช้าลงเพียงใด",
  `${A}/desmos/desmos-v2.png`,
  "ผลใหม่: กราฟโต้ตอบจาก Desmos จริง — เลื่อน S จาก 7 เป็น 30 เห็นเส้นโค้งแบนลงชัดเจน จุดตัดเส้น y=50 คือจำนวนวันก่อนความจำหลุดครึ่งหนึ่ง",
  "รอบสองได้ slider 2 ตัวและเส้นวิกฤตจากหน้าจอ Desmos จริง");
reflectSlide(10, "02", "Desmos", [
  "ความต่างไม่ได้อยู่ที่กราฟสวยขึ้น แต่อยู่ที่เป้าหมายของกราฟ — พรอมป์แรกไม่ได้บอกว่าจะสื่อสารอะไร",
  "การทำ A และ S เป็นตัวแปร slider เปลี่ยนภาพนิ่งให้เป็นเครื่องมือสำรวจ — ผู้เรียนได้เล่นกับคณิตศาสตร์",
  "เส้นอ้างอิงเพียงเส้นเดียว (y=50) ทำให้กราฟมีประเด็นทันที — รายละเอียดที่เกิดจากการถามต่อ",
], "เส้นโค้งเดียว · ดูแล้วจบ · ไม่มีบริบท",
   "slider โต้ตอบ · มีเส้นวิกฤต · ใช้สอนต่อได้ทันที",
  "สรุปแง่ 2: ระบุเป้าหมายการสื่อสารก่อนเลือกสมการ");

/* ============ 11-14 · ASPECT 3 MERMAID ============ */
{
const s = base(); ghostNum(s,"03");
kicker(s,"แง่ที่ 3 · ไดอะแกรมจาก Mermaid");
title(s,"พรอมป์แรก (zero-shot) และผลลัพธ์");
promptCard(s,{ x:M, y:1.7, w:5.6, h:1.5, tag:"ZERO-SHOT", text:"เขียน mermaid diagram แสดงการพัฒนา prompt", fs:15 });
imgBox(s, `${A}/mermaid/v1-zeroshot-big.png`, { x:8.1, y:1.55, w:1.75, h:3.96 });
capText(s,"ผลแรก: กล่อง 4 ใบธรรมดา — loop เขียน→ผลลัพธ์→พอใจไหม ซึ่งถูกต้องแต่ว่างเปล่า ไม่แยกรอบแรกกับรอบปรับปรุง ไม่มีสี ไม่มีกลุ่ม ใช้สอนไม่ได้",
  { x:M, y:3.4, w:6.9, h:1.5 });
pageFoot(s,11); s.addNotes("แง่ 3 รอบแรก ได้ flowchart พื้นฐานจาก mermaid");
}
slideB(12, "03", "ไดอะแกรมจาก Mermaid", [
  ["me","อยากให้เห็นชัดว่ามี 2 รอบ — zero-shot กับ few-shot ต้องใช้ syntax อะไร?"],
  ["ai","ใช้ subgraph ครอบแต่ละรอบ พร้อมตั้งชื่อกลุ่ม เช่น รอบที่ 1 · Zero-shot"],
  ["me","ทำให้แยกสีตามช่วงได้ไหม และอะไรเชื่อมสองรอบ?"],
  ["ai","ใช้ classDef กำหนดสีกล่อง แยก zero/few/กระบวนการ และเพิ่มกล่อง ถาม–ตอบเพื่อปรับ prompt เป็นสะพานเชื่อม"],
]);
{
const s = base(); ghostNum(s,"03");
kicker(s,"แง่ที่ 3 · ไดอะแกรมจาก Mermaid", M, GREEN);
title(s,"พรอมป์ใหม่ (few-shot) และผลลัพธ์");
promptCard(s,{ x:M, y:1.7, w:4.5, h:2.9, tag:"FEW-SHOT", v2:true, fs:12.5,
  text:"สร้าง flowchart TD: subgraph รอบ 1 Zero-shot → กล่องถาม–ตอบ+สังเคราะห์พรอมป์ใหม่ → subgraph รอบ 2 Few-shot → จุดตัดสินใจ ตรงเป้าหมายไหม (ไม่ตรงวนกลับ) → สะท้อนการเรียนรู้ ใช้ classDef 3 สี ข้อความไทย" });
imgBox(s, `${A}/mermaid/v1-zeroshot-big.png`, { x:5.6, y:1.55, w:1.55, h:3.51 });
imgBox(s, `${A}/mermaid/v2-fewshot-big.png`, { x:7.75, y:1.55, w:1.9, h:5.04 });
s.addText("ก่อน", { x:5.6, y:5.2, w:1.55, h:0.3, fontSize:11, color:MUTED, align:"center", fontFace:F, margin:0 });
s.addText("หลัง", { x:7.75, y:6.7, w:1.9, h:0.3, fontSize:11, color:GREEN, align:"center", fontFace:F, margin:0 });
capText(s,"ผลใหม่: วงจร 2 รอบแยกสีชัดเจน — น้ำเงิน=รอบแรก ทอง=รอบสอง เขียว=กระบวนการ อ่านเข้าใจใน 3 วินาที ใช้สอนได้จริง (โค้ด .mmd อยู่ใน repo)",
  { x:9.9, y:1.7, w:2.9, h:3.4 });
pageFoot(s,13); s.addNotes("เทียบไดอะแกรมก่อน-หลังคู่กัน");
}
reflectSlide(14, "03", "Mermaid", [
  "ไดอะแกรมต้องการข้อความที่คมก่อน syntax — พรอมป์แรกให้หัวข้อแต่ไม่ให้โครงเรื่อง",
  "การระบุคำสั่งเฉพาะของเครื่องมือ (subgraph, classDef, TD) คือ few-shot เชิงเทคนิค — ยิ่งรู้คำของเครื่องมือ ยิ่งคุมผลลัพธ์ได้",
  "สีไม่ใช่การตกแต่งแต่เป็นชั้นข้อมูล: แยกรอบแรก/รอบสอง/กระบวนการได้โดยไม่ต้องอ่านทุกกล่อง",
], "4 กล่อง · ไม่มีบริบท · จำยาก",
   "2 รอบชัดเจน · สีแยกชั้นความหมาย · ใช้สอนได้",
  "สรุปแง่ 3");

/* ============ 15-18 · ASPECT 4 LATEX ============ */
{
const s = base(); ghostNum(s,"04");
kicker(s,"แง่ที่ 4 · บทความจาก LaTeX");
title(s,"พรอมป์แรก (zero-shot) และผลลัพธ์");
promptCard(s,{ x:M, y:1.7, w:5.6, h:1.5, tag:"ZERO-SHOT", text:"เขียนบทความเรื่อง prompt engineering ด้วย latex", fs:15 });
imgBox(s, `${A}/latex/v1-page1.png`, { x:9.3, y:1.5, w:2.9, h:3.75 });
capText(s,"ผลแรก: เทมเพลตอังกฤษ 3 ย่อหน้า พื้น ๆ — ประโยคสั้น ไม่มีตาราง ไม่มีสมการ และไม่มีภาษาไทย เพราะไม่ได้ระบุ engine และฟอนต์ไทย ใช้ส่งงานจริงไม่ได้ (คอมไพล์ Tectonic)",
  { x:M, y:3.4, w:8.2, h:1.7 });
pageFoot(s,15); s.addNotes("แง่ 4 รอบแรก ได้เทมเพลตว่าง");
}
slideB(16, "04", "บทความจาก LaTeX", [
  ["me","อยากได้บทความภาษาไทย LaTeX ต้องตั้งค่ายังไง?"],
  ["ai","คอมไพล์ด้วย XeLaTeX ใช้ fontspec ตั้งฟอนต์ไทย (Thonburi) และเปิด XeTeXlinebreaklocale \"th\" เพื่อตัดคำไทย"],
  ["me","อยากให้เนื้อหาลึกและเป็นระบบ ควรกำหนดโครงเรื่องอย่างไร?"],
  ["ai","กำหนดโครง: บทคัดย่อ → บทนำ → กรอบวิเคราะห์ (มีสมการ) → ตารางเปรียบเทียบ 6 แง่ → ข้อเสนอแนะ → บทสรุป"],
]);
{
const s = base(); ghostNum(s,"04");
kicker(s,"แง่ที่ 4 · บทความจาก LaTeX", M, GREEN);
title(s,"พรอมป์ใหม่ (few-shot) และผลลัพธ์");
promptCard(s,{ x:M, y:1.7, w:4.9, h:2.95, tag:"FEW-SHOT", v2:true, fs:12,
  text:"เขียนบทความวิชาการภาษาไทยด้วย XeLaTeX+fontspec ฟอนต์ Thonburi ชื่อเรื่อง พลังของ Prompt: จาก Zero-shot สู่ Few-shot ผู้อ่าน: นักศึกษาวิศวคอม มีบทคัดย่อ สมการ Qn=Q0(1+α)^n ตาราง booktabs เทียบ 6 แง่ ข้อเสนอแนะ และบทสรุป" });
imgBox(s, `${A}/latex/v2-page1.png`, { x:5.95, y:1.5, w:2.62, h:3.71 });
imgBox(s, `${A}/latex/v2-page2.png`, { x:9.0, y:1.5, w:2.62, h:3.71 });
capText(s,"ผลใหม่: บทความไทย 2 หน้า — บทคัดย่อ สมการ ตารางเปรียบเทียบ 6 แง่จากงานจริง ฟอนต์ไทยตัดคำถูกต้อง (PDF + โค้ด .tex อยู่ใน repo)",
  { x:5.95, y:5.5, w:5.75, h:1.2 });
pageFoot(s,17); s.addNotes("เอกสารไทยครบองค์ประกอบ สองหน้า");
}
reflectSlide(18, "04", "LaTeX", [
  "LaTeX มีกับดักภาษา — ไม่ระบุ engine/ฟอนต์ ก็ได้เอกสารที่ภาษาไทยพังทั้งไฟล์ พรอมป์ที่ดีต้องรู้จุดวิกฤตของเครื่องมือ",
  "การกำหนดโครงเรื่องล่วงหน้าเปลี่ยนผลลัพธ์จากเทมเพลตเป็นบทความจริง",
  "ตารางที่ขอเฉพาะ (booktabs 3 เส้น) ทำให้เอกสารดูเป็นวารสาร — รายละเอียดที่ได้จากการถามต่อ",
], "อังกฤษ 3 ย่อหน้า · ไม่มีโครงเรื่อง · ส่งไม่ได้",
   "ไทยเต็มรูปแบบ · สมการ+ตาราง · ระดับส่งได้",
  "สรุปแง่ 4");

/* ============ 19-22 · ASPECT 5 NOTEBOOKLM ============ */
{
const s = base(); ghostNum(s,"05");
kicker(s,"แง่ที่ 5 · สไลด์สรุปด้วย NotebookLM");
title(s,"พรอมป์แรก (zero-shot) และผลลัพธ์");
promptCard(s,{ x:M, y:1.7, w:5.6, h:1.5, tag:"ZERO-SHOT · หลังอัปโหลด Week4.pdf", text:"สรุปไฟล์นี้เป็นสไลด์", fs:15 });
// plain-text result mock card
s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x:M, y:3.5, w:7.2, h:2.3, rectRadius:0.1,
  fill:{color:CARD2}, line:{color:LINE,width:1} });
s.addText("ผลแรก: ย่อหน้าข้อความ", { x:M+0.25, y:3.64, w:6.7, h:0.3, fontSize:11.5, bold:true, color:MUTED, fontFace:F, margin:0 });
s.addText("\"เอกสารนี้กล่าวถึง prompt คือคำสั่งที่ให้กับ AI… มีเทคนิคต่าง ๆ เช่น zero-shot few-shot… สรุปได้ว่า prompt ที่ดีช่วยให้ AI ตอบตรงความต้องการ…\"",
  { x:M+0.25, y:4.0, w:6.7, h:1.1, fontSize:13, color:MUTED, italic:true, fontFace:F, margin:0, lineSpacingMultiple:1.2 });
s.addText("ได้ข้อความย่อ ไม่ใช่สไลด์ — ต้องคัดลอกไปจัดรูปเองอีกยาว เพราะไม่ได้ระบุจำนวนหน้า โครงเรื่อง กลุ่มเป้าหมาย และรูปแบบ",
  { x:M+0.25, y:5.15, w:6.7, h:0.6, fontSize:12, color:"6E6A99", fontFace:F, margin:0 });
pageFoot(s,19); s.addNotes("แง่ 5 รอบแรก: คำสั่งสั้นได้ text summary");
}
slideB(20, "05", "สไลด์สรุปด้วย NotebookLM", [
  ["me","อยากได้สไลด์ที่นักศึกษาใช้ทบทวนก่อนสอบ ควรกำหนดอะไรบ้าง?"],
  ["ai","ระบุจำนวนสไลด์ (10 หน้า) โครงเรื่อง นิยาม→เทคนิคหลัก→RGC→Inception→สรุป และรูปแบบหน้าละ 3 bullet"],
  ["me","อยากเน้นคำศัพท์สำคัญที่อาจออกข้อสอบ ทำได้ไหม?"],
  ["ai","ได้ — เพิ่มเงื่อนไข คำศัพท์สำคัญเป็นตัวหนา และสไลด์สุดท้ายรวมคำศัพท์+ตัวย่อเป็นตาราง"],
]);
{
const s = base(); ghostNum(s,"05");
kicker(s,"แง่ที่ 5 · สไลด์สรุปด้วย NotebookLM", M, GREEN);
title(s,"พรอมป์ใหม่ (few-shot) และผลลัพธ์");
promptCard(s,{ x:M, y:1.7, w:4.7, h:2.9, tag:"FEW-SHOT", v2:true, fs:11.5,
  text:"คุณเป็นผู้ช่วยสอนรายวิชา GenAI 1 จงสรุปเอกสาร Week 4 พลังของ Prompt เป็นสไลด์ทบทวน 10 หน้า ภาษาไทย โครง: นิยาม→AI เข้าใจภาษา→Zero/One/Few-shot→RGC→Priming+CoT→Inception→ตัวอย่างจริง→สรุป+ตารางคำศัพท์ หน้าละไม่เกิน 3 bullet คำสำคัญตัวหนา" });
imgBox(s, `${A}/shots/deck-top.png`, { x:5.75, y:1.7, w:7.0, h:4.15 });
capText(s,"ผลใหม่: สไลด์ทบทวน 10 หน้า (สร้างตามพรอมป์รอบสอง — เปิดดูเต็มที่ fiezdev.github.io/genai-prompt-lab/slides.html) ทำซ้ำใน NotebookLM จริงได้ใน 5 นาที: อัปโหลด PDF → วางพรอมป์แรก → วางพรอมป์ใหม่ → บันทึกผล",
  { x:5.75, y:6.0, w:7.0, h:1.0 });
pageFoot(s,21); s.addNotes("สไลด์สรุปจริง 10 หน้า embed ในเว็บไซต์");
}
reflectSlide(22, "05", "NotebookLM", [
  "เครื่องมือสรุปเอกสารมีค่าเริ่มต้นของมันเอง — ไม่ระบุรูปแบบ จะได้ข้อความย่อ ไม่ใช่สื่อการสอน",
  "การให้โครงเรื่องเจาะจงถึงหน้า ทำให้สไลด์เรียงตามลำดับการสอนจริง ไม่ใช่ลำดับที่โมเดลสุ่ม",
  "เงื่อนไขเล็ก ๆ อย่าง คำศัพท์ตัวหนา+ตารางท้ายเล่ม ทำให้ผลงานเหมาะกับผู้ใช้จริง — นักศึกษาก่อนสอบ",
], "ย่อหน้าข้อความ · ต้องจัดรูปเองใหม่",
   "สไลด์ 10 หน้าพร้อมใช้ · โครงตามหลักการสอน",
  "สรุปแง่ 5");

/* ============ 23-26 · ASPECT 6 WEBSITE ============ */
{
const s = base(); ghostNum(s,"06");
kicker(s,"แง่ที่ 6 · เว็บไซต์บน GitHub Pages");
title(s,"พรอมป์แรก (zero-shot) และผลลัพธ์");
promptCard(s,{ x:M, y:1.7, w:5.6, h:1.5, tag:"ZERO-SHOT", text:"ทำเว็บไซต์สรุปงานการบ้าน", fs:15 });
imgBox(s, `${A}/shots/site-s1.png`, { x:6.4, y:1.7, w:6.35, h:4.22 });
capText(s,"ผลแรก: HTML หน้าเดียวเลื่อนยาว — งาน 6 แง่เรียงต่อกัน ไม่มีเมนู ไม่มีแยกหมวด อ่านบนมือถือลำบาก ผู้ตรวจต้องเลื่อนหาแง่ที่ต้องการเอง",
  { x:M, y:3.45, w:5.6, h:1.5 });
pageFoot(s,23); s.addNotes("แง่ 6 รอบแรก");
}
slideB(24, "06", "เว็บไซต์บน GitHub Pages", [
  ["me","อยากให้อาจารย์เลือกดูทีละแง่ได้ง่าย ๆ ต้องออกแบบนำทางยังไง?"],
  ["ai","ทำเมนูบนแบบเลือกหมวด 6 ปุ่มตาม 6 แง่ ใช้ hash routing เพื่อแชร์ลิงก์ตรงถึงแต่ละแง่ (#s1–#s6)"],
  ["me","อยากได้ธีมต่อเนื่องกับงานและอ่านสบายทั้งจอคอมและมือถือ?"],
  ["ai","ใช้ธีมมืด indigo+ทอง ฟอนต์ไทย Leelawadee UI ทุกแง่ใช้โครงเดียวกัน พร้อม grid ที่ยุบเป็นคอลัมน์เดียวบนมือถือ"],
]);
{
const s = base(); ghostNum(s,"06");
kicker(s,"แง่ที่ 6 · เว็บไซต์บน GitHub Pages", M, GREEN);
title(s,"พรอมป์ใหม่ (few-shot) และผลลัพธ์");
promptCard(s,{ x:M, y:1.7, w:4.7, h:2.9, tag:"FEW-SHOT", v2:true, fs:12,
  text:"สร้างเว็บ Prompt Lab เป็น SPA หน้าเดียว เมนูบน 7 แท็บ (หน้าแรก+6 แง่) hash routing ธีมมืด indigo/ทอง ฟอนต์ไทย ทุกแง่ใช้โครงเดียวกัน พรอมป์→ผล→ถามตอบ→พรอมป์ใหม่→ผล→สะท้อน responsive เผยแพร่ด้วย GitHub Pages" });
imgBox(s, `${A}/shots/site-s1.png`, { x:5.75, y:1.7, w:7.0, h:4.66 });
capText(s,"ผลใหม่: เว็บไซต์จริงที่กำลังใช้ส่งงาน — เมนู 7 แท็บ ผลงานแง่ 1–5 ฝังครบในหน้าเดียว ธีมเดียวทั้งชิ้น",
  { x:5.75, y:6.5, w:7.0, h:0.6 });
pageFoot(s,25); s.addNotes("เว็บจริง deploy แล้ว");
}
reflectSlide(26, "06", "GitHub Pages", [
  "เว็บคือสื่อ ไม่ใช่เอกสาร — พรอมป์แรกคิดถึงเนื้อหาแต่ลืมผู้อ่านและการนำทาง",
  "ความต่อเนื่อง (ธีมเดียว โครงเดียว สีเดียว) ทำให้ 6 งานรวมเป็นหนึ่งผลงาน — ตรงเงื่อนไขโบนัส",
  "ทำครบ 6 แง่จะเห็นแบบแผนเดียวกันหมด: zero-shot ได้ของทั่วไป — few-shot ได้ของของเรา",
], "หน้ายาวเดียว · หลงทาง · ไม่มีการนำทาง",
   "7 แท็บเลือกได้ · responsive · ผลงานจริงครบ 6 แง่",
  "สรุปแง่ 6");

/* ============ 27 · BONUS ============ */
{
const s = base();
kicker(s,"โบนัสพิเศษ");
title(s,"เว็บไซต์รวมงานแง่ 1–5 บน GitHub Pages");
imgBox(s, `${A}/shots/deck-top.png`, { x:M, y:1.7, w:6.9, h:4.09 });
s.addText([
  { text:"เปิดเข้าไปดูได้จริงที่ ", options:{ color:MUTED, breakLine:false } },
  { text:"fiezdev.github.io/genai-prompt-lab", options:{ color:AMBER, bold:true, breakLine:false } },
], { x:7.85, y:1.85, w:5.0, h:0.5, fontSize:15, fontFace:F, margin:0 });
const items = [
  "เมนูบนเลือก 6 แง่ + หน้าแรก + คู่มือ Canva MCP",
  "ผลงานจริงฝังในหน้า: ภาพ Higgsfield กราฟ Desmos ไดอะแกรม Mermaid PDF จาก LaTeX และสไลด์สรุป 10 หน้า",
  "ธีมเดียวต่อเนื่อง ทุกแง่ใช้โครงเดียวกัน — งานทั้งหมดอ่านเป็นชิ้นเดียว",
  "ซอร์สโค้ตเปิดที่ github.com/FiezDev/genai-prompt-lab",
];
s.addText(items.map((t,i)=>({ text:t, options:{ bullet:bu(), breakLine:i<items.length-1 } })),
  { x:7.85, y:2.5, w:4.95, h:3.6, fontSize:14, color:INK, fontFace:F, margin:0,
    paraSpaceAfter:12, valign:"top", lineSpacingMultiple:1.18 });
pageFoot(s,27); s.addNotes("โบนัส: เว็บรวมงาน 1-5 ต่อเนื่อง ลง GitHub แล้ว");
}

/* ============ 28 · CANVA MCP ============ */
{
const s = base();
kicker(s,"คู่มือเสริม · ใช้กับแง่ที่ 1");
title(s,"Canva + Canva MCP: ออกแบบด้วยพรอมป์");
s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x:M, y:1.72, w:7.2, h:2.1, rectRadius:0.09,
  fill:{color:"12101F"}, line:{color:LINE,width:1} });
s.addText("ตั้งค่าเชื่อม Canva เข้ากับ AI assistant", { x:M+0.25, y:1.86, w:6.7, h:0.32,
  fontSize:12.5, bold:true, color:AMBER, fontFace:F, margin:0 });
s.addText('{\n  "mcpServers": {\n    "canva": { "command": "npx",\n      "args": ["-y","mcp-remote@latest",\n               "https://mcp.canva.com/mcp"] }\n  }\n}',
  { x:M+0.25, y:2.22, w:6.7, h:1.5, fontSize:12, fontFace:"Consolas", color:"C9D1E3", margin:0, lineSpacingMultiple:1.1 });
const steps = [
  "ขอสิทธิ์ MCP ที่ canva.dev → อนุมัติแล้วเพิ่ม config นี้ในไคลเอนต์",
  "ล็อกอิน Canva ผ่าน OAuth ครั้งเดียว — ไม่มีการใช้รหัสผ่าน",
  "สั่งงานเป็นภาษาไทยได้เลย: สร้างโปสเตอร์ / ค้นเทมเพลต / แก้งานเดิม / ส่งออก PNG·PDF·PPTX",
];
s.addText(steps.map((t,i)=>({ text:t, options:{ bullet:bu(), breakLine:i<steps.length-1 } })),
  { x:M, y:4.1, w:7.2, h:2.3, fontSize:14, color:INK, fontFace:F, margin:0, paraSpaceAfter:12, valign:"top", lineSpacingMultiple:1.18 });
imgBox(s, `${A}/img/fewshot-web.png`, { x:8.2, y:1.72, w:4.55, h:2.55 });
capText(s,"ตัวอย่างงานภาพที่สั่งด้วยพรอมป์ (แง่ที่ 1) — คู่มือฉบับเต็มอยู่ในเว็บ: /canva-mcp-guide.html",
  { x:8.2, y:4.45, w:4.55, h:1.6 });
pageFoot(s,28); s.addNotes("Canva MCP guide สรุป");
}

/* ============ 29 · SUMMARY TABLE ============ */
{
const s = base();
kicker(s,"สรุปภาพรวม");
title(s,"6 แง่ · แบบแผนเดียวกันทั้งหมด");
const rows = [
  ["แง่","เครื่องมือ","ผลแรก (zero-shot)","ผลใหม่ (few-shot)"],
  ["1 ภาพ AI","Higgsfield","ฉากทั่วไป ตัวอักษรเพี้ยน","ตรงคอนเซปต์ ใช้เป็นภาพหลัก"],
  ["2 กราฟ","Desmos","เส้นเดียว ไร้ความหมาย","slider โต้ตอบ + เส้นวิกฤต"],
  ["3 ไดอะแกรม","Mermaid","4 กล่องธรรมดา","วงจร 2 รอบ สีแยกชั้นความหมาย"],
  ["4 บทความ","LaTeX","เทมเพลตอังกฤษว่าง","บทความไทย สมการ+ตาราง"],
  ["5 สไลด์สรุป","NotebookLM","ย่อหน้าข้อความ","สไลด์ 10 หน้าพร้อมใช้"],
  ["6 เว็บไซต์","GitHub Pages","หน้ายาวเดียว","7 แท็บ ผลงานจริงครบทุกแง่"],
];
s.addTable(rows.map((r,i)=>r.map((c,j)=>({
  text:c, options:{
    fill:{color: i===0 ? CARD2 : (i%2? CARD : "191731")},
    color: i===0 ? AMBER : (j===0? INK : (j>=2 ? (j===3? "B7F0CB" : MUTED) : INK)),
    bold: i===0 || j===0, fontSize: i===0?13:12.5, fontFace:F, align:"left", valign:"middle",
  }}))), { x:M, y:1.75, w:12.23, colW:[1.9,2.0,4.0,4.33], rowH:0.62,
    border:{ type:"solid", pt:0.5, color:LINE } });
s.addText("บทเรียนรวม: กำหนดเป้าหมายก่อนถาม · ให้บทบาท+บริบท+ตัวอย่าง · วนปรับอย่างน้อยหนึ่งรอบเสมอ",
  { x:M, y:6.55, w:12.2, h:0.45, fontSize:15, bold:true, color:GREEN, fontFace:F, margin:0 });
pageFoot(s,29); s.addNotes("ตารางสรุป 6 แง่");
}

/* ============ 30 · CLOSING ============ */
{
const s = base();
s.addImage({ path:`${A}/img/zeroshot-web.png`, x:0, y:0, w:W, h:H, sizing:{type:"cover",w:W,h:H} });
s.addShape(p.shapes.RECTANGLE, { x:0, y:0, w:W, h:H, fill:{color:BG, transparency:22}, line:{type:"none"} });
s.addText("ขอบคุณครับ", { x:M, y:2.3, w:12.2, h:1.2, fontSize:60, bold:true, color:INK, fontFace:F, margin:0 });
s.addText("ทุกผลงานในสไลด์นี้ทำจากเครื่องมือจริง และรวมอยู่ในเว็บไซต์เดียวกัน",
  { x:M, y:3.7, w:11.5, h:0.5, fontSize:18, color:"D6D2F0", fontFace:F, margin:0 });
s.addText([
  { text:"เว็บไซต์ประกอบ  fiezdev.github.io/genai-prompt-lab", options:{ color:AMBER, breakLine:true } },
  { text:"ซอร์สโค้ด  github.com/FiezDev/genai-prompt-lab", options:{ color:AMBER, breakLine:true } },
  { text:"อิทธิพล วงศ์อภัย · GenAI 1 · Week 4 พลังของ Prompt", options:{ color:"9D99C0", breakLine:false } },
], { x:M, y:5.6, w:11.5, h:1.3, fontSize:14, fontFace:F, margin:0, lineSpacingMultiple:1.5 });
s.addNotes("ปิดท้ายด้วยลิงก์เว็บและ repo");
}

p.writeFile({ fileName: "Prompt-Lab-GenAI-Homework.pptx" }).then(()=>console.log("PPTX written"));
