export interface FixStoryMetric {
  label: string
  value: string
}

export interface FixStory {
  slug: string
  title: string
  summary: string
  category: 'Health' | 'Education' | 'Energy' | 'Economy' | 'Infrastructure' | 'Environment'
  status: 'In Progress' | 'Proposed' | 'Implemented' | 'Under Review'
  priority: 'High' | 'Medium' | 'Low'
  metrics: FixStoryMetric[]
  systemAnalysis: string
  governmentAction: string
  citizenAction: string
  budget: string
  globalComparison: string
}

export const FIX_STORIES: FixStory[] = [
  {
    slug: 'fixing-indias-nuclear-energy-capacity',
    title: "Fixing India's Nuclear Energy Capacity",
    summary: 'With 7.48 GW installed capacity from 22 reactors, India generates just 3% of its electricity from nuclear — the lowest among major economies. The Nuclear Energy Mission targets 22 GW by 2032 and 100 GW by 2047, but past cost overruns and execution delays remain barriers.',
    category: 'Energy',
    status: 'In Progress',
    priority: 'High',
    metrics: [
      { label: 'Current Capacity', value: '7.48 GW' },
      { label: '2030 Target', value: '22 GW' },
      { label: '2047 Target', value: '100 GW' },
      { label: 'Budget Allocated', value: '₹20,000 Cr' },
    ],
    systemAnalysis: 'India\'s nuclear stagnation has structural roots: the Atomic Energy Act 1962 creates a DAE-NPCIL monopoly that suppresses competitive pricing; the Civil Liability for Nuclear Damage Act 2010 deters foreign suppliers due to unlimited operator liability; land acquisition at Jaitapur (6.6 GW, shelved since 2011) and Kovvada (5 GW, 2015) remains stalled; and uranium fuel supply requires NSG-specific safeguards compliance despite the 2008 waiver.',
    governmentAction: 'Budget 2024-25 allocated ₹20,000 Cr for nuclear; Atomic Energy Act amended in 2024 to allow NPCIL joint ventures with PSUs (NTPC, NALCO, Indian Oil); 10 PHWR-700 units approved in fleet mode across 5 sites; Bharat Small Reactors (220 MW) and SMR R&D with ₹8,500 Cr; siting clearances for 5 new nuclear parks.',
    citizenAction: 'Participate in AERB-mandated public hearings for new plant siting (notices published in local newspapers and district portals). Residents near existing sites can access CSR-funded skilling programmes run by NPCIL. Submit comments on DAE consultations for SMR policy and liability framework amendments.',
    budget: '₹20,000 Cr Nuclear Energy Mission + ₹8,500 Cr for SMR R&D (FY25-30). NPCIL capex: ₹12,000 Cr (FY26). Cumulative investment requirement for 100 GW: ~₹12 lakh Cr at current capital costs ($3-5M/MW for PHWR).',
    globalComparison: 'China: 56 GW operational, 23 under construction, 200 GW target by 2035. France: 65% nuclear electricity, new EPR2 fleet at €51.7B. South Korea: 25 reactors (28 GW), APR-1400 export to UAE. India\'s 7.48 GW is comparable to 2001-level China. Its homegrown PHWR technology gives cost control but fleet deployment speed is 5x slower than Chinese build-out.',
  },
  {
    slug: 'green-hydrogen-adoption',
    title: 'Green Hydrogen Adoption',
    summary: 'India\'s ₹19,744 Cr National Green Hydrogen Mission targets 5 MMT/yr by 2030, leveraging the world\'s cheapest solar tariffs ($0.03/kWh). But at $4-5/kg, green hydrogen costs 3x grey hydrogen, and operational electrolyser capacity stands at just 10 MW — 1% of Germany\'s.',
    category: 'Energy',
    status: 'In Progress',
    priority: 'High',
    metrics: [
      { label: 'Mission Outlay', value: '₹19,744 Cr' },
      { label: 'Target Production', value: '5 MMT/yr' },
      { label: '2030 Timeline', value: 'By 2030' },
      { label: 'Jobs Target', value: '6 Lakh' },
    ],
    systemAnalysis: 'Green hydrogen at $4-5/kg faces a steep cost curve to reach $2/kg viability for refining, fertiliser, and steel offtake. India has negligible domestic PEM electrolyser supply chain (import dependence: 90%). Water availability: 9 m³/kg H2 in electrolysis competes with agriculture in arid hydrogen-hub states (Gujarat, Rajasthan). ISTS waiver reduces cost by $0.3-0.5/kg but transmission bottlenecks persist.',
    governmentAction: 'NGHM (Jan 2023) with ₹19,744 Cr: ₹17,490 Cr SIGHT production incentives over 8 years, ₹1,466 Cr pilot projects in shipping and steel decarbonisation, ₹788 Cr R&D. Mandatory green hydrogen consumption quotas: 15% for refineries (FY26), escalating to 25% by FY30. ISTS charge waiver for 25 years. State-level subsidies in Gujarat, Tamil Nadu, and Karnataka for electrolyser manufacturing.',
    citizenAction: 'Engineers can target electrolyser and fuel-cell skilling via SIGHT-certified programmes. Communities in identified hydrogen hubs (Kandla, Tuticorin, Paradip) can participate in district planning for water allocation and port infrastructure. Consumers can prefer products from certified green-hydrogen supply chains (steel, fertiliser).',
    budget: '₹19,744 Cr total: ₹17,490 Cr SIGHT, ₹1,466 Cr pilots, ₹788 Cr R&D, ₹9 Cr HR. State subsidies: Gujarat (₹500 Cr), Tamil Nadu (₹300 Cr), Karnataka (₹250 Cr) for electrolyser manufacturing. First tranche awarded: 412,000 tonnes capacity at incentive rates of ₹50-100/kg H2.',
    globalComparison: 'China: 200,000 tonnes/yr target, 60% of global electrolyser manufacturing (Longi, Sungrow). EU: 10 MMT imports by 2030 via H2Global auction. Australia: $50B Western Green Hydrogen Hub. Germany: 88 MW operational electrolysis. India\'s renewable cost advantage ($0.03/kWh vs EU $0.08) is real, but its operational capacity (10 MW) is 9x behind Germany and 50x behind China\'s build rate.',
  },
  {
    slug: 'national-education-policy-implementation',
    title: 'National Education Policy Implementation',
    summary: 'NEP 2020 restructures India\'s $200B education system around a 5+3+3+4 framework, but five years on, only 18 states have adopted the new curricular structure. Higher education GER stands at 27% — half the government\'s own 2035 target of 50%.',
    category: 'Education',
    status: 'In Progress',
    priority: 'High',
    metrics: [
      { label: 'GER Target 2035', value: '50%' },
      { label: 'Current GER', value: '27%' },
      { label: 'Budget Allocation 2025', value: '₹1.48L Cr' },
      { label: 'Schools to Transform', value: '14.9 Lakh' },
    ],
    systemAnalysis: 'India\'s education system faces three structural deficits: funding (3.5% of GDP vs 6% recommended), teacher vacancies (1.2M of 9.7M posts unfilled), and regulatory fragmentation across UGC, AICTE, NCTE, and 32 state boards. GER in higher education (27%) trails China (64%) and Brazil (51%). The 10+2 system offers no vocational stream — NEP\'s Class 6 vocational integration addresses this, but state capacity for implementation varies widely.',
    governmentAction: 'NEP implementation: 5+3+3+4 structure with NCF 2023 released; CUET mandatory for 45 central universities; Academic Bank of Credits operationalised with 100+ HEIs; four-year Integrated Teacher Education Programme (ITEP) launched; NRF established with ₹50,000 Cr corpus; NHEQF notified; 200+ institutions granted autonomous status.',
    citizenAction: 'Parents can choose NEP-aligned schools through state education department portals. Students can leverage ABC for multi-exit UG degrees. Teachers can access NISHTHA online training (3.0 version with NEP modules). Public feedback on NCF revisions via NCERT website. Communities can monitor school development through School Management Committees.',
    budget: 'Union Budget FY26: ₹1.48 lakh Cr (3.5% of total) — below NEP\'s 6% of GDP recommendation. Major schemes: Samagra Shiksha ₹39,311 Cr, PM-USHA ₹6,000 Cr, PM SHRI ₹6,000 Cr, PM-Vidyalaxmi education loans. Total education expenditure (Centre + States): ~₹11.5 lakh Cr (4.6% of GDP).',
    globalComparison: 'Finland: 7.2% of GDP on education, 92% higher-ed GER, play-based early learning. China: 64% GER, 2,100 universities, 4% GDP spend but 2x India in per-student expenditure. US: 6.1% of GDP, 88% GER, $40K+/student/year. India\'s challenge is scale: 1.5M schools and 260M students — larger than the entire US population — makes per-student spending dilution structural.',
  },
  {
    slug: 'air-pollution-delhi-ncr',
    title: 'Air Pollution in Delhi-NCR',
    summary: 'Delhi\'s winter AQI routinely exceeds 350 — 7x the WHO safe limit. The government\'s Graded Response Action Plan (GRAP) imposes emergency measures at 4 AQI thresholds, but annual average PM2.5 (98 µg/m³) remains 3x India\'s own national standard of 40 µg/m³.',
    category: 'Environment',
    status: 'Under Review',
    priority: 'High',
    metrics: [
      { label: 'Avg AQI (Winter)', value: '350+' },
      { label: 'Annual Deaths Attributed', value: '1.2 Lakh' },
      { label: 'GRAP Stages', value: '4 Levels' },
      { label: 'CAQM Budget', value: '₹700 Cr' },
    ],
    systemAnalysis: 'Delhi\'s pollution sources: vehicular emissions (28%), stubble burning (25% Oct-Nov peak), industrial (20%), construction dust (15%), household fuel (12%). Thermal inversion and low wind speeds in winter trap PM2.5 at ground level. Governance failure: Delhi, UP, Haryana, and Rajasthan have separate pollution control boards with no unified airshed management — despite Supreme Court directions since 2015.',
    governmentAction: 'GRAP Stage I-IV imposed at AQI 201+, 301+, 401+, 450+ respectively. CAQM (formed 2021, replacing EPCA) can issue binding directions to 4 NCR states. Measures: BS-VI since 2020; Pusa bio-decomposer spray on 2,000+ hectares; 1,700 MW gas-based power plant for winter; 2 smog towers (Connaught Place, Anand Vihar) with 70% PM2.5 reduction claims.',
    citizenAction: 'Use SAFAR/CPCB/ Sameer apps for real-time AQI and stage alerts. Carpooling, metro, and CNG buses reduce per-capita contribution. Report construction dust and waste burning via Sameer app. Farmers: Pusa bio-decomposer (free through state agriculture dept) decomposes stubble in 20 days vs 45 days for natural decay.',
    budget: 'CAQM operations: ₹700 Cr. NCAP (131 non-attainment cities): ₹7,600 Cr. FAME II EV subsidies: ₹10,000 Cr. Delhi CNG conversion (DTC + cluster buses): ₹2,300 Cr. Metro expansion Phase IV: ₹28,000 Cr. Total clean air expenditure across NCR: ~₹50,000 Cr.',
    globalComparison: 'Beijing: PM2.5 reduced 58% (2013-22) via coal-to-gas conversion (4.8M households), industrial relocation, and odd-even driving. London: ULEZ expanded to all boroughs in 2023 — 15% NOx reduction in first year. Mexico City: "Hoy No Circula" achieved 11% PM reduction but induced second-car ownership. Delhi\'s challenge is uniquely acute: 33M people, multi-state governance, and geography (Himalayan foothills trap pollutants).',
  },
  {
    slug: 'water-crisis-management',
    title: 'Water Crisis Management',
    summary: 'Per capita water availability has fallen 71% since 1951 to 1,486 m³ — approaching the 1,000 m³ water-scarcity threshold. The Jal Jeevan Mission has raised rural tap coverage from 17% to 74%, but groundwater depletion, interstate disputes, and contamination remain unresolved.',
    category: 'Infrastructure',
    status: 'In Progress',
    priority: 'High',
    metrics: [
      { label: 'Tap Connections Delivered', value: '14.5 Cr' },
      { label: 'Target Households', value: '19.4 Cr' },
      { label: 'Mission Budget', value: '₹3.6L Cr' },
      { label: 'Completion Target', value: '2028' },
    ],
    systemAnalysis: 'India\'s water crisis is a demand-supply fracture: per capita availability fell from 5,177 m³ (1951) to 1,486 m³ (2023); 73% of wells in Punjab, Haryana, and Rajasthan show declining water tables; inter-state disputes (Cauvery, Krishna, Godavari, Ravi-Beas) remain unresolved for decades; 1.4 Cr rural habitations have arsenic/fluoride contamination above BIS permissible limits; only 8% of wastewater is treated before discharge.',
    governmentAction: 'JJM (2019): ₹3.6 lakh Cr, 14.5 Cr tap connections (74% coverage), 15+ Lakh villages. Atal Bhujal Yojana (₹6,000 Cr): groundwater management in 8,300 water-stressed gram panchayats. Jal Shakti Abhiyan: "Catch the Rain" campaign with 5 L+ rainwater harvesting structures. National Water Mission: 20% water-use efficiency improvement target. Namami Gange (₹22,500 Cr): river rejuvenation.',
    citizenAction: 'Households: apply for JJM connections via district portal; report leaks on "Jal" app. Villages: form VWSC with 10-15 members for O&M (5% capital cost contribution required). Rooftop rainwater harvesting mandatory in 18 states — ₹5,000-15,000 subsidy available. Farmers: micro-irrigation under PM-KUSUM (60% subsidy for drip/sprinkler).',
    budget: 'JJM: ₹3.6 lakh Cr (Centre ₹2.08L Cr, State ₹1.52L Cr). PM-KUSUM: ₹34,422 Cr. Atal Bhujal Yojana: ₹6,000 Cr. Namami Gange: ₹22,500 Cr. National River Conservation Plan: ₹13,800 Cr. State water budgets: ~₹50,000 Cr additional.',
    globalComparison: 'Israel: 86% wastewater recycling, 75% drip-irrigated agriculture, desalination provides 70% of domestic water. Singapore: NEWater meets 40% demand, desalination 30%. Australia: Murray-Darling Basin Plan uses water markets with $13B in buybacks for environmental flows. India\'s water productivity ($3.5/m³) is 5x below Israel ($19/m³). JJM\'s 19 Cr household scale is globally unprecedented but O&M sustainability post-2028 is unaddressed.',
  },
  {
    slug: 'digital-health-infrastructure',
    title: 'Digital Health Infrastructure',
    summary: 'The Ayushman Bharat Digital Mission has created 67 Cr ABHA health IDs in 3 years — the world\'s fastest digital health rollout. But only 4.2 Lakh of India\'s 12 Lakh+ healthcare facilities are registered, and the 1:834 doctor-patient ratio hides extreme urban-rural maldistribution.',
    category: 'Health',
    status: 'In Progress',
    priority: 'Medium',
    metrics: [
      { label: 'Health IDs Created', value: '67 Cr' },
      { label: 'Registered Facilities', value: '4.2 Lakh' },
      { label: 'Registered Doctors', value: '3.8 Lakh' },
      { label: 'ABDM Budget', value: '₹1,600 Cr' },
    ],
    systemAnalysis: 'India\'s healthcare system suffers data fragmentation: no unified patient record across public and private providers, manual insurance claims processing (average 30-day settlement), and 74% of doctors concentrated in urban areas serving 34% of the population. Rural PHCs lack digital infrastructure — only 15% have functional IT systems. ABDM\'s interoperability framework (FHIR R4) addresses this but adoption by private hospitals remains voluntary.',
    governmentAction: 'ABDM (2021, ₹1,600 Cr): ABHA (67 Cr), HFR (4.2 Lakh facilities), HPR (3.8 Lakh professionals). PM-JAY: ₹5 Lakh coverage to 10.7 Cr families, 5.5 Cr+ admissions. 1.7 Lakh HWCs operationalised with free diagnostics. e-Sanjeevani telemedicine: 30 Cr+ consultations. PM Janaushadhi: 9,000+ stores, 1,800 generic medicines at 50-90% discount.',
    citizenAction: 'Create ABHA via ABDM app/portal (free, verified by Aadhaar/driving licence). Link lab reports, prescriptions, and discharge summaries. Grant consent-based data sharing with any registered provider. Register blood donation on e-RaktKosh. Use Aarogya Setu for digital health records access.',
    budget: 'ABDM: ₹1,600 Cr. PM-JAY: ₹6,400 Cr (FY26). PM-MJAY seniors: ₹3,600 Cr. PM Janaushadhi: ₹1,200 Cr. National Health Mission: ₹38,935 Cr. Health budget FY26: ₹91,000 Cr (+17% YoY).',
    globalComparison: 'Estonia: 100% population covered by e-Health since 2008, digital prescriptions for 20 years, blockchain-backed data security. UK: NHS App with 30M users, GP appointment booking, prescription requests. Denmark: 99% digital prescription adoption, cross-regional health data exchange. India\'s ABDM — 67 Cr IDs in 3 years — is the fastest rollout globally. But ABHA-linked health records cover <5% of ID holders, and private-hospital interoperability is nascent.',
  },
  {
    slug: 'judicial-pendency-reform',
    title: 'Judicial Pendency Reform',
    summary: '5.1 Cr pending cases, 21 judges per million (vs 50 recommended), and a filing rate (3 Cr/yr) that exceeds disposals (2.8 Cr/yr). India\'s judicial backlog grows by 2 Lakh cases each year. The e-Courts Phase III (₹7,210 Cr) aims to digitise and AI-enable case management, but procedural reform lags.',
    category: 'Economy',
    status: 'In Progress',
    priority: 'Medium',
    metrics: [
      { label: 'Total Pending Cases', value: '5.1 Cr' },
      { label: 'Supreme Court', value: '82,000+' },
      { label: 'High Courts', value: '61 Lakh' },
      { label: 'District Courts', value: '4.4 Cr' },
    ],
    systemAnalysis: 'India\'s judicial system has a judge-to-population ratio of 21 per million — one of the lowest globally (UK 50, US 115). Vacancy rate: 23% in High Courts (400+ vacancies), 17% in district courts. Filing rate (3 Cr/yr) outpaces disposals (2.8 Cr/yr), creating a net backlog accretion of ~2 Lakh cases/yr. Civil cases average 1,200 days to disposal; criminal cases 850 days. Colonial-era CPC and CrPC procedures remain largely unchanged despite the 2023 Bharatiya Nyaya Sanhita codification.',
    governmentAction: 'e-Courts Phase III (₹7,210 Cr): digitisation of 3,000+ court complexes, AI-assisted case categorisation and scheduling, virtual court expansion. NJDG provides real-time pendency data by court, case type, and judge. Fast-track courts: 2,400+ for sexual offences (POCSO), 1,000+ for commercial disputes. Mediation Act 2023 mandates pre-litigation mediation in certain civil cases. Commercial Courts Act reduces trial timelines to 12 months.',
    citizenAction: 'Litigants: track case status, cause lists, and orders via e-Courts portal/mobile app. Opt for pre-litigation mediation under Mediation Act 2023 (settlement in 60-90 days). File via e-filing portals — available in 1,500+ district courts. Use Legal Services Authorities for pro bono assistance (NALSA: ₹1,800 Cr budget).',
    budget: 'e-Courts Phase III: ₹7,210 Cr (FY23-27). NALSA legal aid: ₹1,800 Cr. State-level court infrastructure: ₹4,500 Cr. Fast-track court operational costs: ₹1,200 Cr. Justice sector spending: 0.08% of GDP — 6x below the 0.5% recommended by the Law Commission.',
    globalComparison: 'Singapore: 95% cases resolved in 6 months via mandatory case management, e-filing, and court-ordered mediation. US federal courts: median disposal 7.5 months with 115 judges per million. UK: Online Civil Money Claims resolved 83% without hearings. India\'s 21 judges per million and 3.5-year average disposal time make it one of the slowest judiciaries globally, though NJDG transparency is improving accountability.',
  },
  {
    slug: 'ev-adoption-infrastructure',
    title: 'EV Adoption Infrastructure',
    summary: 'India\'s EV penetration reached 6.3% in FY25 — led by two-wheelers (50%+ of EV sales) and three-wheelers (55%+). But with 25,000 public charging stations against a requirement of 350,000 by 2030, infrastructure lags policy ambition. Battery costs at $130/kWh still account for 40% of vehicle price.',
    category: 'Infrastructure',
    status: 'In Progress',
    priority: 'Medium',
    metrics: [
      { label: 'EV Penetration 2025', value: '6.3%' },
      { label: '2030 Target', value: '30%' },
      { label: 'Charging Stations', value: '25,000+' },
      { label: 'FAME II Outlay', value: '₹10,000 Cr' },
    ],
    systemAnalysis: 'EV adoption bottlenecks: battery cost ($130/kWh, 40% of vehicle cost), range anxiety (25,000 charging stations vs 350,000 needed by 2030), and limited domestic cell manufacturing — India imports 100% of Li-ion cells. Two-wheelers lead but four-wheeler EV share is below 2%. Battery recycling infrastructure is nascent (<5 GW recycling capacity). Electricity grid load from mass EV adoption in Delhi, Mumbai, and Bengaluru remains unmodelled by DISCOMs.',
    governmentAction: 'FAME II (₹10,000 Cr, 2019-24) succeeded by PM E-DRIVE (₹10,900 Cr, 2024-27) with expanded bus and truck subsidies. PLI ACC batteries: ₹18,100 Cr for 50 GWh domestic cell manufacturing. PLI Auto: ₹26,058 Cr. State EV policies: Delhi (₹5,000 Cr EV Fund), Maharashtra (₹400 Cr), Gujarat (₹350 Cr), Karnataka (₹250 Cr). Faster Adoption of EV tariff: separate EV meters with ₹0-1/kWh night-time charging.',
    citizenAction: 'Claim PM E-DRIVE subsidy at dealership (deducted from ex-showroom price). Install home charger (₹15,000-50,000) — DISCOMs in Delhi, Maharashtra, Karnataka provide upto ₹30,000 subsidy. Use E-AMRIT portal (NITI Aayog) for EV model comparison and nearest charging station. Fleet operators: PM E-DRIVE offers ₹10,000-15,000/kWh subsidy for e-buses.',
    budget: 'PM E-DRIVE: ₹10,900 Cr (2024-27). PLI ACC: ₹18,100 Cr. PLI Auto: ₹26,058 Cr. FAME II total: ₹10,000 Cr. State EV funds: Delhi ₹5,000 Cr, Maharashtra ₹400 Cr, Gujarat ₹350 Cr, Karnataka ₹250 Cr. Total committed: ~₹71,000 Cr.',
    globalComparison: 'China: 60% of global EV sales (10M+ in 2024), 7.6M charging points, 95% domestic battery production, $23/kWh cell cost advantage. Norway: 82% EV share of new car sales, $20B in cumulative subsidies. EU: 2035 ICE ban, $3B battery fund. India\'s 6.3% EV penetration matches the global average, but charging density is 1/30th of China\'s. India\'s three-wheeler EV penetration (55%) is a unique global success — the world\'s largest e-3W fleet at 1.2M units.',
  },
]

export function getFixStory(slug: string): FixStory | undefined {
  return FIX_STORIES.find((s) => s.slug === slug)
}
