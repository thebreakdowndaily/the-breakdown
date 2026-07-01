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
    description: 'Three-term PM driving India\'s tech-industrial transformation',
    details: 'Narendra Modi, India\'s 14th Prime Minister since May 2014, has presided over the fastest sustained GDP expansion among major economies. His third term (2024–) prioritised semiconductor fabrication, green hydrogen, and AI infrastructure, backed by ₹76,000 crore in production-linked incentives across electronics and renewables. Key initiatives include the National Green Hydrogen Mission (₹19,744 crore), the IndiaAI Mission (₹10,372 crore), and the Nuclear Energy Mission (₹20,000 crore). The consecration of the Ayodhya Ram Mandir in January 2024 marked a defining cultural milestone of his tenure.',
    relatedIds: ['isro', 'barc', 'nirmala-sitharaman', 'ayodhya-ram-mandir', 'upi', 'nda'],
    timelineIds: ['digital-india', 'gaganyaan-mission'],
    image: '/images/people/narendra-modi.jpg',
  },
  {
    id: 'nirmala-sitharaman',
    type: 'Person',
    name: 'Nirmala Sitharaman',
    description: 'Seven-time Union Budget presenter — ₹76,000 cr deployed across PLI schemes',
    details: 'Nirmala Sitharaman has presented seven consecutive Union Budgets since May 2019, the longest uninterrupted stretch by any Indian finance minister. Union Budget 2025–26 allocated ₹20,000 crore to the Nuclear Energy Mission, ₹10,372 crore to the IndiaAI Mission, and extended the PLI scheme to 14 sectors. Her tenure has overseen a reduction in the corporate tax rate to 22% and implementation of the Production Linked Incentive scheme with a ₹1.97 lakh crore outlay. She is only the second woman to hold the finance portfolio after Indira Gandhi.',
    relatedIds: ['narendra-modi', 'india', 'production-linked-incentive'],
    image: '/images/people/nirmala-sitharaman.jpg',
  },
  {
    id: 'mamata-banerjee',
    type: 'Person',
    name: 'Mamata Banerjee',
    description: 'Three-term West Bengal CM who lost in 2026 — TMC reduced to 8 Lok Sabha seats',
    details: 'Mamata Banerjee founded the Trinamool Congress in 1998 and governed West Bengal for three consecutive terms (2011–2026). The 2026 Assembly election delivered a decisive defeat — Banerjee lost her own Bhabanipur constituency — triggering the worst internal crisis in TMC\'s 28-year history. Within weeks, 20 of 28 TMC Lok Sabha MPs defected to the NDA, reducing the party\'s parliamentary presence to its lowest since 2014.',
    relatedIds: ['india', 'tmc', 'nda'],
    image: '/images/people/mamata-banerjee.jpg',
  },
  {
    id: 'tarique-rahman',
    type: 'Person',
    name: 'Tarique Rahman',
    description: 'Bangladesh PM who signed 16-point Beijing communiqué in June 2026',
    details: 'Tarique Rahman, son of former Prime Minister Khaleda Zia, became Bangladesh\'s Prime Minister after the Bangladesh Nationalist Party returned to power. His six-day state visit to Beijing in June 2026 produced a 16-point joint communiqué, securing over $1 billion in Chinese infrastructure commitments. Key agreements covered the Teesta River water-sharing framework, development of Mongla port, and the China-Myanmar-Bangladesh Economic Corridor, marking a decisive shift in Dhaka\'s foreign policy axis.',
    relatedIds: ['bangladesh-china-tarique-rahman-beijing-2026', 'china', 'bangladesh'],
  },

  // ===== Organizations =====
  {
    id: 'isro',
    type: 'Organization',
    name: 'ISRO',
    description: 'India\'s space agency — 430+ satellite launches, one of six with full launch capability',
    details: 'The Indian Space Research Organisation (ISRO), headquartered in Bengaluru, has achieved 430+ satellite launches since 1975. Landmark missions include the Mars Orbiter Mission (MOM, 2014), Chandrayaan-3\'s lunar south pole landing (2023), and the Gaganyaan human spaceflight programme (budget: ₹9,023 crore). ISRO is one of only six space agencies globally with full launch, satellite, and deep-space capabilities.',
    relatedIds: ['gaganyaan-mission', 'narendra-modi'],
    timelineIds: ['gaganyaan-mission'],
  },
  {
    id: 'barc',
    type: 'Organization',
    name: 'BARC',
    description: 'India\'s premier nuclear R&D centre — developed copper-chlorine cycle for world-first nuclear hydrogen plant',
    details: 'The Bhabha Atomic Research Centre (BARC), headquartered in Trombay, Mumbai, is India\'s oldest and largest nuclear research facility, established in 1954 as the Atomic Energy Establishment and renamed after Dr Homi J. Bhabha in 1967. BARC developed the copper-chlorine thermochemical cycle that powers the world\'s first nuclear hydrogen plant at Kalpakkam, commissioned in 2026. The facility also leads India\'s research in fast-breeder reactors, radiopharmaceuticals, and radiation safety.',
    relatedIds: ['national-green-hydrogen-mission', 'narendra-modi', 'india', 'nuclear-hydrogen-kalpakkam'],
    timelineIds: ['indias-nuclear-programme'],
    image: '/images/people/barc.jpg',
  },
  {
    id: 'tata-electronics',
    type: 'Organization',
    name: 'Tata Electronics',
    description: 'Tata Group chipmaker — 630GB trade-secret leak via World Leaks ransomware',
    details: 'Tata Electronics, the semiconductor and electronics manufacturing arm of the Tata Group, entered iPhone production in 2023 by acquiring Wistron\'s India operations. It expanded in 2024 by taking a 60% stake in Pegatron\'s India business. In June 2026, the company suffered a ransomware attack by World Leaks that exfiltrated 204,300 files (630GB) containing Apple and Tesla trade secrets, subsequently leaked on the dark web.',
    relatedIds: ['india', 'world-leaks'],
    image: '/images/people/tata-electronics.jpg',
  },
  {
    id: 'anthropic',
    type: 'Organization',
    name: 'Anthropic',
    description: 'AI safety company whose Mythos model sparked global regulatory debate in June 2026',
    details: 'Anthropic, founded in 2021 by former OpenAI researchers, released Mythos in June 2026 — an AI model capable of autonomously discovering zero-day vulnerabilities. Its restricted public version, Fable 5, was suspended within weeks amid global regulatory pushback. The release triggered a 12% single-day decline in cybersecurity insurance stocks and accelerated AI governance discussions at the India AI Impact Summit 2026.',
    relatedIds: ['anthropic-mythos-ai-2026', 'india-ai-governance-guidelines-impact-summit-2026', 'india'],
    image: '/images/people/anthropic.jpg',
  },
  {
    id: 'world-leaks',
    type: 'Organization',
    name: 'World Leaks',
    description: 'Ransomware group — 125+ victims, exfiltrated Tata Electronics, Dell, Nike data',
    details: 'World Leaks emerged in January 2025 as a rebrand of Hunters International, inheriting code and infrastructure from the Hive ransomware operation dismantled by the FBI in 2023. The group operates an Extortion-as-a-Service model, exfiltrating data via compromised VPN credentials and publishing it on dedicated dark-web leak sites. It has claimed over 125 victims globally, with the United States and India as primary targets. Notable breaches include Tata Electronics (630GB), Dell, and Nike.',
    relatedIds: ['tata-electronics'],
  },
  {
    id: 'cbi',
    type: 'Organization',
    name: 'CBI',
    description: 'India\'s apex investigative agency — led NEET 2026 paper-leak probe, 14 arrested',
    details: 'The Central Bureau of Investigation (CBI) is India\'s premier criminal investigation agency, operating under the Ministry of Personnel, Public Grievances and Pensions. It handles high-profile cases spanning economic offences, corruption, and organised crime. In 2026, the CBI led the investigation into the NEET-UG paper leak, arresting 14 individuals across four states, and conducted multi-agency raids in the Lucknow coaching centre fire case.',
    relatedIds: ['neet-2026-scandal', 'lucknow-fire-2026', 'india'],
  },
  {
    id: 'tmc',
    type: 'Organization',
    name: 'Trinamool Congress',
    description: 'West Bengal\'s former ruling party — 20 of 28 Lok Sabha MPs defected to NDA in 2026',
    details: 'The Trinamool Congress (TMC), founded by Mamata Banerjee in 1998, governed West Bengal for three consecutive terms until the 2026 Assembly election. Following Banerjee\'s defeat in Bhabanipur, 20 of the party\'s 28 Lok Sabha MPs defected to the NDA, reducing the TMC\'s parliamentary presence to eight seats. The party\'s organisational structure is under strain as internal factions compete for leadership.',
    relatedIds: ['mamata-banerjee', 'nda', 'india'],
  },
  {
    id: 'nda',
    type: 'Organization',
    name: 'National Democratic Alliance',
    description: 'Centre-right ruling coalition — 340+ Lok Sabha seats after 2026 TMC defections',
    details: 'The National Democratic Alliance (NDA) is the ruling coalition of centre-right political parties led by the Bharatiya Janata Party (BJP). In 2026, the NDA\'s parliamentary majority expanded significantly after 20 of 28 TMC Lok Sabha MPs defected to the alliance, marking the largest cross-floor realignment since the 2014 general election. The coalition currently holds 340+ seats in the Lok Sabha.',
    relatedIds: ['narendra-modi', 'india', 'tmc'],
  },

  // ===== Technologies =====
  {
    id: 'upi',
    type: 'Technology',
    name: 'UPI',
    description: 'Real-time payment system — 14B+ monthly transactions, exported to 30+ countries',
    details: 'The Unified Payments Interface (UPI), developed by the National Payments Corporation of India (NPCI) and launched in 2016, processes over 14 billion transactions monthly as of 2026 — the highest volume of any real-time payment system globally. UPI has been exported to 30+ countries including France, Singapore, and the UAE, and serves as the transactional layer of the India Stack alongside Aadhaar and DigiLocker.',
    relatedIds: ['aadhaar', 'india', 'narendra-modi'],
    timelineIds: ['digital-india'],
  },
  {
    id: '5g-bharat',
    type: 'Technology',
    name: '5G Bharat',
    description: 'Indigenous 5G stack — deployed across 700+ districts, reducing foreign vendor reliance',
    details: '5G Bharat is India\'s domestically developed 5G telecom stack, built by a consortium led by the Centre for Development of Telematics (C-DOT). The network has been deployed across 700+ districts, reducing reliance on Huawei, Ericsson, and Nokia for radio access equipment. The stack is being marketed to Global South nations as an affordable alternative to Western and Chinese 5G infrastructure.',
    relatedIds: ['india', 'upi'],
    image: '/images/people/5g-bharat.jpg',
  },
  {
    id: 'aadhaar',
    type: 'Technology',
    name: 'Aadhaar',
    description: 'World\'s largest biometric ID — 1.4B+ enrolments, 99.9% adult coverage',
    details: 'Aadhaar, managed by the Unique Identification Authority of India (UIDAI), has enrolled over 1.4 billion residents, covering 99.9% of Indian adults. Each Aadhaar number links to biometric (fingerprints, iris scans) and demographic data. The system serves as the foundational identity layer of India Stack, enabling Direct Benefit Transfers that have saved the government an estimated ₹1.7 lakh crore by eliminating duplicate and fake beneficiaries.',
    relatedIds: ['upi', 'india', 'narendra-modi'],
    timelineIds: ['digital-india'],
    image: '/images/people/aadhaar.jpg',
  },
  {
    id: 'plas-stick',
    type: 'Technology',
    name: 'Plas-Stick',
    description: 'Tamarind-seed magnetic powder that removes microplastics — won The Earth Prize 2026',
    details: 'Plas-Stick was invented by three 16-year-old Indian students — Vivaan Chhawchharia, Ariana Agarwal, and Avyana Mehta — who converted waste tamarind seeds into a magnetic powder capable of removing microplastics from water without electricity. The invention won The Earth Prize 2026, beating 6,000+ entries from 100+ countries, and earned a $100,000 grand prize. The team is pursuing a patent and pilot trials with municipal water treatment plants.',
    relatedIds: ['earth-prize-2026-plas-stick', 'india'],
  },
  {
    id: 'nuclear-hydrogen-kalpakkam',
    type: 'Technology',
    name: 'Kalpakkam Nuclear Hydrogen Plant',
    description: 'World\'s first nuclear-powered hydrogen plant — commissioned 2026, 10 tonnes/day',
    details: 'The Kalpakkam nuclear hydrogen plant, developed by BARC, is the world\'s first facility to produce hydrogen using nuclear energy via the copper-chlorine thermochemical cycle. Commissioned in 2026, the plant uses process heat from the Madras Atomic Power Station to split water molecules, producing carbon-free hydrogen. The 10-tonne-per-day pilot facility feeds into India\'s National Green Hydrogen Mission and demonstrates a pathway to baseload hydrogen production independent of intermittent renewables.',
    relatedIds: ['barc', 'national-green-hydrogen-mission', 'india'],
  },

  // ===== Policies =====
  {
    id: 'national-green-hydrogen-mission',
    type: 'Policy',
    name: 'National Green Hydrogen Mission',
    description: '₹19,744 crore mission — target of 5 MMT annual green hydrogen by 2030',
    details: 'The National Green Hydrogen Mission (NGHM), approved in January 2023 with a ₹19,744 crore outlay, aims to establish India as a global hub for green hydrogen production. The mission targets 5 million metric tonnes (MMT) of annual capacity by 2030, backed by 125 GW of renewable energy capacity. The SIGHT programme provides ₹17,490 crore in production-linked incentives for electrolyser manufacturing and green hydrogen production. The world\'s first nuclear hydrogen plant at Kalpakkam feeds directly into this mission.',
    relatedIds: ['barc', 'india', 'narendra-modi', 'nuclear-hydrogen-kalpakkam'],
  },
  {
    id: 'production-linked-incentive',
    type: 'Policy',
    name: 'Production Linked Incentive (PLI)',
    description: '₹1.97 lakh crore manufacturing incentive — 14 sectors, ₹1.10 lakh crore committed',
    details: 'The Production Linked Incentive (PLI) scheme, launched in 2020, provides output-linked fiscal incentives across 14 sectors including electronics, automobiles, pharmaceuticals, textiles, telecom, and renewable energy. The total government outlay is ₹1.97 lakh crore, with incentives ranging from 1% to 20% of incremental sales. As of 2026, the scheme has attracted ₹1.10 lakh crore in committed investment and generated 7.5 million jobs, though disbursement has lagged targets.',
    relatedIds: ['narendra-modi', 'nirmala-sitharaman', 'india'],
  },
  {
    id: 'dpdp-act',
    type: 'Policy',
    name: 'Digital Personal Data Protection Act',
    description: 'India\'s first data privacy law — 180-day compliance deadline, ₹250 crore penalties',
    details: 'The Digital Personal Data Protection (DPDP) Act, 2023, is India\'s first comprehensive data protection framework. In 2026, the government fast-tracked compliance requirements, mandating that significant data fiduciaries appoint Data Protection Officers, implement breach notification systems, and conduct data audits within 180 days. Non-compliance carries penalties of up to ₹250 crore. The law exempts government entities from key provisions, drawing criticism from privacy advocates.',
    relatedIds: ['india-digital-regulation-offensive-2026-dpdp-it-ru', 'india'],
  },
  {
    id: 'india-ai-governance',
    type: 'Policy',
    name: 'India AI Governance Guidelines',
    description: 'Principle-based AI regulation — seven sutras framework, three new institutions',
    details: 'India unveiled its AI Governance Guidelines at the AI Impact Summit 2026, adopting a principle-based approach organised around seven sutras: fairness, accountability, transparency, safety, privacy, security, and human oversight. The guidelines establish three new regulatory institutions: the AI Governance Group (AIGG), the Technical and Ethical Policy Committee (TPEC), and the AI Safety Institute (AISI). Unlike the EU\'s risk-tiered AI Act, India\'s framework is principle-based and non-binding, prioritising innovation while providing guardrails.',
    relatedIds: ['india-ai-governance-guidelines-impact-summit-2026', 'anthropic', 'india'],
  },

  // ===== Events =====
  {
    id: 'gaganyaan-mission',
    type: 'Event',
    name: 'Gaganyaan Mission',
    description: 'India\'s first crewed spaceflight — ₹9,023 crore programme, targeted for 2026',
    details: 'Gaganyaan is India\'s first human spaceflight programme, announced in Prime Minister Modi\'s 2018 Independence Day address. The mission aims to launch a crew of three astronauts into a 400 km low-Earth orbit and return them safely. With a budget of ₹9,023 crore, it has completed critical milestones including pad abort tests, crew module atmospheric re-entry validation, and Vyommitra (robotic astronaut) flights aboard GSLV Mk III.',
    relatedIds: ['isro', 'narendra-modi'],
    timelineIds: ['gaganyaan-mission'],
  },
  {
    id: 'ayodhya-ram-mandir',
    type: 'Event',
    name: 'Ayodhya Ram Mandir',
    description: 'Consecrated January 22, 2024 — India\'s largest religious monument on a 70-acre complex',
    details: 'The Ram Mandir in Ayodhya, Uttar Pradesh, was consecrated in a Pran Pratishtha ceremony on January 22, 2024, led by Prime Minister Narendra Modi. The temple complex spans 70 acres and ranks among the world\'s largest religious monuments, built at the site traditionally believed to be the birthplace of Lord Rama. The Supreme Court\'s landmark November 2019 verdict awarded the disputed 2.77-acre land for temple construction and allocated an alternative 5-acre plot for a mosque.',
    relatedIds: ['narendra-modi', 'india'],
    image: '/images/people/ayodhya-ram-mandir.jpg',
  },
  {
    id: 'neet-2026-scandal',
    type: 'Event',
    name: 'NEET 2026 Scandal',
    description: 'Largest exam leak in Indian history — 2.3 million aspirants affected, CBI arrested 14',
    details: 'The NEET-UG 2026 medical entrance examination was cancelled after a paper leak traced from a Rajasthan hostel to a classroom in Pune. The CBI arrested 14 individuals, including a BTech graduate who solved question papers from inside a locked room using a hidden smartphone. The cancellation affected 2.3 million medical aspirants, disrupted the academic calendar by at least six months, and triggered nationwide student protests demanding exam security reforms.',
    relatedIds: ['india', 'cbi', 'neet-2026-the-exam-that-broke-india'],
    image: '/images/people/neet-2026-scandal.jpg',
  },
  {
    id: 'lucknow-fire-2026',
    type: 'Event',
    name: 'Lucknow Coaching Centre Fire',
    description: '15 students died in Aliganj — building operated commercially for 12 years without fire NOC',
    details: 'On June 22, 2026, a fire at a coaching centre in Lucknow\'s Aliganj neighbourhood killed 15 students. The building, approved for residential use, had operated commercially for 12 years without fire NOC. A 2016 demolition order issued by the Lucknow Development Authority was revoked after two months without explanation. The building fell below the 15-metre height threshold, exempting it from mandatory fire safety clearance requirements.',
    relatedIds: ['india', 'cbi', 'lucknow-fire-tragedy'],
    image: '/images/people/lucknow-fire-2026.jpg',
  },
  {
    id: 'earth-prize-2026',
    type: 'Event',
    name: 'The Earth Prize 2026',
    description: '$100,000 prize won by three Indian teens for Plas-Stick microplastic removal invention',
    details: 'The Earth Prize 2026 was awarded to three 16-year-old Indian students — Vivaan Chhawchharia, Ariana Agarwal, and Avyana Mehta — for Plas-Stick, a tamarind-seed-based powder that removes microplastics from water using magnetic properties without electricity. The prize, endowed by the Swiss-based Earth Foundation, received 6,000+ entries from 100+ countries and carries a $100,000 grand prize. The team is pursuing patent protection and pilot trials with municipal water treatment plants.',
    relatedIds: ['plas-stick', 'india', 'earth-prize-2026-plas-stick'],
  },

  // ===== Countries =====
  {
    id: 'india',
    type: 'Country',
    name: 'India',
    description: 'Fastest-growing major economy — 6.4% GDP growth, fifth-largest by nominal GDP',
    details: 'India is the world\'s most populous country (1.45 billion) and the fifth-largest economy by nominal GDP ($3.7 trillion). GDP growth stood at 6.4% in FY26 (Advance Estimate), the fastest among major economies. India held the G20 presidency in 2023 and has positioned itself as a leader in digital public infrastructure (India Stack), space exploration (Chandrayaan-3, Gaganyaan), and renewable energy (500 GW installed capacity target by 2030).',
    relatedIds: ['narendra-modi', 'upi', 'isro', 'aadhaar', 'barc', 'nirmala-sitharaman'],
    timelineIds: ['digital-india', 'india-us-relations', 'india-china-border-tensions', 'indias-nuclear-programme'],
  },
  {
    id: 'china',
    type: 'Country',
    name: 'China',
    description: 'India\'s largest trade partner ($136B) and primary strategic competitor — border standoff ongoing',
    details: 'China is India\'s largest trading partner, with bilateral trade surpassing $136 billion in FY26. However, the relationship remains defined by strategic rivalry — the border standoff in eastern Ladakh has persisted since May 2020, China maintains close military ties with Pakistan, and the two nations compete for influence in the Indo-Pacific. China\'s Lineshine supercomputer topped the TOP500 list in June 2026 with 3.2 exaflops of computing power.',
    relatedIds: ['india', 'bangladesh-china-tarique-rahman-beijing-2026', 'china-lineshine-supercomputer-top500-2026'],
    timelineIds: ['india-china-border-tensions'],
    image: '/images/people/china.jpg',
  },
  {
    id: 'bangladesh',
    type: 'Country',
    name: 'Bangladesh',
    description: 'South Asian nation realigning toward Beijing under PM Tarique Rahman',
    details: 'Bangladesh under Prime Minister Tarique Rahman has executed a decisive foreign policy realignment toward China. A landmark six-day state visit to Beijing in June 2026 produced a 16-point joint communiqué, $1 billion in Chinese infrastructure financing, and strategic agreements on Teesta River water sharing and Mongla port development. The shift marks a departure from the Hasina-era balancing act between India and China.',
    relatedIds: ['tarique-rahman', 'china', 'bangladesh-china-tarique-rahman-beijing-2026'],
    image: '/images/people/bangladesh.jpg',
  },
  {
    id: 'united-states',
    type: 'Country',
    name: 'United States',
    description: 'India\'s largest export market ($84B) — trade deal negotiations, Quad partner',
    details: 'The United States is India\'s largest export destination ($84 billion in FY26) and a comprehensive strategic partner. India-US trade deal negotiations in 2026 seek to resolve tariff disputes on steel, aluminium, and agricultural goods while deepening cooperation in semiconductors, critical minerals, and defence technology. The US is India\'s primary partner in the Quadrilateral Security Dialogue (Quad) alongside Japan and Australia.',
    relatedIds: ['india', 'india-us-trade-deal-2026', 'doval-wang-india-china-lac-normalisation-june-2026'],
    timelineIds: ['india-us-relations'],
    image: '/images/people/united-states.jpg',
  },
  {
    id: 'iran',
    type: 'Country',
    name: 'Iran',
    description: 'Strategic Middle Eastern partner — Chabahar Port grants India access to Central Asia',
    details: 'Iran remains a strategic partner for India, primarily through the Chabahar Port project, which provides India with a trade corridor to Afghanistan and Central Asia bypassing Pakistan. Bilateral trade stood at $2.3 billion in FY26, centred on crude oil, basmati rice, and tea. India continues to navigate US sanctions on Iran while pursuing connectivity projects under the International North-South Transport Corridor (INSTC).',
    relatedIds: ['india'],
  },
  {
    id: 'venezuela',
    type: 'Country',
    name: 'Venezuela',
    description: 'OPEC nation with world\'s largest oil reserves (303B barrels) — India resumed crude imports in 2026',
    details: 'Venezuela holds the world\'s largest proven oil reserves at 303 billion barrels. India resumed crude oil imports from Venezuela in 2026 after US sanctions were partially relaxed, with Reliance Industries and Nayara Energy processing Venezuelan heavy crude. The Maduro government\'s political and economic crisis continues — inflation exceeds 400% annually, and the opposition remains in disarray following the disputed 2024 presidential election.',
    relatedIds: ['india'],
  },
  {
    id: 'canada',
    type: 'Country',
    name: 'Canada',
    description: 'Key potash supplier (40% of India\'s imports) — bilateral ties strained since 2023',
    details: 'India-Canada relations remain strained following the 2023 diplomatic rupture over the Nijjar killing allegations. Despite political tensions, bilateral trade reached $8.2 billion in FY26. Canada supplies 40% of India\'s potash imports and is a key source of lentils and critical minerals for EV batteries. Canada is home to 1.6 million persons of Indian origin — the largest Indian diaspora community after the United States.',
    relatedIds: ['india'],
  },
  {
    id: 'france',
    type: 'Country',
    name: 'France',
    description: 'India\'s foremost European defence partner — €15B+ in defence trade since 2015',
    details: 'France is India\'s most reliable European defence partner, supplying Rafale fighter jets, Scorpène-class submarines, and civilian nuclear technology for the Jaitapur power project. Defence trade has exceeded €15 billion since 2015. France was the first country to accept UPI payments at the Eiffel Tower (2025) and supports India\'s bid for permanent membership in the UN Security Council.',
    relatedIds: ['india'],
  },
  {
    id: 'uk',
    type: 'Country',
    name: 'United Kingdom',
    description: 'India\'s second-largest FDI source — £36B bilateral trade, FTA talks stalled',
    details: 'The United Kingdom is India\'s second-largest source of foreign direct investment (cumulative $35 billion) and a key partner in ongoing Comprehensive Economic Partnership Agreement (CEPA) negotiations. Bilateral trade reached £36 billion in FY26. The UK-India Living Bridge — 1.8 million people of Indian origin — drives services trade in fintech, IT, and pharmaceuticals. FTA talks remain stalled over visa liberalisation and tariff reductions on Scotch whisky and automobiles.',
    relatedIds: ['india'],
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
