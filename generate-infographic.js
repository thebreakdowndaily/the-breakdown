const fs = require('fs');
const path = require('path');

const W = 3840;
const H = 2160;
const BG = '#0B1120';
const CARD = '#111827';
const ACCENT = '#F59E0B';
const GREEN = '#10B981';
const ROSE = '#EF4444';
const BLUE = '#3B82F6';
const TEAL = '#06B6D4';
const PURPLE = '#8B5CF6';
const TEXT_PRIMARY = '#F8FAFC';
const TEXT_SECONDARY = '#94A3B8';
const TEXT_MUTED = '#64748B';

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

function header(slideNum, label = 'TAX BREAKDOWN · INDIA 2026') {
  return `
  <rect x="0" y="0" width="${W}" height="80" fill="${CARD}" opacity="0.6"/>
  <text x="60" y="52" font-family="${FONT}" font-size="22" font-weight="600" fill="${TEXT_SECONDARY}" letter-spacing="4">${label}</text>
  <text x="${W - 60}" y="52" font-family="${FONT}" font-size="20" font-weight="700" fill="${ACCENT}" text-anchor="end">${slideNum}/10</text>
  <line x1="60" y1="80" x2="${W - 60}" y2="80" stroke="${ACCENT}" stroke-width="2" opacity="0.3"/>`;
}

function footer() {
  return `
  <rect x="0" y="${H - 60}" width="${W}" height="60" fill="${CARD}" opacity="0.4"/>
  <text x="${W / 2}" y="${H - 24}" font-family="${FONT}" font-size="16" fill="${TEXT_MUTED}" text-anchor="middle" letter-spacing="2">NEWSJACK · EDITORIAL INFOGRAPHIC</text>`;
}

function rupeeIcon(x, y, s = 40) {
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${s}" font-weight="900" fill="${ACCENT}" text-anchor="middle">₹</text>`;
}

function bar(x, y, w, h, color, label, value, pct) {
  const valStr = typeof value === 'number' ? `₹${value}` : value;
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${color}" opacity="0.9"/>
  <text x="${x + 16}" y="${y + h / 2 + 6}" font-family="${FONT}" font-size="20" font-weight="600" fill="${TEXT_PRIMARY}">${label}</text>
  <text x="${x + w - 16}" y="${y + h / 2 + 6}" font-family="${FONT}" font-size="20" font-weight="700" fill="${TEXT_PRIMARY}" text-anchor="end">${valStr}</text>`;
}

const slides = [];

// ── SLIDE 1: COVER ──
slides.push(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1120"/>
      <stop offset="50%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0B1120"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="${ACCENT}22"/>
      <stop offset="100%" stop-color="${ACCENT}00"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  ${header(1, 'COVER')}

  <!-- Big rupee symbol -->
  <text x="${W / 2}" y="340" font-family="${FONT}" font-size="200" font-weight="900" fill="${ACCENT}" text-anchor="middle" opacity="0.15">₹</text>

  <!-- Title -->
  <text x="${W / 2}" y="520" font-family="${FONT}" font-size="72" font-weight="900" fill="${TEXT_PRIMARY}" text-anchor="middle" letter-spacing="1">Where Does Your ₹100 of Tax</text>
  <text x="${W / 2}" y="610" font-family="${FONT}" font-size="72" font-weight="900" fill="${ACCENT}" text-anchor="middle" letter-spacing="1">Actually Go?</text>

  <!-- Subtitle -->
  <rect x="${W / 2 - 300}" y="680" width="600" height="2" fill="${ACCENT}" opacity="0.5"/>
  <text x="${W / 2}" y="740" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}" text-anchor="middle">India spends ₹50.65 Lakh Crore. Here's the breakdown.</text>
  <rect x="${W / 2 - 300}" y="770" width="600" height="2" fill="${ACCENT}" opacity="0.5"/>

  <!-- Visual: Simplified pie/donut chart -->
  <g transform="translate(${W / 2}, 1300)">
    <!-- Outer ring segments -->
    <circle cx="0" cy="0" r="280" fill="none" stroke="#1E293B" stroke-width="50"/>
    <circle cx="0" cy="0" r="280" fill="none" stroke="${ACCENT}" stroke-width="50"
      stroke-dasharray="69 691" stroke-dashoffset="0" transform="rotate(-90)"/>
    <circle cx="0" cy="0" r="280" fill="none" stroke="${BLUE}" stroke-width="50"
      stroke-dasharray="76 691" stroke-dashoffset="-69" transform="rotate(-90)"/>
    <circle cx="0" cy="0" r="280" fill="none" stroke="${GREEN}" stroke-width="50"
      stroke-dasharray="79 691" stroke-dashoffset="-145" transform="rotate(-90)"/>
    <circle cx="0" cy="0" r="280" fill="none" stroke="${ROSE}" stroke-width="50"
      stroke-dasharray="29 691" stroke-dashoffset="-224" transform="rotate(-90)"/>
    <circle cx="0" cy="0" r="280" fill="none" stroke="${PURPLE}" stroke-width="50"
      stroke-dasharray="32 691" stroke-dashoffset="-253" transform="rotate(-90)"/>
    <circle cx="0" cy="0" r="280" fill="none" stroke="${TEAL}" stroke-width="50"
      stroke-dasharray="14 691" stroke-dashoffset="-285" transform="rotate(-90)"/>
    <circle cx="0" cy="0" r="280" fill="none" stroke="${TEXT_MUTED}" stroke-width="50"
      stroke-dasharray="43 691" stroke-dashoffset="-299" transform="rotate(-90)"/>
    <!-- Center text -->
    <circle cx="0" cy="0" r="200" fill="${CARD}"/>
    <text x="0" y="-20" font-family="${FONT}" font-size="80" font-weight="900" fill="${ACCENT}" text-anchor="middle">₹100</text>
    <text x="0" y="40" font-family="${FONT}" font-size="22" fill="${TEXT_SECONDARY}" text-anchor="middle">OF EVERY TAX ₹</text>
  </g>

  <!-- Legend -->
  <g transform="translate(${W / 2 - 500}, 1750)">
    <line x1="0" y1="0" x2="30" y2="0" stroke="${ACCENT}" stroke-width="6"/><text x="42" y="6" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">Interest (19%)</text>
    <line x1="220" y1="0" x2="250" y2="0" stroke="${BLUE}" stroke-width="6"/><text x="262" y="6" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">States (21%)</text>
    <line x1="440" y1="0" x2="470" y2="0" stroke="${GREEN}" stroke-width="6"/><text x="482" y="6" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">Infra (22%)</text>
    <line x1="660" y1="0" x2="690" y2="0" stroke="${ROSE}" stroke-width="6"/><text x="702" y="6" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">Defence (8%)</text>
    <line x1="220" y1="36" x2="250" y2="36" stroke="${PURPLE}" stroke-width="6"/><text x="262" y="42" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">Subsidies (9%)</text>
    <line x1="440" y1="36" x2="470" y2="36" stroke="${TEAL}" stroke-width="6"/><text x="482" y="42" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">Pensions (5%)</text>
    <line x1="660" y1="36" x2="690" y2="36" stroke="${TEXT_MUTED}" stroke-width="6"/><text x="702" y="42" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">Other (12%)</text>
  </g>

  ${footer()}
</svg>`);

