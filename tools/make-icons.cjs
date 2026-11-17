// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、トラック・オートバイの車輪の形。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <rect x="12" y="30" width="48" height="34" rx="3" fill="#fffdf7"/>
      <path d="M60 40 H76 L88 52 V64 H60 Z" fill="#8fb8de"/>
      <circle cx="28" cy="68" r="9" fill="#f6d77a" stroke="#123554" stroke-width="3"/>
      <circle cx="74" cy="68" r="9" fill="#f6d77a" stroke="#123554" stroke-width="3"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
