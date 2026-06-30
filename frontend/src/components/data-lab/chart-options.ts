import type { EChartsOption } from 'echarts'

const saffron = '#FF9933'
const green = '#138808'
const blue = '#2563eb'
const red = '#dc2626'
const purple = '#7c3aed'
const teal = '#0d9488'
const orange = '#ea580c'

const brandColors = [saffron, green, blue, red, purple, teal, orange]

const commonGrid = {
  left: '3%',
  right: '4%',
  bottom: '3%',
  containLabel: true,
}

export const gdpLineChart: EChartsOption = {
  color: [saffron, blue, green],
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    textStyle: { fontSize: 12 },
    formatter: (params: any) => {
      if (!Array.isArray(params)) return ''
      let html = `<div style="font-weight:600;margin-bottom:4px;">${params[0].axisValue}</div>`
      params.forEach((p: any) => {
        html += `<div style="display:flex;align-items:center;gap:6px;padding:2px 0;">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${p.color};"></span>
          <span>${p.seriesName}: <strong>${p.value}</strong></span>
        </div>`
      })
      return html
    },
  },
  legend: { data: ['GDP Growth (%)', 'GDP per Capita ($)', 'GNI ($)'], bottom: 0 },
  grid: { ...commonGrid, bottom: '15%' },
  dataZoom: [
    { type: 'inside', start: 0, end: 100 },
    { type: 'slider', start: 0, end: 100, bottom: 30, height: 16, borderColor: '#e5e7eb' },
  ],
  xAxis: {
    type: 'category',
    data: ['2014-15', '2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24'],
  },
  yAxis: [
    { type: 'value', name: 'Growth %' },
    { type: 'value', name: 'USD' },
  ],
  series: [
    {
      name: 'GDP Growth (%)',
      type: 'line',
      data: [7.4, 8.0, 8.3, 6.8, 6.5, 3.9, -5.8, 9.1, 7.2, 7.8],
      smooth: true,
      symbol: 'circle',
      lineStyle: { width: 3 },
    },
    {
      name: 'GDP per Capita ($)',
      type: 'line',
      yAxisIndex: 1,
      data: [1570, 1605, 1740, 1850, 2005, 2050, 1930, 2270, 2480, 2850],
      smooth: true,
      symbol: 'diamond',
    },
    {
      name: 'GNI ($)',
      type: 'line',
      yAxisIndex: 1,
      data: [1560, 1590, 1720, 1830, 1980, 2020, 1900, 2240, 2450, 2800],
      smooth: true,
      symbol: 'triangle',
    },
  ],
}

export const inflationChart: EChartsOption = {
  color: [saffron, blue],
  tooltip: { trigger: 'axis' },
  legend: { data: ['CPI Inflation (%)', 'WPI Inflation (%)'], bottom: 0 },
  grid: { ...commonGrid, bottom: '12%' },
  xAxis: {
    type: 'category',
    data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
  },
  yAxis: [
    { type: 'value', name: 'CPI (%)', min: 0, max: 12 },
    { type: 'value', name: 'WPI (%)', min: 0, max: 16 },
  ],
  series: [
    {
      name: 'CPI Inflation (%)',
      type: 'line',
      yAxisIndex: 0,
      data: [4.9, 4.5, 3.6, 3.4, 4.8, 6.2, 5.5, 6.7, 5.4, 4.8],
      smooth: true,
      symbol: 'circle',
      lineStyle: { width: 3 },
      areaStyle: { opacity: 0.15 },
    },
    {
      name: 'WPI Inflation (%)',
      type: 'line',
      yAxisIndex: 1,
      data: [-2.5, 2.1, 3.8, 4.3, 1.7, 0.3, 13.0, 10.5, -0.7, 2.0],
      smooth: true,
      symbol: 'diamond',
      lineStyle: { width: 3, type: 'dashed' },
    },
  ],
}

