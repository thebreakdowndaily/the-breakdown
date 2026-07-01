import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Slugify a tag string for use in URLs */
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\+/g, 'plus')
    .replace(/\./g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Reverse: convert a slug back to a display tag */
export function unslugifyTag(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

/** Map a story category to its canonical hub page path */
export function categoryPath(category: string): string {
  const map: Record<string, string> = {
    'Intelligence': '/intelligence',
    'Explained': '/explained',
    'The Fix': '/the-fix',
    'Data Lab': '/data-lab',
    'Accountability': '/accountability',
    'India': '/india',
    'Incredible India': '/india',
    'Economy': '/india',
    'Politics': '/india',
    'World': '/world',
    'Geopolitics': '/world',
    'AI & Technology': '/ai-technology',
    'Tech / AI': '/ai-technology',
    'Tech / Policy': '/ai-technology',
    'Technology': '/ai-technology',
    'Policy Lab': '/policy-lab',
    'Timelines': '/timelines',
    'Country Profile': '/country-profiles',
    'Science': '/explained',
    'Environment': '/explained',
    'Climate': '/explained',
  }
  return map[category] || '/intelligence'
}

/** Get all unique tags across all stories */
export function getAllTags(stories: { tags?: string[] }[]): string[] {
  const tags = new Set<string>()
  for (const s of stories) {
    if (s.tags) s.tags.forEach(t => tags.add(t))
  }
  return [...tags].sort()
}