// ── SLIDE 2: ₹19 — Interest ──
slides.push(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect x="0" y="0" width="${W}" height="${H}" fill="${BG}"/>
  <defs>
    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="${H}">
      <stop offset="0%" stop-color="${ACCENT}15"/>
      <stop offset="100%" stop-color="${ACCENT}00"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#g2)"/>
  ${header(2)}

  <!-- Big number -->
  <text x="200" y="400" font-family="${FONT}" font-size="220" font-weight="900" fill="${ACCENT}">₹19</text>
  <text x="440" y="340" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">out of every ₹100</text>
  <text x="440" y="390" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">you pay in tax</text>

  <!-- Title -->
  <text x="200" y="550" font-family="${FONT}" font-size="56" font-weight="800" fill="${TEXT_PRIMARY}">Interest Payments on Past Debt</text>
  <text x="200" y="610" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_MUTED}">You're paying for yesterday's borrowings</text>
  <line x1="200" y1="650" x2="600" y2="650" stroke="${ACCENT}" stroke-width="3"/>

  <!-- Bar visualization -->
  <g transform="translate(200, 780)">
    <!-- Full bar background -->
    <rect x="0" y="40" width="3000" height="60" rx="6" fill="#1E293B"/>
    <!-- Filled portion -->
    <rect x="0" y="40" width="570" height="60" rx="6" fill="${ACCENT}"/>
    <text x="20" y="78" font-family="${FONT}" font-size="24" font-weight="700" fill="${BG}">₹19 — INTEREST</text>

    <!-- Remaining -->
    <rect x="570" y="40" width="2430" height="60" rx="6" fill="#1E293B" opacity="0.5"/>
  </g>

  <!-- Explanation cards -->
  <g transform="translate(200, 980)">
    <rect x="0" y="0" width="1100" height="200" rx="12" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <text x="40" y="45" font-family="${FONT}" font-size="22" font-weight="700" fill="${ACCENT}">WHY THIS MATTERS</text>
    <text x="40" y="90" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">India's outstanding public debt exceeds ₹160 lakh crore.</text>
    <text x="40" y="125" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">Interest payments are the single largest expenditure —</text>
    <text x="40" y="160" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">more than defence, health, or education.</text>
  </g>

  <g transform="translate(1460, 980)">
    <rect x="0" y="0" width="1100" height="200" rx="12" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <text x="40" y="45" font-family="${FONT}" font-size="22" font-weight="700" fill="${TEXT_MUTED}">₹ IN PERSPECTIVE</text>
    <text x="40" y="95" font-family="${FONT}" font-size="28" font-weight="700" fill="${TEXT_PRIMARY}">₹9.6 Lakh Crore</text>
    <text x="40" y="135" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">Annual interest burden on the budget</text>
    <text x="40" y="170" font-family="${FONT}" font-size="20" fill="${ROSE}">↑ 15% YoY increase</text>
  </g>

  ${footer()}
