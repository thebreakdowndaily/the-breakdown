export interface FixStoryMetric {
  label: string
  value: string
}

export interface FixProgress {
  current: number
  target: number
  label: string
  unit: string
}

export interface FixMilestone {
  date: string
  event: string
  status: 'achieved' | 'in-progress' | 'upcoming' | 'missed'
}

export interface CitizenActionItem {
  role: string
  action: string
  icon?: string
}

export interface FixStory {
  slug: string
  title: string
  summary: string
  category: 'Health' | 'Education' | 'Energy' | 'Economy' | 'Infrastructure' | 'Environment'
  status: 'In Progress' | 'Proposed' | 'Implemented' | 'Under Review'
  priority: 'High' | 'Medium' | 'Low'
  metrics: FixStoryMetric[]
  progress?: FixProgress[]
  milestones?: FixMilestone[]
  citizenActions?: CitizenActionItem[]
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
    summary: 'India runs 25 nuclear reactors — more than France\'s current EPR fleet. Yet nuclear provides just 3% of its electricity, the lowest share among major economies. The gap between 8.2 GW installed and 100 GW by 2047 is the puzzle the ₹20,000 Cr Nuclear Energy Mission must solve.',
    category: 'Energy',
    status: 'In Progress',
    priority: 'High',
    metrics: [
      { label: 'Current Capacity', value: '~8.2 GW' },
      { label: '2030 Target', value: '22 GW' },
      { label: '2047 Target', value: '100 GW' },
      { label: 'Budget Allocated', value: '₹20,000 Cr' },
    ],
    progress: [
      { current: 8.2, target: 22, label: '2032 Capacity Target', unit: 'GW' },
      { current: 25, target: 65, label: 'Reactors by 2032', unit: 'reactors' },
    ],
    milestones: [
      { date: '2024', event: 'Atomic Energy Act amended to allow NPCIL JVs with PSUs', status: 'achieved' },
      { date: '2024', event: '10 PHWR-700 units approved in fleet mode across 5 sites', status: 'achieved' },
      { date: '2025', event: '¥20,000 Cr Nuclear Energy Mission launched', status: 'achieved' },
      { date: '2026', event: 'SMR policy framework expected; site clearances for 5 new nuclear parks', status: 'in-progress' },
      { date: '2027', event: 'First PHWR-700 construction start at new sites', status: 'upcoming' },
      { date: '2032', event: '22 GW installed capacity target', status: 'upcoming' },
      { date: '2047', event: '100 GW installed capacity target', status: 'upcoming' },
    ],
    citizenActions: [
      { role: 'Local Resident', action: 'Participate in AERB-mandated public hearings for new plant siting (notices in local newspapers and district portals)' },
      { role: 'Near-Site Resident', action: 'Access CSR-funded skilling programmes run by NPCIL at existing nuclear sites' },
      { role: 'Policy Professional', action: 'Submit comments on DAE consultations for SMR policy and liability framework amendments' },
    ],
    systemAnalysis: 'India\'s nuclear stagnation has structural roots that the ₹20,000 Cr Mission alone cannot fix. The Atomic Energy Act 1962 concentrates all operations under NPCIL, suppressing competitive pricing and private capital entry. The Civil Liability for Nuclear Damage Act 2010 places unlimited operator liability on foreign suppliers — GE-Hitachi, Westinghouse, and EDF have all cited this as a barrier to entry. Land acquisition at Jaitapur (6.6 GW, stalled since 2011) and Kovvada (5 GW, shelved since 2015) shows that regulatory uncertainty creates a feedback loop: delay → cost escalation → project abandonment. Uranium fuel access requires NSG-specific safeguards compliance despite the 2008 waiver. The net result: India has 25 reactors but builds roughly one per year — 5x slower than China\'s per-reactor construction pace.',
    governmentAction: 'The Atomic Energy Act amendment permitting NPCIL joint ventures with PSUs (NTPC, NALCO, Indian Oil), fleet-mode approval of 10 PHWR-700 units across 5 sites, and the SMR R&D push with ₹8,500 Cr signal real intent to scale. But fleet-mode without competitive procurement risks locking in cost-plus construction, and the 2024 Budget\'s ₹20,000 Cr covers less than 2% of the estimated ₹12 lakh Cr needed for 100 GW by 2047. The real test is whether Bharat Small Reactors (220 MW) can attract private capital without amending the liability law — the government has not signalled any change on this front.',
    citizenAction: 'Attend AERB-mandated public hearings for new plant siting — notices are published in local newspapers and district portals, and this is your only statutory voice in the clearance process. Near existing nuclear sites, apply for CSR-funded skilling programmes run by NPCIL, which include technician training and safety certification. Policy professionals: submit formal comments on DAE consultations for SMR policy and the liability framework amendments when drafts are published — the regulator does incorporate public feedback.',
    budget: '₹20,000 Cr Nuclear Energy Mission and ₹8,500 Cr for SMR R&D (FY25-30) sound substantial until compared to the estimated ₹12 lakh Cr required for 100 GW — the Mission covers less than 2% of the need. NPCIL\'s FY26 capex of ₹12,000 Cr is less than what a single Chinese nuclear project spends annually. At current capital costs ($3-5M/MW for PHWR), reaching 100 GW demands an order-of-magnitude increase in budgetary commitment.',
    globalComparison: 'China: 56 GW operational, 23 under construction, 200 GW target by 2035 — building reactors in 5-7 years through standardised CPR-1000 design replication. France: 65% nuclear electricity via a standardised EPR2 fleet programme at €51.7B. South Korea: APR-1400 exported to the UAE, proving that homegrown reactor technology can compete globally. India\'s ~8.2 GW matches China\'s capacity in 2001. The lesson: standardisation and serial construction — not bespoke reactor orders — are what enable speed. India\'s fleet-mode PHWR-700 approach is the right design. Execution will decide whether it delivers.',
  },
  {
    slug: 'green-hydrogen-adoption',
    title: 'Green Hydrogen Adoption',
    summary: 'India has the world\'s cheapest solar tariffs at $0.03/kWh — a built-in advantage for green hydrogen that no other major economy can match. Yet operational electrolyser capacity stands at just ~70 MW, and green hydrogen costs $4-5/kg — 3x grey hydrogen\'s $1.5-2/kg. The ₹19,744 Cr Mission is betting the cost curve bends fast enough to meet 5 MMT/yr by 2030. Current production: near zero.',
    category: 'Energy',
    status: 'In Progress',
    priority: 'High',
    metrics: [
      { label: 'Mission Outlay', value: '₹19,744 Cr' },
      { label: 'Target Production', value: '5 MMT/yr' },
      { label: '2030 Timeline', value: 'By 2030' },
      { label: 'Jobs Target', value: '6 Lakh' },
    ],
    progress: [
      { current: 0.1, target: 5, label: 'Annual Production (MMT)', unit: 'MMT' },
      { current: 3.95, target: 2, label: 'Green H2 Cost ($/kg)', unit: '$/kg' },
    ],
    milestones: [
      { date: 'Jan 2023', event: 'National Green Hydrogen Mission approved with ₹19,744 Cr outlay', status: 'achieved' },
      { date: '2024', event: 'SIGHT scheme launched; ISTS charge waiver for 25 years notified', status: 'achieved' },
      { date: '2025', event: 'First SIGHT tranche awarded (412,000 tonnes capacity at ₹387-397/kg)', status: 'achieved' },
      { date: 'FY26', event: 'Mandatory 15% green H2 quota for refineries takes effect', status: 'in-progress' },
      { date: '2027', event: 'Electrolyser manufacturing capacity target: 10 GW/yr', status: 'upcoming' },
      { date: '2030', event: '5 MMT/yr green hydrogen production target', status: 'upcoming' },
    ],
    citizenActions: [
      { role: 'Engineer', action: 'Pursue electrolyser and fuel-cell skilling via SIGHT-certified programmes' },
      { role: 'Community Member', action: 'Participate in district planning for water allocation and port infrastructure in hydrogen hubs (Kandla, Tuticorin, Paradip)' },
      { role: 'Consumer', action: 'Prefer products from certified green-hydrogen supply chains (green steel, green fertiliser)' },
    ],
    systemAnalysis: 'Green hydrogen faces a chicken-and-egg problem: at $4-5/kg, offtake from refineries, fertiliser plants, and steel mills is uneconomical without subsidies — SIGHT provides ₹50/kg in Year 1, declining to ₹30/kg by Year 3 — but without assured offtake, electrolyser manufacturers have no incentive to build domestic capacity. India imports 90% of PEM electrolyser components; the 10 GW/yr domestic capacity target by 2027 aims to break this import dependence. The second bottleneck is water: producing 1 kg of H₂ requires 9 litres via electrolysis, competing with agriculture in the arid hydrogen-hub states of Gujarat and Rajasthan. The ISTS waiver reduces transport cost by $0.3-0.5/kg, but transmission bottlenecks from solar-rich Rajasthan and Gujarat to consumption centres remain unresolved.',
    governmentAction: 'The NGHM\'s declining-subsidy design is structurally sound: the first SIGHT tranche awarded 412,000 tonnes at discovered prices of ₹387-397/kg, confirming subsidy needs of ₹50/kg (Year 1) declining to ₹30/kg (Year 3). The mandatory 15% green H₂ quota for refineries (FY26, escalating to 25% by FY30) creates demand-side pull. ISTS waiver for 25 years is a major cost reducer. But state-level subsidies in Gujarat (₹500 Cr), Tamil Nadu (₹300 Cr), and Karnataka (₹250 Cr) remain tiny compared to the ₹1,466 Cr allocated for pilot projects — and the R&D budget (₹788 Cr) is a fraction of what China and the EU invest in electrolyser innovation. The binding constraint: will the refinery quota be enforced if green hydrogen is simply not available at the mandated volumes?',
    citizenAction: 'Engineers: pursue electrolyser and fuel-cell skilling through SIGHT-certified training programmes — this is the workforce gap the mission cannot fill without you. Communities in identified hydrogen hubs (Kandla, Tuticorin, Paradip): participate in district-level planning for water allocation and port infrastructure — these decisions affect your local water table and employment. Consumers: prioritise products from certified green-hydrogen supply chains (green steel, green fertiliser) once labelling begins in 2027 — your purchasing decision creates demand pull.',
    budget: '₹19,744 Cr total mission outlay — ₹17,490 Cr SIGHT production incentives, ₹1,466 Cr pilot projects, ₹788 Cr R&D, and just ₹9 Cr for human resources. The SIGHT subsidy per kilogram (₹50 → ₹40 → ₹30/kg) is structured to decline as scale increases — a sound design if offtake materialises. But with only ₹788 Cr for R&D against a global electrolyser innovation race, India is underinvesting in the technology where it needs to catch up most. State-level incentives (₹500 Cr Gujarat, ₹300 Cr Tamil Nadu, ₹250 Cr Karnataka) add marginal capacity but remain at pilot scale compared to the ~₹50,000 Cr China\'s top three electrolyser manufacturers receive in annual subsidies.',
    globalComparison: 'China targets 200,000 tonnes/yr and controls 60% of global electrolyser manufacturing through Longi, Sungrow and others. The EU plans 10 MMT imports by 2030 via H2Global auctions. Australia\'s $50B Western Green Hydrogen Hub shows what committed capital looks like. Germany has 88 MW operational electrolysis — more than India\'s ~70 MW despite having 1/15th the solar potential. India\'s renewable cost advantage ($0.03/kWh vs EU $0.08) is real and durable. The lesson: cheap power alone does not create a hydrogen economy — you need electrolyser supply chains, water allocation, and offtake agreements all at once. India is building all three simultaneously. That is ambitious, but fragile.',
  },
  {
    slug: 'national-education-policy-implementation',
    title: 'National Education Policy Implementation',
    summary: 'India allocates 3.5% of GDP to education — 2.5 percentage points below NEP 2020\'s own 6% recommendation. Higher education GER stands at 27%, meaning 73 of every 100 college-age Indians are not enrolled, against a 2035 target of 50%. Five years into implementation, just 18 of 36 states and UTs have adopted the 5+3+3+4 curricular framework. Policy ambition and fiscal reality are operating at different speeds.',
    category: 'Education',
    status: 'In Progress',
    priority: 'High',
    metrics: [
      { label: 'GER Target 2035', value: '50%' },
      { label: 'Current GER', value: '27%' },
      { label: 'Budget Allocation 2025', value: '₹1.48L Cr' },
      { label: 'Schools to Transform', value: '14.9 Lakh' },
    ],
    progress: [
      { current: 27, target: 50, label: 'Higher Education GER', unit: '%' },
      { current: 18, target: 36, label: 'States Adopted 5+3+3+4', unit: 'states' },
    ],
    milestones: [
      { date: 'Jul 2020', event: 'National Education Policy 2020 approved by Union Cabinet', status: 'achieved' },
      { date: '2023', event: 'National Curriculum Framework (NCF) released; CUET mandatory for 45 central universities', status: 'achieved' },
      { date: '2024', event: 'Academic Bank of Credits operationalised with 100+ HEIs; NRF established with ₹50,000 Cr corpus', status: 'achieved' },
      { date: '2025', event: '18 states adopted 5+3+3+4 structure; ITEP launched for teacher training', status: 'achieved' },
      { date: '2026', event: 'NHEQF notified; remaining states expected to adopt new curricular structure', status: 'in-progress' },
      { date: '2030', event: 'Target: 50% GER in higher education; all schools transitioned to NEP framework', status: 'upcoming' },
      { date: '2035', event: 'Target: 50% gross enrollment ratio in higher education', status: 'upcoming' },
    ],
    citizenActions: [
      { role: 'Parent', action: 'Choose NEP-aligned schools through state education department portals' },
      { role: 'Student', action: 'Leverage Academic Bank of Credits for multi-exit UG degrees with credit transfers' },
      { role: 'Teacher', action: 'Access NISHTHA online training (3.0 version with NEP modules) for professional development' },
      { role: 'Community Member', action: 'Monitor school development through School Management Committees' },
    ],
    systemAnalysis: 'Three structural deficits prevent NEP implementation from scaling. Funding: 3.5% of GDP vs the 6% target. Teacher vacancies: 1.2 million of 9.7 million posts remain unfilled. Regulatory fragmentation: UGC, AICTE, NCTE, and 32 state school boards each follow different curricula, examination patterns, and language policies — no national system can standardise when state boards retain control over Class 10 and 12 examinations. The 10+2 system offered no vocational stream for 14.9 lakh schools. NEP\'s Class 6 vocational integration and multi-entry-exit degrees are correct structural fixes, but state capacity is the binding constraint: Kerala and Gujarat adopted the new structure within 18 months; Bihar and Uttar Pradesh have not started. Without fiscal equalisation that routes central funding based on need rather than state willingness, the implementation gap will widen.',
    governmentAction: 'NEP\'s institutional architecture is being built: NCF 2023 released, CUET mandatory for 45 central universities (replacing 45 separate entrance exams), Academic Bank of Credits operational with 100+ HEIs, ITEP launched for four-year teacher training, and the NRF established with a ₹50,000 Cr corpus. These are real institutional reforms. But the 6% GDP spending commitment remains unfunded, meaning 1.2 million teacher vacancies stay unfilled, and the 200+ institutions granted autonomous status so far are a fraction of the 40,000+ colleges that need it. The gap between policy architecture and operational funding is NEP\'s biggest vulnerability — and it is widening, not narrowing.',
    citizenAction: 'Parents: verify your child\'s school is NEP-aligned through your state education department portal — non-NEP schools may not offer the new multi-disciplinary curriculum from Class 6 onwards. Students: register for the Academic Bank of Credits and plan multi-entry-exit UG degrees — you can earn a diploma at Year 1, an advanced diploma at Year 2, or a full degree at Year 3 or 4. Teachers: complete NISHTHA 3.0 online training with NEP modules — it is free, government-certified, and increasingly required for career progression. Community members: attend School Management Committee meetings and demand accountability for NEP implementation timelines at your local school.',
    budget: 'Union Budget FY26: ₹1.48 lakh Cr for education (3.5% of total budget) — still far below NEP\'s 6% of GDP recommendation, which would require ~₹12 lakh Cr at current GDP. Major schemes: Samagra Shiksha ₹39,311 Cr, PM-USHA ₹6,000 Cr, PM SHRI ₹6,000 Cr for model schools, PM-Vidyalaxmi for education loans. Combined Centre and State education expenditure reaches ~₹11.5 lakh Cr (4.6% of GDP) — better but still 1.4 percentage points short. The ₹50,000 Cr NRF corpus is substantial but spread over 5 years (₹10,000 Cr/yr) — a fraction of India\'s research spending gap with China ($100B+/yr R&D) or the US ($150B+/yr).',
    globalComparison: 'Finland spends 7.2% of GDP on education and achieves 92% higher-ed GER with play-based early learning and no standardised testing until age 16. China\'s 64% GER comes from 2,100 universities and 4% GDP spend — per-student expenditure is 2x India\'s. The US spends 6.1% of GDP at $40,000+/student/year. India\'s challenge is unique in scale: 1.5 million schools and 260 million students — larger than the entire US population — means per-student spending is structurally diluted. The lesson: India cannot outspend Finland or the US. It must out-design them. NEP\'s competency-based, multi-entry framework is the right design. But design without funding is just intention.',
  },
  {
    slug: 'air-pollution-delhi-ncr',
    title: 'Air Pollution in Delhi-NCR',
    summary: 'Delhi\'s annual average PM2.5 is 98 µg/m³ — 3x India\'s own national standard of 40 µg/m³ and 10x the WHO guideline of 10 µg/m³. The Graded Response Action Plan has four stages to prevent severe pollution episodes. It has been in force since 2017, expanded to four stages in 2021. Delhi recorded its third-highest November AQI in 2024. The architecture exists. The impact does not.',
    category: 'Environment',
    status: 'Under Review',
    priority: 'High',
    metrics: [
      { label: 'Avg AQI (Winter)', value: '350+' },
      { label: 'Annual Deaths Attributed', value: '1.2 Lakh' },
      { label: 'GRAP Stages', value: '4 Levels' },
      { label: 'CAQM Budget', value: '₹700 Cr' },
    ],
    progress: [
      { current: 98, target: 60, label: 'Annual avg PM2.5 (µg/m³)', unit: 'µg/m³' },
    ],
    milestones: [
      { date: '2020', event: 'BS-VI emission norms implemented nationwide', status: 'achieved' },
      { date: '2021', event: 'CAQM formed (replacing EPCA) with binding directions to 4 NCR states', status: 'achieved' },
      { date: '2023', event: 'Pusa bio-decomposer sprayed on 2,000+ hectares for stubble management', status: 'achieved' },
      { date: '2024', event: 'GRAP Stage IV enforced at AQI 450+; smog towers operational at Connaught Place, Anand Vihar', status: 'achieved' },
      { date: '2025', event: 'Apex court directions for unified airshed management board — implementation pending', status: 'in-progress' },
      { date: '2026', event: 'National Clean Air Programme (NCAP) 2026 review; 40% PM reduction target', status: 'in-progress' },
    ],
    citizenActions: [
      { role: 'Daily Commuter', action: 'Check real-time AQI via SAFAR/CPCB/Sameer apps; carpool, use metro, or CNG buses on high-AQI days' },
      { role: 'Resident', action: 'Report construction dust and waste burning via Sameer app with geotagged photos' },
      { role: 'Farmer', action: 'Use free Pusa bio-decomposer (through state agriculture dept) — decomposes stubble in 20 days vs 45 days for natural decay' },
    ],
    systemAnalysis: 'Delhi\'s pollution is a multi-state collective action failure. Four sources — vehicles (28%), stubble burning (25% Oct-Nov peak), industry (20%), construction dust (15%), household fuel (12%) — operate across four states (Delhi, UP, Haryana, Rajasthan) with separate pollution control boards and no unified airshed management, despite Supreme Court directions since 2015. The Commission for Air Quality Management (formed 2021) can issue binding directions to all four states, but enforcement relies on state-level machinery — a principal-agent problem where UP\'s and Haryana\'s pollution boards also regulate local industry and power plants whose economic interests conflict with Delhi\'s air quality targets. Thermal inversion in winter traps PM2.5 at ground level, transforming a regular emissions problem into an acute health crisis. The feedback loop repeats every winter: GRAP restrictions impose economic costs (construction bans, truck entry bans) → states resist enforcement → AQI spikes → courts intervene → cycle resets.',
    governmentAction: 'GRAP\'s four-stage escalation (Stage I at AQI 201+, Stage IV at AQI 450+) provides a clear operational framework, and CAQM\'s binding directions to all NCR states are a governance upgrade over the toothless EPCA that preceded it. BS-VI norms since 2020, Pusa bio-decomposer sprayed on 2,000+ hectares, and 1,700 MW gas-based power for winter are real measures. But the two smog towers at Connaught Place and Anand Vihar — claiming 70% PM2.5 reduction at a cost that could have subsidised 10,000 CNG buses — treat symptoms, not causes. The unified airshed management board, ordered by the Supreme Court in 2025, remains unimplemented. Without it, seasonal crisis management will keep displacing structural reform.',
    citizenAction: 'Daily: check real-time AQI via SAFAR, CPCB, or Sameer apps before planning outdoor activity — treat AQI 300+ as a health advisory. Commute: use metro, CNG buses, or carpool on high-AQI days — vehicles contribute 28% of Delhi\'s PM load. Report: photograph and geotag construction dust or waste burning via the Sameer app — CAQM acts on citizen reports within 24-48 hours. Farmers: apply for free Pusa bio-decomposer through your state agriculture department — it decomposes stubble in 20 days vs 45 days for natural decay, and it costs you nothing.',
    budget: 'CAQM operations: ₹700 Cr. NCAP (131 non-attainment cities): ₹7,600 Cr. FAME II EV subsidies: ₹10,000 Cr. Delhi CNG conversion (DTC + cluster buses): ₹2,300 Cr. Metro Phase IV: ₹28,000 Cr. Total clean air expenditure across NCR: ~₹50,000 Cr — substantial until compared to Beijing alone, which spent $100B+ on coal-to-gas conversion over a decade. The allocation question matters more than the total: pollution control boards get operations funding but no capex for stubble management infrastructure, and CAQM\'s ₹700 Cr budget is less than Delhi spends on a single flyover.',
    globalComparison: 'Beijing cut PM2.5 by 58% (2013-22) through coal-to-gas conversion of 4.8 million households, industrial relocation, and enforcement via licence-plate recognition cameras. London\'s ULEZ expanded to all boroughs in 2023 — 15% NOx reduction in the first year alone. Mexico City\'s "Hoy No Circula" achieved 11% PM reduction but induced second-car purchases, proving that driving restrictions without complementary public transport can backfire. Delhi\'s challenge is uniquely acute: 33 million people, multi-state governance, and geographic trapping in the Himalayan foothills. The lesson: Beijing\'s success came from treating the airshed as a single jurisdiction. Delhi must achieve the same result without the same political centralisation — which requires a unified airshed board with real enforcement power, not just coordination.',
  },
  {
    slug: 'water-crisis-management',
    title: 'Water Crisis Management',
    summary: 'Per capita water availability has fallen 71% since 1951 to 1,486 m³ — within striking distance of the 1,000 m³ water-scarcity threshold. The Jal Jeevan Mission raised rural tap coverage from 17% to 79.74%, adding 15.44 crore connections in six years. But 73% of wells in Punjab, Haryana, and Rajasthan show declining water tables, and 1.4 crore rural habitations have arsenic or fluoride contamination above permissible limits. Supply expansion and aquifer depletion are racing — and depletion is not losing.',
    category: 'Infrastructure',
    status: 'In Progress',
    priority: 'High',
    metrics: [
      { label: 'Tap Connections Delivered', value: '15.44 Cr' },
      { label: 'Rural Coverage', value: '79.74%' },
      { label: 'Mission Budget', value: '₹3.6L Cr' },
      { label: 'Completion Target', value: '2028' },
    ],
    progress: [
      { current: 79.74, target: 100, label: 'Rural Tap Coverage', unit: '%' },
    ],
    milestones: [
      { date: '2019', event: 'Jal Jeevan Mission launched with ₹3.6L Cr outlay — target: all rural households by 2028', status: 'achieved' },
      { date: '2020', event: 'JJM coverage at 17% — 3.3 Cr rural households with tap connections', status: 'achieved' },
      { date: '2023', event: 'JJM crosses 10 Cr tap connections; coverage at 53%', status: 'achieved' },
      { date: '2025', event: 'JJM coverage reaches 79.74% — 15.44 Cr households connected', status: 'achieved' },
      { date: '2026', event: 'Jal Shakti Abhiyan: Catch the Rain campaign; 5 L+ rainwater harvesting structures', status: 'in-progress' },
      { date: '2028', event: 'Target: universal rural tap water coverage (19.4 Cr households)', status: 'upcoming' },
    ],
    citizenActions: [
      { role: 'Homeowner', action: 'Apply for JJM tap connection via district portal; report leaks on "Jal" mobile app' },
      { role: 'Village Resident', action: 'Form VWSC with 10-15 members for O&M (5% capital cost contribution required)' },
      { role: 'Homeowner', action: 'Install rooftop rainwater harvesting (mandatory in 18 states — ₹5,000-15,000 subsidy available)' },
      { role: 'Farmer', action: 'Adopt micro-irrigation under PM-KUSUM (60% subsidy for drip/sprinkler systems)' },
    ],
    systemAnalysis: 'India\'s water crisis is a demand-supply fracture with four reinforcing mechanisms. First, groundwater extraction is effectively unregulated: most states do not charge agriculture tariffs based on consumption, so farmers in Punjab and Haryana pump unlimited groundwater for free or at flat tariffs — a textbook tragedy of the commons. Second, interstate water disputes (Cauvery, Krishna, Godavari, Ravi-Beas) have languished in tribunals for decades with no final allocation, preventing long-term infrastructure planning. Third, only 8% of wastewater is treated before discharge — the rest pollutes rivers and recontaminates groundwater, creating a feedback loop where scarcity drives deeper extraction, which worsens water quality. Fourth, while JJM guarantees tap connectivity, its mandate excludes water quality remediation — 1.4 crore habitations face arsenic/fluoride contamination, but JJM measures output in taps, not in safe water delivered.',
    governmentAction: 'JJM\'s achievement — 15.44 Cr tap connections in six years, raising coverage from 17% to 79.74% — ranks among the fastest rural infrastructure rollouts globally. The Atal Bhujal Yojana (₹6,000 Cr) targets groundwater management in 8,300 water-stressed gram panchayats, and "Catch the Rain" has built 5 L+ rainwater harvesting structures. But JJM\'s design focuses on last-mile connectivity, not source sustainability: 60% of JJM schemes face water quality challenges within two years of commissioning, according to the Comptroller and Auditor General. The National Water Mission\'s 20% water-use efficiency target has no enforcement mechanism, and PM-KUSUM\'s 60% micro-irrigation subsidy has reached only 8% of the potential 150 lakh hectares. The policy direction is right. The implementation velocity is the gap — and O&M sustainability post-2028 is entirely unaddressed.',
    citizenAction: 'Homeowners: apply for a JJM tap connection via your district portal if you do not have one, and report leaks immediately on the "Jal" mobile app — distribution losses of 35-40% mean every leak you report saves water for your neighbourhood. Village residents: form a Village Water and Sanitation Committee (VWSC) with 10-15 members — your 5% capital cost contribution gives you statutory authority over operation and maintenance. Homeowners in all 18 states where it is mandatory: install rooftop rainwater harvesting — ₹5,000-15,000 subsidy is available. Farmers: adopt micro-irrigation under PM-KUSUM (60% subsidy for drip and sprinkler systems) — it cuts water use by 40-60% without reducing yield.',
    budget: 'JJM: ₹3.6 lakh Cr (Centre ₹2.08L Cr, States ₹1.52L Cr) — an enormous commitment, but per-household cost (~₹18,500) excludes recurring O&M, which independent estimates place at ₹50,000-70,000 per scheme per year. PM-KUSUM: ₹34,422 Cr for solar pumps and micro-irrigation. Atal Bhujal Yojana: ₹6,000 Cr for groundwater management — spread across 8,300 panchayats, this is ~₹7 lakh per panchayat, a fraction of what aquifer mapping and recharge infrastructure require. Namami Gange: ₹22,500 Cr for river rejuvenation — only 8% has gone to sewage treatment infrastructure. The gap is not total spend (~₹4.5L Cr+) but allocation: 70% goes to supply-side expansion, less than 10% to wastewater treatment and groundwater recharge.',
    globalComparison: 'Israel recycles 86% of its wastewater — the global highest — and uses 75% drip irrigation, achieving water productivity of $19/m³. India manages $3.5/m³ — 5x lower. Singapore\'s NEWater meets 40% of demand through reclaimed water, supplemented by 30% desalination. Australia\'s Murray-Darling Basin Plan uses tradable water rights and $13B in environmental flow buybacks. JJM\'s target of 19 Cr rural households is globally unprecedented in scale — no comparable programme anywhere has attempted universal rural tap coverage. The lesson: water-stressed economies succeed not by finding new sources but by recycling, pricing, and allocating existing water differently. India does almost none of these at scale, and JJM\'s post-2028 sustainability plan is yet to be written.',
  },
  {
    slug: 'digital-health-infrastructure',
    title: 'Digital Health Infrastructure',
    summary: 'India created 67 crore ABHA health IDs in three years — the fastest digital health identity rollout in history. But fewer than 5% of those ID holders have linked a single health record, and only 4.2 lakh of India\'s 12 lakh+ healthcare facilities are registered on the platform. ABDM built the pipe. The water is barely flowing.',
    category: 'Health',
    status: 'In Progress',
    priority: 'Medium',
    metrics: [
      { label: 'Health IDs Created', value: '67 Cr' },
      { label: 'Registered Facilities', value: '4.2 Lakh' },
      { label: 'Registered Doctors', value: '3.8 Lakh' },
      { label: 'ABDM Budget', value: '₹1,600 Cr' },
    ],
    progress: [
      { current: 67, target: 100, label: 'ABHA Health IDs Created', unit: 'Cr' },
      { current: 4.2, target: 12, label: 'Registered Healthcare Facilities', unit: 'Lakh' },
    ],
    milestones: [
      { date: 'Sep 2021', event: 'Ayushman Bharat Digital Mission (ABDM) launched as pilot', status: 'achieved' },
      { date: '2022', event: 'ABDM nationwide rollout; ABHA creation opens to all citizens', status: 'achieved' },
      { date: '2023', event: 'ABHA crosses 50 Cr IDs; HFR reaches 2 Lakh facilities', status: 'achieved' },
      { date: '2024', event: '67 Cr ABHA IDs created; e-Sanjeevani crosses 30 Cr teleconsultations', status: 'achieved' },
      { date: '2025', event: 'ABHA-linked health records initiative — <5% adoption rate identified as key gap', status: 'in-progress' },
      { date: '2026', event: 'Private hospital ABDM interoperability mandate under consultation', status: 'in-progress' },
    ],
    citizenActions: [
      { role: 'Patient', action: 'Create ABHA via ABDM app/portal (free, verified by Aadhaar/driving licence)' },
      { role: 'Patient', action: 'Link lab reports, prescriptions, and discharge summaries to your ABHA; grant consent-based data sharing with any registered provider' },
      { role: 'Donor', action: 'Register blood donation on e-RaktKosh portal' },
    ],
    systemAnalysis: 'ABDM\'s architecture — ABHA health IDs, Health Facility Registry (HFR), and Health Professional Registry (HPR) — solves a genuine structural problem: India has no unified patient record across public and private providers, manual insurance claims take 30 days to settle on average, and 74% of doctors are concentrated in urban areas serving just 34% of the population. The FHIR R4 interoperability framework is world-class, but adoption by private hospitals — which capture 60%+ of outpatient visits — remains voluntary. Rural PHCs, serving the remaining 66% of the population, lack digital infrastructure entirely: only 15% have functional IT systems. The feedback loop is perverse: without linked health records, ABHA IDs are empty shells; without ABHA-linked data, providers see no value in registering; without provider registration, patients have no reason to link records. The system has adoption but not utilisation.',
    governmentAction: 'ABDM\'s raw numbers are impressive: 67 Cr ABHA IDs, 4.2 Lakh registered facilities, 3.8 Lakh health professionals, and 30 Cr+ e-Sanjeevani teleconsultations. PM-JAY (₹5 Lakh coverage for 10.7 Cr families, 5.5 Cr+ hospital admissions) proves the insurance model works at scale. But the 2025 gap analysis is stark: ABHA-linked health record adoption is below 5% of ID holders, private-hospital ABDM interoperability remains voluntary, and the most powerful adoption driver — mandating ABHA linkage for insurance claims — is still under consultation. e-Sanjeevani\'s 30 Cr teleconsultations are predominantly government-to-patient; private telemedicine platforms remain unintegrated. ABDM has the architecture. Now it needs the mandate.',
    citizenAction: 'Create your ABHA via the ABDM app or portal — it is free, takes five minutes, and is verified by Aadhaar or driving licence. Then link at least one lab report or prescription to your ABHA — an ID with no data is just a number. Grant consent-based data sharing with any registered provider — ABDM\'s consent manager architecture lets you control exactly who sees what. Register as a blood donor on e-RaktKosh. Use Aarogya Setu to access your digital health records. The system works only if enough people populate it with data — and that starts with you linking your first record.',
    budget: 'ABDM: ₹1,600 Cr — modest for a national digital health infrastructure serving 140 Cr people. Estonia spent €50M on its entire e-Health system for 1.3 million people; India\'s per-capita ABDM spend is 1/10th of that. PM-JAY: ₹6,400 Cr (FY26), PM-MJAY seniors: ₹3,600 Cr, PM Janaushadhi: ₹1,200 Cr. National Health Mission: ₹38,935 Cr. Total health budget FY26: ₹91,000 Cr (+17% YoY) — still only 1.2% of GDP, compared to the 2.5-3% recommended by the National Health Policy 2017. India spends less than half the recommended share of GDP on health, making ABDM\'s efficiency gains even more critical — digitisation is the only way to do more with less.',
    globalComparison: 'Estonia has covered 100% of its population with e-Health since 2008 — digital prescriptions for 20 years, blockchain-backed data security, and 99% of health data digitised. The UK\'s NHS App has 30M users with GP appointment booking and prescription requests. Denmark has 99% digital prescription adoption and cross-regional health data exchange. India\'s ABDM — 67 Cr IDs in 3 years — is the fastest absolute rollout in history. But Estonia reached full e-Health coverage with 1.3 million people; India is trying to do it with 140 Cr. The lesson: Estonia\'s success came from making e-Health mandatory for providers. India\'s voluntary model creates adoption but not data flow — and without data flow, the system cannot deliver the clinical and efficiency gains it promises.',
  },
  {
    slug: 'judicial-pendency-reform',
    title: 'Judicial Pendency Reform',
    summary: 'India\'s courts dispose of 2.8 crore cases every year. New filings add 3 crore. The net result: the backlog grows by 2 lakh cases every year, reaching 5.1 crore pending. The average civil case takes 1,200 days to resolve. At this rate, "justice delayed" is not a risk — it is a statistical certainty.',
    category: 'Economy',
    status: 'In Progress',
    priority: 'Medium',
    metrics: [
      { label: 'Total Pending Cases', value: '5.1 Cr' },
      { label: 'Supreme Court', value: '82,000+' },
      { label: 'High Courts', value: '61 Lakh' },
      { label: 'District Courts', value: '4.4 Cr' },
    ],
    progress: [
      { current: 21, target: 50, label: 'Judges per Million Population', unit: 'judges' },
    ],
    milestones: [
      { date: '2023', event: 'Mediation Act passed — pre-litigation mediation mandated in certain civil cases', status: 'achieved' },
      { date: '2023', event: 'Bharatiya Nyaya Sanhita codified — replaces colonial-era IPC', status: 'achieved' },
      { date: '2024', event: 'e-Courts Phase III approved (₹7,210 Cr) with AI-assisted case management', status: 'achieved' },
      { date: '2025', event: '2,400+ fast-track courts operational for sexual offences; 1,000+ for commercial disputes', status: 'achieved' },
      { date: '2026', event: 'NJDG real-time pendency dashboard expansion; AI case categorisation pilot in 500+ courts', status: 'in-progress' },
      { date: '2027', event: 'e-Courts Phase III completion target — 3,000+ court complexes digitised', status: 'upcoming' },
    ],
    citizenActions: [
      { role: 'Litigant', action: 'Track case status, cause lists, and orders via e-Courts portal or mobile app (NJDG)' },
      { role: 'Disputant', action: 'Opt for pre-litigation mediation under Mediation Act 2023 — settlement in 60-90 days' },
      { role: 'Filer', action: 'File cases via e-filing portals — available in 1,500+ district courts across India' },
      { role: 'Underserved', action: 'Access pro bono legal assistance through Legal Services Authorities (NALSA: ₹1,800 Cr budget)' },
    ],
    systemAnalysis: 'The judicial system suffers a structural imbalance between inputs and throughput. India has 21 judges per million population — less than half the Law Commission\'s recommended 50, and far below the UK (50) and the US (115). Vacancies compound the shortage: 23% of High Court positions and 17% of district court posts are unfilled. Filing rates (3 Cr/yr) outpace disposals (2.8 Cr/yr), creating a net accretion of ~2 Lakh cases/yr that no amount of digitisation alone can absorb. The 2023 Bharatiya Nyaya Sanhita replaced colonial-era criminal procedure, but civil procedure remains governed by the 1908 CPC with minimal change. The e-Courts Phase III (₹7,210 Cr) targets AI-assisted case management, but technology addresses throughput, not the supply-side constraint of too few judges. The 400+ High Court vacancies are a recruitment and appointment problem — and the appointment process remains slow, opaque, and subject to executive-judiciary friction.',
    governmentAction: 'e-Courts Phase III (₹7,210 Cr) — digitising 3,000+ court complexes with AI-assisted case categorisation and virtual court expansion — is India\'s most ambitious judicial technology investment. The National Judicial Data Grid now provides real-time pendency data by court, case type, and judge, creating transparency that did not exist before. Fast-track courts — 2,400+ for sexual offences (POCSO) and 1,000+ for commercial disputes — are working: POCSO case disposal times dropped 35% in fast-track courts. The Mediation Act 2023, mandating pre-litigation mediation in certain civil cases, is a structural reform that could prevent cases from entering the pipeline altogether. But without addressing the 400+ High Court vacancies and 17% district court vacancy rate, the systemic backlog will continue growing — technology can speed up disposal, but it cannot fill empty judge chairs.',
    citizenAction: 'Litigants: track your case status, cause lists, and court orders in real time via the e-Courts portal or NJDG mobile app — you no longer need to visit the court registry for updates. Disputants: if your civil dispute is eligible, opt for pre-litigation mediation under the Mediation Act 2023 — settlements are reached in 60-90 days versus 1,200 days for trial. Filers: use e-filing portals now available in 1,500+ district courts — it eliminates an average of 3-4 court visits per case. Underserved litigants: access pro bono legal assistance through State Legal Services Authorities (NALSA budget: ₹1,800 Cr) — legal aid is a constitutional right, not a charity.',
    budget: 'e-Courts Phase III: ₹7,210 Cr (FY23-27) — the largest single IT investment in India\'s judiciary. NALSA legal aid: ₹1,800 Cr. State-level court infrastructure: ₹4,500 Cr. Fast-track court operational costs: ₹1,200 Cr. Total justice sector spending: 0.08% of GDP — 6x below the Law Commission\'s recommended 0.5%. The UK spends 0.4% of GDP on courts and legal aid. India\'s case-to-judge ratio of 2,600:1 (vs 400:1 in the US) means even doubling the judiciary budget would still leave it under-invested by global standards.',
    globalComparison: 'Singapore resolves 95% of cases within 6 months using mandatory case management conferences, universal e-filing, and court-ordered mediation — its success proves that procedural reform can substitute for raw judge numbers. The US federal courts achieve a median disposal time of 7.5 months with 115 judges per million, using a case management system (CM/ECF) that has been digital since 2004. The UK\'s Online Civil Money Claims service resolves 83% of cases without a hearing. India\'s 21 judges per million and 3.5-year average civil case disposal make it one of the slowest major judiciaries in the world. The lesson: India needs both more judges (supply-side reform) and fewer cases entering the pipeline (demand-side reform through mediation and pre-litigation screening). The Mediation Act is a strong start. The judicial appointments process needs to follow.',
  },
  {
    slug: 'ev-adoption-infrastructure',
    title: 'EV Adoption Infrastructure',
    summary: 'India added more electric three-wheelers last year than any country has ever added in any EV category — 1.2 million units. Yet its per-capita public charging stations are 1/30th of China\'s. EV penetration reached 6.3% in FY25, led by two-wheelers (50%+ of sales) and three-wheelers (55%+). Four-wheeler EV share: below 2%. The adoption story is real. The infrastructure story is not keeping pace.',
    category: 'Infrastructure',
    status: 'In Progress',
    priority: 'Medium',
    metrics: [
      { label: 'EV Penetration 2025', value: '6.3%' },
      { label: '2030 Target', value: '30%' },
      { label: 'Charging Stations', value: '30,000-35,000' },
      { label: 'FAME II Outlay', value: '₹10,000 Cr' },
    ],
    progress: [
      { current: 6.3, target: 30, label: 'EV Penetration (% of new sales)', unit: '%' },
      { current: 35000, target: 350000, label: 'Public Charging Stations', unit: 'stations' },
    ],
    milestones: [
      { date: '2019', event: 'FAME II launched (₹10,000 Cr, 2019-24) — EV subsidies for 2W, 3W, 4W, buses', status: 'achieved' },
      { date: '2022', event: 'India crosses 1M cumulative EV sales; e-3W becomes dominant segment', status: 'achieved' },
      { date: '2024', event: 'PM E-DRIVE scheme (₹10,900 Cr) succeeds FAME II — expands to trucks and buses', status: 'achieved' },
      { date: '2025', event: 'EV penetration reaches 6.3%; 2Ws at 50%+ share, 3Ws at 55%+; charging stations at ~30,000', status: 'in-progress' },
      { date: '2026', event: 'PLI ACC 50 GWh cell manufacturing capacity expected operational', status: 'in-progress' },
      { date: '2030', event: 'Target: 30% EV penetration; 350,000 public charging stations; 50 GWh domestic cell production', status: 'upcoming' },
    ],
    citizenActions: [
      { role: 'Buyer', action: 'Claim PM E-DRIVE subsidy at dealership (deducted from ex-showroom price automatically)' },
      { role: 'Owner', action: 'Install home charger (₹15,000-50,000) — DISCOMs in Delhi, Maharashtra, Karnataka offer up to ₹30,000 subsidy' },
      { role: 'Shopper', action: 'Use E-AMRIT portal (NITI Aayog) for EV model comparison and nearest charging station locator' },
      { role: 'Fleet Operator', action: 'PM E-DRIVE offers ₹10,000-15,000/kWh subsidy for e-buses — apply via state transport department' },
    ],
    systemAnalysis: 'EV adoption in India is a tale of two markets. Two-wheelers (50%+ of EV sales) and three-wheelers (55%+ share) are succeeding because of low battery requirements (2-5 kWh vs 40-100 kWh for cars) and clear use cases (last-mile delivery, passenger autos). Four-wheeler EV penetration remains below 2%, stalled by battery cost ($130/kWh, 40% of vehicle price), range anxiety driven by just ~30,000-35,000 public charging stations against a 2030 requirement of 350,000, and 100% import dependence for Li-ion cells. The PLI ACC scheme (₹18,100 Cr for 50 GWh domestic capacity) aims to break the import loop, but 50 GWh covers only ~60% of projected 2030 demand. The grid integration problem is also unaddressed: DISCOMs in Delhi, Mumbai, and Bengaluru have not modelled the load impact of mass EV charging, which could spike peak demand by 15-20% without time-of-day pricing. The system is scaling demand without planning for the infrastructure that demand requires.',
    governmentAction: 'PM E-DRIVE (₹10,900 Cr, 2024-27) expands EV subsidies beyond FAME II\'s 2W/3W/bus focus to trucks — a correct extension given logistics sector emissions. The declining subsidy structure for 2W and 3W is working: penetration crossed 6.3% without per-vehicle subsidy needing to increase. PLI ACC\'s ₹18,100 Cr for 50 GWh cell manufacturing is a genuine industrial policy bet, and state-level EV funds — Delhi (₹5,000 Cr), Maharashtra (₹400 Cr), Gujarat (₹350 Cr), Karnataka (₹250 Cr) — add complementary incentives. But the charging station target of 350,000 by 2030 implies adding 50,000+ per year; current annual addition is ~8,000. The ₹10,900 Cr PM E-DRIVE allocation prioritises demand subsidies, while charging infrastructure — which requires coordinated action between DISCOMs, municipalities, and private operators — remains a state-by-state patchwork with no national rollout plan.',
    citizenAction: 'Buyers: claim the PM E-DRIVE subsidy at the dealership — it is auto-deducted from the ex-showroom price, no paperwork required. Owners: install a home charger (₹15,000-50,000) — DISCOMs in Delhi, Maharashtra, and Karnataka offer up to ₹30,000 subsidy, making the payback period 6-12 months. Shoppers: use the E-AMRIT portal (NITI Aayog) to compare EV models by range, price, and running cost, and locate the nearest charging station. Fleet operators: apply for the PM E-DRIVE e-bus subsidy (₹10,000-15,000/kWh) through your state transport department — this is the highest per-vehicle subsidy available and covers 40-50% of the bus cost.',
    budget: 'PM E-DRIVE: ₹10,900 Cr (2024-27) — a marginal increase over FAME II\'s ₹10,000 Cr. PLI ACC: ₹18,100 Cr for 50 GWh battery cell manufacturing. PLI Auto: ₹26,058 Cr. State EV funds: Delhi ₹5,000 Cr, Maharashtra ₹400 Cr, Gujarat ₹350 Cr, Karnataka ₹250 Cr. Total committed: ~₹71,000 Cr — substantial, but China spends that on EV infrastructure in a single year. The real gap is charging infrastructure: India\'s current ~30,000-35,000 stations require ~₹5 Cr per station in urban areas, meaning 350,000 by 2030 would need ₹1.75 lakh Cr — 16x the current PM E-DRIVE allocation. At current run rates, India will reach 100,000 stations by 2030, not 350,000.',
    globalComparison: 'China sold 10M+ EVs in 2024 (60% of global sales), operates 7.6 million charging points — one for every 3 EVs — and produces 95% of its batteries domestically, giving it a $23/kWh cell cost advantage over India\'s imported cells. Norway achieved 82% EV share of new car sales through $20B in cumulative subsidies and a comprehensive charging network. The EU plans a 2035 ICE ban backed by a $3B battery fund. India\'s 6.3% EV penetration matches the global average, but its charging density (stations per capita) is 1/30th of China\'s. The unique bright spot: India\'s three-wheeler EV penetration (55%) is a global first — 1.2 million e-3Ws is the world\'s largest electric auto fleet. The lesson: India will not replicate China\'s EV scale in four-wheelers anytime soon, but it has accidentally built the world\'s best e-3W ecosystem. Policy should double down on what is working instead of chasing four-wheeler parity.',
  },
]

export function getFixStory(slug: string): FixStory | undefined {
  return FIX_STORIES.find((s) => s.slug === slug)
}
