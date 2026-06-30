'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export interface EntityGraphNode {
  id: string
  name: string
  type: string
}

interface Props {
  centerId: string
  nodes: EntityGraphNode[]
  edges: { source: string; target: string }[]
  entityColors: Record<string, string>
}

interface LayoutNode extends EntityGraphNode {
  x: number
  y: number
  vx: number
  vy: number
}

const W = 600
const H = 400
const CENTER_X = W / 2
const CENTER_Y = H / 2
const REPULSION = 1200
const ATTRACTION = 0.005
const DAMPING = 0.85
const ITERATIONS = 80
const RADIUS = 28

export function EntityGraph({ centerId, nodes, edges, entityColors }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [layout, setLayout] = useState<LayoutNode[]>([])

  useEffect(() => {
    // Initialize positions
    const angleStep = (Math.PI * 2) / nodes.length
    const initial: LayoutNode[] = nodes.map((n, i) => {
      // Center node at origin, others in a ring around it
      if (n.id === centerId) {
        return { ...n, x: CENTER_X, y: CENTER_Y, vx: 0, vy: 0 }
      }
      const angle = angleStep * i - Math.PI / 2
      const dist = 120 + Math.random() * 40
      return {
        ...n,
        x: CENTER_X + Math.cos(angle) * dist,
        y: CENTER_Y + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
      }
    })

    // Run force simulation
    for (let iter = 0; iter < ITERATIONS; iter++) {
      const forces: { fx: number; fy: number }[] = initial.map(() => ({ fx: 0, fy: 0 }))

      // Repulsion between all pairs
      for (let i = 0; i < initial.length; i++) {
        for (let j = i + 1; j < initial.length; j++) {
          const dx = initial[j].x - initial[i].x
          const dy = initial[j].y - initial[i].y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const force = REPULSION / (dist * dist)
          const fx = (dx / dist) * force
          const fy = (dy / dist) * force
          forces[i].fx -= fx
          forces[i].fy -= fy
          forces[j].fx += fx
          forces[j].fy += fy
        }
      }

      // Attraction along edges
      for (const edge of edges) {
        const si = initial.findIndex(n => n.id === edge.source)
        const ti = initial.findIndex(n => n.id === edge.target)
        if (si === -1 || ti === -1) continue
        const dx = initial[ti].x - initial[si].x
        const dy = initial[ti].y - initial[si].y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const force = dist * ATTRACTION
        const fx = (dx / dist) * force
        const fy = (dy / dist) * force
        forces[si].fx += fx
        forces[si].fy += fy
        forces[ti].fx -= fx
        forces[ti].fy -= fy
      }

      // Center gravity for center node
      const ci = initial.findIndex(n => n.id === centerId)
      if (ci !== -1) {
        forces[ci].fx += (CENTER_X - initial[ci].x) * 0.1
        forces[ci].fy += (CENTER_Y - initial[ci].y) * 0.1
      }

      // Apply forces
      for (let i = 0; i < initial.length; i++) {
        initial[i].vx = (initial[i].vx + forces[i].fx) * DAMPING
        initial[i].vy = (initial[i].vy + forces[i].fy) * DAMPING
        initial[i].x += initial[i].vx
        initial[i].y += initial[i].vy
      }
    }

    setLayout(initial)
  }, [centerId, nodes, edges])

  if (layout.length === 0) {
    return (
      <div className="h-[400px] rounded-lg border bg-muted/10 flex items-center justify-center text-sm text-muted-foreground">
        Loading graph…
      </div>
    )
  }

  const edgePaths = edges
    .map((edge) => {
      const s = layout.find(n => n.id === edge.source)
      const t = layout.find(n => n.id === edge.target)
      if (!s || !t) return null
      return { key: `${edge.source}→${edge.target}`, x1: s.x, y1: s.y, x2: t.x, y2: t.y }
    })
    .filter(Boolean)

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-[400px]"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        {/* Edge lines */}
        {edgePaths.map((e) => (
          <line
            key={e!.key}
            x1={e!.x1}
            y1={e!.y1}
            x2={e!.x2}
            y2={e!.y2}
            stroke="hsl(var(--border))"
            strokeWidth={1.5}
            strokeOpacity={0.6}
          />
        ))}

        {/* Node circles + labels */}
        {layout.map((n) => {
          const isCenter = n.id === centerId
          const color = entityColors[n.type] || '#6b7280'
          const hslMatch = color.match(/hsl\([^)]+\)/)
          const fillColor = hslMatch ? hslMatch[0] : 'hsl(var(--muted-foreground))'
          const r = isCenter ? RADIUS * 1.3 : RADIUS

          return (
            <g key={n.id}>
              {/* Invisible wider click area */}
              <a href={`/knowledge/${n.id}`} className="cursor-pointer">
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={r + 8}
                  fill="transparent"
                />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={r}
                  fill={isCenter ? 'hsl(var(--primary))' : fillColor}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                  opacity={0.9}
                />
                <text
                  x={n.x}
                  y={n.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize={isCenter ? 13 : 11}
                  fontWeight={600}
                >
                  {n.name.length > 12 ? n.name.slice(0, 10) + '…' : n.name}
                </text>
              </a>
              {/* Label below node */}
              <text
                x={n.x}
                y={n.y + r + 14}
                textAnchor="middle"
                fill="hsl(var(--muted-foreground))"
                fontSize={10}
              >
                {n.type}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