</svg>`);

// ── SLIDE 3: ₹21 — States' share ──
slides.push(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect x="0" y="0" width="${W}" height="${H}" fill="${BG}"/>
  <defs>
    <linearGradient id="g3" x1="0" y1="0" x2="0" y2="${H}">
      <stop offset="0%" stop-color="${BLUE}15"/>
      <stop offset="100%" stop-color="${BLUE}00"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#g3)"/>
  ${header(3)}

  <text x="200" y="400" font-family="${FONT}" font-size="220" font-weight="900" fill="${BLUE}">₹21</text>
  <text x="440" y="340" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">out of every ₹100</text>
  <text x="440" y="390" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">goes to states</text>

  <text x="200" y="550" font-family="${FONT}" font-size="56" font-weight="800" fill="${TEXT_PRIMARY}">States' Share</text>
  <text x="200" y="610" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_MUTED}">Automatically transferred — no questions asked</text>
  <line x1="200" y1="650" x2="600" y2="650" stroke="${BLUE}" stroke-width="3"/>

  <!-- Bar -->
  <g transform="translate(200, 780)">
    <rect x="0" y="40" width="3000" height="60" rx="6" fill="#1E293B"/>
    <rect x="0" y="40" width="630" height="60" rx="6" fill="${BLUE}"/>
    <text x="20" y="78" font-family="${FONT}" font-size="24" font-weight="700" fill="${TEXT_PRIMARY}">₹21 — STATES' SHARE</text>
    <rect x="630" y="40" width="2370" height="60" rx="6" fill="#1E293B" opacity="0.5"/>
  </g>

  <!-- State map placeholder -->
  <g transform="translate(${W / 2}, 1100)">
    <rect x="-480" y="-120" width="960" height="240" rx="16" fill="${CARD}" stroke="${BLUE}" stroke-width="1" stroke-opacity="0.3"/>
    <text x="0" y="-60" font-family="${FONT}" font-size="24" font-weight="700" fill="${TEXT_SECONDARY}" text-anchor="middle">HOW THE DEVOLUTION WORKS</text>
    <text x="0" y="-10" font-family="${FONT}" font-size="20" fill="${TEXT_MUTED}" text-anchor="middle">Finance Commission determines the formula</text>
    <text x="0" y="40" font-family="${FONT}" font-size="20" fill="${TEXT_MUTED}" text-anchor="middle">Larger share goes to poorer states</text>
    <text x="0" y="90" font-family="${FONT}" font-size="20" fill="${TEXT_MUTED}" text-anchor="middle">UP, Bihar, MP, WB, Maharashtra top recipients</text>
  </g>

  ${footer()}
</svg>`);

// ── SLIDE 4: ₹8 — Defence ──
slides.push(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect x="0" y="0" width="${W}" height="${H}" fill="${BG}"/>
  <defs>
    <linearGradient id="g4" x1="0" y1="0" x2="0" y2="${H}">
      <stop offset="0%" stop-color="${GREEN}15"/>
      <stop offset="100%" stop-color="${GREEN}00"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#g4)"/>
  ${header(4)}

  <text x="200" y="400" font-family="${FONT}" font-size="220" font-weight="900" fill="${GREEN}">₹8</text>
  <text x="440" y="340" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">out of every ₹100</text>
  <text x="440" y="390" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">for defence and military</text>

  <text x="200" y="550" font-family="${FONT}" font-size="56" font-weight="800" fill="${TEXT_PRIMARY}">Defence &amp; Military</text>
  <text x="200" y="610" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_MUTED}">Second largest allocation after interest payments</text>
  <line x1="200" y1="650" x2="600" y2="650" stroke="${GREEN}" stroke-width="3"/>

  <!-- Bar -->
  <g transform="translate(200, 780)">
    <rect x="0" y="40" width="3000" height="60" rx="6" fill="#1E293B"/>
    <rect x="0" y="40" width="240" height="60" rx="6" fill="${GREEN}"/>
    <text x="20" y="78" font-family="${FONT}" font-size="24" font-weight="700" fill="${TEXT_PRIMARY}">₹8 — DEFENCE</text>
    <rect x="240" y="40" width="2760" height="60" rx="6" fill="#1E293B" opacity="0.5"/>
  </g>

  <g transform="translate(200, 980)">
    <rect x="0" y="0" width="1100" height="200" rx="12" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <text x="40" y="45" font-family="${FONT}" font-size="22" font-weight="700" fill="${GREEN}">BREAKDOWN</text>
    <text x="40" y="90" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">• Revenue expenditure: ₹3.2L Cr (salaries, ops)</text>
    <text x="40" y="125" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">• Capital expenditure: ₹1.6L Cr (new equipment)</text>
    <text x="40" y="160" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">• Modernisation & border infrastructure</text>
  </g>

  <g transform="translate(1460, 980)">
    <rect x="0" y="0" width="1100" height="200" rx="12" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <text x="40" y="45" font-family="${FONT}" font-size="22" font-weight="700" fill="${TEXT_MUTED}">GLOBAL CONTEXT</text>
    <text x="40" y="95" font-family="${FONT}" font-size="28" font-weight="700" fill="${TEXT_PRIMARY}">2% of GDP</text>
    <text x="40" y="135" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">India's defence spend as % of GDP</text>
    <text x="40" y="170" font-family="${FONT}" font-size="20" fill="${TEXT_MUTED}">China: 1.7% · USA: 3.5% · Russia: 4.1%</text>
  </g>
  ${footer()}
