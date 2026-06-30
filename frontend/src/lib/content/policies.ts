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
    description: 'India\'s National Green Hydrogen Mission aims to make the country a global hub for the production, usage, and export of green hydrogen and its derivatives. The mission targets 5 MMT of green hydrogen production annually by 2030, positioning India as a leader in the clean energy transition.',
    timeline: [
      { date: 'Aug 2021', milestone: 'Prime Minister announces the National Hydrogen Mission from the Red Fort.' },
      { date: 'Feb 2022', milestone: 'Government notifies Green Hydrogen/SHP policy, waiving inter-state transmission charges.' },
      { date: 'Jan 2023', milestone: 'Union Cabinet approves the National Green Hydrogen Mission with ₹19,744 Cr outlay.' },
      { date: 'Jun 2023', milestone: 'SIGHT programme launched to incentivise electrolyser manufacturing and green hydrogen production.' },
      { date: '2024-25', milestone: 'First tranche of green hydrogen production and electrolyser manufacturing bids awarded.' },
      { date: '2030', milestone: 'Target: 5 MMT annual green hydrogen production, 50 GW electrolyser capacity.' },
    ],
    keyProvisions: [
      'Establishment of 5 MMT of green hydrogen production capacity by 2030',
      'Strategic Interventions for Green Hydrogen Transition (SIGHT) programme with financial incentives',
      'Waiver of inter-state transmission charges for renewable energy used in green hydrogen production',
      'Development of green hydrogen hubs with integrated infrastructure',
      'Target of 125 GW of renewable energy capacity dedicated to hydrogen production',
      'Export-focused strategy targeting Japan, Europe, and South Korea markets',
    ],
    impactMetrics: [
      { label: 'CO2 Reduction', value: '50 MMT/year by 2030' },
      { label: 'Renewable Capacity', value: '125 GW additional' },
      { label: 'Fossil Fuel Savings', value: '₹1 Lakh Cr by 2030' },
      { label: 'Employment', value: '6 Lakh jobs' },
      { label: 'Investment Target', value: '₹8 Lakh Cr' },
    ],
    globalComparison: [
      { country: 'European Union', status: 'Active', notes: '40 GW electrolyser target by 2030, 10 MMT domestic production' },
      { country: 'China', status: 'Active', notes: 'World\'s largest electrolyser manufacturer, targeting 200,000 tonnes/year' },
      { country: 'USA', status: 'Active (IRA)', notes: '$3/kg production tax credit via Inflation Reduction Act' },
      { country: 'Japan', status: 'Active', notes: 'Targeting 3 MMT/year by 2030, focused on ammonia co-firing' },
    ],
  },
  {
    title: 'Digital Personal Data Protection Act',
    slug: 'data-protection-act',
    category: 'Technology & Law',
    status: 'Implementation',
    budget: '—',
    description: 'The Digital Personal Data Protection Act (DPDPA) 2023 is India\'s first comprehensive data protection law. It establishes a framework for processing digital personal data, recognizing individuals\' right to protect their data, and setting obligations on entities that collect and process such data.',
    timeline: [
      { date: 'Aug 2017', milestone: 'Supreme Court declares Right to Privacy a fundamental right in Puttaswamy judgment.' },
      { date: 'Jul 2018', milestone: 'Justice Srikrishna Committee submits first draft Data Protection Bill.' },
      { date: 'Dec 2019', milestone: 'Personal Data Protection Bill 2019 introduced in Parliament.' },
      { date: 'Aug 2023', milestone: 'Digital Personal Data Protection Act 2023 passed and receives Presidential assent.' },
      { date: 'Jan 2024', milestone: 'Draft DPDP Rules released for public consultation.' },
      { date: '2025', milestone: 'Expected enforcement with Data Protection Board operational.' },
    ],
    keyProvisions: [
      'Consent-based processing of personal data with explicit notice requirements',
      'Data fiduciary obligations including purpose limitation and data minimization',
      'Significant data fiduciaries designated based on volume and sensitivity of data processed',
      'Cross-border data transfer allowed to notified jurisdictions without data localization requirement',
      'Data Protection Board of India established for enforcement and adjudication',
      'Penalties up to ₹250 Cr for non-compliance with data breach notification obligations',
      'Rights including access, correction, erasure, and grievance redressal for data principals',
    ],
    impactMetrics: [
      { label: 'Covered Entities', value: 'All data fiduciaries' },
      { label: 'Max Penalty', value: '₹250 Cr per breach' },
      { label: 'Compliance Timeline', value: '12 months post enforcement' },
      { label: 'Data Principal Rights', value: '7 rights' },
      { label: 'Exemptions', value: 'Govt notified' },
    ],
    globalComparison: [
      { country: 'EU', status: 'GDPR', notes: 'Extra-territorial application, DPO requirement, 4% global turnover fines' },
      { country: 'USA', status: 'Sectoral (CCPA etc.)', notes: 'State-level laws; no comprehensive federal privacy law' },
      { country: 'China', status: 'PIPL Active (2021)', notes: 'Strict data localization, cross-border transfer security assessment' },
      { country: 'Brazil', status: 'LGPD Active', notes: 'Modeled after GDPR, 2% revenue penalty, DPO required' },
    ],
  },
  {
    title: 'Production Linked Incentive Schemes',
    slug: 'pli-schemes',
    category: 'Industry & Manufacturing',
    status: 'Active',
    budget: '₹1.97 Lakh Cr',
    description: 'India\'s Production Linked Incentive (PLI) schemes are a suite of sector-specific incentive programmes designed to boost domestic manufacturing, create jobs, and reduce import dependence across 14 key sectors including electronics, automobiles, pharmaceuticals, and textiles.',
    timeline: [
      { date: 'Mar 2020', milestone: 'PLI scheme for mobile phones and electronics manufacturing announced.' },
      { date: 'Nov 2020', milestone: 'PLI extended to 10 more sectors including automobiles, pharma, and textiles.' },
      { date: 'Apr 2021', milestone: 'PLI for pharmaceutical bulk drugs and medical devices notified.' },
      { date: 'Sep 2021', milestone: 'Cabinet approves PLI for auto components, drones, and textiles.' },
      { date: '2023', milestone: 'PLI disbursements begin; electronics manufacturing sees significant uptick.' },
      { date: '2025-26', milestone: 'Targeted full-scale implementation across all 14 sectors.' },
    ],
    keyProvisions: [
      'Incentives ranging from 3% to 15% of incremental sales for eligible manufacturers',
      '14 sectors covered: electronics, auto, pharma, textiles, food processing, solar, ACC batteries, drones, etc.',
      'Minimum investment and production thresholds for eligibility',
      'Preference for domestic value addition with tiered incentive structures',
      'Special focus on import substitution in critical sectors like electronics and pharma',
      'Application-based selection with transparent evaluation criteria',
    ],
    impactMetrics: [
      { label: 'Total Outlay', value: '₹1.97 Lakh Cr' },
      { label: 'Sectors Covered', value: '14' },
      { label: 'Jobs Created (Estimated)', value: '60 Lakh' },
      { label: 'Additional Production', value: '₹35 Lakh Cr' },
      { label: 'Export Boost', value: '₹10 Lakh Cr' },
    ],
    globalComparison: [
      { country: 'Vietnam', status: 'Active', notes: 'Competitive corporate tax rates, free trade agreements, lower labour costs' },
      { country: 'China', status: 'Mature', notes: 'Dominant global manufacturing with scale and supply chain integration' },
      { country: 'South Korea', status: 'Mature', notes: 'High-end electronics and semiconductor manufacturing focus' },
      { country: 'Mexico', status: 'Active', notes: 'Beneficiary of USMCA, nearshoring from China' },
    ],
  },
  {
    title: 'Nuclear Energy Mission',
    slug: 'nuclear-energy-mission',
    category: 'Energy & Climate',
    status: 'Announced',
    budget: '₹20,000 Cr',
    description: 'India\'s Nuclear Energy Mission aims to rapidly expand the country\'s nuclear power capacity from the current ~7 GW to 22 GW by 2032. The mission focuses on indigenous reactor designs, including the Pressurised Heavy Water Reactor (PHWR) and the development of Bharat Small Reactors.',
    timeline: [
      { date: '2023', milestone: 'Government announces plans to operationalize 10 indigenous PHWR units in fleet mode.' },
      { date: '2024', milestone: 'Budget allocates ₹20,000 Cr for nuclear energy initiatives.' },
      { date: '2025', milestone: 'Land acquisition and site selection for new PHWR units begins.' },
      { date: '2027', milestone: 'First Bharat Small Reactor (220 MW) expected to be commissioned.' },
      { date: '2030', milestone: 'Target of 15 GW installed nuclear capacity.' },
      { date: '2032', milestone: 'Target of 22 GW installed nuclear capacity with 10 new PHWR units operational.' },
    ],
    keyProvisions: [
      'Fleet mode deployment of 10 indigenous 700 MW PHWR units across multiple sites',
      'Development of Bharat Small Reactors (220 MW) for decentralized power generation',
      'Public-private participation in nuclear power generation',
      'Research and development in advanced reactor technologies including thorium-based reactors',
      'Expansion of uranium mining and fuel cycle facilities',
      'Amendment of Atomic Energy Act to enable private sector investment',
    ],
    impactMetrics: [
      { label: 'Current Capacity', value: '7.4 GW' },
      { label: '2032 Target', value: '22 GW' },
      { label: 'Nuclear Share (Current)', value: '3%' },
      { label: 'Nuclear Share (Target)', value: '9%' },
      { label: 'Small Reactors Planned', value: '40-50' },
    ],
    globalComparison: [
      { country: 'China', status: 'Active', notes: '200 GW target by 2035, Hualong One reactors deployed globally' },
      { country: 'France', status: 'Active', notes: '70% nuclear electricity, new EPR2 reactors planned' },
      { country: 'USA', status: 'Developing', notes: 'AP1000, SMR development, Vogtle plant operational' },
      { country: 'Russia', status: 'Active', notes: 'Rosatom global leader in reactor exports, VVER technology' },
    ],
  },
  {
    title: 'National Quantum Mission',
    slug: 'quantum-mission',
    category: 'Science & Technology',
    status: 'Active',
    budget: '₹6,003 Cr',
    description: 'The National Quantum Mission (NQM) is a flagship programme to boost India\'s capabilities in quantum technologies. It aims to develop intermediate-scale quantum computers, quantum communication networks, and quantum sensing platforms over the next decade, positioning India among the top quantum nations.',
    timeline: [
      { date: '2020', milestone: 'Budget announcement signals government interest in quantum technologies.' },
      { date: 'Apr 2023', milestone: 'National Quantum Mission receives Cabinet approval with ₹6,003 Cr outlay.' },
      { date: 'Jun 2023', milestone: 'Four Thematic Hubs established in top research institutions.' },
      { date: '2024', milestone: 'First 20-qubit quantum computer demonstration achieved.' },
      { date: '2026', milestone: 'Target: 50-qubit quantum computer, 100 km quantum communication link.' },
      { date: '2030', milestone: 'Target: 1000-qubit quantum computer, satellite-based quantum key distribution.' },
    ],
    keyProvisions: [
      'Development of qubit-based quantum computers: 20-50 qubits by 2026, 1000 qubits by 2030',
      'Establishment of 4 Thematic Hubs: Quantum Computing, Communication, Sensing, and Materials',
      'Development of quantum communication networks including satellite-based QKD',
      'Design and fabrication of quantum sensors for defence, healthcare, and mining applications',
      'Indigenous development of cryogenic systems and control electronics',
      'Human resource development through PhD and postdoctoral fellowships in quantum science',
    ],
    impactMetrics: [
      { label: 'Total Outlay', value: '₹6,003 Cr' },
      { label: 'Timeframe', value: '2023-2031' },
      { label: 'Thematic Hubs', value: '4' },
      { label: 'Qubit Target (2026)', value: '50 qubits' },
      { label: 'Qubit Target (2030)', value: '1000 qubits' },
    ],
    globalComparison: [
      { country: 'USA', status: 'Active', notes: '$1.2B NQI Act, IBM/Google quantum supremacy milestones' },
      { country: 'China', status: 'Active', notes: '$15B+ investment, Micius satellite for QKD, 66-qubit computer' },
      { country: 'EU', status: 'Active', notes: '€1B Quantum Flagship, 20+ countries coordinated research' },
      { country: 'UK', status: 'Active', notes: '£2.5B national quantum strategy, National Quantum Computing Centre' },
    ],
  },
  {
    title: 'National Education Policy 2020',
    slug: 'national-education-policy-2020',
    category: 'Education & Human Resources',
    status: 'Implementation',
    budget: '—',
    description: 'The National Education Policy (NEP) 2020 replaces the 34-year-old education policy, bringing a comprehensive overhaul of India\'s education system. It introduces a 5+3+3+4 curricular structure, multidisciplinary learning, vocational training from Class 6, and significant reforms from school through higher education.',
    timeline: [
      { date: 'Jul 2020', milestone: 'Union Cabinet approves NEP 2020, replacing the 1986 education policy.' },
      { date: '2023', milestone: 'NCERT develops new National Curriculum Framework (NCF) based on NEP.' },
      { date: '2022', milestone: 'Multiple states begin implementing NEP in their institutions.' },
      { date: '2023', milestone: 'CUET becomes mandatory for central university admissions; Academic Bank of Credits launched.' },
      { date: '2024', milestone: 'Multidisciplinary universities begin formation; vocational education integrated in schools.' },
      { date: '2030', milestone: 'Target: 100% youth and adult literacy, 50% GER in higher education.' },
    ],
    keyProvisions: [
      'New 5+3+3+4 curricular structure covering ages 3-18 with foundational, preparatory, middle, and secondary stages',
      'Mother tongue/local language as medium of instruction until Class 5 (preferably Class 8)',
      'Multiple entry and exit options in undergraduate education with certificate/diploma/degree',
      'Establishment of Academic Bank of Credits for storing academic achievements',
      'National Research Foundation (NRF) to fund and promote research',
      'Vocational education integrated into school curriculum from Class 6 with internships',
      'Flexible subject choices with no hard separation between arts, sciences, and vocational streams',
      'National Assessment Centre (PARAKH) for standardized student assessment',
    ],
    impactMetrics: [
      { label: 'School Structure', value: '5+3+3+4' },
      { label: 'Higher Ed GER (Target)', value: '50% by 2035' },
      { label: 'Vocational Exposure', value: 'From Class 6' },
      { label: 'Multiple Exit Points', value: '3 in UG degree' },
      { label: 'Research Outlay', value: '₹50,000 Cr (NRF)' },
    ],
    globalComparison: [
      { country: 'Finland', status: 'Model', notes: 'Play-based early education, teacher autonomy, no standardized tests' },
      { country: 'Singapore', status: 'Model', notes: 'High-performing, bilingual policy, strong STEM focus' },
      { country: 'China', status: 'Active', notes: 'Gaokao exam system, rapid university expansion' },
      { country: 'USA', status: 'Decentralized', notes: 'State-level control, Common Core standards, diverse systems' },
    ],
  },
  {
    title: 'Jal Jeevan Mission',
    slug: 'jal-jeevan-mission',
    category: 'Water & Infrastructure',
    status: 'Active',
    budget: '₹3.6 Lakh Cr',
    description: 'Jal Jeevan Mission (JJM) is India\'s flagship programme to provide tap water connections to every rural household in India. It represents the world\'s largest water supply programme, focusing on community participation, water quality monitoring, and sustainable water source management. The original 2024 target was revised to 2028.',
    timeline: [
      { date: 'Aug 2019', milestone: 'PM Modi announces Jal Jeevan Mission on Independence Day.' },
      { date: '2020', milestone: 'Mission launched with focus on water quality-affected areas and villages.' },
      { date: '2021', milestone: 'Connections reach 5 Cr households; emphasis on greywater management.' },
      { date: '2022', milestone: '10 Cr households covered; mission expanded with sustainability focus.' },
      { date: '2023', milestone: '12 Cr households covered; 70% rural habitations achieved.' },
      { date: '2024', milestone: 'Original target of 100% coverage revised; new target set for 2028.' },
    ],
    keyProvisions: [
      'Provision of 55 litres per capita per day (lpcd) of potable water to every rural household',
      'Community participation through Village Water and Sanitation Committees (VWSCs)',
      'Water quality testing with multi-level monitoring including field test kits and laboratories',
      'Greywater management and water source sustainability through recharge and reuse',
      'Information, Education, and Communication (IEC) campaigns for behavioural change',
      'Real-time monitoring through JJM dashboard with geo-tagged assets',
    ],
    impactMetrics: [
      { label: 'Total Budget', value: '₹3.6 Lakh Cr' },
      { label: 'Households Covered', value: '12+ Cr' },
      { label: 'Coverage Increase', value: '17% to 74%' },
      { label: 'Villages Covered', value: '15+ Lakh' },
      { label: 'Daily Water Provided', value: '66,000 Lakh litres' },
    ],
    globalComparison: [
      { country: 'China', status: 'Active', notes: 'South-North Water Transfer Project, rural water safety programmes' },
      { country: 'South Africa', status: 'Challenged', notes: 'Water scarcity, aging infrastructure, inequality in access' },
      { country: 'Ethiopia', status: 'Developing', notes: 'Water supply coverage ~50%, One WASH programme active' },
      { country: 'Singapore', status: 'Model', notes: 'NEWater recycling, desalination, 100% water security' },
    ],
  },
  {
    title: 'Ayushman Bharat',
    slug: 'ayushman-bharat',
    category: 'Health & Social Welfare',
    status: 'Active',
    budget: '₹7,200 Cr (2024-25)',
    description: 'Ayushman Bharat is India\'s flagship public health insurance and primary healthcare programme. It comprises two components: Pradhan Mantri Jan Arogya Yojana (PM-JAY), providing ₹5 lakh per family per year for secondary and tertiary care hospitalization, and Health and Wellness Centres (HWCs) for comprehensive primary care.',
    timeline: [
      { date: 'Feb 2018', milestone: 'Budget announces two components: PM-JAY and Health & Wellness Centres.' },
      { date: 'Sep 2018', milestone: 'PM-JAY launched by PM Modi, covering 10 Cr+ poor families.' },
      { date: '2020', milestone: 'COVID-19 coverage added; PM-JAY expanded to frontline workers.' },
      { date: '2023', milestone: '150,000 HWCs operationalized across India.' },
      { date: '2022', milestone: 'Coverage expanded; 5 Cr+ hospital admissions authorized under PM-JAY.' },
      { date: '2024', milestone: 'Senior citizen coverage expanded; all citizens above 70 eligible.' },
    ],
    keyProvisions: [
      'Health insurance cover of ₹5 Lakh per family per year for hospitalization',
      'Coverage for 10.74 Cr poor and vulnerable families (approx. 50 Cr beneficiaries)',
      'Cashless and paperless treatment at empanelled public and private hospitals',
      'No cap on family size, age, or gender for coverage',
      'Pre-existing diseases covered from day one of the policy',
      'Establishment of 150,000 Health and Wellness Centres for free primary healthcare',
      'Free diagnostic services and essential medicines at HWCs',
    ],
    impactMetrics: [
      { label: 'Coverage', value: '50+ Cr beneficiaries' },
      { label: 'Annual Budget', value: '₹7,200 Cr' },
      { label: 'Hospital Admissions', value: '5+ Cr' },
      { label: 'Empanelled Hospitals', value: '27,000+' },
      { label: 'HWCs Established', value: '1.5 Lakh' },
    ],
    globalComparison: [
      { country: 'UK', status: 'NHS', notes: 'Tax-funded, universal coverage, free at point of use' },
      { country: 'USA', status: 'Mixed (ACA)', notes: 'Employer-based private insurance + Medicare/Medicaid for elderly and poor' },
      { country: 'Thailand', status: 'UC Scheme', notes: 'Universal coverage since 2002, 3-tier system, 30 baht scheme' },
      { country: 'China', status: 'Active', notes: 'Urban Employee + Resident Basic Medical Insurance, ~95% coverage' },
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
