import { CountryProfile } from '@/types'

export async function getCountryProfile(code: string): Promise<CountryProfile | null> {
  const res = await fetch(`https://thebreakdown.in/api/profiles/${code}`)
  if (!res.ok) return null
  return res.json()
}

export async function getAllCountries(): Promise<{ code: string; name: string }[]> {
  const res = await fetch('https://thebreakdown.in/api/profiles')
  if (!res.ok) return []
  return res.json()
}