</svg>`);

// ── SLIDE 5: ₹9 — Subsidies ──
slides.push(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect x="0" y="0" width="${W}" height="${H}" fill="${BG}"/>
  <defs>
    <linearGradient id="g5" x1="0" y1="0" x2="0" y2="${H}">
      <stop offset="0%" stop-color="${PURPLE}15"/>
      <stop offset="100%" stop-color="${PURPLE}00"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#g5)"/>
  ${header(5)}

  <text x="200" y="400" font-family="${FONT}" font-size="220" font-weight="900" fill="${PURPLE}">₹9</text>
  <text x="440" y="340" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">out of every ₹100</text>
  <text x="440" y="390" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">for subsidies</text>

  <text x="200" y="550" font-family="${FONT}" font-size="56" font-weight="800" fill="${TEXT_PRIMARY}">Subsidies</text>
  <text x="200" y="610" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_MUTED}">Food, fuel, and fertiliser — anti-poverty support</text>
  <line x1="200" y1="650" x2="600" y2="650" stroke="${PURPLE}" stroke-width="3"/>

  <g transform="translate(200, 780)">
    <rect x="0" y="40" width="3000" height="60" rx="6" fill="#1E293B"/>
    <rect x="0" y="40" width="270" height="60" rx="6" fill="${PURPLE}"/>
    <text x="20" y="78" font-family="${FONT}" font-size="24" font-weight="700" fill="${TEXT_PRIMARY}">₹9 — SUBSIDIES</text>
    <rect x="270" y="40" width="2730" height="60" rx="6" fill="#1E293B" opacity="0.5"/>
  </g>

  <!-- Subsidy breakdown bars -->
  <g transform="translate(200, 1000)">
    <text x="0" y="30" font-family="${FONT}" font-size="22" font-weight="700" fill="${TEXT_SECONDARY}">SUBSIDY BREAKDOWN</text>
    <rect x="0" y="60" width="1800" height="50" rx="4" fill="#1E293B"/>
    <rect x="0" y="60" width="800" height="50" rx="4" fill="${ACCENT}" opacity="0.8"/>
    <text x="20" y="92" font-family="${FONT}" font-size="20" fill="${TEXT_PRIMARY}">Food (₹2.7L Cr)</text>

    <rect x="0" y="130" width="1800" height="50" rx="4" fill="#1E293B"/>
    <rect x="0" y="130" width="550" height="50" rx="4" fill="${ACCENT}" opacity="0.6"/>
    <text x="20" y="162" font-family="${FONT}" font-size="20" fill="${TEXT_PRIMARY}">Fertiliser (₹1.9L Cr)</text>

    <rect x="0" y="200" width="1800" height="50" rx="4" fill="#1E293B"/>
    <rect x="0" y="200" width="350" height="50" rx="4" fill="${ACCENT}" opacity="0.4"/>
    <text x="20" y="232" font-family="${FONT}" font-size="20" fill="${TEXT_PRIMARY}">Fuel/Petroleum (₹1.2L Cr)</text>
  </g>

  <g transform="translate(2200, 1000)">
    <rect x="0" y="0" width="1100" height="200" rx="12" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <text x="40" y="45" font-family="${FONT}" font-size="22" font-weight="700" fill="${ROSE}">CONCERN</text>
    <text x="40" y="90" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">Subsidies are poorly targeted — only 40%</text>
    <text x="40" y="125" font-family="${FONT}" font-size="20" fill="${TEXT_SECONDARY}">of food subsidy reaches the intended poor.</text>
    <text x="40" y="160" font-family="${FONT}" font-size="20" fill="${TEXT_MUTED}">Source: Economic Survey 2025-26</text>
  </g>
  ${footer()}
</svg>`);

