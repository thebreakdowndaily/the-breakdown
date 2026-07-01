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
    summary: 'With 8,180 MW (~8.2 GW) installed capacity across 25 reactors, India generates just 3% of its electricity from nuclear — the lowest among major economies. The Nuclear Energy Mission targets 22 GW by 2032 and 100 GW by 2047, but past cost overruns and execution delays remain barriers.',
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
    systemAnalysis: 'India\'s nuclear stagnation has structural roots: the Atomic Energy Act 1962 creates a DAE-NPCIL monopoly that suppresses competitive pricing; the Civil Liability for Nuclear Damage Act 2010 deters foreign suppliers due to unlimited operator liability; land acquisition at Jaitapur (6.6 GW, shelved since 2011) and Kovvada (5 GW, 2015) remains stalled; and uranium fuel supply requires NSG-specific safeguards compliance despite the 2008 waiver.',
    governmentAction: 'Budget 2024-25 allocated ₹20,000 Cr for nuclear; Atomic Energy Act amended in 2024 to allow NPCIL joint ventures with PSUs (NTPC, NALCO, Indian Oil); 10 PHWR-700 units approved in fleet mode across 5 sites; Bharat Small Reactors (220 MW) and SMR R&D with ₹8,500 Cr; siting clearances for 5 new nuclear parks.',
    citizenAction: 'Participate in AERB-mandated public hearings for new plant siting (notices published in local newspapers and district portals). Residents near existing sites can access CSR-funded skilling programmes run by NPCIL. Submit comments on DAE consultations for SMR policy and liability framework amendments.',
    budget: '₹20,000 Cr Nuclear Energy Mission + ₹8,500 Cr for SMR R&D (FY25-30). NPCIL capex: ₹12,000 Cr (FY26). Cumulative investment requirement for 100 GW: ~₹12 lakh Cr at current capital costs ($3-5M/MW for PHWR).',
    globalComparison: 'China: 56 GW operational, 23 under construction, 200 GW target by 2035. France: 65% nuclear electricity, new EPR2 fleet at €51.7B. South Korea: 25 reactors (28 GW), APR-1400 export to UAE. India\'s ~8.2 GW is comparable to 2001-level China. Its homegrown PHWR technology gives cost control but fleet deployment speed is 5x slower than Chinese build-out.',
  },
  {
    slug: 'green-hydrogen-adoption',
    title: 'Green Hydrogen Adoption',
    summary: 'India\'s ₹19,744 Cr National Green Hydrogen Mission targets 5 MMT/yr by 2030, leveraging the world\'s cheapest solar tariffs ($0.03/kWh). But at $4-5/kg, green hydrogen costs 3x grey hydrogen, and operational electrolyser capacity stands at ~70 MW — trailing Germany\'s 88 MW.',
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
    systemAnalysis: 'Green hydrogen at $4-5/kg faces a steep cost curve to reach $2/kg viability for refining, fertiliser, and steel offtake. India has negligible domestic PEM electrolyser supply chain (import dependence: 90%). Water availability: 9 m³/kg H2 in electrolysis competes with agriculture in arid hydrogen-hub states (Gujarat, Rajasthan). ISTS waiver reduces cost by $0.3-0.5/kg but transmission bottlenecks persist.',
    governmentAction: 'NGHM (Jan 2023) with ₹19,744 Cr: ₹17,490 Cr SIGHT production incentives over 8 years, ₹1,466 Cr pilot projects in shipping and steel decarbonisation, ₹788 Cr R&D. Mandatory green hydrogen consumption quotas: 15% for refineries (FY26), escalating to 25% by FY30. ISTS charge waiver for 25 years. State-level subsidies in Gujarat, Tamil Nadu, and Karnataka for electrolyser manufacturing.',
    citizenAction: 'Engineers can target electrolyser and fuel-cell skilling via SIGHT-certified programmes. Communities in identified hydrogen hubs (Kandla, Tuticorin, Paradip) can participate in district planning for water allocation and port infrastructure. Consumers can prefer products from certified green-hydrogen supply chains (steel, fertiliser).',
    budget: '₹19,744 Cr total: ₹17,490 Cr SIGHT, ₹1,466 Cr pilots, ₹788 Cr R&D, ₹9 Cr HR. State subsidies: Gujarat (₹500 Cr), Tamil Nadu (₹300 Cr), Karnataka (₹250 Cr) for electrolyser manufacturing. First tranche awarded: 412,000 tonnes capacity at discovered prices of ₹387-397/kg H2 (Mode-1 subsidy: ₹50/kg in Year 1, ₹40/kg in Year 2, ₹30/kg in Year 3).',
    globalComparison: 'China: 200,000 tonnes/yr target, 60% of global electrolyser manufacturing (Longi, Sungrow). EU: 10 MMT imports by 2030 via H2Global auction. Australia: $50B Western Green Hydrogen Hub. Germany: 88 MW operational electrolysis. India\'s renewable cost advantage ($0.03/kWh vs EU $0.08) is real, but its operational capacity (~70 MW) trails Germany and lags far behind China\'s build rate.',
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
    systemAnalysis: 'Delhi\'s pollution sources: vehicular emissions (28%), stubble burning (25% Oct-Nov peak), industrial (20%), construction dust (15%), household fuel (12%). Thermal inversion and low wind speeds in winter trap PM2.5 at ground level. Governance failure: Delhi, UP, Haryana, and Rajasthan have separate pollution control boards with no unified airshed management — despite Supreme Court directions since 2015.',
    governmentAction: 'GRAP Stage I-IV imposed at AQI 201+, 301+, 401+, 450+ respectively. CAQM (formed 2021, replacing EPCA) can issue binding directions to 4 NCR states. Measures: BS-VI since 2020; Pusa bio-decomposer spray on 2,000+ hectares; 1,700 MW gas-based power plant for winter; 2 smog towers (Connaught Place, Anand Vihar) with 70% PM2.5 reduction claims.',
    citizenAction: 'Use SAFAR/CPCB/ Sameer apps for real-time AQI and stage alerts. Carpooling, metro, and CNG buses reduce per-capita contribution. Report construction dust and waste burning via Sameer app. Farmers: Pusa bio-decomposer (free through state agriculture dept) decomposes stubble in 20 days vs 45 days for natural decay.',
    budget: 'CAQM operations: ₹700 Cr. NCAP (131 non-attainment cities): ₹7,600 Cr. FAME II EV subsidies: ₹10,000 Cr. Delhi CNG conversion (DTC + cluster buses): ₹2,300 Cr. Metro expansion Phase IV: ₹28,000 Cr. Total clean air expenditure across NCR: ~₹50,000 Cr.',
    globalComparison: 'Beijing: PM2.5 reduced 58% (2013-22) via coal-to-gas conversion (4.8M households), industrial relocation, and odd-even driving. London: ULEZ expanded to all boroughs in 2023 — 15% NOx reduction in first year. Mexico City: "Hoy No Circula" achieved 11% PM reduction but induced second-car ownership. Delhi\'s challenge is uniquely acute: 33M people, multi-state governance, and geography (Himalayan foothills trap pollutants).',
  },
  {
    slug: 'water-crisis-management',
    title: 'Water Crisis Management',
    summary: 'Per capita water availability has fallen 71% since 1951 to 1,486 m³ — approaching the 1,000 m³ water-scarcity threshold. The Jal Jeevan Mission has raised rural tap coverage from 17% to 79.74%, but groundwater depletion, interstate disputes, and contamination remain unresolved.',
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
    systemAnalysis: 'India\'s water crisis is a demand-supply fracture: per capita availability fell from 5,177 m³ (1951) to 1,486 m³ (2023); 73% of wells in Punjab, Haryana, and Rajasthan show declining water tables; inter-state disputes (Cauvery, Krishna, Godavari, Ravi-Beas) remain unresolved for decades; 1.4 Cr rural habitations have arsenic/fluoride contamination above BIS permissible limits; only 8% of wastewater is treated before discharge.',
    governmentAction: 'JJM (2019): ₹3.6 lakh Cr, 15.44 Cr tap connections (79.74% coverage), 15+ Lakh villages. Atal Bhujal Yojana (₹6,000 Cr): groundwater management in 8,300 water-stressed gram panchayats. Jal Shakti Abhiyan: "Catch the Rain" campaign with 5 L+ rainwater harvesting structures. National Water Mission: 20% water-use efficiency improvement target. Namami Gange (₹22,500 Cr): river rejuvenation.',
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
    systemAnalysis: 'India\'s judicial system has a judge-to-population ratio of 21 per million — one of the lowest globally (UK 50, US 115). Vacancy rate: 23% in High Courts (400+ vacancies), 17% in district courts. Filing rate (3 Cr/yr) outpaces disposals (2.8 Cr/yr), creating a net backlog accretion of ~2 Lakh cases/yr. Civil cases average 1,200 days to disposal; criminal cases 850 days. Colonial-era CPC and CrPC procedures remain largely unchanged despite the 2023 Bharatiya Nyaya Sanhita codification.',
    governmentAction: 'e-Courts Phase III (₹7,210 Cr): digitisation of 3,000+ court complexes, AI-assisted case categorisation and scheduling, virtual court expansion. NJDG provides real-time pendency data by court, case type, and judge. Fast-track courts: 2,400+ for sexual offences (POCSO), 1,000+ for commercial disputes. Mediation Act 2023 mandates pre-litigation mediation in certain civil cases. Commercial Courts Act reduces trial timelines to 12 months.',
    citizenAction: 'Litigants: track case status, cause lists, and orders via e-Courts portal/mobile app. Opt for pre-litigation mediation under Mediation Act 2023 (settlement in 60-90 days). File via e-filing portals — available in 1,500+ district courts. Use Legal Services Authorities for pro bono assistance (NALSA: ₹1,800 Cr budget).',
    budget: 'e-Courts Phase III: ₹7,210 Cr (FY23-27). NALSA legal aid: ₹1,800 Cr. State-level court infrastructure: ₹4,500 Cr. Fast-track court operational costs: ₹1,200 Cr. Justice sector spending: 0.08% of GDP — 6x below the 0.5% recommended by the Law Commission.',
    globalComparison: 'Singapore: 95% cases resolved in 6 months via mandatory case management, e-filing, and court-ordered mediation. US federal courts: median disposal 7.5 months with 115 judges per million. UK: Online Civil Money Claims resolved 83% without hearings. India\'s 21 judges per million and 3.5-year average disposal time make it one of the slowest judiciaries globally, though NJDG transparency is improving accountability.',
  },
  {
    slug: 'ev-adoption-infrastructure',
    title: 'EV Adoption Infrastructure',
    summary: 'India\'s EV penetration reached 6.3% in FY25 — led by two-wheelers (50%+ of EV sales) and three-wheelers (55%+). But with ~30,000-35,000 public charging stations against a requirement of 350,000 by 2030, infrastructure lags policy ambition. Battery costs at $130/kWh still account for 40% of vehicle price.',
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
    systemAnalysis: 'EV adoption bottlenecks: battery cost ($130/kWh, 40% of vehicle cost), range anxiety (~30,000-35,000 charging stations vs 350,000 needed by 2030), and limited domestic cell manufacturing — India imports 100% of Li-ion cells. Two-wheelers lead but four-wheeler EV share is below 2%. Battery recycling infrastructure is nascent (<5 GW recycling capacity). Electricity grid load from mass EV adoption in Delhi, Mumbai, and Bengaluru remains unmodelled by DISCOMs.',
    governmentAction: 'FAME II (₹10,000 Cr, 2019-24) succeeded by PM E-DRIVE (₹10,900 Cr, 2024-27) with expanded bus and truck subsidies. PLI ACC batteries: ₹18,100 Cr for 50 GWh domestic cell manufacturing. PLI Auto: ₹26,058 Cr. State EV policies: Delhi (₹5,000 Cr EV Fund), Maharashtra (₹400 Cr), Gujarat (₹350 Cr), Karnataka (₹250 Cr). Faster Adoption of EV tariff: separate EV meters with ₹0-1/kWh night-time charging.',
    citizenAction: 'Claim PM E-DRIVE subsidy at dealership (deducted from ex-showroom price). Install home charger (₹15,000-50,000) — DISCOMs in Delhi, Maharashtra, Karnataka provide upto ₹30,000 subsidy. Use E-AMRIT portal (NITI Aayog) for EV model comparison and nearest charging station. Fleet operators: PM E-DRIVE offers ₹10,000-15,000/kWh subsidy for e-buses.',
    budget: 'PM E-DRIVE: ₹10,900 Cr (2024-27). PLI ACC: ₹18,100 Cr. PLI Auto: ₹26,058 Cr. FAME II total: ₹10,000 Cr. State EV funds: Delhi ₹5,000 Cr, Maharashtra ₹400 Cr, Gujarat ₹350 Cr, Karnataka ₹250 Cr. Total committed: ~₹71,000 Cr.',
    globalComparison: 'China: 60% of global EV sales (10M+ in 2024), 7.6M charging points, 95% domestic battery production, $23/kWh cell cost advantage. Norway: 82% EV share of new car sales, $20B in cumulative subsidies. EU: 2035 ICE ban, $3B battery fund. India\'s 6.3% EV penetration matches the global average, but charging density is 1/30th of China\'s. India\'s three-wheeler EV penetration (55%) is a unique global success — the world\'s largest e-3W fleet at 1.2M units.',
  },
]

export function getFixStory(slug: string): FixStory | undefined {
  return FIX_STORIES.find((s) => s.slug === slug)
}
