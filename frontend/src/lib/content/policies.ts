export interface PolicyMilestone {
  date: string
  milestone: string
}

export interface Policy {
  title: string
  slug: string
  category: string
  status: string
  budget: string
  description: string
  timeline: PolicyMilestone[]
  keyProvisions: string[]
  impactMetrics: { label: string; value: string }[]
  globalComparison: { country: string; status: string; notes: string }[]
}

const POLICIES_DATA: Policy[] = [
  {
    title: 'National Green Hydrogen Mission',
    slug: 'green-hydrogen-mission',
    category: 'Energy & Climate',
    status: 'Active',
    budget: '₹19,744 Cr',
    description: 'Launched in 2023, the mission aims to establish 5 MMT of green hydrogen capacity by 2030 — roughly 10% of global demand projections. India\'s solar tariffs ($0.03/kWh) give it a structural cost advantage, but electrolyser manufacturing remains nascent. Current green hydrogen cost of $4-5/kg must fall below $2/kg for viability in refining, fertiliser, and steel sectors.',
    timeline: [
      { date: 'Aug 2021', milestone: 'PM announces hydrogen mission from Red Fort, setting a 2047 energy independence vision.' },
      { date: 'Feb 2022', milestone: 'ISTS charge waiver notified for renewable energy used in green hydrogen production — a 25-year benefit.' },
      { date: 'Jan 2023', milestone: 'Cabinet approves mission with ₹19,744 Cr outlay; SIGHT programme allocated ₹17,490 Cr for incentives.' },
      { date: 'Jun 2023', milestone: 'SIGHT guidelines notified — two distinct incentive buckets for electrolyser manufacturing and hydrogen production.' },
      { date: '2024-25', milestone: 'First tranche bids awarded: 412,000 tonnes of production capacity and 1.5 GW of electrolyser manufacturing.' },
      { date: '2030', milestone: 'Target: 5 MMT annual production, 125 GW renewable capacity, 50 GW electrolyser capacity.' },
    ],
    keyProvisions: [
      '5 MMT green hydrogen production target by 2030, backed by mandatory consumption quotas for refineries (15%), fertilisers, and steel',
      'SIGHT programme with ₹17,490 Cr in financial incentives — differentiated rates for electrolyser manufacturing and hydrogen production',
      'ISTS charge waiver for 25 years on renewable energy used in hydrogen production, reducing levellised cost by $0.3-0.5/kg',
      'Identification of two green hydrogen hubs (Gujarat, Tamil Nadu) with common infrastructure and port connectivity for export',
      'Targeted 125 GW of dedicated renewable capacity — equivalent to 40% of India\'s current total installed capacity',
      'Export corridor strategy targeting EU Carbon Border Adjustment Mechanism (CBAM) compliance and Asian offtake agreements',
    ],
    impactMetrics: [
      { label: 'CO2 Reduction', value: '50 MMT/yr by 2030' },
      { label: 'Renewable Capacity', value: '125 GW additional' },
      { label: 'Fossil Fuel Savings', value: '₹1 Lakh Cr/yr' },
      { label: 'Employment', value: '6 Lakh jobs' },
      { label: 'Investment Target', value: '₹8 Lakh Cr' },
    ],
    globalComparison: [
      { country: 'EU', status: 'Active', notes: '40 GW electrolyser target by 2030; 10 MMT domestic production via RFNBO rules; CBAM creates export premium' },
      { country: 'China', status: 'Active', notes: 'Controls 60% of global electrolyser manufacturing; targeting 200,000 tonnes/yr; alkaline technology leader' },
      { country: 'USA', status: 'Active (IRA)', notes: '45V production tax credit up to $3/kg; $8B hydrogen hub programme under Bipartisan Infrastructure Law' },
      { country: 'Japan', status: 'Active', notes: '3 MMT/yr target by 2030; first-mover in ammonia co-firing; strategic partnerships in Australia and Middle East' },
    ],
  },
  {
    title: 'Digital Personal Data Protection Act',
    slug: 'data-protection-act',
    category: 'Technology & Law',
    status: 'Implementation',
    budget: '—',
    description: 'Passed in August 2023, the DPDP Act is India\'s first cross-sectoral data protection regime — seven years after the Supreme Court recognised privacy as a fundamental right. It applies to all digital personal data processed in India, and to offshore processing involving profiling of Indian citizens. Enforcement awaits final rules and a functional Data Protection Board.',
    timeline: [
      { date: 'Aug 2017', milestone: 'Supreme Court unanimously declares Right to Privacy a fundamental right under Article 21 (Puttaswamy judgment).' },
      { date: 'Jul 2018', milestone: 'Justice Srikrishna Committee submits draft Data Protection Bill, recommending a GDPR-style framework.' },
      { date: 'Dec 2019', milestone: 'Personal Data Protection Bill 2019 introduced — includes data localization and social media provisions later dropped.' },
      { date: 'Aug 2023', milestone: 'DPDP Act 2023 passed after the 2019 Bill is withdrawn; narrower scope, fewer compliance burdens.' },
      { date: 'Jan 2024', milestone: 'Draft DPDP Rules released for 45-day public consultation; significant ambiguities remain on consent managers.' },
      { date: '2025', milestone: 'Expected enforcement pending final rules, Data Protection Board appointments, and appellate tribunal setup.' },
    ],
    keyProvisions: [
      'Consent-based processing with notice requirements — notice must be in clear, plain language with opt-in mechanism',
      'Data fiduciary obligations: purpose limitation, data minimisation, reasonable security safeguards, and breach notification (72 hours)',
      'Significant data fiduciaries (based on volume, sensitivity, and risk) face additional obligations — data audit, DPIA, and independent auditor',
      'Cross-border data transfer permitted to any jurisdiction, subject to central government notification and contractual safeguards',
      'Data Protection Board of India — a quasi-judicial body with powers to impose penalties, issue directions, and adjudicate disputes',
      'Penalties up to ₹250 Cr for breach notification failures; up to ₹500 Cr for other violations; no criminal liability for fiduciaries',
      'Data principals granted rights to access, correction, erasure, grievance redressal, and a right to nominate a proxy',
    ],
    impactMetrics: [
      { label: 'Covered Entities', value: 'All data fiduciaries' },
      { label: 'Max Penalty', value: '₹250 Cr per breach' },
      { label: 'Compliance Timeline', value: '12 months post rules' },
      { label: 'Data Principal Rights', value: '7 rights' },
      { label: 'Exemptions', value: 'Govt-notified entities' },
    ],
    globalComparison: [
      { country: 'EU', status: 'GDPR Active', notes: 'Extra-territorial reach, DPO requirement, 4% of global turnover fines — gold standard globally' },
      { country: 'USA', status: 'Sectoral', notes: 'No federal omnibus law; CCPA (California), state-level consumer privacy acts; FTC enforcement' },
      { country: 'China', status: 'PIPL Active', notes: 'Strict data localisation, cross-border security assessments, 5% revenue fines' },
      { country: 'Brazil', status: 'LGPD Active', notes: 'GDPR-aligned; 2% revenue penalty cap; DPO required; full extra-territorial scope' },
    ],
  },
  {
    title: 'Production Linked Incentive Schemes',
    slug: 'pli-schemes',
    category: 'Industry & Manufacturing',
    status: 'Active',
    budget: '₹1.97 Lakh Cr',
    description: 'Launched in 2020 as a post-COVID manufacturing stimulus, PLI schemes now span 14 sectors with a combined outlay of ₹1.97 lakh Cr. The design is simple: firms receive 3-15% of incremental sales as incentive, conditional on meeting investment and production thresholds. Electronics has emerged as the standout success — mobile phone exports tripled within three years of the scheme\'s launch.',
    timeline: [
      { date: 'Mar 2020', milestone: 'Union Cabinet approves first PLI scheme for mobile phones and electronics — 4-6% incentive on incremental sales.' },
      { date: 'Nov 2020', milestone: 'PLI expanded to 10 additional sectors — automobiles, pharma, textiles, food processing, solar, and ACC batteries.' },
      { date: 'Apr 2021', milestone: 'Pharmaceutical PLI notified: ₹15,000 Cr for bulk drugs, ₹3,420 Cr for medical devices, targeting import substitution.' },
      { date: 'Sep 2021', milestone: 'Cabinet extends PLI to drones, auto components, and textiles with differentiated incentive rates for MSMEs.' },
      { date: '2023', milestone: 'First disbursement tranche released; electronics manufacturing crosses $100B; Apple exports from India reach $7B.' },
      { date: '2025-26', milestone: 'Full-scale implementation across all 14 sectors; cumulative disbursement projected at ₹50,000 Cr.' },
    ],
    keyProvisions: [
      'Incentive rates of 3-15% on incremental sales (over base year) — highest rates in electronics (6%) and ACC batteries (15%)',
      '14 sectors: electronics, automobiles, auto components, pharma, textiles, food processing, solar PV, ACC batteries, drones, telecom, specialty steel, white goods, IT hardware, medical devices',
      'Minimum investment thresholds ranging from ₹10 Cr (textiles) to ₹5,000 Cr (solar PV) with graded production targets',
      'Tiered domestic value addition (DVA) requirements — 25-60% depending on sector — to prevent assembly-only operations',
      'Import substitution clauses prioritise domestically manufactured components for incentive eligibility',
      'Application-based selection evaluated by inter-ministerial committees; quarterly production and investment verification',
    ],
    impactMetrics: [
      { label: 'Total Outlay', value: '₹1.97 Lakh Cr' },
      { label: 'Sectors Covered', value: '14' },
      { label: 'Jobs Created (Estimated)', value: '60 Lakh' },
      { label: 'Additional Production', value: '₹35 Lakh Cr' },
      { label: 'Export Boost', value: '₹10 Lakh Cr' },
    ],
    globalComparison: [
      { country: 'Vietnam', status: 'Active', notes: 'CIT 20%, FTAs with EU/Korea/Japan, labour costs 50% below China — major FDI beneficiary in electronics' },
      { country: 'China', status: 'Mature', notes: '70% of global electronics assembly; integrated supply chain; state-backed industrial policy via "Made in China 2025"' },
      { country: 'South Korea', status: 'Mature', notes: 'World leader in semiconductors and displays; chaebol-driven R&D at 4.8% of GDP' },
      { country: 'Mexico', status: 'Active', notes: 'USMCA tariff-free access, nearshoring from China, auto sector dominance — $500B manufacturing exports' },
    ],
  },
  {
    title: 'Nuclear Energy Mission',
    slug: 'nuclear-energy-mission',
    category: 'Energy & Climate',
    status: 'Announced',
    budget: '₹20,000 Cr',
    description: 'Announced in the Union Budget 2024-25, the Nuclear Energy Mission targets a threefold expansion of India\'s nuclear capacity — from 7.4 GW to 22 GW by 2032. The strategy hinges on fleet-deployment of indigenous 700 MW PHWRs and Bharat Small Reactors (220 MW). India\'s nuclear share at 3% of generation is among the lowest of major economies, and past cost overruns (Kudankulam: 3x original budget) underscore execution risk.',
    timeline: [
      { date: '2023', milestone: 'Government announces fleet-mode deployment of 10 PHWR-700 units — 7,000 MW added across 5 sites in parallel.' },
      { date: '2024', milestone: 'Budget 2024-25 allocates ₹20,000 Cr; Atomic Energy Act amended to allow PSU joint ventures.' },
      { date: '2025', milestone: 'Land acquisition commences at 5 new nuclear parks; DAE issues tenders for PHWR-700 components.' },
      { date: '2027', milestone: 'First Bharat Small Reactor (220 MW BWR) expected at Kaiga; 50 MW SMR design validation.' },
      { date: '2030', milestone: 'Target: 15 GW installed capacity — 4 PHWR units operational, 6 under construction.' },
      { date: '2032', milestone: 'Target: 22 GW — 10 PHWR-700 units online; nuclear share reaches 9% of generation.' },
    ],
    keyProvisions: [
      'Fleet-mode deployment of 10 indigenous PHWR-700 units — same design, multiple sites, standardised procurement to reduce costs',
      'Bharat Small Reactors (220 MW BWR) repurposed from decommissioned submarine reactors; 40-50 units planned for captive industrial use',
      'Joint ventures between NPCIL and PSUs (NTPC, NALCO, Indian Oil) for project financing and operational efficiency',
      'Advanced reactor R&D: thorium-based reactors (AHWR), molten salt reactors, and high-temperature gas-cooled reactors',
      'Expansion of uranium mining in Jharkhand (Turamdih) and Rajasthan; new fuel fabrication facility at Nuclear Fuel Complex',
      'Amended Atomic Energy Act (2024) allows private sector participation in component manufacturing and plant operation via PSU JVs',
    ],
    impactMetrics: [
      { label: 'Current Capacity', value: '7.4 GW' },
      { label: '2032 Target', value: '22 GW' },
      { label: 'Nuclear Share (Current)', value: '3%' },
      { label: 'Nuclear Share (Target)', value: '9%' },
      { label: 'Small Reactors Planned', value: '40-50' },
    ],
    globalComparison: [
      { country: 'China', status: 'Active', notes: '56 GW installed, 23 under construction; 200 GW target by 2035; Hualong One exported to Pakistan, Argentina' },
      { country: 'France', status: 'Active', notes: '65-70% nuclear electricity share; 6 new EPR2 reactors at €51.7B; world leader in fuel reprocessing' },
      { country: 'USA', status: 'Developing', notes: '93 GW installed; Vogtle AP1000 first new reactors in 30 years at $34B — 2x original budget' },
      { country: 'Russia', status: 'Active', notes: 'Rosatom: 35+ reactor exports (VVER technology); small modular RITM-200 deployed on Arctic vessels' },
    ],
  },
  {
    title: 'National Quantum Mission',
    slug: 'quantum-mission',
    category: 'Science & Technology',
    status: 'Active',
    budget: '₹6,003 Cr',
    description: 'Approved in April 2023 with a ₹6,003 Cr outlay (2023-2031), the NQM is India\'s entry into the global quantum race. The mission targets a 1,000-qubit quantum computer by 2030 — a goal that, if met, would place India in the top tier globally. Four thematic hubs have been established at IISc, IITs, and TIFR. India\'s quantum patent share (0.8%) remains negligible, but the mission aims to develop indigenous capability in cryogenics, control electronics, and photonics.',
    timeline: [
      { date: '2020', milestone: 'Budget 2020 announces ₹8,000 Cr for National Mission on Quantum Technologies and Applications (NM-QTA).' },
      { date: 'Apr 2023', milestone: 'Cabinet approves NQM with a revised ₹6,003 Cr outlay; 4 thematic hubs designated.' },
      { date: 'Jun 2023', milestone: 'Hubs operationalised: Quantum Computing (IISc), Communication (IIT Madras), Sensing (TIFR), Materials (IIT Bombay).' },
      { date: '2024', milestone: 'First indigenously built 20-qubit superconducting quantum processor demonstrated at TIFR.' },
      { date: '2026', milestone: 'Target: 50-qubit quantum processor, 100 km terrestrial quantum communication link.' },
      { date: '2030', milestone: 'Target: 1,000-qubit quantum computer, satellite-based QKD (Quantum Key Distribution).' },
    ],
    keyProvisions: [
      'Milestone-based quantum computing targets: 8-qubit prototype (Year 1), 50-qubits (Year 3), 1,000-qubits (Year 7) — superconducting and photonic architectures',
      '4 Thematic Hubs: Quantum Computing (IISc), Quantum Communication (IIT Madras), Quantum Sensing (TIFR), Quantum Materials (IIT Bombay) — ₹200 Cr each',
      'Satellite-based QKD development in partnership with ISRO; terrestrial QKD network linking multiple cities over 100 km',
      'Quantum sensors for defence (magnetometers, gravimeters), healthcare (MRI enhancement), and mining (mineral detection)',
      'Indigenous cryogenic systems (dilution refrigerators, cryostats), microwave electronics, and single-photon detectors',
      'Human resource pipeline: 100 PhD fellowships/yr, 200 postdocs, and industry internships at IBM, D-Wave, and Indian startups',
    ],
    impactMetrics: [
      { label: 'Total Outlay', value: '₹6,003 Cr' },
      { label: 'Timeframe', value: '2023-2031' },
      { label: 'Thematic Hubs', value: '4' },
      { label: 'Qubit Target (2026)', value: '50 qubits' },
      { label: 'Qubit Target (2030)', value: '1,000 qubits' },
    ],
    globalComparison: [
      { country: 'USA', status: 'Active', notes: '$1.2B NQI Act (2022); IBM 1,121-qubit Condor; Google 70-qubit Sycamore; DoD quantum investments exceed $3B' },
      { country: 'China', status: 'Active', notes: '$15B+ total investment; Micius QKD satellite; 66-qubit Zuchongzhi; world leader in quantum communication patents (52%)' },
      { country: 'EU', status: 'Active', notes: '€1B Quantum Flagship (10 years); 20+ country coordinated R&D; 100-qubit device expected by 2025' },
      { country: 'UK', status: 'Active', notes: '£2.5B national quantum strategy (2024-34); National Quantum Computing Centre; first quantum computer procurement via govt cloud' },
    ],
  },
  {
    title: 'National Education Policy 2020',
    slug: 'national-education-policy-2020',
    category: 'Education & Human Resources',
    status: 'Implementation',
    budget: '—',
    description: 'NEP 2020 replaced the 1986 National Policy on Education after a 34-year gap. It restructures the school system into a 5+3+3+4 format aligned with developmental stages, introduces multidisciplinary undergraduate education with multiple exit points, and mandates vocational exposure from Class 6. Five years in, implementation remains uneven — only 18 states have adopted the new curricular framework, and education spending at 3.5% of GDP (FY26) falls short of the 6% the policy itself recommends.',
    timeline: [
      { date: 'Jul 2020', milestone: 'Union Cabinet approves NEP 2020; replaces 1986 policy; landmark shift to 5+3+3+4 structure.' },
      { date: '2022', milestone: 'Multiple states (Kerala, Maharashtra, Gujarat, MP) begin piloting NEP-aligned curricula in schools.' },
      { date: '2023', milestone: 'NCERT releases National Curriculum Framework (NCF) 2023; CUET mandatory for 45 central universities.' },
      { date: '2023', milestone: 'Academic Bank of Credits (ABC) launched; 23 universities operationalise multiple entry/exit in UG programmes.' },
      { date: '2024', milestone: 'National Research Foundation (NRF) established via Act of Parliament; ₹50,000 Cr corpus over 5 years.' },
      { date: '2030', milestone: 'Target: 100% youth literacy, 50% GER in higher education, vocational training in 100% of schools.' },
    ],
    keyProvisions: [
      '5+3+3+4 structure: foundational (3-8 yrs), preparatory (8-11), middle (11-14), secondary (14-18) — replacing 10+2 system',
      'Mother tongue as medium of instruction until Class 5 (preferably Class 8) — 22 scheduled languages in use across states',
      'Multiple entry/exit in UG: certificate (1 yr), diploma (2 yrs), degree (3 yrs), honours (4 yrs) with 40% credit flexibility',
      'Academic Bank of Credits (ABC) — digital credit store enabling seamless transfers between HEIs; 100+ institutions onboarded',
      'National Research Foundation (NRF) — ₹50,000 Cr corpus; funds research across sciences, social sciences, and humanities',
      'Vocational education from Class 6 with 10-day internship per year; National Skills Qualifications Framework (NSQF) alignment',
      'No rigid stream separation — students can combine arts, sciences, and vocational subjects; PARAKH assessment centre for standardised testing',
    ],
    impactMetrics: [
      { label: 'School Structure', value: '5+3+3+4' },
      { label: 'Higher Ed GER (Target)', value: '50% by 2035' },
      { label: 'Vocational Exposure', value: 'From Class 6' },
      { label: 'Multiple Exit Points', value: '3 in UG degree' },
      { label: 'Research Outlay', value: '₹50,000 Cr (NRF)' },
    ],
    globalComparison: [
      { country: 'Finland', status: 'Model', notes: '7.2% of GDP on education; play-based early learning; highest teacher autonomy; no standardised tests until age 16' },
      { country: 'Singapore', status: 'Model', notes: 'Bilingual policy; STEM-focused; OECD PISA top 3 consistently; 97% GER in higher education' },
      { country: 'China', status: 'Active', notes: '4% of GDP on education; Gaokao examination; 63% GER in higher education; 2,100 universities' },
      { country: 'USA', status: 'Decentralised', notes: '6.1% of GDP; state-level control; Common Core standards; 88% GER; $40K+ spending per student per year' },
    ],
  },
  {
    title: 'Jal Jeevan Mission',
    slug: 'jal-jeevan-mission',
    category: 'Water & Infrastructure',
    status: 'Active',
    budget: '₹3.6 Lakh Cr',
    description: 'Launched in 2019, JJM is the world\'s largest rural drinking water programme — aiming to deliver 55 litres per capita per day of potable tap water to every one of India\'s 19.4 crore rural households. Coverage rose from 17% (2019) to 74% (2025), with 14.5 crore new connections. The original 2024 completion target was revised to 2028 after arsenic and fluoride contamination in 1.4 crore habitations required source remediation before pipeline installation.',
    timeline: [
      { date: 'Aug 2019', milestone: 'PM announces JJM from Red Fort; target: functional tap connections to all rural households by 2024.' },
      { date: '2020', milestone: 'Mission launches with priority on water quality-affected districts; ISO 24521 certification for service-level benchmarks.' },
      { date: '2021', milestone: '5 Cr connections achieved despite COVID disruptions; greywater management guidelines issued.' },
      { date: '2022', milestone: '10 Cr connections; Har Ghar Jal certification programme begins for verified 100% covered villages.' },
      { date: '2023', milestone: '12 Cr connections; 70% of rural habitations covered; sustainability audit framework launched.' },
      { date: '2024', milestone: 'Original 2024 target deferred to 2028; focus shifts to quality-affected areas with in-line treatment systems.' },
    ],
    keyProvisions: [
      '55 litres per capita per day (lpcd) of potable water to every rural household — piped, metered, and tested',
      'Village Water and Sanitation Committees (VWSCs) of 10-15 members manage local O&M; 5% capital cost contribution by community',
      'Multi-level water quality monitoring: field test kits at village level, mobile labs at block level, NABL-accredited labs at district level',
      'Greywater management via soak pits, leach pits, and community reuse systems — mandatory for Har Ghar Jal certification',
      'Behavioural change campaigns: "Jal Shakti Abhiyan" and "Catch the Rain" for rainwater harvesting and source rejuvenation',
      'Real-time dashboard with geo-tagged assets (15 Lakh+ water sources mapped), IoT sensors for water quality and quantity monitoring',
    ],
    impactMetrics: [
      { label: 'Total Budget', value: '₹3.6 Lakh Cr' },
      { label: 'Households Covered', value: '14.5+ Cr' },
      { label: 'Coverage Increase', value: '17% to 74%' },
      { label: 'Villages Covered', value: '15+ Lakh' },
      { label: 'Daily Water Provided', value: '66,000 Lakh litres' },
    ],
    globalComparison: [
      { country: 'China', status: 'Active', notes: 'South-North Water Transfer ($80B, 44.8B m³/yr); Rural Water Safety Programme covers 600M people' },
      { country: 'Singapore', status: 'Model', notes: 'NEWater recycled water meets 40% of demand; desalination 30%; 100% water security despite no natural water sources' },
      { country: 'Israel', status: 'Model', notes: '86% wastewater recycling; world leader in drip irrigation; desalination provides 70% of domestic water' },
      { country: 'Ethiopia', status: 'Developing', notes: 'One WASH programme; 50% rural water coverage; community-managed water points; $3.5B sector investment needed' },
    ],
  },
  {
    title: 'Ayushman Bharat',
    slug: 'ayushman-bharat',
    category: 'Health & Social Welfare',
    status: 'Active',
    budget: '₹7,200 Cr (2024-25)',
    description: 'Ayushman Bharat — the world\'s largest government-funded health insurance programme — covers 50+ crore beneficiaries with ₹5 lakh per family per year in secondary and tertiary care. Launched in 2018, PM-JAY has authorised 5.5 crore hospital admissions (¥1.1 lakh Cr in claims) through 27,000+ empanelled hospitals. The 2024 expansion added senior citizens (70+) regardless of income. A parallel pillar — 1.8 lakh Health & Wellness Centres — delivers free primary care and essential diagnostics.',
    timeline: [
      { date: 'Feb 2018', milestone: 'Budget 2018 announces PM-JAY (₹5 Lakh/family/yr) and 1.5 Lakh HWC target.' },
      { date: 'Sep 2018', milestone: 'PM-JAY launched; covers bottom 40% of population (SECCI data); universal portability across states.' },
      { date: '2020', milestone: 'COVID-19 testing and treatment added to PM-JAY; expanded to frontline workers and migrant labour.' },
      { date: '2022', milestone: '5 Cr hospital admissions authorised; cumulative claims exceed ₹60,000 Cr.' },
      { date: '2023', milestone: '1.5 Lakh HWCs operationalised; teleconsultation via e-Sanjeevani reaches 30 Cr+ consultations.' },
      { date: '2024', milestone: 'PM-JAY extended to all citizens aged 70+ irrespective of income — adds 4.5 Cr seniors.' },
    ],
    keyProvisions: [
      '₹5 Lakh per family per year floater cover for secondary and tertiary hospitalisation — 1,949 defined packages covering surgery, medicine, and diagnostics',
      '10.74 Cr poor and vulnerable families (Socio-Economic Caste Census 2011 data) — approximately 50 Cr beneficiaries',
      'Cashless and paperless treatment at empanelled hospitals (27,000+ — 55% private, 45% public) with Ayushman Card QR verification',
      'No cap on family size, age of members, or gender; pre-existing diseases covered from day one',
      'Portable across India — beneficiary can avail treatment in any empanelled hospital in any state',
      '1.8 Lakh HWCs: free primary care, 12 essential medicines, 14 diagnostic services, yoga counselling, and NCD screening',
    ],
    impactMetrics: [
      { label: 'Coverage', value: '50+ Cr beneficiaries' },
      { label: 'Annual Budget', value: '₹7,200 Cr' },
      { label: 'Hospital Admissions', value: '5.5+ Cr' },
      { label: 'Empanelled Hospitals', value: '27,000+' },
      { label: 'HWCs Established', value: '1.8 Lakh' },
    ],
    globalComparison: [
      { country: 'UK', status: 'NHS', notes: 'Tax-funded universal coverage since 1948; free at point of use; 9.3% of GDP; 160,000-bed system' },
      { country: 'USA', status: 'Mixed (ACA)', notes: 'Employer-based private insurance (50%); Medicare (65+), Medicaid (low-income); 8.5% uninsured despite ACA' },
      { country: 'Thailand', status: 'Universal', notes: 'UCS since 2002; 3-tier system (SSS, CSMBS, UCS); capitation model; 30 baht copay; 99.5% coverage' },
      { country: 'China', status: 'Active', notes: 'Urban Employee + Resident Basic Medical Insurance; 95% coverage; catastrophic illness fund; 7% of GDP health spend' },
    ],
  },
  {
    title: 'IndiaAI Mission',
    slug: 'india-ai-mission',
    category: 'Technology & Innovation',
    status: 'Active',
    budget: '₹10,372 Cr',
    description: 'Approved in March 2024 with a ₹10,372 Cr outlay (2024-2030), the IndiaAI Mission aims to build sovereign AI compute infrastructure, develop foundational models, and catalyse applied AI across governance, healthcare, and agriculture. The mission procures 10,000+ GPUs under a public-private partnership — the single largest AI compute investment by any developing economy.',
    timeline: [
      { date: 'Mar 2024', milestone: 'Cabinet approves IndiaAI Mission with ₹10,372 Cr; 7 pillars: compute, data, models, skilling, startups, applications, safety.' },
      { date: 'May 2024', milestone: 'IndiaAI Compute Facility tendered: 10,000+ GPUs (NVIDIA H100 equivalent) via PPP model with 40% capex subsidy.' },
      { date: 'Sep 2024', milestone: 'IndiaAI Dataset Platform launched: 100+ government datasets curated, anonymised, and made accessible for model training.' },
      { date: 'Jan 2025', milestone: 'First tranche of GPU capacity (2,000 GPUs) operational at C-DAC facilities; 50 startups onboarded for subsidised compute.' },
      { date: '2026', milestone: 'Target: IndiaAI foundational model (1B-parameter) trained on Indic datasets; 10 sector-specific AI applications deployed.' },
      { date: '2030', milestone: 'Target: India among top 5 in AI patents; 100+ AI-first startups; AI workforce of 500,000 trained professionals.' },
    ],
    keyProvisions: [
      'AI compute infrastructure: 10,000+ GPUs via PPP with VFX/empaneled cloud providers; 40% usage subsidy for Indian startups and researchers',
      'IndiaAI Dataset Platform: single-window access to government datasets from 20+ ministries; privacy-compliant via synthetic data generation',
      'IndiaAI Innovation Centre: development of indigenous foundational models optimised for Indic languages (22 scheduled + 10 more)',
      'IndiaAI Skilling: 500,000 AI professionals trained through 5,000+ courses; AI labs in 100+ higher education institutions',
      'IndiaAI Startup Financing: ₹2,000 Cr fund-of-funds for early-stage AI startups; 200+ startups supported over 5 years',
      'Responsible AI framework: fairness assessment tools, bias mitigation standards, red-teaming guidelines, and watermarking for synthetic content',
    ],
    impactMetrics: [
      { label: 'Total Outlay', value: '₹10,372 Cr' },
      { label: 'GPU Procurement', value: '10,000+' },
      { label: 'AI Skilling Target', value: '5 Lakh professionals' },
      { label: 'Startup Fund', value: '₹2,000 Cr FoF' },
      { label: 'Timeframe', value: '2024-2030' },
    ],
    globalComparison: [
      { country: 'USA', status: 'Active', notes: 'CHIPS Act $52B+AI EO; private sector LLM dominance (OpenAI, Anthropic, Google); 300+ AI research labs' },
      { country: 'China', status: 'Active', notes: 'Next-Gen AI Development Plan (2017); 2,000+ AI companies; Baidu/ Alibaba/ Tencent LLMs; $150B+ AI investment' },
      { country: 'UK', status: 'Active', notes: '£1.5B in AI compute (2024-30); Frontier AI Taskforce; £100M for foundation model safety research' },
      { country: 'UAE', status: 'Active', notes: '$10B AI investment hub (MGX); Falcon LLM open-source model; AI Minister since 2017; sovereign compute via G42' },
    ],
  },
  {
    title: 'Semiconductor Mission',
    slug: 'semiconductor-mission',
    category: 'Technology & Innovation',
    status: 'Active',
    budget: '₹76,000 Cr',
    description: 'Launched in December 2021 with a revised ₹76,000 Cr outlay, the India Semiconductor Mission (ISM) aims to establish a domestic chip fabrication ecosystem — from fabs and ATMP units to compound semiconductors and chip design. India imports 100% of its chip requirements, valued at $45B in FY24, projected to reach $100B by 2030. The mission offers 50% fiscal support for capital expenditure across all segments.',
    timeline: [
      { date: 'Dec 2021', milestone: 'Union Cabinet approves ISM with ₹76,000 Cr; 50% capex subsidy for fabs, 50% for ATMP/OSAT units.' },
      { date: 'Sep 2022', milestone: 'Updated semiconductor policy: equal 50% subsidy across all nodes; design-linked incentive (DLI) scheme notified.' },
      { date: 'Jun 2023', milestone: 'Micron announces $2.7B ATMP facility in Gujarat (Sanand); first major global chip investment approved.' },
      { date: 'Mar 2024', milestone: 'Tata Electronics- PSMC JV approved for $11B fab in Dholera (28nm); CG Power- Renesas JV for $2.5B ATMP.' },
      { date: '2025', milestone: 'Construction underway at Dholera (Tata- PSMC) and Sanand (Micron); first ATMP production expected by 2026.' },
      { date: '2030', milestone: 'Target: 3+ fabs operational; $64B semiconductor production; 2% of global market share.' },
    ],
    keyProvisions: [
      '50% fiscal support for capital expenditure across all technology nodes — no node-specific restriction; equal treatment for mature and advanced nodes',
      'Fabless chip design ecosystem: Design-Linked Incentive (DLI) scheme with 30-50% reimbursement on design tools and IP; 100+ startups targeted',
      'Three approved projects: Micron ATMP ($2.7B, Sanand), Tata-PSMC fab ($11B, Dholera), CG Power-Renesas ATMP ($2.5B, Sanand)',
      'Compound semiconductors: 3 approved proposals covering SiC, GaN, and GaAs at Sanand and Mohali',
      'India Semiconductor R&D Centre (ISRC): $1.6B R&D ecosystem with 5 centres of excellence in semiconductor design and EDA',
      'Chips to Startup (C2S) programme: 85,000 engineers trained; 300+ universities with VLSI curriculum; industry-aligned certification',
    ],
    impactMetrics: [
      { label: 'Total Outlay', value: '₹76,000 Cr' },
      { label: 'Approved Fabs/ATMPs', value: '5 projects' },
      { label: 'Chip Imports (FY24)', value: '$45B' },
      { label: '2030 Market Share Target', value: '2%' },
      { label: 'Engineers to Train', value: '85,000' },
    ],
    globalComparison: [
      { country: 'Taiwan', status: 'Mature', notes: 'Global leader: 60% of semiconductor foundry market; TSMC with 3nm/5nm; $100B+ investment in advanced nodes' },
      { country: 'South Korea', status: 'Mature', notes: 'Samsung 3nm GAA; SK Hynix memory leader; $450B K-Semiconductor Belt plan; 60% global memory market' },
      { country: 'USA', status: 'Active', notes: 'CHIPS Act $52.7B; TSMC/Intel/Samsung fabs in Arizona/Ohio/Texas; $200B+ private investment announced' },
      { country: 'Vietnam', status: 'Emerging', notes: 'Samsung $3.3B packaging facility; Intel $475M test lab; National Semiconductor Strategy 2030 targeting design talent' },
    ],
  },
]

export function getPolicyBySlug(slug: string): Policy | undefined {
  return POLICIES_DATA.find(p => p.slug === slug)
}

export function getAllPolicySlugs(): string[] {
  return POLICIES_DATA.map(p => p.slug)
}

export function getAllPolicies(): Policy[] {
  return POLICIES_DATA
}

export function getRelatedPolicies(currentSlug: string, count = 2): Policy[] {
  const current = getPolicyBySlug(currentSlug)
  if (!current) return []
  return POLICIES_DATA
    .filter(p => p.slug !== currentSlug)
    .filter(p => p.category === current.category)
    .slice(0, count)
}