// ── SLIDE 6: ₹5 — Pensions ──
slides.push(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect x="0" y="0" width="${W}" height="${H}" fill="${BG}"/>
  <defs>
    <linearGradient id="g6" x1="0" y1="0" x2="0" y2="${H}">
      <stop offset="0%" stop-color="${TEAL}15"/>
      <stop offset="100%" stop-color="${TEAL}00"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#g6)"/>
  ${header(6)}

  <text x="200" y="400" font-family="${FONT}" font-size="220" font-weight="900" fill="${TEAL}">₹5</text>
  <text x="440" y="340" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">out of every ₹100</text>
  <text x="440" y="390" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">for pensions</text>

  <text x="200" y="550" font-family="${FONT}" font-size="56" font-weight="800" fill="${TEXT_PRIMARY}">Pensions</text>
  <text x="200" y="610" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_MUTED}">Government employee retirement benefits</text>
  <line x1="200" y1="650" x2="600" y2="650" stroke="${TEAL}" stroke-width="3"/>

  <g transform="translate(200, 780)">
    <rect x="0" y="40" width="3000" height="60" rx="6" fill="#1E293B"/>
    <rect x="0" y="40" width="150" height="60" rx="6" fill="${TEAL}"/>
    <text x="20" y="78" font-family="${FONT}" font-size="24" font-weight="700" fill="${TEXT_PRIMARY}">₹5 — PENSIONS</text>
    <rect x="150" y="40" width="2850" height="60" rx="6" fill="#1E293B" opacity="0.5"/>
  </g>

  <g transform="translate(200, 1000)">
    <rect x="0" y="0" width="1600" height="300" rx="12" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <text x="40" y="40" font-family="${FONT}" font-size="22" font-weight="700" fill="${TEAL}">PENSION LIABILITY GROWTH</text>
    <!-- Simple line chart representation -->
    <polyline points="60,220 200,200 400,180 600,150 800,120 1000,80 1200,50 1400,30"
      fill="none" stroke="${TEAL}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="60" cy="220" r="6" fill="${TEAL}"/><text x="50" y="248" font-family="${FONT}" font-size="16" fill="${TEXT_MUTED}" text-anchor="middle">2016</text>
    <circle cx="400" cy="180" r="6" fill="${TEAL}"/><text x="400" y="248" font-family="${FONT}" font-size="16" fill="${TEXT_MUTED}" text-anchor="middle">2020</text>
    <circle cx="800" cy="120" r="6" fill="${TEAL}"/><text x="800" y="248" font-family="${FONT}" font-size="16" fill="${TEXT_MUTED}" text-anchor="middle">2023</text>
    <circle cx="1400" cy="30" r="6" fill="${TEAL}"/><text x="1400" y="248" font-family="${FONT}" font-size="16" fill="${TEXT_MUTED}" text-anchor="middle">2026</text>
  </g>

  <g transform="translate(2000, 1000)">
    <rect x="0" y="0" width="1100" height="300" rx="12" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <text x="40" y="40" font-family="${FONT}" font-size="22" font-weight="700" fill="${TEXT_MUTED}">KEY INSIGHT</text>
    <text x="40" y="95" font-family="${FONT}" font-size="22" fill="${TEXT_SECONDARY}">Pension costs have nearly</text>
    <text x="40" y="135" font-family="${FONT}" font-size="48" font-weight="900" fill="${ROSE}">tripled</text>
    <text x="40" y="180" font-family="${FONT}" font-size="22" fill="${TEXT_SECONDARY}">in the last decade.</text>
    <text x="40" y="225" font-family="${FONT}" font-size="20" fill="${TEXT_MUTED}">Old pension scheme (OPS) vs NPS debate ongoing</text>
    <text x="40" y="260" font-family="${FONT}" font-size="20" fill="${TEXT_MUTED}">Unfunded liability estimated at ₹36L Cr+</text>
  </g>
  ${footer()}
</svg>`);

// ── SLIDE 7: ₹22 — Capital Expenditure ──
slides.push(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect x="0" y="0" width="${W}" height="${H}" fill="${BG}"/>
  <defs>
    <linearGradient id="g7" x1="0" y1="0" x2="0" y2="${H}">
      <stop offset="0%" stop-color="${GREEN}15"/>
      <stop offset="100%" stop-color="${GREEN}00"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#g7)"/>
  ${header(7)}

  <text x="200" y="400" font-family="${FONT}" font-size="220" font-weight="900" fill="${GREEN}">₹22</text>
  <text x="440" y="340" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">out of every ₹100</text>
  <text x="440" y="390" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">for capital expenditure</text>

  <text x="200" y="550" font-family="${FONT}" font-size="56" font-weight="800" fill="${TEXT_PRIMARY}">Capital Expenditure</text>
  <text x="200" y="610" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_MUTED}">Roads, bridges, railways, ports — your infrastructure</text>
  <line x1="200" y1="650" x2="600" y2="650" stroke="${GREEN}" stroke-width="3"/>

  <g transform="translate(200, 780)">
    <rect x="0" y="40" width="3000" height="60" rx="6" fill="#1E293B"/>
    <rect x="0" y="40" width="660" height="60" rx="6" fill="${GREEN}"/>
    <text x="20" y="78" font-family="${FONT}" font-size="24" font-weight="700" fill="${BG}">₹22 — CAPEX</text>
    <rect x="660" y="40" width="2340" height="60" rx="6" fill="#1E293B" opacity="0.5"/>
  </g>

  <!-- Infrastructure icons and breakdown -->
  <g transform="translate(200, 1000)">
    <rect x="0" y="0" width="340" height="200" rx="12" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <text x="170" y="60" font-family="${FONT}" font-size="40" fill="${GREEN}" text-anchor="middle">🛣️</text>
    <text x="170" y="110" font-family="${FONT}" font-size="24" font-weight="700" fill="${TEXT_PRIMARY}" text-anchor="middle">Roads</text>
    <text x="170" y="145" font-family="${FONT}" font-size="20" fill="${TEXT_MUTED}" text-anchor="middle">National Highways</text>
    <text x="170" y="175" font-family="${FONT}" font-size="18" fill="${GREEN}" text-anchor="middle">₹2.7L Cr</text>
  </g>
  <g transform="translate(580, 1000)">
    <rect x="0" y="0" width="340" height="200" rx="12" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <text x="170" y="60" font-family="${FONT}" font-size="40" fill="${GREEN}" text-anchor="middle">🚂</text>
    <text x="170" y="110" font-family="${FONT}" font-size="24" font-weight="700" fill="${TEXT_PRIMARY}" text-anchor="middle">Railways</text>
    <text x="170" y="145" font-family="${FONT}" font-size="20" fill="${TEXT_MUTED}" text-anchor="middle">Track & Station Modernisation</text>
    <text x="170" y="175" font-family="${FONT}" font-size="18" fill="${GREEN}" text-anchor="middle">₹2.6L Cr</text>
  </g>
  <g transform="translate(960, 1000)">
    <rect x="0" y="0" width="340" height="200" rx="12" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <text x="170" y="60" font-family="${FONT}" font-size="40" fill="${GREEN}" text-anchor="middle">🏗️</text>
    <text x="170" y="110" font-family="${FONT}" font-size="24" font-weight="700" fill="${TEXT_PRIMARY}" text-anchor="middle">Defence Infra</text>
    <text x="170" y="145" font-family="${FONT}" font-size="20" fill="${TEXT_MUTED}" text-anchor="middle">Border & Strategic Projects</text>
    <text x="170" y="175" font-family="${FONT}" font-size="18" fill="${GREEN}" text-anchor="middle">₹1.6L Cr</text>
  </g>
  <g transform="translate(1340, 1000)">
    <rect x="0" y="0" width="340" height="200" rx="12" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <text x="170" y="60" font-family="${FONT}" font-size="40" fill="${GREEN}" text-anchor="middle">🏭</text>
    <text x="170" y="110" font-family="${FONT}" font-size="24" font-weight="700" fill="${TEXT_PRIMARY}" text-anchor="middle">Urban Infra</text>
    <text x="170" y="145" font-family="${FONT}" font-size="20" fill="${TEXT_MUTED}" text-anchor="middle">Smart Cities, Water, Power</text>
    <text x="170" y="175" font-family="${FONT}" font-size="18" fill="${GREEN}" text-anchor="middle">₹1.8L Cr</text>
  </g>

  <!-- Progress bar for capex target -->
  <g transform="translate(200, 1300)">
    <text x="0" y="30" font-family="${FONT}" font-size="22" font-weight="700" fill="${TEXT_SECONDARY}">CAPEX TARGET PROGRESS</text>
    <text x="3000" y="30" font-family="${FONT}" font-size="22" font-weight="700" fill="${GREEN}" text-anchor="end">₹11.1L Cr Budgeted</text>
    <rect x="0" y="55" width="3000" height="40" rx="4" fill="#1E293B"/>
    <rect x="0" y="55" width="2100" height="40" rx="4" fill="${GREEN}" opacity="0.7"/>
    <text x="1500" y="82" font-family="${FONT}" font-size="20" font-weight="700" fill="${BG}" text-anchor="middle">70% Utilisation Rate</text>
  </g>
  ${footer()}
</svg>`);

