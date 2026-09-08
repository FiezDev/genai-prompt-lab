import { chromium } from 'playwright';

const OUT = process.env.HOME + '/assignment-assets';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function newCalc(browser) {
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 832 },
    deviceScaleFactor: 2,
    locale: 'th-TH',
  });
  const page = await ctx.newPage();
  await page.goto('https://www.desmos.com/calculator?lang=th', { waitUntil: 'domcontentloaded' });
  await wait(5000);
  for (const name of ['ยอมรับทั้งหมด', 'Accept all', 'ยอมรับ', 'Accept', 'เห็นด้วย']) {
    const b = page.getByRole('button', { name });
    if ((await b.count()) > 0) { try { await b.first().click({ timeout: 2000 }); await wait(800); } catch {} }
  }
  await wait(1000);
  // focus the first expression: click the expression list area
  await page.mouse.click(230, 300);
  await wait(500);
  return { ctx, page };
}

const browser = await chromium.launch();

// ---- v1: zero-shot (single plain sine) ----
{
  const { ctx, page } = await newCalc(browser);
  await page.keyboard.type('y=sin x', { delay: 60 });
  await wait(2000);
  await page.screenshot({ path: OUT + '/desmos-v1.png' });
  console.log('v1 saved');
  await ctx.close();
}

// ---- v2: few-shot (forgetting curve with sliders + threshold) ----
{
  const { ctx, page } = await newCalc(browser);
  const lines = ['A=100', 'S=7', 'R(t)=Ae^(-t/S)', 'y=50'];
  for (const [i, line] of lines.entries()) {
    await page.keyboard.type(line, { delay: 60 });
    if (i < lines.length - 1) {
      await page.keyboard.press('Enter');
      await wait(400);
    }
  }
  await wait(2500);
  await page.screenshot({ path: OUT + '/desmos-v2.png' });
  console.log('v2 saved');
  await ctx.close();
}

await browser.close();
console.log('done');
