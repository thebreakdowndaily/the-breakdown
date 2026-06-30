'use client'

import { useEffect, useRef } from 'react'

interface CountryMarker {
  code: string
  name: string
  lat: number
  lng: number
}

const MARKERS: CountryMarker[] = [
  { code: 'IN', name: 'India', lat: 20.5937, lng: 78.9629 },
  { code: 'US', name: 'United States', lat: 37.0902, lng: -95.7129 },
  { code: 'CN', name: 'China', lat: 35.8617, lng: 104.1954 },
  { code: 'RU', name: 'Russia', lat: 61.524, lng: 105.3188 },
  { code: 'JP', name: 'Japan', lat: 36.2048, lng: 138.2529 },
  { code: 'GB', name: 'United Kingdom', lat: 55.3781, lng: -3.436 },
]

interface WorldMapProps {
  selectedCountry: string | null
  onCountrySelect: (country: string | null) => void
}

export function WorldMap({ selectedCountry, onCountrySelect }: WorldMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    async function initMap() {
      if (!mapRef.current || mapInstanceRef.current) return

      const L = await import('leaflet')
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

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
        zoomControl: true,
        minZoom: 1,
        maxZoom: 6,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      // Add markers with click handler
      MARKERS.forEach((m) => {
        const marker = L.marker([m.lat, m.lng])
          .addTo(map)
          .on('click', () => {
            onCountrySelect(m.name === selectedCountry ? null : m.name)
          })
          .bindPopup(`
            <div style="text-align:center;font-family:system-ui,sans-serif;">
              <p style="font-weight:600;margin:0 0 4px;font-size:14px;">${m.name}</p>
              <div style="display:flex;gap:8px;justify-content:center;margin-top:4px;">
                <a href="/country-profiles/${m.code}" style="font-size:12px;color:#2563eb;text-decoration:underline;">Profile</a>
                <button onclick="window.__filterCountry && window.__filterCountry('${m.name}')" style="font-size:12px;color:#2563eb;text-decoration:underline;border:none;background:none;cursor:pointer;">Filter Stories</button>
              </div>
            </div>
          `)
        markersRef.current.push(marker)
      })

      mapInstanceRef.current = map
    }

    initMap().catch(console.error)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      markersRef.current = []
    }
  }, [])

  return (
    <div className="rounded-lg border overflow-hidden">
      <div ref={mapRef} className="h-[400px] w-full" />
    </div>
  )
}