// ── SLIDE 8: ₹4 — Social Sector ──
slides.push(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect x="0" y="0" width="${W}" height="${H}" fill="${BG}"/>
  <defs>
    <linearGradient id="g8" x1="0" y1="0" x2="0" y2="${H}">
      <stop offset="0%" stop-color="${ROSE}15"/>
      <stop offset="100%" stop-color="${ROSE}00"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#g8)"/>
  ${header(8)}

  <text x="200" y="400" font-family="${FONT}" font-size="220" font-weight="900" fill="${ROSE}">₹4</text>
  <text x="440" y="340" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">out of every ₹100</text>
  <text x="440" y="390" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">for social welfare</text>

  <text x="200" y="550" font-family="${FONT}" font-size="56" font-weight="800" fill="${TEXT_PRIMARY}">Social Sector</text>
  <text x="200" y="610" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_MUTED}">Health, education, housing — lowest in 12 years</text>
  <line x1="200" y1="650" x2="600" y2="650" stroke="${ROSE}" stroke-width="3"/>

  <g transform="translate(200, 780)">
    <rect x="0" y="40" width="3000" height="60" rx="6" fill="#1E293B"/>
    <rect x="0" y="40" width="120" height="60" rx="6" fill="${ROSE}"/>
    <text x="20" y="78" font-family="${FONT}" font-size="24" font-weight="700" fill="${TEXT_PRIMARY}">₹4 — SOCIAL SECTOR</text>
    <rect x="120" y="40" width="2880" height="60" rx="6" fill="#1E293B" opacity="0.5"/>
  </g>

  <!-- Historical comparison -->
  <g transform="translate(200, 1000)">
    <rect x="0" y="0" width="1600" height="300" rx="12" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <text x="40" y="40" font-family="${FONT}" font-size="22" font-weight="700" fill="${ROSE}">SOCIAL SPENDING AS % OF GDP</text>

    <!-- Dots and lines for historical data -->
    <text x="200" y="120" font-family="${FONT}" font-size="28" font-weight="700" fill="${TEXT_SECONDARY}" text-anchor="middle">1.8%</text>
    <text x="200" y="145" font-family="${FONT}" font-size="16" fill="${TEXT_MUTED}" text-anchor="middle">2014-15</text>

    <text x="600" y="100" font-family="${FONT}" font-size="28" font-weight="700" fill="${TEXT_SECONDARY}" text-anchor="middle">1.9%</text>
    <text x="600" y="125" font-family="${FONT}" font-size="16" fill="${TEXT_MUTED}" text-anchor="middle">2018-19</text>

    <text x="1000" y="80" font-family="${FONT}" font-size="28" font-weight="700" fill="${TEXT_SECONDARY}" text-anchor="middle">2.1%</text>
    <text x="1000" y="105" font-family="${FONT}" font-size="16" fill="${TEXT_MUTED}" text-anchor="middle">2021-22</text>

    <text x="1400" y="140" font-family="${FONT}" font-size="28" font-weight="700" fill="${ROSE}" text-anchor="middle">1.2%</text>
    <text x="1400" y="165" font-family="${FONT}" font-size="16" fill="${ROSE}" text-anchor="middle">2025-26</text>

    <polyline points="200,118 600,98 1000,78 1400,138"
      fill="none" stroke="${ROSE}" stroke-width="3" stroke-dasharray="8 4" opacity="0.6"/>
  </g>

  <g transform="translate(2000, 1000)">
    <rect x="0" y="0" width="1100" height="300" rx="12" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <text x="40" y="40" font-family="${FONT}" font-size="22" font-weight="700" fill="${ROSE}">CRITICAL ALERT</text>
    <text x="40" y="95" font-family="${FONT}" font-size="22" fill="${TEXT_SECONDARY}">Social sector spending is at its</text>
    <text x="40" y="135" font-family="${FONT}" font-size="48" font-weight="900" fill="${ROSE}">lowest</text>
    <text x="40" y="180" font-family="${FONT}" font-size="22" fill="${TEXT_SECONDARY}">level in 12 years.</text>
    <text x="40" y="225" font-family="${FONT}" font-size="20" fill="${TEXT_MUTED}">Health: 0.3% of GDP → well below BRICS avg</text>
    <text x="40" y="260" font-family="${FONT}" font-size="20" fill="${TEXT_MUTED}">Education: 0.5% of GDP → 6% target unmet</text>
  </g>
  ${footer()}
