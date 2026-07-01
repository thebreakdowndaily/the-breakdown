export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Intelligence Reports', href: '/intelligence' },
  { label: 'Explainers', href: '/explained' },
  { label: 'Solutions Lab', href: '/the-fix' },
  { label: 'Data Lab', href: '/data-lab' },
  { label: 'Accountability', href: '/accountability' },
  { label: 'India', href: '/india' },
  { label: 'Geopolitics', href: '/world' },
  { label: 'AI & Technology', href: '/ai-technology' },
  { label: 'Policy Lab', href: '/policy-lab' },
  { label: 'Timelines', href: '/timelines' },
  { label: 'Country Profiles', href: '/country-profiles' },
  { label: 'Search Index', href: '/search' },
]

export const DATA_LAB_SECTIONS = [
  { label: 'GDP', href: '/data-lab/gdp' },
  { label: 'Inflation', href: '/data-lab/inflation' },
  { label: 'Budget', href: '/data-lab/budget' },
  { label: 'Military', href: '/data-lab/military' },
  { label: 'Education', href: '/data-lab/education' },
  { label: 'Health', href: '/data-lab/health' },
  { label: 'Population', href: '/data-lab/population' },
  { label: 'AI', href: '/data-lab/ai' },
  { label: 'Energy', href: '/data-lab/energy' },
  { label: 'Trade', href: '/data-lab/trade' },
]
