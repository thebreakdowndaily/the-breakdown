# Chart Specifications — India's Monsoon Crisis 2026

> Technical specifications for all data visualizations. Each chart is designed to answer one question.

---

## CHART 1: 126-Year June Rainfall Timeline

**Type:** Vertical bar chart
**File:** `chart-126yr-rainfall.png`
**Data source:** IMD historical records (1901-2026)

### Data Series
| Year | Rainfall (mm) |
|------|---------------|
| 1901 | varies |
| ... | ... |
| 1905 | 92.3 |
| ... | ... |
| 2009 | 87.5 |
| ... | ... |
| 2026 | 92.1 |

### Specifications
- **Layout:** 1600×800px, dark theme (#0A0A0A)
- **Bars:** 126 bars, width 8px, gap 4px
- **2026 bar color:** #D4A843 (gold) with glow effect
- **2009 bar color:** #8B4513 (dark orange)
- **1905 bar color:** #8B4513 (dark orange)
- **Other bars:** #2A2A2A (default), #1A1A1A (below LPA)
- **Reference line:** #FFFFFF at 165mm (LPA), 50% opacity, dashed
- **Y-axis:** 0-250mm, gridlines at 50mm intervals, 30% opacity
- **X-axis:** No year labels (too many) — decade markers every 10 years
- **Annotations:** "3rd Driest" callout at 2026 bar; "Lowest: 2009 (87.5mm)" at 2009 bar
- **Title:** "June Rainfall in India: 126 Years of Data"
- **Subtitle:** "2026 ranks as the third-driest June since records began in 1901"
- **Source line:** "Source: India Meteorological Department"

### Tools
- D3.js (interactive SVG) or Highcharts
- Responsive: fluid width, maintain aspect ratio

---

## CHART 2: State-Wise Rainfall Deficit Heatmap

**Type:** Choropleth map of India
**File:** `chart-state-deficit.png`
**Data source:** IMD district rainfall bulletin (36 subdivisions, Jun 4-22, 2026)

### Data (Selected States)
| State/Subdivision | Deficit (%) |
|------------------|-------------|
| Maharashtra (Konkan) | -61 |
| Maharashtra (Madhya) | -68 |
| Maharashtra (Marathwada) | -64 |
| Gujarat | -84 |
| Madhya Pradesh | -58 |
| Chhattisgarh | -71 |
| Jharkhand | -71 |
| Odisha | -47 |
| Assam & Meghalaya | -48 |
| Telangana | -32 |
| Kerala | -31 |
| Coastal Karnataka | -47 |
| Rajasthan (West) | +8 |
| Rajasthan (East) | +29 |

### Specifications
- **Layout:** 1200×1000px (India map aspect)
- **Background:** #0A0A0A
- **Color scale:** 5-step diverging
  - Severe deficit (-85% to -50%): #8B0000 to #DC143C
  - Moderate deficit (-49% to -20%): #FF6347 to #FFA07A
  - Near normal (-19% to +5%): #F5DEB3
  - Surplus (+6% to +30%): #90EE90 to #006400
- **State borders:** #FFFFFF at 30% opacity, 1px
- **Labels:** State abbreviations in white, Inter font, 11px
- **Legend:** Horizontal color bar with percentage ranges
- **Title:** "Where Did the Rain Fail?"
- **Subtitle:** "Rainfall deficit by state/subdivision, June 4–22, 2026"
- **Source:** "Source: IMD District Rainfall Bulletin"

### Tools
- India topojson for state boundaries
- D3.js or Python (geopandas + matplotlib) for rendering
- Interactive: tooltip on hover showing state name and exact deficit

---

## CHART 3: Kharif Sowing Decline

**Type:** Grouped horizontal bar chart (with optional waterfall variant)
**File:** `chart-kharif-sowing.png`
**Data source:** Ministry of Agriculture (as of Jun 25, 2026)

### Main Chart Data
| Crop | 2026 (lakh ha) | 2025 (lakh ha) | Change |
|------|---------------|---------------|--------|
| Oilseeds | 16.99 | 36.41 | -19.42 |
| Cotton | 29.66 | 45.36 | -15.70 |
| Rice | 25.75 | 34.40 | -8.65 |
| Pulses | (partial) | (partial) | -6.53 |
| Other crops | (partial) | (partial) | -3.44 |
| **Total** | **182.72** | **236.46** | **-53.74** |

### Specifications
- **Layout:** 1400×700px
- **Type:** Grouped horizontal bars (2026 in gold #D4A843, 2025 in grey #555555)
- **Percentage change labels:** Right-aligned, red (#FF4444) for negative
- **Title:** "Kharif Sowing at a 22.7% Deficit"
- **Subtitle:** "Area sown under summer crops as of June 25, 2026 (lakh hectares)"
- **Source:** "Source: Ministry of Agriculture"

### Bonus: Waterfall Chart (optional)
- Start bar: 236.46 (total 2025)
- Step-down bars: Oilseeds (-19.42), Cotton (-15.70), Rice (-8.65), Pulses (-6.53), Others (-3.44)
- End bar: 182.72 (total 2026)
- Connector lines in grey

---

## CHART 4: Reservoir Level Comparison

**Type:** Grouped vertical bar chart
**File:** `chart-reservoirs.png`
**Data source:** Central Water Commission (as of Jun 30, 2026)

### Data
| Region | 2026 Live Storage (%) | 2025 Live Storage (%) | 5-Year Avg (%) |
|--------|---------------------|---------------------|----------------|
| All-India (166) | 26.4 | 36.0 | 21.4 |
| Southern region | 20.8 | 44.7 | — |
| Karnataka | 14.7 | 48.6 | — |
| Tamil Nadu | 34.3 | 81.0 | — |
| Odisha | 15.3 | 22.4 | — |

### Specifications
- **Layout:** 1200×600px
- **Bars:** Grouped — 2026 in #D4A843 (gold), 2025 in #555555 (grey)
- **Y-axis:** 0-100%, gridlines at 20% intervals
- **Labels:** Region names below x-axis
- **Value labels:** On top of each bar
- **Title:** "India's Reservoirs Are Running Dry"
- **Subtitle:** "Live storage in major reservoirs — 2026 vs 2025"
- **Source:** "Source: Central Water Commission"

---

## CHART 5: El Niño Index Trajectory

**Type:** Line chart (historical + forecast)
**File:** `chart-el-nino.png`
**Data source:** NOAA, IMD

### Data
| Period | Nino 3.4 Anomaly (°C) | Status |
|--------|----------------------|--------|
| Jan 2025 | -0.2 | La Niña |
| Apr 2025 | 0.0 | Neutral |
| Jul 2025 | +0.1 | Neutral |
| Oct 2025 | +0.2 | Neutral |
| Jan 2026 | +0.3 | Neutral |
| Mar 2026 | +0.5 | Threshold |
| May 2026 | +0.8 | Transitioning |
| Jun 22, 2026 | +1.7 | El Niño |
| Jul-Sep 2026 (f/c) | +2.0 | Strong El Niño |

### Specifications
- **Layout:** 1400×500px
- **Line:** Thick (3px) in #D4A843 (historical), dashed in #FF4444 (forecast)
- **Threshold lines:**
  - +0.5°C: Yellow, dashed (El Niño threshold)
  - +1.5°C: Orange, dashed (Strong)
  - +2.0°C: Red, dashed (Very strong)
- **Fill:** Gradient below the line (gold to transparent)
- **X-axis:** Monthly ticks from Jan 2025 to Sep 2026
- **Y-axis:** -1.0°C to +2.5°C
- **Title:** "El Niño Is Strengthening"
- **Subtitle:** "Nino 3.4 sea surface temperature anomaly: Actual and forecast"
- **Source:** "Source: NOAA / IMD"

---

## CHART 6: Food Price Impact

**Type:** Dumbbell chart or comparison bar chart
**File:** `chart-food-prices.png`
**Data source:** Department of Consumer Affairs, ET Agriculture

### Data
| Commodity | Year Ago Price | Current Price | Change | Unit |
|-----------|---------------|--------------|--------|------|
| Tomato (retail) | 35.2 | 43.7 | +24% | ₹/kg |
| Tomato (wholesale, Delhi) | 1,625 | 2,700 | +66% | ₹/quintal |
| Potato | 25.5 | 21.99 | -14% | ₹/kg |
| Onion | 27.0 | 28.05 | +3.9% | ₹/kg |

### Specifications
- **Layout:** 1000×500px
- **Type:** Dumbbell chart (year ago dot vs current dot, connected by line)
- **Colors:** Year ago = grey (#666), Current = #D4A843 (gold)
- **Labels:** Percentage change, color-coded red (positive/inflation) or green (negative/deflation)
- **Title:** "Tomato Prices Lead Food Inflation"
- **Subtitle:** "Year-on-year change in select vegetable prices"
- **Source:** "Source: Department of Consumer Affairs"

---

## CHART 7: Scenario Projection (What's Next)

**Type:** Fan chart / confidence band chart
**File:** `chart-scenarios.png`
**Data source:** Analysis by THE BREAKDOWN editorial team

### Scenarios
| Period | Best Case | Most Likely | Worst Case |
|--------|-----------|-------------|------------|
| Jul rainfall (% of LPA) | 95% | 85% | 70% |
| Kharif sowing (vs normal) | -10% | -18% | -30% |
| Food inflation (Sep) | 4.5% | 6.5% | 8.5% |
| GDP growth FY27 | 6.8% | 6.3% | 5.8% |

### Specifications
- **Layout:** 1200×500px
- **Type:** Three lines (best/most likely/worst) with shading between
- **Colors:** Best = #4CAF50, Most Likely = #D4A843, Worst = #FF4444
- **X-axis:** Timeline from Jul 2026 to Mar 2027
- **Y-axis:** Varies by metric (use indexed scale)
- **Title:** "Three Paths Forward"
- **Subtitle:** "Scenarios for the Indian economy depending on monsoon recovery"
- **Source:** "Source: THE BREAKDOWN analysis"

---

## IMPLEMENTATION NOTES

### Interaction Design
- All charts should support hover tooltips showing exact values
- Charts 1 and 2 should support click-to-filter if time allows
- Charts should resize fluidly on mobile (responsive SVG)

### Color System
- Background: #0A0A0A
- Gold accent: #D4A843
- Red (deficit): #FF4444
- Green (surplus): #4CAF50
- Grey (comparison): #555555, #666666
- Text: #FFFFFF (primary), #AAAAAA (secondary), #888888 (source)

### Typography
- Chart titles: Bebas Neue, 28px, uppercase, letter-spacing: 2px
- Axis labels: Inter, 12px
- Data labels: Inter, 14px, bold
- Source: Inter, 10px

### File Naming Convention
```
chart-126yr-rainfall.png
chart-state-deficit.png
chart-kharif-sowing.png
chart-reservoirs.png
chart-el-nino.png
chart-food-prices.png
chart-scenarios.png
```

---

*Chart specifications v1.0 — THE BREAKDOWN Visual Team*
*All charts designed for dark theme (#0A0A0A) with gold (#D4A843) accent system*
