'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

interface ConflictMarker {
  flag: string
  name: string
  lat: number
  lng: number
  casualties: string
  status: string
  color: string
}

interface SituationMapProps {
  conflicts: ConflictMarker[]
}

export function SituationMap({ conflicts }: SituationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersLayerRef = useRef<any>(null)

  useEffect(() => {
    async function initMap() {
      if (!mapRef.current || mapInstanceRef.current) return

      const L = await import('leaflet')

      // Fix default icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      // Inject Leaflet CSS if not present
      if (!document.querySelector('#leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      const map = L.map(mapRef.current!, {
        center: [20, 30],
        zoom: 2,
        scrollWheelZoom: true,
        zoomControl: false,
        minZoom: 1,
        maxZoom: 6,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      // Add conflict zone circles
      conflicts.forEach((c) => {
        const radius = c.casualties === '—' ? 300_000 : c.casualties.includes('K')
          ? parseInt(c.casualties.replace(/[^0-9]/g, '')) * 15_000
          : 100_000

        // Semi-transparent fill circle
        L.circle([c.lat, c.lng], {
          radius: Math.min(radius, 800_000),
          color: c.color,
          fillColor: c.color,
          fillOpacity: 0.15,
          weight: 2,
          opacity: 0.6,
        }).addTo(map)

        // Marker with popup
        const marker = L.marker([c.lat, c.lng], {
          icon: L.divIcon({
            className: 'conflict-marker',
            html: `<div style="font-size:24px;line-height:1;text-align:center;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.3));cursor:pointer;">${c.flag}</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          }),
        }).addTo(map)

        marker.bindPopup(`
          <div style="font-family:system-ui,sans-serif;min-width:180px;">
            <p style="font-weight:700;margin:0 0 4px;font-size:14px;">${c.flag} ${c.name}</p>
            <p style="margin:0 0 2px;font-size:12px;color:#666;">
              <strong>Status:</strong> ${c.status}
            </p>
            <p style="margin:0 0 4px;font-size:12px;color:#666;">
              <strong>Casualties:</strong> ${c.casualties}
            </p>
            <a href="/search?q=${encodeURIComponent(c.name.split(' ').slice(0, 3).join(' '))}" 
               style="font-size:11px;color:#2563eb;text-decoration:underline;">
              Related stories →
            </a>
          </div>
        `)
      })

      // Add country marker for key nations
      const COUNTRIES = [
        { code: 'IN', name: 'India', lat: 20.5937, lng: 78.9629 },
        { code: 'US', name: 'United States', lat: 37.0902, lng: -95.7129 },
        { code: 'CN', name: 'China', lat: 35.8617, lng: 104.1954 },
        { code: 'RU', name: 'Russia', lat: 61.524, lng: 105.3188 },
        { code: 'JP', name: 'Japan', lat: 36.2048, lng: 138.2529 },
        { code: 'GB', name: 'United Kingdom', lat: 55.3781, lng: -3.436 },
        { code: 'FR', name: 'France', lat: 46.6034, lng: 1.8883 },
        { code: 'DE', name: 'Germany', lat: 51.1657, lng: 10.4515 },
        { code: 'AU', name: 'Australia', lat: -25.2744, lng: 133.7751 },
        { code: 'BR', name: 'Brazil', lat: -14.2350, lng: -51.9253 },
        { code: 'SA', name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792 },
        { code: 'UA', name: 'Ukraine', lat: 48.3794, lng: 31.1656 },
      ]

      COUNTRIES.forEach((c) => {
        const marker = L.marker([c.lat, c.lng]).addTo(map)
        marker.bindPopup(`
          <div style="font-family:system-ui,sans-serif;text-align:center;min-width:120px;">
            <p style="font-weight:600;margin:0 0 4px;font-size:14px;">${c.name}</p>
            <div style="display:flex;gap:8px;justify-content:center;margin-top:4px;">
              <a href="/country-profiles/${c.code}" style="font-size:12px;color:#2563eb;text-decoration:underline;">Profile</a>
              <a href="/search?q=${c.name}" style="font-size:12px;color:#2563eb;text-decoration:underline;">Stories</a>
            </div>
          </div>
        `)
      })

      mapInstanceRef.current = map
    }

    initMap().catch(console.error)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [conflicts])

  return (
    <div className="rounded-xl border overflow-hidden relative">
      <div ref={mapRef} className="h-[320px] w-full" />
      <div className="absolute top-2 right-2 z-[1000] flex gap-1.5">
        <Link
          href="/world"
          className="text-[11px] bg-background/90 backdrop-blur-sm border rounded-md px-2.5 py-1.5 hover:bg-background transition-colors shadow-sm"
        >
          Full Map →
        </Link>
      </div>
    </div>
  )
}
