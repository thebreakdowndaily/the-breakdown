export interface SpendingItem {
  ministry: string
  budgetEstimate: string
  actualSpending: string
  utilization: number
  trend: 'up' | 'down' | 'neutral'
}

export interface ProjectItem {
  name: string
  ministry: string
  cost: string
  progress: number
  deadline: string
  status: 'On Track' | 'Delayed' | 'Completed' | 'At Risk'
}

export interface PromiseItem {
  promise: string
  category: string
  commitment: string
  delivery: string
  status: 'Delivered' | 'Partially Delivered' | 'Not Delivered' | 'In Progress'
}

export interface RTIResource {
  title: string
  description: string
  type: 'guide' | 'sample' | 'success' | 'template'
  downloads: string
}

export const SPENDING_DATA: SpendingItem[] = [
  { ministry: 'Ministry of Defence', budgetEstimate: '₹6.22L Cr', actualSpending: '₹6.02L Cr', utilization: 96.8, trend: 'up' },
  { ministry: 'Ministry of Road Transport & Highways', budgetEstimate: '₹2.72L Cr', actualSpending: '₹2.45L Cr', utilization: 90.1, trend: 'up' },
  { ministry: 'Ministry of Railways', budgetEstimate: '₹2.55L Cr', actualSpending: '₹2.52L Cr', utilization: 98.8, trend: 'up' },
  { ministry: 'Ministry of Consumer Affairs, Food & PD', budgetEstimate: '₹2.14L Cr', actualSpending: '₹2.08L Cr', utilization: 97.2, trend: 'neutral' },
  { ministry: 'Ministry of Home Affairs', budgetEstimate: '₹1.96L Cr', actualSpending: '₹1.85L Cr', utilization: 94.4, trend: 'up' },
  { ministry: 'Ministry of Agriculture & Farmers Welfare', budgetEstimate: '₹1.57L Cr', actualSpending: '₹1.41L Cr', utilization: 89.8, trend: 'down' },
  { ministry: 'Ministry of Education', budgetEstimate: '₹1.48L Cr', actualSpending: '₹1.38L Cr', utilization: 93.2, trend: 'neutral' },
  { ministry: 'Ministry of Health & Family Welfare', budgetEstimate: '₹91,000 Cr', actualSpending: '₹84,700 Cr', utilization: 93.1, trend: 'up' },
  { ministry: 'Ministry of Jal Shakti', budgetEstimate: '₹98,000 Cr', actualSpending: '₹88,500 Cr', utilization: 90.3, trend: 'neutral' },
  { ministry: 'Ministry of Power', budgetEstimate: '₹25,000 Cr', actualSpending: '₹22,100 Cr', utilization: 88.4, trend: 'down' },
  { ministry: 'Ministry of Petroleum & Natural Gas', budgetEstimate: '₹21,000 Cr', actualSpending: '₹19,800 Cr', utilization: 94.3, trend: 'up' },
  { ministry: 'Ministry of Electronics & IT', budgetEstimate: '₹19,500 Cr', actualSpending: '₹18,200 Cr', utilization: 93.3, trend: 'up' },
]

export const PROJECTS_DATA: ProjectItem[] = [
  { name: 'Delhi-Mumbai Expressway', ministry: 'Road Transport', cost: '₹1.0L Cr', progress: 72, deadline: '2026', status: 'On Track' },
  { name: 'Dedicated Freight Corridor (Eastern & Western)', ministry: 'Railways', cost: '₹1.1L Cr', progress: 88, deadline: '2025', status: 'On Track' },
  { name: 'High Speed Rail (Mumbai-Ahmedabad)', ministry: 'Railways', cost: '₹1.1L Cr', progress: 42, deadline: '2029', status: 'Delayed' },
  { name: 'Gati Shakti Terminal Redevelopment (125+ stations)', ministry: 'Railways', cost: '₹50,000 Cr', progress: 35, deadline: '2027', status: 'On Track' },
  { name: 'Smart Cities Mission (100 cities)', ministry: 'Housing & Urban Affairs', cost: '₹2.05L Cr', progress: 78, deadline: '2026', status: 'On Track' },
  { name: 'National Waterways Development (NW-1)', ministry: 'Ports & Shipping', cost: '₹15,000 Cr', progress: 28, deadline: '2028', status: 'Delayed' },
  { name: 'Bharatmala Pariyojana Phase I & II', ministry: 'Road Transport', cost: '₹10.6L Cr', progress: 55, deadline: '2028', status: 'At Risk' },
  { name: 'Sagarmala Port Modernization', ministry: 'Ports & Shipping', cost: '₹8.6L Cr', progress: 44, deadline: '2030', status: 'On Track' },
  { name: 'UDAN Regional Connectivity Scheme', ministry: 'Civil Aviation', cost: '₹4,500 Cr', progress: 62, deadline: '2027', status: 'On Track' },
  { name: 'PM GatiShakti National Master Plan', ministry: 'DPIIT', cost: '₹100 Cr (IT)', progress: 75, deadline: '2025', status: 'Completed' },
]

