'use client'

import { useRef, useCallback, useState } from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import dynamic from 'next/dynamic'
import type { EChartsOption } from 'echarts'
import type { EChartsInstance } from 'echarts-for-react'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

interface LabChartProps {
  title: string
  option: EChartsOption
  height?: number
  className?: string
  dataTable?: { headers: string[]; rows: (string | number)[][] }
}

export function LabChart({ title, option, height = 400, className, dataTable }: LabChartProps) {
  const chartInstance = useRef<EChartsInstance | null>(null)
  const [showTable, setShowTable] = useState(false)
  const [chartType, setChartType] = useState<'line' | 'bar'>('line')

  const onChartReady = useCallback((instance: EChartsInstance) => {
    chartInstance.current = instance
  }, [])

  function handleDownloadImage() {
    try {
      const instance = chartInstance.current
      if (instance) {
        const url = instance.getDataURL({
          type: 'png',
          pixelRatio: 2,
          backgroundColor: '#fff',
        })
        const a = document.createElement('a')
        a.href = url
        a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.png`
        a.click()
      }
    } catch { /* ignore */ }
  }

  function handleDownloadSVG() {
    try {
      const instance = chartInstance.current
      if (instance) {
        const url = instance.getDataURL({
          type: 'svg',
          pixelRatio: 1,
          backgroundColor: '#fff',
        })
        const a = document.createElement('a')
        a.href = url
        a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.svg`
        a.click()
      }
    } catch { /* ignore */ }
  }

  function handleToggleType() {
    const newType = chartType === 'line' ? 'bar' : 'line'
    setChartType(newType)
    const instance = chartInstance.current
    if (instance) {
      instance.dispatchAction({ type: 'legendSelect', name: '' })
      // Toggle all series between line and bar
      instance.setOption({
        series: option.series && Array.isArray(option.series)
          ? option.series.map((s: any) => ({
              ...s,
              type: newType,
              smooth: newType === 'line' ? (s.smooth ?? true) : undefined,
            }))
          : undefined,
      })
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 flex-wrap">
        <CardTitle className="text-base font-heading">{title}</CardTitle>
        <div className="flex items-center gap-1 -mt-1 -mr-2">
          {/* Toggle chart type */}
          {option.series && Array.isArray(option.series) && option.series.length <= 3 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleType}
              className="shrink-0"
              aria-label={`Switch to ${chartType === 'line' ? 'bar' : 'line'} chart`}
              title={`Switch to ${chartType === 'line' ? 'bar' : 'line'} chart`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {chartType === 'line' ? (
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                ) : (
                  <>
                    <rect x="4" y="8" width="4" height="12" />
                    <rect x="10" y="5" width="4" height="15" />
                    <rect x="16" y="10" width="4" height="10" />
                  </>
                )}
              </svg>
            </Button>
          )}

          {/* Toggle data table */}
          {dataTable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTable(!showTable)}
              className="shrink-0"
              aria-label={showTable ? 'Hide data table' : 'Show data table'}
              title={showTable ? 'Hide data table' : 'Show data table'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </Button>
          )}

          {/* Download PNG */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownloadImage}
            className="shrink-0"
            aria-label={`Download ${title} as PNG`}
            title="Download as PNG"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </Button>

          {/* Download SVG */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownloadSVG}
            className="shrink-0"
            aria-label="Download as SVG"
            title="Download as SVG"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </Button>
        </div>
      </CardHeader>
      <div className="px-4 pb-4">
        <ReactECharts
          option={{
            ...option,
            // Add data zoom for all line/bar charts
            dataZoom: option.dataZoom || (option.xAxis && (option as any).xAxis?.type === 'category' ? [
              {
                type: 'inside',
                start: 0,
                end: 100,
              },
              {
                type: 'slider',
                start: 0,
                end: 100,
                bottom: 0,
                height: 20,
                borderColor: '#e5e7eb',
                fillerColor: 'rgba(37, 99, 235, 0.1)',
                handleStyle: { color: '#2563eb' },
                textStyle: { fontSize: 10 },
              },
            ] : undefined),
            // Better tooltip
            tooltip: option.tooltip || {
              trigger: 'axis',
              backgroundColor: 'rgba(255,255,255,0.95)',
              borderColor: '#e5e7eb',
              borderWidth: 1,
              textStyle: { fontSize: 12 },
              formatter: undefined,
            },
          }}
          style={{ height }}
          notMerge
          onChartReady={onChartReady}
        />

        {/* Data Table */}
        {showTable && dataTable && (
          <div className="mt-4 overflow-x-auto rounded-lg border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50">
                  {dataTable.headers.map((h, i) => (
                    <th key={i} className="px-3 py-2 text-left font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataTable.rows.map((row, ri) => (
                  <tr key={ri} className="border-t hover:bg-muted/20">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-3 py-1.5 tabular-nums whitespace-nowrap">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  )
}
