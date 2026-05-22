import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:8080';
const OUT = '/mnt/documents';

const variants = [
  { name: 'web-en',    lang: 'en', width: 1440, height: 900, mobile: false },
  { name: 'mobile-en', lang: 'en', width: 390,  height: 844, mobile: true  },
  { name: 'web-sq',    lang: 'sq', width: 1440, height: 900, mobile: false },
  { name: 'mobile-sq', lang: 'sq', width: 390,  height: 844, mobile: true  },
];

const routes = [
  { path: '/',        slug: 'home'    },
  { path: '/contact', slug: 'contact' },
];

const browser = await puppeteer.launch({
  executablePath: '/bin/chromium',
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

const neutralizeCss = `
  *, *::before, *::after { min-height: 0 !important; }
  html, body { min-height: 0 !important; }
  section, div { min-height: 0 !important; }
`;

for (const v of variants) {
  const page = await browser.newPage();
  await page.setViewport({
    width: v.width,
    height: v.height,
    isMobile: v.mobile,
    hasTouch: v.mobile,
    deviceScaleFactor: 2,
  });

  // set language via localStorage before nav
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await page.evaluate((lang) => localStorage.setItem('lang', lang), v.lang);

  const pdfBuffers = [];
  for (const r of routes) {
    await page.goto(BASE + r.path, { waitUntil: 'networkidle0' });
    await new Promise(res => setTimeout(res, 1500));
    await page.addStyleTag({ content: neutralizeCss });
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);

    const pdf = await page.pdf({
      width: `${v.width}px`,
      height: `${bodyHeight}px`,
      printBackground: true,
      pageRanges: '1',
    });
    pdfBuffers.push(pdf);
  }

  // merge with pdf-lib
  const { PDFDocument } = await import('pdf-lib');
  const merged = await PDFDocument.create();
  for (const buf of pdfBuffers) {
    const src = await PDFDocument.load(buf);
    const pages = await merged.copyPages(src, src.getPageIndices());
    pages.forEach(p => merged.addPage(p));
  }
  const out = await merged.save();
  const fs = await import('fs');
  fs.writeFileSync(`${OUT}/forever-brandon-legacy-${v.name}.pdf`, out);
  console.log('wrote', v.name);
  await page.close();
}

await browser.close();