export const PROMISES_DATA: PromiseItem[] = [
  { promise: 'Double Farmers\' Income by 2022', category: 'Agriculture', commitment: '₹15L Cr investment in agri infra', delivery: 'Income grew 22% (2015-22); target missed', status: 'Partially Delivered' },
  { promise: 'Housing for All by 2022 (PMAY-U)', category: 'Housing', commitment: '1.12 Cr houses in urban areas', delivery: '80 Lakh houses constructed; 32 Lakh pending', status: 'Partially Delivered' },
  { promise: 'Har Ghar Jal (Jal Jeevan Mission)', category: 'Water', commitment: 'Tap water to all rural homes by 2024', delivery: '14.5 Cr of 19.4 Cr households connected (74%)', status: 'In Progress' },
  { promise: 'Indian Space Station by 2035', category: 'Space', commitment: 'Bharatiya Antariksha Station operational', delivery: 'Gaganyaan mission crew module tested; station design in progress', status: 'In Progress' },
  { promise: '$5 Trillion Economy by 2025', category: 'Economy', commitment: 'GDP to reach $5T', delivery: 'Current GDP ~$4.1T (2025); target postponed to FY28', status: 'Partially Delivered' },
  { promise: 'Eliminate Tuberculosis by 2025', category: 'Health', commitment: 'TB-free India by 2025', delivery: 'TB incidence reduced from 237 to 195 per 100,000; target postponed to 2030', status: 'Not Delivered' },
  { promise: 'Clean India Mission (Swachh Bharat)', category: 'Sanitation', commitment: 'Open defecation free India', delivery: '10.4 Cr toilets built; 100% districts declared ODF', status: 'Delivered' },
  { promise: 'One Nation One Ration Card', category: 'Food Security', commitment: 'Portable food security across states', delivery: '100% operational in 36 states/UTs covering 80 Cr beneficiaries', status: 'Delivered' },
  { promise: 'Digital India (Broadband for All)', category: 'Digital', commitment: 'Broadband in 2.5L village panchayats', delivery: '~2.1L gram panchayats connected under BharatNet', status: 'Partially Delivered' },
  { promise: 'Reduce IMR to 28 by 2022', category: 'Health', commitment: 'Infant Mortality Rate reduction', delivery: 'IMR at 30 (2022); target was 28, likely achieved per NFHS-6', status: 'Delivered' },
]

export const RTI_DATA: RTIResource[] = [
  { title: 'How to File an RTI Application', description: 'Step-by-step guide to filing your first RTI application, including fee structure, timeline, and format requirements.', type: 'guide', downloads: '2.4K+' },
  { title: 'Sample RTI — Government Expenditure', description: 'Ready-to-use RTI application template for querying ministry-wise budget utilization and scheme expenditure.', type: 'sample', downloads: '8.1K+' },
  { title: 'Sample RTI — Infrastructure Project Status', description: 'Template to request detailed status updates on any major infrastructure project, including deadlines and cost overruns.', type: 'sample', downloads: '5.6K+' },
  { title: 'RTI Success Story — Exposing Fertilizer Subsidy Fraud', description: 'How a citizen\'s RTI revealed ₹2,300 Cr in fake fertilizer subsidy claims, leading to CBI investigation.', type: 'success', downloads: '3.2K+' },
  { title: 'First Appeal Application Template', description: 'If your RTI is not answered within 30 days, use this template to file a First Appeal with the Information Commission.', type: 'template', downloads: '4.8K+' },
  { title: 'RTI Success Story — PM-CARES Fund Transparency', description: 'How RTI activists forced PM-CARES to disclose donor details and fund utilization, setting a transparency precedent.', type: 'success', downloads: '6.7K+' },
  { title: 'Central & State Information Commission Filing Guide', description: 'Complete guide to filing complaints and appeals at Central and State Information Commissions, with jurisdiction details.', type: 'guide', downloads: '1.9K+' },
  { title: 'Sample RTI — Public Procurement Details', description: 'Template for requesting tender documents, bid evaluation reports, and contract award details for any government procurement.', type: 'sample', downloads: '3.4K+' },
  { title: 'RTI Act 2005 — Key Sections Summary', description: 'Concise reference of key sections — Section 4 (proactive disclosure), Section 8 (exemptions), Section 20 (penalties).', type: 'guide', downloads: '9.3K+' },
]
