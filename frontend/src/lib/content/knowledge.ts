export interface KnowledgeEntity {
  id: string
  type: string
  name: string
  description: string
  details: string
  relatedIds: string[]
  timelineIds?: string[]
  image?: string
}

export const ENTITIES: KnowledgeEntity[] = [
  // ===== Persons =====
  {
    id: 'narendra-modi',
    type: 'Person',
    name: 'Narendra Modi',
    description: 'Prime Minister of India, architect of key national initiatives',
    details: 'Narendra Damodardas Modi has served as the 14th Prime Minister of India since May 2014. His government has launched flagship initiatives including Digital India, Make in India, Swachh Bharat Mission, and the National Green Hydrogen Mission. Under his leadership, India has emerged as the fastest-growing major economy and assumed the G20 presidency in 2023.',
    relatedIds: ['isro', 'barc', 'nirmala-sitharaman', 'ayodhya-ram-mandir', 'upi'],
    timelineIds: ['digital-india', 'gaganyaan-mission'],
    image: '/images/people/narendra-modi.jpg',
  },
  {
    id: 'nirmala-sitharaman',
    type: 'Person',
    name: 'Nirmala Sitharaman',
    description: 'Finance Minister — Union Budget 2026-27',
    details: 'Nirmala Sitharaman is India\'s Minister of Finance and Corporate Affairs, serving since May 2019. She has presented seven Union Budgets, including the 2025-26 budget which allocated ₹20,000 crore to the Nuclear Energy Mission and ₹10,372 crore to the IndiaAI Mission. She is the second woman to serve as India\'s Finance Minister after Indira Gandhi.',
    relatedIds: ['narendra-modi', 'india', 'production-linked-incentive'],
    image: '/images/people/nirmala-sitharaman.jpg',
  },
  {
    id: 'mamata-banerjee',
    type: 'Person',
    name: 'Mamata Banerjee',
    description: 'Former West Bengal CM, TMC chief after 2026 election defeat',
    details: 'Mamata Banerjee founded the Trinamool Congress in 1998 and served as West Bengal\'s Chief Minister for three consecutive terms from 2011 to 2026. Her defeat in the 2026 West Bengal Assembly election — losing her own Bhabanipur constituency — triggered the party\'s worst internal crisis, culminating in 20 of 28 TMC Lok Sabha MPs defecting to the NDA.',
    relatedIds: ['india'],
    image: '/images/people/mamata-banerjee.jpg',
  },
  {
    id: 'tarique-rahman',
    type: 'Person',
    name: 'Tarique Rahman',
    description: 'Bangladesh PM, realigned Dhaka-Beijing relations in June 2026',
    details: 'Tarique Rahman, son of former PM Khaleda Zia, became Bangladesh\'s Prime Minister after the BNP returned to power. His six-day state visit to Beijing in June 2026 produced a 16-point joint communiqué, over $1 billion in infrastructure commitments, and strategic agreements on Teesta water sharing and Mongla port development.',
    relatedIds: ['bangladesh-china-tarique-rahman-beijing-2026', 'china'],
  },

  // ===== Organizations =====
  {
    id: 'isro',
    type: 'Organization',
    name: 'ISRO',
    description: 'Indian Space Research Organisation — lunar & solar missions',
    details: 'The Indian Space Research Organisation (ISRO) is India\'s national space agency, headquartered in Bengaluru. Since its founding in 1969, ISRO has achieved landmark missions including the Mars Orbiter Mission (MOM), Chandrayaan lunar missions, and the Gaganyaan human spaceflight programme. ISRO is one of only six space agencies with full launch capabilities.',
    relatedIds: ['gaganyaan-mission', 'narendra-modi'],
    timelineIds: ['gaganyaan-mission'],
  },
  {
    id: 'barc',
    type: 'Organization',
    name: 'BARC',
    description: 'Bhabha Atomic Research Centre — nuclear hydrogen breakthrough',
    details: 'The Bhabha Atomic Research Centre (BARC) is India\'s premier nuclear research facility, headquartered in Trombay, Mumbai. Established in 1954 as the Atomic Energy Establishment, it was renamed after Dr Homi J. Bhabha in 1967. BARC developed the copper-chlorine thermochemical cycle used in the world\'s first nuclear hydrogen plant at Kalpakkam, and leads India\'s research in nuclear science and radiopharmaceuticals.',
    relatedIds: ['national-green-hydrogen-mission', 'narendra-modi', 'india', 'nuclear-hydrogen-kalpakkam-world-first'],
    timelineIds: ['indias-nuclear-programme'],
    image: '/images/people/barc.jpg',
  },
  {
    id: 'tata-electronics',
    type: 'Organization',
    name: 'Tata Electronics',
    description: 'Apple & Tesla supplier hit by 630GB ransomware breach',
    details: 'Tata Electronics is the semiconductor and electronics manufacturing arm of the Tata Group. It entered iPhone manufacturing in 2023 by acquiring Wistron\'s India operations and took a 60% stake in Pegatron India in 2024. In June 2026, it suffered a ransomware attack by World Leaks, resulting in 204,300 files (630GB) of Apple and Tesla trade secrets being leaked on the dark web.',
    relatedIds: ['india', 'world-leaks'],
    image: '/images/people/tata-electronics.jpg',
  },
  {
    id: 'anthropic',
    type: 'Organization',
    name: 'Anthropic',
    description: 'AI safety company behind Mythos autonomous hacking model',
    details: 'Anthropic is an AI safety company founded in 2021 by former OpenAI researchers. In June 2026, it released Mythos — an AI model capable of finding zero-day vulnerabilities autonomously — followed by Fable 5, a restricted public version. Both were later suspended amid global regulatory discussions. The release triggered a 12% one-day decline in cybersecurity insurance stocks.',
    relatedIds: ['anthropic-mythos-ai-2026', 'india-ai-governance-guidelines-impact-summit-2026'],
    image: '/images/people/anthropic.jpg',
  },
  {
    id: 'world-leaks',
    type: 'Organization',
    name: 'World Leaks',
    description: 'Ransomware group behind Tata, Dell, Nike data breaches',
    details: 'World Leaks emerged in January 2025 as a rebrand of Hunters International, inheriting tactics from the Hive ransomware operation dismantled by the FBI in 2023. The group operates an Extortion-as-a-Service platform, stealing data via compromised VPN credentials and publishing it on the dark web. It has claimed 125+ victims globally, with the US and India as primary targets.',
    relatedIds: ['tata-electronics'],
  },

  // ===== Technologies =====
  {
    id: 'upi',
    type: 'Technology',
    name: 'UPI',
    description: 'Unified Payments Interface — 14B+ monthly transactions',
    details: 'The Unified Payments Interface (UPI) is India\'s real-time payment system developed by NPCI. Launched in 2016, UPI has revolutionised digital payments in India, processing over 14 billion transactions per month as of 2026. It is the world\'s most adopted real-time payment system and is being exported globally as part of the India Stack.',
    relatedIds: ['aadhaar', 'india', 'narendra-modi'],
    timelineIds: ['digital-india'],
  },
  {
    id: '5g-bharat',
    type: 'Technology',
    name: '5G Bharat',
    description: 'Indigenous 5G stack deployed across 700+ districts',
    details: '5G Bharat is India\'s indigenous 5G telecom stack, developed by a consortium including the Centre for Development of Telematics (C-DOT). The indigenous 5G network has been deployed across 700+ districts, reducing dependence on foreign telecom vendors and positioning India as a global player in telecommunications technology.',
    relatedIds: ['india', 'upi'],
    image: '/images/people/5g-bharat.jpg',
  },
  {
    id: 'aadhaar',
    type: 'Technology',
    name: 'Aadhaar',
    description: 'World\'s largest biometric ID system — 1.4B+ enrolments',
    details: 'Aadhaar is the world\'s largest biometric identity system, managed by UIDAI. With over 1.4 billion enrolments covering 99.9% of Indian adults, Aadhaar provides a unique 12-digit identity number linked to biometric and demographic data. It serves as the foundational layer of India Stack, enabling direct benefit transfers that have saved the government over ₹1.7 lakh crore in leakage reduction.',
    relatedIds: ['upi', 'india', 'narendra-modi'],
    timelineIds: ['digital-india'],
    image: '/images/people/aadhaar.jpg',
  },
  {
    id: 'plas-stick',
    type: 'Technology',
    name: 'Plas-Stick',
    description: 'Tamarind-seed powder that removes microplastics from water',
    details: 'Plas-Stick is an invention by three Indian teenagers — Vivaan Chhawchharia, Ariana Agarwal, and Avyana Mehta — that turns waste tamarind seeds into a magnetic powder capable of removing microplastics from water without electricity. It won The Earth Prize 2026, beating 6,000+ entries from 100+ countries.',
    relatedIds: ['earth-prize-2026-plas-stick', 'india'],
  },

  // ===== Policies =====
  {
    id: 'national-green-hydrogen-mission',
    type: 'Policy',
    name: 'National Green Hydrogen Mission',
    description: 'Aim: 5 MMT green hydrogen annual production by 2030',
    details: 'The National Green Hydrogen Mission (NGHM), approved in January 2023 with a ₹19,744 crore outlay, aims to make India a global hub for green hydrogen production. The mission targets 5 million metric tonnes of green hydrogen production capacity by 2030, backed by 125 GW of renewable energy capacity. The SIGHT programme provides ₹17,490 crore in production-linked incentives.',
    relatedIds: ['barc', 'india', 'narendra-modi', 'nuclear-hydrogen-kalpakkam-world-first'],
  },
  {
    id: 'production-linked-incentive',
    type: 'Policy',
    name: 'Production Linked Incentive (PLI)',
    description: '₹1.97L cr scheme covering 14 sectors',
    details: 'The Production Linked Incentive (PLI) scheme is a flagship government programme launched in 2020 to boost domestic manufacturing. With a total outlay of ₹1.97 lakh crore across 14 sectors including electronics, automobiles, pharmaceuticals, textiles, and renewable energy, the scheme provides incentives based on incremental production.',
    relatedIds: ['narendra-modi', 'nirmala-sitharaman', 'india'],
  },
  {
    id: 'dpdp-act',
    type: 'Policy',
    name: 'Digital Personal Data Protection Act',
    description: 'India\'s comprehensive data privacy law, fast-tracked in 2026',
    details: 'The Digital Personal Data Protection (DPDP) Act, 2023, is India\'s first comprehensive data protection law. In 2026, the government fast-tracked compliance deadlines, requiring significant data fiduciaries to appoint Data Protection Officers and implement breach notification systems within 180 days. Non-compliance carries penalties of up to ₹250 crore.',
    relatedIds: ['india-digital-regulation-offensive-2026-dpdp-it-ru', 'india'],
  },
  {
    id: 'india-ai-governance',
    type: 'Policy',
    name: 'India AI Governance Guidelines',
    description: 'Seven sutras framework for safe AI development',
    details: 'India unveiled its AI Governance Guidelines at the AI Impact Summit 2026, adopting a principle-based approach with seven sutras including fairness, accountability, transparency, and safety. The guidelines establish three new institutions: the AI Governance Group (AIGG), the Technical and Ethical Policy Committee (TPEC), and the AI Safety Institute (AISI).',
    relatedIds: ['india-ai-governance-guidelines-impact-summit-2026', 'anthropic', 'india'],
  },

  // ===== Events =====
  {
    id: 'gaganyaan-mission',
    type: 'Event',
    name: 'Gaganyaan Mission',
    description: 'India\'s first crewed spaceflight, targeted for 2026',
    details: 'Gaganyaan is India\'s first human spaceflight mission, announced in the 2018 Independence Day address. The programme aims to launch a crew of three astronauts to a 400 km low-Earth orbit and return them safely. With a budget of ₹9,023 crore, the mission has completed critical milestones including pad abort tests and Vyommitra robot astronaut flights.',
    relatedIds: ['isro', 'narendra-modi'],
    timelineIds: ['gaganyaan-mission'],
  },
  {
    id: 'ayodhya-ram-mandir',
    type: 'Event',
    name: 'Ayodhya Ram Mandir',
    description: 'Consecration ceremony, January 2024',
    details: 'The Ram Mandir in Ayodhya, Uttar Pradesh, is a Hindu temple built at the site traditionally believed to be the birthplace of Lord Rama. The consecration ceremony (Pran Pratishtha) was held on January 22, 2024, led by Prime Minister Narendra Modi. The temple represents one of the largest religious monuments in the world.',
    relatedIds: ['narendra-modi', 'india'],
    image: '/images/people/ayodhya-ram-mandir.jpg',
  },
  {
    id: 'neet-2026-scandal',
    type: 'Event',
    name: 'NEET 2026 Scandal',
    description: 'Largest exam scandal in Indian history — 23L students affected',
    details: 'The NEET-UG 2026 examination, conducted for 2.3 million medical aspirants, was cancelled after a paper leak traced from a Rajasthan hostel to a Pune classroom. The CBI arrested 14 individuals, including a BTech graduate who solved papers from inside a locked room. The cancellation affected 2.3 million students and triggered nationwide protests.',
    relatedIds: ['india', 'neet-2026-the-exam-that-broke-india'],
    image: '/images/people/neet-2026-scandal.jpg',
  },
  {
    id: 'lucknow-fire-2026',
    type: 'Event',
    name: 'Lucknow Coaching Centre Fire',
    description: '15 dead in Aliganj fire — demolition order revoked in 2016',
    details: 'On June 22, 2026, a fire at a coaching centre in Lucknow\'s Aliganj area killed 15 students. The building had been approved for residential use but operated commercially for 12 years. A demolition order issued by LDA in 2016 was revoked after two months without explanation. The building fell below the 15-metre fire safety threshold, exempting it from mandatory fire NOC requirements.',
    relatedIds: ['india', 'lucknow-fire-tragedy'],
    image: '/images/people/lucknow-fire-2026.jpg',
  },
  {
    id: 'earth-prize-2026',
    type: 'Event',
    name: 'The Earth Prize 2026',
    description: 'Three Indian teens win $100K for microplastic-removing invention',
    details: 'Three 16-year-old Indian students — Vivaan Chhawchharia, Ariana Agarwal, and Avyana Mehta — won The Earth Prize 2026 for Plas-Stick, a tamarind-seed powder that removes microplastics from water using magnetic properties, without electricity. Their invention beat 6,000+ entries from 100+ countries.',
    relatedIds: ['plas-stick', 'india', 'earth-prize-2026-plas-stick'],
  },

  // ===== Countries =====
  {
    id: 'india',
    type: 'Country',
    name: 'India',
    description: 'Fastest-growing major economy, G20 president 2023',
    details: 'India, officially the Republic of India, is the world\'s most populous country and the fifth-largest economy by nominal GDP. With a GDP growth rate of 6.4% (FY26 Advance Estimate), India is the fastest-growing major economy. The country assumed the presidency of the G20 in 2023 and has positioned itself as a leader in digital public infrastructure, space exploration, and renewable energy.',
    relatedIds: ['narendra-modi', 'upi', 'isro', 'aadhaar', 'barc', 'nirmala-sitharaman'],
    timelineIds: ['digital-india', 'india-us-relations', 'india-china-border-tensions', 'indias-nuclear-programme'],
  },
  {
    id: 'china',
    type: 'Country',
    name: 'China',
    description: 'India\'s largest trade partner and primary strategic competitor',
    details: 'China is India\'s largest trading partner with bilateral trade exceeding $136 billion in 2025-26. However, the relationship remains strained due to the ongoing border standoff in eastern Ladakh, China\'s close ties with Pakistan, and competition in the Indo-Pacific. China\'s Lineshine supercomputer topped the TOP500 list in June 2026.',
    relatedIds: ['india', 'bangladesh-china-tarique-rahman-beijing-2026', 'china-lineshine-supercomputer-top500-2026'],
    timelineIds: ['india-china-border-tensions'],
    image: '/images/people/china.jpg',
  },
  {
    id: 'bangladesh',
    type: 'Country',
    name: 'Bangladesh',
    description: 'South Asian nation realigning towards China under Tarique Rahman',
    details: 'Bangladesh under PM Tarique Rahman has shifted its foreign policy axis towards China following a landmark June 2026 visit to Beijing. The 16-point joint communiqué included commitments on Teesta River water sharing, Mongla port development, and a China-Myanmar-Bangladesh Economic Corridor, with $1 billion in Chinese infrastructure financing.',
    relatedIds: ['tarique-rahman', 'china', 'bangladesh-china-tarique-rahman-beijing-2026'],
    image: '/images/people/bangladesh.jpg',
  },
  {
    id: 'united-states',
    type: 'Country',
    name: 'United States',
    description: 'India\'s largest export destination and strategic partner',
    details: 'The United States is India\'s largest export destination ($84B) and a comprehensive strategic partner. The India-US trade deal negotiations in 2026 aim to resolve outstanding tariff disputes and deepen cooperation in semiconductors, critical minerals, and defence technology. The US is also a key partner in the Quad and Indo-Pacific strategy.',
    relatedIds: ['india', 'india-us-trade-deal-2026', 'doval-wang-india-china-lac-normalisation-june-2026'],
    timelineIds: ['india-us-relations'],
    image: '/images/people/united-states.jpg',
  },
]

export function getEntity(id: string): KnowledgeEntity | undefined {
  return ENTITIES.find(e => e.id === id)
}

export function getEntityBySlug(slug: string): KnowledgeEntity | undefined {
  return ENTITIES.find(e => e.id === slug)
}

export function getRelatedEntities(entity: KnowledgeEntity): KnowledgeEntity[] {
  return entity.relatedIds
    .map(id => ENTITIES.find(e => e.id === id))
    .filter((e): e is KnowledgeEntity => e !== undefined)
}