</svg>`);

// ── SLIDE 9: ₹12 — Other ──
slides.push(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect x="0" y="0" width="${W}" height="${H}" fill="${BG}"/>
  <defs>
    <linearGradient id="g9" x1="0" y1="0" x2="0" y2="${H}">
      <stop offset="0%" stop-color="${TEXT_MUTED}15"/>
      <stop offset="100%" stop-color="${TEXT_MUTED}00"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#g9)"/>
  ${header(9)}

  <text x="200" y="400" font-family="${FONT}" font-size="220" font-weight="900" fill="${TEXT_SECONDARY}">₹12</text>
  <text x="440" y="340" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">out of every ₹100</text>
  <text x="440" y="390" font-family="${FONT}" font-size="32" font-weight="400" fill="${TEXT_SECONDARY}">for other expenditure</text>

  <text x="200" y="550" font-family="${FONT}" font-size="56" font-weight="800" fill="${TEXT_PRIMARY}">Other Expenditure</text>
  <text x="200" y="610" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_MUTED}">Administration, police, judiciary, & miscellaneous</text>
  <line x1="200" y1="650" x2="600" y2="650" stroke="${TEXT_MUTED}" stroke-width="3"/>

  <g transform="translate(200, 780)">
    <rect x="0" y="40" width="3000" height="60" rx="6" fill="#1E293B"/>
    <rect x="0" y="40" width="360" height="60" rx="6" fill="${TEXT_MUTED}" opacity="0.7"/>
    <text x="20" y="78" font-family="${FONT}" font-size="24" font-weight="700" fill="${TEXT_PRIMARY}">₹12 — OTHER</text>
    <rect x="360" y="40" width="2640" height="60" rx="6" fill="#1E293B" opacity="0.5"/>
  </g>

  <!-- Sub-categories -->
  <g transform="translate(200, 1000)">
    <text x="0" y="30" font-family="${FONT}" font-size="22" font-weight="700" fill="${TEXT_SECONDARY}">SUB-CATEGORIES</text>
    <rect x="0" y="60" width="3000" height="50" rx="4" fill="#1E293B"/>
    <rect x="0" y="60" width="900" height="50" rx="4" fill="${TEXT_MUTED}" opacity="0.5"/>
    <text x="20" y="92" font-family="${FONT}" font-size="20" fill="${TEXT_PRIMARY}">Police & Internal Security</text>
    <text x="2900" y="92" font-family="${FONT}" font-size="20" font-weight="700" fill="${TEXT_PRIMARY}" text-anchor="end">₹1.6L Cr</text>

    <rect x="0" y="125" width="3000" height="50" rx="4" fill="#1E293B"/>
    <rect x="0" y="125" width="700" height="50" rx="4" fill="${TEXT_MUTED}" opacity="0.4"/>
    <text x="20" y="157" font-family="${FONT}" font-size="20" fill="${TEXT_PRIMARY}">Judiciary</text>
    <text x="2900" y="157" font-family="${FONT}" font-size="20" font-weight="700" fill="${TEXT_PRIMARY}" text-anchor="end">₹0.3L Cr</text>

    <rect x="0" y="190" width="3000" height="50" rx="4" fill="#1E293B"/>
    <rect x="0" y="190" width="1100" height="50" rx="4" fill="${TEXT_MUTED}" opacity="0.3"/>
    <text x="20" y="222" font-family="${FONT}" font-size="20" fill="${TEXT_PRIMARY}">General Administration & Transfers</text>
    <text x="2900" y="222" font-family="${FONT}" font-size="20" font-weight="700" fill="${TEXT_PRIMARY}" text-anchor="end">₹3.8L Cr</text>

    <rect x="0" y="255" width="3000" height="50" rx="4" fill="#1E293B"/>
    <rect x="0" y="255" width="500" height="50" rx="4" fill="${TEXT_MUTED}" opacity="0.2"/>
    <text x="20" y="287" font-family="${FONT}" font-size="20" fill="${TEXT_PRIMARY}">Miscellaneous</text>
    <text x="2900" y="287" font-family="${FONT}" font-size="20" font-weight="700" fill="${TEXT_PRIMARY}" text-anchor="end">₹1.0L Cr</text>
  </g>
  ${footer()}
</svg>`);