export const budgetChart: EChartsOption = {
  color: [saffron, blue, red],
  tooltip: { trigger: 'axis' },
  legend: { data: ['Revenue', 'Expenditure', 'Fiscal Deficit'], bottom: 0 },
  grid: { ...commonGrid, bottom: '15%' },
  xAxis: {
    type: 'category',
    data: ['2019-20', '2020-21', '2021-22', '2022-23', '2023-24', '2024-25'],
  },
  yAxis: { type: 'value', name: '₹ Lakh Crore' },
  series: [
    {
      name: 'Revenue',
      type: 'bar',
      stack: 'budget',
      data: [20.0, 16.0, 22.0, 27.0, 31.0, 35.0],
      barMaxWidth: 40,
    },
    {
      name: 'Expenditure',
      type: 'bar',
      stack: 'budget',
      data: [30.0, 41.0, 38.0, 39.0, 45.0, 48.0],
      barMaxWidth: 40,
    },
    {
      name: 'Fiscal Deficit',
      type: 'bar',
      data: [-9.5, -18.0, -13.0, -11.0, -11.5, -10.5],
      barMaxWidth: 40,
      itemStyle: { borderRadius: [4, 4, 0, 0] },
    },
  ],
}

export const militaryChart: EChartsOption = {
  color: brandColors,
  tooltip: { trigger: 'item' },
  legend: { data: ['Army', 'Navy', 'Air Force', 'Coast Guard', 'Strategic Forces'], bottom: 0 },
  grid: commonGrid,
  radar: {
    indicator: [
      { name: 'Personnel (lakhs)', max: 15 },
      { name: 'Aircraft', max: 2500 },
      { name: 'Naval Vessels', max: 300 },
      { name: 'Budget (₹ lakh Cr)', max: 7 },
      { name: 'Bases', max: 100 },
      { name: 'R&D Spending', max: 5 },
    ],
    shape: 'circle',
    splitArea: { areaStyle: { color: ['rgba(255,153,51,0.03)', 'rgba(19,136,8,0.03)'] } },
    axisLine: { lineStyle: { color: 'rgba(0,0,0,0.1)' } },
  },
  series: [
    {
      type: 'radar',
      data: [
        { value: [12.0, 1800, 70, 5.5, 55, 3.2], name: 'Army' },
        { value: [0.7, 200, 220, 1.2, 15, 0.8], name: 'Navy' },
        { value: [1.5, 2200, 40, 1.8, 60, 1.5], name: 'Air Force' },
        { value: [0.15, 80, 160, 0.3, 10, 0.1], name: 'Coast Guard' },
        { value: [0.3, 100, 15, 0.8, 8, 2.0], name: 'Strategic Forces' },
      ],
      symbol: 'none',
      lineStyle: { width: 2 },
      areaStyle: { opacity: 0.1 },
    },
  ],
}

export const educationChart: EChartsOption = {
  color: [saffron, green, blue, purple],
  tooltip: { trigger: 'axis' },
  legend: { data: ['Overall', 'Male', 'Female', 'Rural'], bottom: 0 },
  grid: { ...commonGrid, bottom: '15%' },
  xAxis: {
    type: 'category',
    data: ['Kerala', 'Tamil Nadu', 'Maharashtra', 'Gujarat', 'West Bengal', 'Rajasthan', 'Uttar Pradesh', 'Bihar'],
  },
  yAxis: { type: 'value', name: 'Literacy Rate (%)', max: 100 },
  series: [
    {
      name: 'Overall',
      type: 'bar',
      data: [96.2, 87.0, 84.2, 82.6, 80.5, 74.0, 73.0, 70.0],
      barMaxWidth: 20,
      itemStyle: { borderRadius: [4, 4, 0, 0] },
    },
    {
      name: 'Male',
      type: 'bar',
      data: [97.4, 91.7, 89.1, 88.2, 86.0, 80.5, 80.0, 78.0],
      barMaxWidth: 20,
      itemStyle: { borderRadius: [4, 4, 0, 0] },
    },
    {
      name: 'Female',
      type: 'bar',
      data: [95.0, 82.5, 79.2, 76.8, 74.5, 67.0, 65.0, 61.0],
      barMaxWidth: 20,
      itemStyle: { borderRadius: [4, 4, 0, 0] },
    },
    {
      name: 'Rural',
      type: 'bar',
      data: [94.5, 80.0, 76.0, 74.0, 72.0, 63.0, 62.0, 58.0],
      barMaxWidth: 20,
      itemStyle: { borderRadius: [4, 4, 0, 0] },
    },
  ],
}

