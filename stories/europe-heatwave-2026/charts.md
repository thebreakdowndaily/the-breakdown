# Chart Specifications — European Heatwave Crisis 2026

Five essential visualizations for the editorial story.

---

## Chart 1: Temperature Anomaly Map of Europe

**Type**: Choropleth heatmap (Europe, country-level or 0.25° grid)

**Data source**: Copernicus ERA5 reanalysis

**Specs**:
- Time period: June 18–30, 2026 (mean anomaly from 1991–2020 baseline)
- Variable: 2m air temperature anomaly (°C)
- Colour scale: Sequential diverging (white → yellow → orange → dark red)
- Range: 0°C to +14°C above baseline
- Overlay: Country borders, city labels for record-breaking locations (Pissos, Gosport, Berlin, Prague, Warsaw, Budapest)

**Annotations**:
- Label each country with its all-time record temperature (e.g., "France 44.3°C", "Germany 41.7°C")
- Add a text callout: "7 countries broke all-time national records"

**File**: charts/fig1-temperature-anomaly.png (1800×1200px, 300dpi)

---

## Chart 2: All-Time National Temperature Records — Horizontal Bar Chart

**Type**: Horizontal bar chart (sorted descending)

**Data**:
| Country | Record (°C) | Previous Record (°C) | Margin (°C) | Year of Previous Record |
|---|---|---|---|---|
| Hungary | 42.0 | 41.9 | +0.1 | 2007 |
| Czechia | 41.9 | 40.4 | +1.5 | 2012 |
| Germany | 41.7 | 41.2 | +0.5 | 2015 |
| Slovakia | 41.0 | 40.3 | +0.7 | 2013 |
| Poland | 40.5 | 40.2 | +0.3 | 1921 |
| Belarus | 40.4 | 38.9 | +1.5 | 2010 |
| Denmark | 37.0 | 36.4 | +0.6 | 1975 |
| France | 44.3 | — | — | (June record, not all-time) |

**Specs**:
- X-axis: Temperature (°C), range 36°C to 45°C
- Y-axis: Country (sorted descending by 2026 record)
- Bar colour: Gradient from orange (36°C) to dark red (45°C)
- Annotate each bar with the year of the previous record in grey

**Key design decisions**:
- Include France with a note that 44.3°C was the hottest day (not all-time record, which remains 46.0°C from July 2019)
- Mark Poland's 1921 bar with a special annotation: "105-year record"

**File**: charts/fig2-national-records.png (1600×900px, 300dpi)

---

## Chart 3: Heatwave Deaths — Comparative Bar Chart (2003, 2022, 2023, 2026)

**Type**: Grouped vertical bar chart

**Data**:
| Year | Deaths (Summer Total) | Deaths (June Only) | Countries Affected |
|---|---|---|---|
| 2003 | 72,000 | ~8,000 | 4–5 |
| 2022 | 60,000+ | ~6,500 | 15+ |
| 2023 | 47,000 | ~5,000 | 12+ |
| 2026 | TBD | 1,300+ (partial) | 29+ |

**Specs**:
- X-axis: Year (2003, 2022, 2023, 2026)
- Y-axis: Deaths (log scale recommended due to magnitude differences)
- Two bars per year: "Summer Total" (dark red) and "June only" (orange)
- 2026: Add hatched/partial fill pattern to indicate "ongoing count — toll expected to rise"
- Include error bars or range markers where available

**Annotations**:
- "2003: 72,000 died — prompted first heat health plans"
- "2026: 1,300+ in first 10 days; full summer toll expected to be significantly higher"
- Note on 2026: "Deaths in June 2026 cover only June 21–30; historical pattern suggests full summer toll could reach 47,000–60,000"

**Warning box**:
> "Comparing partial 2026 data to full-summer totals is misleading. This chart includes 2026 partial data to show the trajectory, not to suggest the event is less lethal."

**File**: charts/fig3-heatwave-deaths.png (1600×900px, 300dpi)

---

## Chart 4: Energy System Stress — Multi-panel Dashboard

