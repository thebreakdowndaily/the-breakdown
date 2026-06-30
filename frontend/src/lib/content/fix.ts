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
    summary: 'India targets 100 GW nuclear capacity by 2047 through the Nuclear Energy Mission, but faces challenges in land acquisition, fuel supply, and public acceptance.',
    category: 'Energy',
    status: 'In Progress',
    priority: 'High',
    metrics: [
      { label: 'Current Capacity', value: '7.48 GW' },
      { label: '2030 Target', value: '22 GW' },
      { label: '2047 Target', value: '100 GW' },
      { label: 'Budget Allocated', value: '₹20,000 Cr' },
    ],
    systemAnalysis: 'India\'s nuclear power generation has stagnated due to delayed plant construction, fuel supply constraints from the Nuclear Suppliers Group regime, and high upfront capital costs. The Atomic Energy Act of 1962 restricts private sector participation, creating a monopoly model that lacks competitive efficiency. Land acquisition and local opposition have delayed projects in Jaitapur, Kovvada, and Gorakhpur.',
    governmentAction: 'The Nuclear Energy Mission was announced in Union Budget 2025-26 with ₹20,000 Cr allocation. The government is operationalizing 10 indigenous 700 MW PHWRs, has amended the Atomic Energy Act to allow joint ventures with PSUs, and is negotiating with France, US, and Russia for large reactor projects. Siting of five new nuclear parks has been approved.',
    citizenAction: 'Citizens can participate in public hearings conducted by the Atomic Energy Regulatory Board for new plant siting. Local communities near existing plants can apply for CSR-funded skill development programs. Supporting nuclear awareness campaigns and submitting feedback on DAE public consultations helps shape policy.',
    budget: '₹20,000 Cr allocated under the Nuclear Energy Mission. Additional ₹8,500 Cr for research in small modular reactors (SMRs). NPCIL\'s capex for FY26 is ₹12,000 Cr. Total estimated investment needed to reach 100 GW by 2047 is ~₹12 lakh Cr.',
    globalComparison: 'China leads with 56 GW and 23 under construction. France generates 65% of electricity from nuclear. The US has 93 operating reactors. India\'s 7.48 GW is far below its peer set — even South Korea with a similar GDP per capita operates 25 reactors. However, India\'s indigenous PHWR technology is a unique advantage.',
  },
  {
    slug: 'green-hydrogen-adoption',
    title: 'Green Hydrogen Adoption',
    summary: 'India\'s National Green Hydrogen Mission aims to make the country a global hub for green hydrogen production and export.',
    category: 'Energy',
    status: 'In Progress',
    priority: 'High',
    metrics: [
      { label: 'Mission Outlay', value: '₹19,744 Cr' },
      { label: 'Target Production', value: '5 MMT/yr' },
      { label: '2030 Timeline', value: 'By 2030' },
      { label: 'Jobs Target', value: '6 Lakh' },
    ],
    systemAnalysis: 'Green hydrogen is currently uncompetitive at ~$4-5/kg vs grey hydrogen at $1.5-2/kg. Electrolyzer manufacturing capacity is nascent. India lacks a domestic supply chain for PEM electrolyzers and depends on imports. Water availability for electrolysis in arid regions and high transmission costs for renewable energy are additional barriers.',
    governmentAction: 'The National Green Hydrogen Mission (NGHM) was launched with ₹19,744 Cr. Strategic Interventions include: ₹17,490 Cr for production incentives under SIGHT, ₹1,466 Cr for pilot projects, and ₹788 Cr for R&D. Green hydrogen consumption mandates have been set for refineries, fertilizers, and steel. ISTS charges waived for renewable energy used in green hydrogen production for 25 years.',
    citizenAction: 'Individuals can invest in renewable energy companies and green hydrogen funds. Engineers and scientists can upskill in electrolyzer technology. Local communities near proposed green hydrogen hubs can engage in district-level planning committees. Consumers can support companies with certified green hydrogen supply chains.',
    budget: '₹19,744 Cr total outlay: ₹17,490 Cr for SIGHT incentive scheme, ₹1,466 Cr for pilot projects in shipping and steel, ₹788 Cr for R&D, and ₹9 Cr for HR development. Additional state-level incentives in Gujarat, Tamil Nadu, and Karnataka offer subsidies for electrolyzer manufacturing.',
    globalComparison: 'China targets 200,000 tonnes/yr by 2025. EU aims for 10 MMT of renewable hydrogen imports by 2030. Australia is building the $50B Western Green Hydrogen Hub. Japan and South Korea are early importers. India\'s cost advantage in renewable energy (cheapest solar globally) positions it well, but Germany has already operationalized 88 MW of electrolysis capacity — India has 10 MW.',
  },
  {
    slug: 'national-education-policy-implementation',
    title: 'National Education Policy Implementation',
    summary: 'NEP 2020 proposes sweeping reforms from school to higher education, but implementation faces structural and fiscal challenges.',
    category: 'Education',
    status: 'In Progress',
    priority: 'High',
    metrics: [
      { label: 'GER Target 2035', value: '50%' },
      { label: 'Current GER', value: '27%' },
      { label: 'Budget Allocation 2025', value: '₹1.48L Cr' },
      { label: 'Schools to Transform', value: '14.9 Lakh' },
    ],
    systemAnalysis: 'India\'s education system suffers from low Gross Enrollment Ratio (GER) of 27% in higher education, rote learning culture, teacher shortages (1.2M vacancies), and outdated curricula. The 10+2 structure lacks vocational integration. Regulatory fragmentation across UGC, AICTE, NCTE, and state boards creates duplication. Digital divide limits ed-tech reach in rural areas.',
    governmentAction: 'NEP 2020 implementation includes: 5+3+3+4 curricular structure, National Curriculum Framework (NCF) released 2023, Academic Bank of Credits operationalized, multilingual education push, and four-year ITEP for teacher training. Over 200 new institutions have been granted autonomous status. The National Higher Education Qualifications Framework (NHEQF) has been notified.',
    citizenAction: 'Parents can opt for schools implementing NEP-aligned curricula. Students can use the Academic Bank of Credits for flexible degree completion. Teachers can enroll in NISHTHA training programs. Citizens can provide feedback on NCF drafts published by NCERT. Local communities can participate in School Management Committees.',
    budget: 'Union Budget 2025-26 allocated ₹1.48 lakh Cr for education (3.5% of total budget). This is below the 6% of GDP recommended by NEP. Major schemes: Samagra Shiksha ₹39,311 Cr, PM-USHA ₹6,000 Cr, PM SHRI ₹6,000 Cr, and PM-Vidyalaxmi for educational loans.',
    globalComparison: 'Finland spends 7.2% of GDP on education with a GER of 92% in higher education. China has a GER of 64% with targeted investments in STEM. The US spends 6.1% of GDP. India\'s 4.6% of GDP (including states) remains below global averages, but the scale of transformation — 1.5M schools, 260M students — is unmatched globally.',
  },
  {
    slug: 'air-pollution-delhi-ncr',
    title: 'Air Pollution in Delhi-NCR',
    summary: 'The Graded Response Action Plan (GRAP) and other interventions aim to combat Delhi\'s severe air pollution, but seasonal spikes persist.',
    category: 'Environment',
    status: 'Under Review',
    priority: 'High',
    metrics: [
      { label: 'Avg AQI (Winter)', value: '350+' },
      { label: 'Annual Deaths Attributed', value: '1.2 Lakh' },
      { label: 'GRAP Stages', value: '4 Levels' },
      { label: 'CAQM Budget', value: '₹700 Cr' },
    ],
    systemAnalysis: 'Delhi\'s air pollution is a multi-source crisis: vehicular emissions (28%), stubble burning (25% in Oct-Nov), industrial pollution (20%), construction dust (15%), and household emissions (12%). Thermal inversion traps pollutants in winter. The absence of a unified airshed management approach across NCR states (Delhi, UP, Haryana, Rajasthan) limits effectiveness.',
    governmentAction: 'Graded Response Action Plan (GRAP) with 4 stages activated based on AQI. Commission for Air Quality Management (CAQM) formed in 2021. Key measures: BS-VI norms since 2020, EV policy, Pusa bio-decomposer for stubble, smog towers, and real-time source apportionment studies. The Supreme Court-appointed EPCA monitors compliance.',
    citizenAction: 'Citizens can use real-time air quality apps (SAFAR, CPCB), adopt carpooling and public transport, install air purifiers, report construction dust violations via the Sameer app, and avoid open waste burning. Farmers can adopt the Pusa bio-decomposer technology as an alternative to stubble burning.',
    budget: 'CAQM operational budget of ₹700 Cr. NCAP (National Clean Air Programme) has ₹7,600 Cr for 131 non-attainment cities. EV subsidies under FAME II: ₹10,000 Cr. Central assistance for CNG conversion and metro expansion in Delhi exceeds ₹50,000 Cr.',
    globalComparison: 'Beijing reduced PM2.5 by 58% from 2013 to 2022 through coal-to-gas conversion, industrial relocation, and strict vehicle bans. London\'s ULEZ expanded in 2023. Mexico City\'s "Hoy No Circula" program shows mixed results. Delhi\'s challenge is uniquely complex due to its population density, multi-state governance, and geographic factors (Himalayan foothills trap pollution).',
  },
  {
    slug: 'water-crisis-management',
    title: 'Water Crisis Management',
    summary: 'Jal Jeevan Mission aims to provide tap water to every rural household, with integrated water conservation and management.',
    category: 'Infrastructure',
    status: 'In Progress',
    priority: 'High',
    metrics: [
      { label: 'Tap Connections Delivered', value: '14.5 Cr' },
      { label: 'Target Households', value: '19.4 Cr' },
      { label: 'Mission Budget', value: '₹3.6L Cr' },
      { label: 'Completion Target', value: '2028' },
    ],
    systemAnalysis: 'India faces acute water stress — per capita annual water availability has fallen from 5,177 m³ in 1951 to 1,486 m³ in 2023. Groundwater depletion is severe in Punjab, Haryana, and Rajasthan (73% of wells show decline). Inter-state water disputes (Cauvery, Krishna, Godavari) remain unresolved. 80% of rural households lacked piped water before JJM. Water quality issues (arsenic, fluoride) affect 1.4 Cr rural habitations.',
    governmentAction: 'Jal Jeevan Mission (JJM) launched in 2019 with ₹3.6 lakh Cr. 14.5 Cr rural tap connections provided (74% coverage). Focus on arsenic and fluoride-affected states. Jal Shakti Abhiyan for water conservation. Atal Bhujal Yojana (₹6,000 Cr) for groundwater management. Namami Gange for river rejuvenation. National Water Mission targets 20% improvement in water use efficiency.',
    citizenAction: 'Households can register for tap connections through the JJM dashboard. Villages can form Water User Committees for local O&M. Rainwater harvesting is mandatory in 18 states — citizens can install rooftop systems. Using the "Jal" app to report leaks and water quality issues. Farmers can adopt micro-irrigation under PM-KUSUM.',
    budget: '₹3.6 lakh Cr total JJM outlay (Centre: ₹2.08L Cr, State: ₹1.52L Cr). PM-KUSUM for solar pumps: ₹34,422 Cr. Atal Bhujal Yojana: ₹6,000 Cr. National River Conservation Plan: ₹13,800 Cr. State-level additional budgets: ₹50,000+ Cr.',
    globalComparison: 'Israel recycles 86% of wastewater and uses drip irrigation for 75% of agriculture. Singapore\'s NEWater meets 40% of demand. Australia\'s Murray-Darling Basin Plan uses water markets for efficient allocation. India\'s water productivity ($3.5/m³) is 5x lower than Israel ($19/m³). JJM\'s scale — 19 Cr households — is unprecedented globally.',
  },
  {
    slug: 'digital-health-infrastructure',
    title: 'Digital Health Infrastructure',
    summary: 'Ayushman Bharat Digital Mission (ABDM) aims to create a unified digital health ecosystem with unique health IDs for all Indians.',
    category: 'Health',
    status: 'In Progress',
    priority: 'Medium',
    metrics: [
      { label: 'Health IDs Created', value: '67 Cr' },
      { label: 'Registered Facilities', value: '4.2 Lakh' },
      { label: 'Registered Doctors', value: '3.8 Lakh' },
      { label: 'ABDM Budget', value: '₹1,600 Cr' },
    ],
    systemAnalysis: 'India\'s healthcare system is fragmented with poor data interoperability across public and private providers. Patients lack portable health records. Insurance claims processing is slow due to manual verification. Rural health infrastructure remains underdeveloped with 74% of doctors concentrated in urban areas. The doctor-patient ratio of 1:834 is better than WHO norms but maldistributed.',
    governmentAction: 'ABDM launched in 2021 with ₹1,600 Cr. Creates Ayushman Bharat Health Accounts (ABHA) for citizens. Health Facility Registry (HFR) and Health Professional Registry (HPR) operational. Over 67 Cr ABHA IDs created. PM-JAY (Ayushman Bharat) provides ₹5 Lakh coverage to 10.7 Cr families. 1.7 Lakh Health & Wellness Centres operationalized. Pradhan Mantri Bhartiya Janaushadhi Pariyojana provides affordable medicines at 7,000+ stores.',
    citizenAction: 'Citizens can create their ABHA Health ID through the ABDM app or portal, link existing medical records, and consent to share data with healthcare providers. Registering as a blood donor on e-RaktKosh. Using the Aarogya Setu app for health advisories. Joining the National Volunteer Corps for health awareness drives in villages.',
    budget: 'ABDM: ₹1,600 Cr. PM-JAY: ₹6,400 Cr (FY26). PM-MJAY (Senior Citizens): ₹3,600 Cr. PM Janaushadhi: ₹1,200 Cr. National Health Mission: ₹38,935 Cr. 17% increase in health budget to ₹91,000 Cr in FY26.',
    globalComparison: 'Estonia\'s e-Health system covers 100% of the population with digital prescriptions and records since 2008. UK\'s NHS App serves 30M users. Denmark has 99% digital prescription adoption. India\'s ABDM scale (67 Cr IDs in 3 years) is the world\'s fastest digital health rollout, but interoperability standards and privacy safeguards remain works in progress.',
  },
  {
    slug: 'judicial-pendency-reform',
    title: 'Judicial Pendency Reform',
    summary: 'Over 5 crore cases are pending across Indian courts. The National Judicial Data Grid and e-Courts Mission aim to reduce pendency through digitization.',
    category: 'Economy',
    status: 'In Progress',
    priority: 'Medium',
    metrics: [
      { label: 'Total Pending Cases', value: '5.1 Cr' },
      { label: 'Supreme Court', value: '82,000+' },
      { label: 'High Courts', value: '61 Lakh' },
      { label: 'District Courts', value: '4.4 Cr' },
    ],
    systemAnalysis: 'India\'s judicial system suffers from chronic pendency due to low judge-to-population ratio (21 judges per million vs the recommended 50), frequent adjournments, inadequate court infrastructure, and a high case filing rate (3 Cr new cases/yr vs 2.8 Cr disposals). The vacancy rate for judges is 23% in High Courts and 17% in district courts. Colonial-era procedural rules remain largely unchanged.',
    governmentAction: 'e-Courts Mission Phase III (₹7,210 Cr) for digitization and AI-assisted case management. National Judicial Data Grid (NJDG) provides real-time pendency data. The Supreme Court has implemented the "Justice Clock" dashboard. Fast-track courts for sexual offenses (2,400+ courts). Commercial Courts Act aimed at speedy resolution of business disputes. Mediation and Arbitration Act 2023 promotes alternate dispute resolution.',
    citizenAction: 'Litigants can use the e-Courts portal and mobile app for case status, cause lists, and orders — avoiding physical visits. Citizens can opt for mediation under the Mediation Act 2023. Legal professionals can use AI tools for case research. Filing through e-filing portals reduces delays. Supporting Legal Services Authorities (NALSA) for pro bono initiatives.',
    budget: 'e-Courts Phase III: ₹7,210 Cr. Legal aid budget (NALSA): ₹1,800 Cr. State-level court infrastructure: ₹4,500 Cr. Law Commission functioning: ₹30 Cr. Total justice sector spending is ~0.08% of GDP, far below the 0.5% recommended by law commissions.',
    globalComparison: 'Singapore resolved 95% of cases within 6 months through mandatory case management and e-filing. US federal courts have a median disposal time of 7.5 months. UK\'s Online Civil Money Claims resolved 83% of cases without hearings. India\'s case disposal rate (2.8 Cr/yr) is improving but filing rates (3 Cr/yr) outpace it. The judge-to-population ratio in the UK is 50:1M, in the US it is 115:1M.',
  },
  {
    slug: 'ev-adoption-infrastructure',
    title: 'EV Adoption Infrastructure',
    summary: 'With FAME II and state EV policies, India accelerates electric vehicle adoption, but charging infrastructure gaps and battery costs remain barriers.',
    category: 'Infrastructure',
    status: 'In Progress',
    priority: 'Medium',
    metrics: [
      { label: 'EV Penetration 2025', value: '6.3%' },
      { label: '2030 Target', value: '30%' },
      { label: 'Charging Stations', value: '25,000+' },
      { label: 'FAME II Outlay', value: '₹10,000 Cr' },
    ],
    systemAnalysis: 'EV adoption in India faces high upfront costs (battery accounts for 40% of vehicle cost), range anxiety due to insufficient charging infrastructure (25,000 stations vs 350,000 needed by 2030), and limited domestic battery manufacturing. Two-wheelers lead adoption (50%+ of EV sales), but four-wheeler EV penetration is below 2%. Battery recycling infrastructure is nascent.',
    governmentAction: 'FAME II (₹10,000 Cr) provides demand incentives for EVs. PM E-DRIVE (₹10,900 Cr) supersedes FAME from 2024. Production-Linked Incentive (PLI) for ACC battery manufacturing: ₹18,100 Cr. PLI for auto and components: ₹26,058 Cr. States like Delhi, Maharashtra, Gujarat, and Karnataka have additional EV policies with purchase subsidies and road tax exemptions.',
    citizenAction: 'Consumers can claim FAME/PM E-DRIVE subsidies directly at dealerships. Installing home chargers (supported by DISCOMs in many states). Using the E-AMRIT portal to compare EV models and find charging stations. Commercial fleet operators can avail of additional subsidies for electric buses and trucks under the PM E-DRIVE scheme.',
    budget: 'PM E-DRIVE scheme: ₹10,900 Cr (2024-27). PLI ACC: ₹18,100 Cr. PLI Auto: ₹26,058 Cr. FAME II total: ₹10,000 Cr. State EV policies: Delhi (₹100 Cr), Maharashtra (₹400 Cr), Gujarat (₹350 Cr). Total EV ecosystem investment: ~₹60,000 Cr.',
    globalComparison: 'China has 10M+ EVs sold annually (60% of global market) with 7.6M charging points. Norway leads adoption — 80%+ of new cars are EVs. The EU banned ICE cars by 2035. India\'s EV penetration (6.3%) matches the global average, but charging infrastructure density is 1/30th of China\'s. India\'s progress in three-wheeler EV adoption (over 50%) is a unique success story.',
  },
]

export function getFixStory(slug: string): FixStory | undefined {
  return FIX_STORIES.find((s) => s.slug === slug)
}