export const healthChart: EChartsOption = {
  color: [green, blue, saffron, purple],
  tooltip: { trigger: 'axis' },
  legend: { data: ['Life Expectancy', 'Health Expenditure per Capita ($)', 'Hospital Beds per 1000', 'Doctor Density per 1000'], bottom: 0 },
  grid: { ...commonGrid, bottom: '18%' },
  xAxis: {
    type: 'category',
    data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
  },
  yAxis: [
    { type: 'value', name: 'Years / Rate' },
    { type: 'value', name: 'USD' },
  ],
  series: [
    {
      name: 'Life Expectancy',
      type: 'line',
      data: [68.5, 68.9, 69.3, 69.6, 70.0, 69.8, 69.5, 70.2, 70.5],
      smooth: true,
      symbol: 'circle',
    },
    {
      name: 'Health Expenditure per Capita ($)',
      type: 'bar',
      yAxisIndex: 1,
      data: [61, 64, 68, 72, 76, 74, 80, 86, 92],
      barMaxWidth: 20,
    },
    {
      name: 'Hospital Beds per 1000',
      type: 'line',
      data: [0.7, 0.8, 0.9, 1.0, 1.1, 1.3, 1.5, 1.6, 1.7],
      smooth: true,
      symbol: 'diamond',
    },
    {
      name: 'Doctor Density per 1000',
      type: 'line',
      data: [0.8, 0.85, 0.9, 0.95, 1.0, 1.05, 1.1, 1.15, 1.2],
      smooth: true,
      symbol: 'triangle',
    },
  ],
}

export const populationChart: EChartsOption = {
  color: [saffron, blue],
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  grid: commonGrid,
  xAxis: {
    type: 'value',
    name: 'Population (Crore)',
    splitLine: { show: false },
  },
  yAxis: {
    type: 'category',
    axisLine: { show: false },
    axisTick: { show: false },
    data: ['80+', '70-79', '60-69', '50-59', '40-49', '30-39', '20-29', '10-19', '0-9'],
  },
  series: [
    {
      name: 'Male',
      type: 'bar',
      data: [-0.3, -0.8, -2.1, -3.8, -5.5, -7.2, -8.5, -9.0, -8.5],
      barMaxWidth: 20,
    },
    {
      name: 'Female',
      type: 'bar',
      data: [0.4, 0.9, 2.0, 3.5, 5.0, 6.5, 7.8, 8.2, 7.8],
      barMaxWidth: 20,
    },
  ],
}

export const aiChart: EChartsOption = {
  color: [saffron, blue, green],
  tooltip: { trigger: 'axis' },
  legend: { data: ['AI Investment ($B)', 'AI Patents Filed', 'AI Talent Pool (lakhs)'], bottom: 0 },
  grid: { ...commonGrid, bottom: '15%' },
  xAxis: {
    type: 'category',
    data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
  },
  yAxis: [
    { type: 'value', name: 'Investment ($B)' },
    { type: 'value', name: 'Patents / Talent' },
  ],
  series: [
    {
      name: 'AI Investment ($B)',
      type: 'line',
      data: [0.8, 1.2, 1.8, 2.5, 3.1, 4.2, 5.8, 7.5, 9.2],
      smooth: true,
      symbol: 'circle',
      lineStyle: { width: 3 },
      areaStyle: { opacity: 0.15 },
    },
    {
      name: 'AI Patents Filed',
      type: 'bar',
      yAxisIndex: 1,
      data: [350, 520, 780, 1100, 1500, 2100, 2900, 3800, 5000],
      barMaxWidth: 24,
    },
    {
      name: 'AI Talent Pool (lakhs)',
      type: 'line',
      yAxisIndex: 1,
      data: [1.2, 1.5, 1.8, 2.2, 2.8, 3.5, 4.5, 5.8, 7.2],
      smooth: true,
      symbol: 'diamond',
      lineStyle: { type: 'dashed', width: 2 },
    },
  ],
}

