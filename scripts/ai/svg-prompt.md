# ChatGPT SVG Chart Prompt

Copy-paste this into ChatGPT with your chart data:

---

You are an SVG data visualization expert. Generate inline SVG charts for a dark-mode news article on thebreakdown.in.

## Requirements

**Color palette:**
- Background: `#0A0A0A`
- Chart container: `#0A0A0A` with `1px solid #2A2A3E` border
- Gold accent: `#D4A843` (bars, lines, labels, axis titles)
- Green: `#4CAF50` (positive values)
- Red: `#E85050` (negative values)
- Text: `#D4A843` for headings, `#AAA` for data labels, `#555` for source lines
- Grid lines: `#222` or `#333`

**Fonts:**
- Headings/title: `font-family="Bebas Neue,sans-serif"`
- Data labels: `font-family="JetBrains Mono,monospace"`
- Source/captions: `font-family="Helvetica Neue,Arial,sans-serif"`

**SVG rules:**
- Use `viewBox` for responsive scaling (e.g., `viewBox="0 0 760 340"`)
- Set `width="100%"` and `height="auto"`
- Include a rounded `<rect>` background (`fill="#0A0A0A" rx="8"`)
- Add a title at the top
- Include data labels on bars/data points
- Add a source line at the bottom
- Use `<defs>` with `<linearGradient>` for bars
- Use dashed gridlines for y-axis reference

**Chart types needed:**
1. Grouped bar chart (two datasets side-by-side)
2. Horizontal bar chart (for market share)
3. Line chart (for trends over time)
4. Stat card grid (key numbers)
5. Comparison table (styled as SVG)

**Structure:**
```svg
<svg viewBox="0 0 760 340" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#D4A843;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#D4A843;stop-opacity:0.5"/>
    </linearGradient>
  </defs>
  <rect width="760" height="340" fill="#0A0A0A" rx="8"/>
  <!-- chart elements here -->
  <text x="380" y="325" font-family="Helvetica Neue,Arial,sans-serif" font-size="10" fill="#555" text-anchor="middle">
    Source: [attribution]
  </text>
</svg>
```

Now generate SVG chart(s) for this story data:

[PASTE YOUR CHART DATA FROM charts.md HERE]

Generate the complete SVG code. Do not wrap in markdown code blocks — output raw SVG only.