**Type**: Three-panel time series (June 18–30)

**Panel A: Electricity prices**
- Data: Belgian day-ahead wholesale price (€/MWh), hourly
- Line chart, dark red line, 24-hour granularity
- Annotate the €1,000/MWh spike on June 24 with a callout
- Add horizontal reference line at €100/MWh (typical summer average)
- Y-axis: €/MWh (linear scale)

**Panel B: French nuclear output**
- Data: EDF daily nuclear output (GW), June 18–30
- Line chart, blue line, daily granularity
- Annotate Golfech shutdown date (June 24)
- Add a dashed line showing normal June output (historical average)
- Y-axis: GW (linear scale)

**Panel C: German residual load**
- Data: German residual load (GW), daily peaks, June 18–30
- Line chart, orange line
- Annotate the 51.5 GW peak and 10.4 GW above-normal deviation
- Add normal seasonal baseline as dashed line
- Y-axis: GW (linear scale)

**Layout**: 3-panel column (A top, B middle, C bottom), same x-axis range for all

**File**: charts/fig4-energy-stress.png (1800×1500px, 300dpi)

---

## Chart 5: Climate Attribution — Return Period Analysis

**Type**: Paired bar chart or "before/after" comparison (two climate scenarios)

**Data** (illustrative, based on WWA findings):
| Metric | 2026 Event (observed) | 1976 Climate (counterfactual) | 2003 Climate (counterfactual) |
|---|---|---|---|
| Peak temperature (France) | 44.3°C | ~40.8°C | ~42.3°C |
| Peak temperature (Germany) | 41.7°C | ~38.2°C | ~39.7°C |
| Nighttime extreme likelihood | 1 in 10 years | ~1 in 1,000 years | ~1 in 100 years |
| Daytime extreme likelihood | 1 in 50 years | ~1 in 500+ years | ~1 in 100 years |

**Panel A: Temperature comparison**
- Grouped bar chart: three bars per country (2026 observed, 1976 counterfactual, 2003 counterfactual)
- Colour code: 2026 = dark red, 1976 = light grey, 2003 = medium grey
- Annotate the difference in °C above each bar

**Panel B: Return period comparison**
- Horizontal bar chart showing return period (years, log scale)
- Three bars per metric (observed, 1976 climate, 2003 climate)
- X-axis: Return period (years, log scale from 1 to 10,000)

**Key annotation**:
> "A heatwave of this intensity would have been virtually impossible in the climate of 50 years ago. Climate change made it tens to hundreds of times more likely."
> — World Weather Attribution, June 26, 2026

**File**: charts/fig5-climate-attribution.png (1800×1400px, 300dpi)

---

## Production Notes

### Colour Palette
- Primary heat: #D62828 (dark red)
- Secondary heat: #F77F00 (orange)
- Warning: #FCBF49 (yellow/amber)
- Cold climate (1976 counterfactual): #C0C0C0 (light grey)
- Moderate climate (2003 counterfactual): #808080 (mid grey)
- Baseline/reference: #003049 (dark blue) for dashed lines
- Background: #F5F5F0 (off-white, editorial style)

### Typography
- Headings: 16pt, bold, sans-serif (matching The Breakdown editorial style)
- Axis labels: 11pt, regular, sans-serif
- Annotations: 10pt, italic, serif for source citations
- Number formatting: Use commas for thousands (1,300), one decimal for temperatures (44.3°C)

### Logo/Watermark
- The Breakdown logo — bottom right, 15% opacity, 60px wide

### Output Format
- All charts: PNG, 300dpi
- Also provide editable versions (.svg or .ai) for the design team

### Sources for Chart Data
- Temperature data: Copernicus ERA5, national meteorological services
- Death data: WHO, Public Health France, national health authorities
- Energy data: Montel News, AleaSoft, EDF, ENTSO-E transparency platform
- Attribution data: World Weather Attribution (WWW.weatherattribution.org)
- Reference comparisons: IPCC AR6, WMO State of the Climate reports