export const energyChart: EChartsOption = {
  color: [saffron, blue, green, red, purple, teal],
  tooltip: { trigger: 'item' },
  legend: { data: ['Coal', 'Oil', 'Natural Gas', 'Hydro', 'Solar', 'Wind', 'Nuclear'], bottom: 0 },
  grid: commonGrid,
  series: [
    {
      name: 'Energy Mix 2024',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 4 },
      label: { show: true, formatter: '{b}: {d}%' },
      emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
      data: [
        { value: 55, name: 'Coal' },
        { value: 25, name: 'Oil' },
        { value: 6, name: 'Natural Gas' },
        { value: 5, name: 'Hydro' },
        { value: 4, name: 'Solar' },
        { value: 3, name: 'Wind' },
        { value: 2, name: 'Nuclear' },
      ],
    },
  ],
}

export const energyConsumptionTrend: EChartsOption = {
  color: [saffron, green, blue],
  tooltip: { trigger: 'axis' },
  legend: { data: ['Total Consumption (Mtoe)', 'Renewables Share (%)', 'Per Capita (kgoe)'], bottom: 0 },
  grid: { ...commonGrid, bottom: '12%' },
  xAxis: {
    type: 'category',
    data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
  },
  yAxis: [
    { type: 'value', name: 'Mtoe' },
    { type: 'value', name: '% / kgoe', min: 0 },
  ],
  series: [
    {
      name: 'Total Consumption (Mtoe)',
      type: 'bar',
      data: [850, 880, 920, 960, 990, 940, 1020, 1080, 1120],
      barMaxWidth: 24,
    },
    {
      name: 'Renewables Share (%)',
      type: 'line',
      yAxisIndex: 1,
      data: [8, 9, 10, 12, 14, 16, 18, 20, 22],
      smooth: true,
      symbol: 'circle',
      lineStyle: { width: 3 },
    },
    {
      name: 'Per Capita (kgoe)',
      type: 'line',
      yAxisIndex: 1,
      data: [650, 670, 690, 720, 740, 700, 760, 800, 830],
      smooth: true,
      symbol: 'diamond',
      lineStyle: { type: 'dashed' },
    },
  ],
}

export const tradeChart: EChartsOption = {
  color: [green, red, blue],
  tooltip: { trigger: 'axis' },
  legend: { data: ['Exports ($B)', 'Imports ($B)', 'Trade Balance ($B)'], bottom: 0 },
  grid: { ...commonGrid, bottom: '15%' },
  xAxis: {
    type: 'category',
    data: ['2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24'],
  },
  yAxis: [
    { type: 'value', name: 'USD Billion' },
    { type: 'value', name: 'Balance' },
  ],
  series: [
    {
      name: 'Exports ($B)',
      type: 'bar',
      data: [262, 276, 303, 331, 313, 291, 422, 451, 437],
      barMaxWidth: 24,
    },
    {
      name: 'Imports ($B)',
      type: 'bar',
      data: [381, 384, 465, 509, 474, 394, 610, 720, 678],
      barMaxWidth: 24,
    },
    {
      name: 'Trade Balance ($B)',
      type: 'line',
      data: [-119, -108, -162, -178, -161, -103, -188, -269, -241],
      yAxisIndex: 1,
      smooth: true,
      symbol: 'circle',
      lineStyle: { width: 3 },
      areaStyle: { opacity: 0.1 },
    },
  ],
}