// ── SLIDE 10: CLOSING ──
slides.push(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g10" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1120"/>
      <stop offset="50%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#0B1120"/>
    </linearGradient>
    <radialGradient id="glow10" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${ACCENT}15"/>
      <stop offset="100%" stop-color="${ACCENT}00"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g10)"/>
  <rect width="${W}" height="${H}" fill="url(#glow10)"/>
  ${header(10, 'SUMMARY')}

  <!-- Big reveal -->
  <text x="${W / 2}" y="400" font-family="${FONT}" font-size="160" font-weight="900" fill="${TEXT_PRIMARY}" text-anchor="middle">₹100</text>
  <text x="${W / 2}" y="490" font-family="${FONT}" font-size="48" font-weight="400" fill="${TEXT_SECONDARY}" text-anchor="middle" letter-spacing="6">SPENT.</text>

  <!-- Key takeaways -->
  <g transform="translate(${W / 2 - 700}, 650)">
    <!-- Fact 1: Social welfare -->
    <rect x="0" y="0" width="1400" height="80" rx="8" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <rect x="0" y="0" width="8" height="80" rx="4" fill="${ROSE}"/>
    <text x="30" y="48" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_SECONDARY}">Only</text>
    <text x="100" y="48" font-family="${FONT}" font-size="28" font-weight="900" fill="${ROSE}">₹4</text>
    <text x="145" y="48" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_SECONDARY}">reaches social welfare (health, education, housing)</text>

    <!-- Fact 2: Infrastructure -->
    <rect x="0" y="100" width="1400" height="80" rx="8" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <rect x="0" y="100" width="8" height="80" rx="4" fill="${GREEN}"/>
    <text x="30" y="148" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_SECONDARY}">Only</text>
    <text x="100" y="148" font-family="${FONT}" font-size="28" font-weight="900" fill="${GREEN}">₹22</text>
    <text x="155" y="148" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_SECONDARY}">builds infrastructure — roads, railways, ports</text>

    <!-- Fact 3: Delays -->
    <rect x="0" y="200" width="1400" height="80" rx="8" fill="${CARD}" stroke="#1E293B" stroke-width="1"/>
    <rect x="0" y="200" width="8" height="80" rx="4" fill="${ACCENT}"/>
    <text x="30" y="248" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_SECONDARY}"></text>
    <text x="30" y="248" font-family="${FONT}" font-size="28" font-weight="900" fill="${ACCENT}">1,981</text>
    <text x="200" y="248" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_SECONDARY}">projects delayed ·</text>
    <text x="570" y="248" font-family="${FONT}" font-size="28" font-weight="900" fill="${ACCENT}">₹5.66L Cr</text>
    <text x="860" y="248" font-family="${FONT}" font-size="28" font-weight="400" fill="${TEXT_SECONDARY}">over budget</text>
  </g>

  <!-- Closing question -->
  <rect x="${W / 2 - 500}" y="1000" width="1000" height="80" rx="40" fill="${ACCENT}" opacity="0.1" stroke="${ACCENT}" stroke-width="1"/>
  <text x="${W / 2}" y="1055" font-family="${FONT}" font-size="32" font-weight="700" fill="${ACCENT}" text-anchor="middle">Is your tax money working hard enough?</text>

  <!-- Call to action buttons -->
  <g transform="translate(${W / 2 - 600}, 1200)">
    <rect x="0" y="0" width="380" height="60" rx="30" fill="${ACCENT}"/>
    <text x="190" y="38" font-family="${FONT}" font-size="20" font-weight="700" fill="${BG}" text-anchor="middle">Swipe up for full breakdown</text>

    <rect x="420" y="0" width="380" height="60" rx="30" fill="#1E293B" stroke="${ACCENT}" stroke-width="1"/>
    <text x="610" y="38" font-family="${FONT}" font-size="20" font-weight="700" fill="${ACCENT}" text-anchor="middle">Save to understand Budget 2026</text>

    <rect x="840" y="0" width="380" height="60" rx="30" fill="#1E293B" stroke="${ACCENT}" stroke-width="1"/>
    <text x="1030" y="38" font-family="${FONT}" font-size="20" font-weight="700" fill="${ACCENT}" text-anchor="middle">Share for taxpayer transparency</text>
  </g>

  <!-- Hashtags -->
  <text x="${W / 2}" y="1450" font-family="${FONT}" font-size="22" font-weight="400" fill="${TEXT_MUTED}" text-anchor="middle" letter-spacing="1">#TaxReform  #India  #WhereYourMoneyGoes  #Budget2026  #PublicFinance</text>

  ${footer()}
</svg>`);

// ── WRITE FILES ──
const outDir = path.join(__dirname, 'tax-infographic');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const titles = [
  '01-cover',
  '02-interest',
  '03-states-share',
  '04-defence',
  '05-subsidies',
  '06-pensions',
  '07-capex',
  '08-social-sector',
  '09-other',
  '10-closing'
];

slides.forEach((svg, i) => {
  const filePath = path.join(outDir, `${titles[i]}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✓ Created: ${titles[i]}.svg`);
});

console.log(`\n✅ All ${slides.length} slides generated in: ${outDir}`);
