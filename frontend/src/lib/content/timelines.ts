import { TimelineEvent } from '@/types'

export interface Timeline {
  title: string
  slug: string
  country: string
  category: string
  description: string
  events: TimelineEvent[]
}

const TIMELINES_DATA: Timeline[] = [
  {
    title: "India's Nuclear Programme",
    slug: 'indias-nuclear-programme',
    country: 'India',
    category: 'Defence & Technology',
    description: 'From Apsara (1956), Asia\'s first research reactor, to a declared nuclear-weapons state with 22 reactors across 7 sites — India\'s nuclear arc spans strategic defiance, technological indigenisation, and fitful integration into the global non-proliferation order.',
    events: [
      { date: '1948', title: 'Atomic Energy Act', description: 'The Indian government passes the Atomic Energy Act, establishing the Department of Atomic Energy (DAE) under Homi Bhabha and laying legal foundations for a three-stage nuclear programme.' },
      { date: '1956', title: 'Apsara Reactor', description: 'Asia\'s first nuclear research reactor, Apsara (1 MW), goes critical at Trombay — built indigenously with British-supplied enriched uranium fuel, marking India\'s entry into the nuclear age.' },
      { date: '1962', title: 'China War Shock', description: 'The Sino-Indian War and China\'s 1964 nuclear test convinces India\'s leadership that a nuclear deterrent is essential for strategic autonomy vis-à-vis Beijing.' },
      { date: '1974', title: 'Smiling Buddha', description: 'India conducts its first nuclear test (yield: 8-12 kT) at Pokhran, codenamed Smiling Buddha. The world\'s sixth nuclear power triggers the creation of the Nuclear Suppliers Group (NSG) in 1975.' },
      { date: '1998', title: 'Pokhran-II', description: 'Operation Shakti: five tests (including a thermonuclear device) at Pokhran. India declares itself a full-fledged nuclear-weapons state and imposes a voluntary moratorium on further testing.' },
      { date: '2005', title: 'US-India Nuclear Deal', description: 'President Bush and PM Singh announce the US-India Civil Nuclear Agreement — separating civilian and military facilities, ending India\'s 30-year nuclear isolation.' },
      { date: '2008', title: 'NSG Waiver', description: 'India receives a consensus waiver from the 48-member NSG, enabling civilian nuclear trade with 34 countries — a diplomatic landmark that recognised India as a de facto nuclear power.' },
      { date: '2023', title: 'Kudankulam Expansion', description: 'Kudankulam Unit 3 (1,000 MW VVER) achieves criticality; India targets 22 GW nuclear capacity by 2032 via fleet-mode deployment of indigenous PHWR-700 units.' },
    ],
  },
  {
    title: 'Gaganyaan Mission',
    slug: 'gaganyaan-mission',
    country: 'India',
    category: 'Space Exploration',
    description: 'India\'s first crewed spaceflight programme — projected to cost ₹9,023 Cr — aims to send three astronauts to 400 km low-Earth orbit and return them safely. Gaganyaan makes India the fourth nation (after the US, Russia, and China) to operate indigenous human spaceflight capability.',
    events: [
      { date: '2018', title: 'Announced by PM Modi', description: 'PM Modi announces Gaganyaan in his 2018 Independence Day address, targeting a 2022 crewed launch — later revised due to COVID-related supply chain disruptions across the ISRO vendor ecosystem.' },
      { date: '2019', title: 'ISRO Establishes Programme', description: 'ISRO formally establishes the Gaganyaan programme; four IAF test pilots selected for astronaut training at the Institute of Aerospace Medicine, Bengaluru.' },
      { date: '2021', title: 'Crew Module Tests', description: 'ISRO completes critical design review (CDR) of the 3.7-tonne crew module and begins fabrication. Environmental control and life support systems (ECLSS) pass ground tests.' },
      { date: '2022', title: 'Astronaut Training in Russia', description: 'Four astronaut candidates complete generic space training at the Gagarin Cosmonaut Training Center, Star City — including centrifuge, microgravity, and Soyuz simulator.' },
      { date: '2023', title: 'TV-D1 Test Flight', description: 'ISRO launches TV-D1 from Sriharikota — crew escape system activated at Mach 1.2, separation and parachute deployment successful. Mission duration: 8 minutes 40 seconds.' },
      { date: '2024', title: 'Second Uncrewed Test', description: 'TV-D2 validates crew module reentry from 120 km altitude, drogue and main parachute sequences, and splashdown recovery from the Bay of Bengal.' },
      { date: '2025', title: 'First Crewed Flight (Planned)', description: 'H1 FY26 target: launch of three IAF astronauts on an LVM-3 rocket to 400 km orbit for 3-7 days, with splashdown off the Gujarat coast.' },
    ],
  },
  {
    title: 'Digital India',
    slug: 'digital-india',
    country: 'India',
    category: 'Technology & Governance',
    description: 'From Aadhaar to UPI to IndiaAI — Digital India represents one of the world\'s most ambitious state-led digital transformations. 138 Cr Aadhaar IDs, 14 Cr monthly UPI transactions (2025), and 6.4 Lakh km of optical fibre have reshaped governance, finance, and identity for 1.4 B people.',
    events: [
      { date: '2009', title: 'Aadhaar Launched', description: 'UIDAI launches Aadhaar — a 12-digit biometric (fingerprint + iris) identity number. As of 2025, 138 Cr Aadhaar IDs issued, covering 99% of adults.' },
      { date: '2015', title: 'Digital India Programme', description: 'PM Modi launches Digital India as a umbrella mission: digital infrastructure as a utility, governance on demand, and digital empowerment of citizens. ₹4.5 Lakh Cr investment envisioned.' },
      { date: '2016', title: 'UPI Launch', description: 'Unified Payments Interface (UPI) goes live — a real-time, interoperable, zero-MDR payment system. By 2025, UPI processes 14 Cr+ monthly transactions worth ₹20+ Lakh Cr.' },
      { date: '2017', title: 'GSTN Goes Digital', description: 'The Goods and Services Tax Network (GSTN) goes live — India\'s first nation-wide digital tax compliance platform. 1.4 Cr+ businesses registered; 10 Cr+ monthly GST returns filed.' },
      { date: '2018', title: 'BharatNet Progress', description: '1.2 Lakh gram panchayats connected; target expanded to 2.5 Lakh GPs under BharatNet Phase II via PPP model at ₹42,000 Cr.' },
      { date: '2020', title: 'Data Protection Bill', description: 'India introduces the Personal Data Protection Bill (revised as DPDP Act 2023) to regulate digital privacy, data processing, and cross-border flows — creating India\'s first comprehensive data governance law.' },
      { date: '2023', title: '5G Rollout', description: 'Jio and Airtel launch 5G services within 3 months of spectrum auction; India achieves 250M+ 5G subscribers by 2025 — the fastest rollout globally.' },
      { date: '2025', title: 'IndiaAI Mission', description: 'Government launches IndiaAI Mission with ₹10,372 Cr — procuring 10,000+ GPUs, developing Indic-language foundational models, and training 500,000 AI professionals.' },
    ],
  },
  {
    title: 'India-US Relations',
    slug: 'india-us-relations',
    country: 'India / United States',
    category: 'Geopolitics',
    description: 'Two decades of strategic convergence has transformed the relationship from "estranged democracies" (Cold War) to a comprehensive global strategic partnership — encompassing defence, nuclear energy, technology, and the Quad. Bilateral trade reached $200B in 2024.',
    events: [
      { date: '2000', title: 'Clinton Visits India', description: 'President Clinton\'s 5-day visit — the first US presidential trip in 22 years — yields a "Vision for a New Century" joint statement, breaking the post-Pokhran II chill.' },
      { date: '2005', title: 'Nuclear Deal Framework', description: 'Manmohan Singh and George W. Bush announce the framework for the US-India Civil Nuclear Agreement, recognising India as a responsible nuclear power outside the NPT.' },
      { date: '2008', title: 'NSG Waiver Finalised', description: 'After a year of intense diplomacy, the 48-member NSG grants India a country-specific waiver — enabling civilian nuclear commerce and ending 34 years of technology denial.' },
      { date: '2014', title: 'Modi at Madison Square', description: 'PM Modi addresses 19,000 Indian-Americans at Madison Square Garden — a diplomatic spectacle reflecting the diaspora\'s political clout (4.5M strong, $150B annual income).' },
      { date: '2016', title: 'Major Defence Partner', description: 'The US designates India as a Major Defence Partner — highest US defence relationship short of a treaty ally, enabling ITU-level technology sharing.' },
      { date: '2021', title: 'Quad Summit', description: 'First in-person Quad Leaders\' Summit (Washington DC, Sept 2021): India, US, Japan, Australia agree on vaccine diplomacy, critical technology, and maritime domain awareness in the Indo-Pacific.' },
      { date: '2023', title: 'iCET Technology Partnership', description: 'Initiative on Critical and Emerging Technologies (iCET) launched for co-development in AI, quantum computing, semiconductor supply chains, and space — including GE F414 jet engine co-production.' },
      { date: '2024', title: 'Defence Industrial Roadmap', description: 'India and US sign the Defence Industrial Cooperation Roadmap — co-production of GE F414 engines (80% transfer of technology), MQ-9B drones, and maritime munitions.' },
    ],
  },
  {
    title: 'India-China Border Tensions',
    slug: 'india-china-border-tensions',
    country: 'India / China',
    category: 'Geopolitics',
    description: 'The 3,488 km LAC remains the world\'s most volatile unresolved border. One war (1962), four major standoffs (2013-2024), and 70+ years of mutual distrust define a relationship oscillating between "Hindi-Chini Bhai Bhai" and competitive confrontation.',
    events: [
      { date: '1950', title: 'China Occupies Tibet', description: 'China\'s annexation of Tibet creates a 3,488 km undemarcated border between India and China. The boundary dispute comprises three sectors: Aksai Chin (west), Uttarakhand/Nepal (middle), and Arunachal Pradesh (east).' },
      { date: '1962', title: 'Sino-Indian War', description: 'China launches a two-phase offensive across the LAC in October 1962, overrunning Indian forward positions in both the western and eastern sectors. India suffers 1,383 casualties; China annexes Aksai Chin.' },
      { date: '1988', title: 'Rajiv Gandhi Visit', description: 'PM Rajiv Gandhi visits Beijing — first Indian PM in 34 years. A Joint Working Group on the boundary is established, initiating a framework for dialogue that continues today.' },
      { date: '1993', title: 'Confidence-Building Measures', description: 'India and China sign an Agreement on Peace and Tranquillity along the LAC — committing to resolve differences through peaceful negotiations and limiting military deployments along the line.' },
      { date: '2013', title: 'Depsang Standoff', description: 'A 21-day standoff at Depsang, Ladakh — Chinese troops build a helipad 4 km inside what India considers its territory. Resolved through flag meetings. Signals a new Chinese assertiveness.' },
      { date: '2017', title: 'Doklam Standoff', description: '73-day face-off between Indian and Chinese troops near Doklam plateau (Bhutan-China-India trijunction). Resolved after PM Modi and President Xi meeting in Xiamen. China retains road-building rights.' },
      { date: '2020', title: 'Galwan Valley Clash', description: 'The deadliest India-China conflict in 45 years. 20 Indian soldiers killed (including 1 CO) and 4 Chinese during a hand-to-hand confrontation in the Galwan Valley. Leads to severe economic and diplomatic retrenchment.' },
      { date: '2024', title: 'Patrolling Agreements', description: 'India and China reach a breakthrough agreement on patrolling protocols in remaining friction points (Depsang, Demchok). Troop numbers at LAC reduced from 60,000 (2022 peak) to 30,000, restoring status quo ante 2020.' },
    ],
  },
]

export function getTimelineBySlug(slug: string): Timeline | undefined {
  return TIMELINES_DATA.find(t => t.slug === slug)
}

export function getAllTimelineSlugs(): string[] {
  return TIMELINES_DATA.map(t => t.slug)
}

export function getAllTimelines(): Timeline[] {
  return TIMELINES_DATA
}

export function getRelatedTimelines(currentSlug: string, count = 2): Timeline[] {
  const current = getTimelineBySlug(currentSlug)
  if (!current) return []
  return TIMELINES_DATA
    .filter(t => t.slug !== currentSlug)
    .filter(t => t.category === current.category || t.country === current.country)
    .slice(0, count)
}
