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
    description: 'From a fledgling atomic energy programme to a declared nuclear weapons state, India\'s nuclear journey spans over eight decades of scientific ambition, strategic deterrence, and global integration.',
    events: [
      { date: '1948', title: 'Atomic Energy Act', description: 'The Indian government passes the Atomic Energy Act, establishing the Department of Atomic Energy and laying the legal framework for nuclear research.' },
      { date: '1956', title: 'Apsara Reactor', description: 'India\'s first nuclear research reactor, Apsara, goes critical at Trombay, marking the country\'s entry into the nuclear age.' },
      { date: '1962', title: 'China War Shock', description: 'The Sino-Indian War prompts India to accelerate its nuclear weapons programme as a strategic deterrent against China.' },
      { date: '1974', title: 'Smiling Buddha', description: 'India conducts its first nuclear test, codenamed Smiling Buddha, at Pokhran, becoming the world\'s sixth nuclear power.' },
      { date: '1998', title: 'Pokhran-II', description: 'India conducts a series of five nuclear tests under Operation Shakti, declaring itself a full-fledged nuclear weapons state.' },
      { date: '2005', title: 'US-India Nuclear Deal', description: 'The US-India Civil Nuclear Agreement is signed, ending India\'s nuclear isolation and enabling civilian nuclear trade.' },
      { date: '2008', title: 'NSG Waiver', description: 'India receives a waiver from the Nuclear Suppliers Group, allowing it to engage in civilian nuclear commerce.' },
      { date: '2023', title: 'Kudankulam Expansion', description: 'India expands its civilian nuclear capacity with new units at Kudankulam, targeting 22 GW of nuclear capacity by 2032.' },
    ],
  },
  {
    title: 'Gaganyaan Mission',
    slug: 'gaganyaan-mission',
    country: 'India',
    category: 'Space Exploration',
    description: 'India\'s first human spaceflight programme aims to demonstrate indigenous capability to send humans to low-Earth orbit and return them safely. It marks a historic milestone for ISRO and Indian science.',
    events: [
      { date: '2018', title: 'Announced by PM Modi', description: 'PM Narendra Modi announces the Gaganyaan mission during his Independence Day speech, targeting a 2022 timeline.' },
      { date: '2019', title: 'ISRO Established Programme', description: 'ISRO formally establishes the Gaganyaan programme with four astronaut candidates selected from the Indian Air Force.' },
      { date: '2021', title: 'Crew Module Tests', description: 'ISRO completes critical crew module design reviews and begins fabrication of the pressurized crew capsule.' },
      { date: '2022', title: 'Astronaut Training in Russia', description: 'Four Indian astronaut candidates complete generic space training at the Gagarin Cosmonaut Training Center in Russia.' },
      { date: '2023', title: 'TV-D1 Test Flight', description: 'ISRO successfully conducts the first uncrewed test flight (TV-D1) of the crew escape system from Sriharikota.' },
      { date: '2024', title: 'Second Uncrewed Test', description: 'ISRO conducts TV-D2, testing the crew module reentry and parachute deployment systems.' },
      { date: '2025', title: 'First Crewed Flight (Planned)', description: 'India plans to launch its first crewed mission, sending three astronauts to low-Earth orbit for 3-7 days.' },
    ],
  },
  {
    title: 'Digital India',
    slug: 'digital-india',
    country: 'India',
    category: 'Technology & Governance',
    description: 'Digital India is a flagship programme to transform India into a digitally empowered society and knowledge economy, combining internet infrastructure, digital identity, and financial inclusion.',
    events: [
      { date: '2009', title: 'Aadhaar Launched', description: 'The Unique Identification Authority of India (UIDAI) launches Aadhaar, a biometric-based digital identity system.' },
      { date: '2015', title: 'Digital India Programme', description: 'PM Modi formally launches the Digital India initiative with three core vision areas: digital infrastructure, governance, and empowerment.' },
      { date: '2015', title: 'BharatNet Phase I', description: 'The BharatNet project begins connecting gram panchayats with high-speed optical fibre networks.' },
      { date: '2016', title: 'UPI Launch', description: 'The Unified Payments Interface (UPI) launches, revolutionizing digital payments with real-time peer-to-peer transactions.' },
      { date: '2017', title: 'GSTN Goes Digital', description: 'The Goods and Services Tax Network (GSTN) goes live, digitizing tax compliance for millions of businesses.' },
      { date: '2020', title: 'Data Protection Bill', description: 'India introduces the Personal Data Protection Bill, aiming to regulate digital privacy and data usage.' },
      { date: '2023', title: '5G Rollout', description: 'India launches 5G services across major cities, positioning itself as a leader in telecom technology.' },
      { date: '2025', title: 'IndiaAI Mission', description: 'The government launches the IndiaAI Mission with a ₹10,372 Cr outlay to boost AI research and compute infrastructure.' },
    ],
  },
  {
    title: 'India-US Relations',
    slug: 'india-us-relations',
    country: 'India / United States',
    category: 'Geopolitics',
    description: 'From Cold War distance to a comprehensive strategic partnership, India-US relations have transformed dramatically over two decades, driven by shared democratic values, counter-terrorism cooperation, and convergence in the Indo-Pacific.',
    events: [
      { date: '2000', title: 'Clinton Visit to India', description: 'President Bill Clinton makes a landmark visit to India, the first by a US president in 22 years, signaling a new chapter in bilateral ties.' },
      { date: '2005', title: 'Nuclear Deal Framework', description: 'PM Manmohan Singh and President George W. Bush announce the framework for the US-India Civil Nuclear Agreement.' },
      { date: '2008', title: 'NSG Waiver Finalized', description: 'The Nuclear Suppliers Group grants India a waiver, operationalizing the landmark civilian nuclear deal.' },
      { date: '2014', title: 'Modi at Madison Square', description: 'PM Modi addresses a packed Madison Square Garden in New York, showcasing the growing Indian-American diaspora\'s influence.' },
      { date: '2016', title: 'Major Strategic Partner', description: 'The US designates India as a Major Defense Partner, the highest level of defense partnership short of a treaty ally.' },
      { date: '2021', title: 'QUAD Summit', description: 'Leaders of India, US, Japan, and Australia hold the first in-person QUAD Summit, focusing on Indo-Pacific cooperation.' },
      { date: '2023', title: 'Technology Partnership', description: 'India and US launch the Initiative on Critical and Emerging Technologies (iCET) for co-development in AI, semiconductors, and space.' },
      { date: '2024', title: 'Defence Industrial Roadmap', description: 'India and US sign a defence industrial cooperation roadmap for co-production of jet engines, drones, and munitions.' },
    ],
  },
  {
    title: 'India-China Border Tensions',
    slug: 'india-china-border-tensions',
    country: 'India / China',
    category: 'Geopolitics',
    description: 'The long-standing border dispute between India and China along the Line of Actual Control (LAC) has been a persistent source of tension, punctuated by periods of conflict and diplomatic engagement.',
    events: [
      { date: '1950', title: 'China Occupies Tibet', description: 'China\'s annexation of Tibet creates a shared border between India and China, sowing seeds of future territorial disputes.' },
      { date: '1962', title: 'Sino-Indian War', description: 'China launches a surprise military offensive across the LAC, defeating Indian forces and annexing Aksai Chin.' },
      { date: '1988', title: 'Rajiv Gandhi Visit', description: 'PM Rajiv Gandhi visits Beijing, the first Indian PM to do so in 34 years, beginning a process of border normalization.' },
      { date: '1993', title: 'Confidence-Building Measures', description: 'India and China sign an agreement on maintaining peace and tranquillity along the LAC.' },
      { date: '2013', title: 'Depsang Standoff', description: 'A three-week standoff at Depsang in Ladakh signals the beginning of more aggressive Chinese posture.' },
      { date: '2017', title: 'Doklam Standoff', description: 'Indian and Chinese troops face off for 73 days near the Doklam plateau, resolved through diplomatic channels.' },
      { date: '2020', title: 'Galwan Valley Clash', description: 'Deadliest clash in decades leaves 20 Indian and 4 Chinese soldiers dead in the Galwan Valley, severely straining relations.' },
      { date: '2024', title: 'Patrolling Agreements', description: 'India and China reach an agreement on patrolling arrangements along the LAC, de-escalating tensions after four years.' },
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
