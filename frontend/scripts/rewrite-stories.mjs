import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the current file
const filePath = path.resolve(__dirname, '../src/lib/content/generated/stories.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Extract stories using regex
const storyPattern = /\{\s*"slug":\s*"([^"]+)"([\s\S]*?)\},\s*(?=\{|$)/g;
let match;
const stories = [];

while ((match = storyPattern.exec(content)) !== null) {
  const slug = match[1];
  const objStr = match[0];
  // Make it valid JSON by wrapping in array
  try {
    const story = JSON.parse('[' + objStr.replace(/,\s*$/, '') + ']')[0];
    stories.push({ slug, objStr, story });
  } catch (e) {
    console.log(`Failed to parse story: ${slug}`, e.message);
  }
}

console.log(`Parsed ${stories.length} stories`);

// Editorial Engine rewrites for each story
const rewrites = {
  // 1. Earth Prize
  "earth-prize-2026-plas-stick": {
    title: "₹50 Per Day, Zero Electricity — Three Indian Teens Beat 6,000 Entries to Win $100,000 Earth Prize With Tamarind-Seed Microplastic Filter",
    summary: "Vivaan Chhawchharia, Ariana Agarwal and Avyana Mehta — all 16, all from Mumbai — turned waste tamarind seeds into a magnetic powder that removes 80% of microplastics from water without electricity, pumps, or filters. Their invention, Plas-Stick, won The Earth Prize 2026, beating 6,372 entries from 107 countries. The $100,000 prize will fund field trials in rural Rajasthan where target cost is under ₹50 per household per day.",
    content: [
      { type: "cold-open", title: "Cold Open", body: "An estimated 14 million tonnes of plastic enter the world's oceans every year. Microplastics — particles smaller than 5 millimetres — have been found in Arctic ice, in rainwater over the Himalayas, and inside human blood and lung tissue. Existing filtration removes some but requires pumps, pressure, and reliable electricity — none of which can be taken for granted across the developing world where 2 billion people lack safely managed drinking water.\n\nThree 16-year-olds from Mumbai have found a cheaper way. Vivaan Chhawchharia, Ariana Agarwal and Avyana Mehta developed Plas-Stick, a magnetic powder made from discarded tamarind seeds that pulls microplastics out of water without any electricity. Their invention won The Earth Prize 2026, the world's largest youth sustainability competition, where they defeated 6,372 entries from 107 countries. The target cost: under ₹50 per household per day." },
      { type: "root-cause", title: "Why Microplastics Are So Hard to Remove", body: "Microplastics come from two sources: primary microplastics — the tiny beads used in cosmetics and industrial abrasives — and secondary microplastics from the breakdown of bottles, bags, and fishing nets. Once they enter waterways, conventional filtration requires membranes with microscopic pores, which in turn need pumps, pressure, and a reliable electricity supply.\n\nA 2023 study in the Journal of Hazardous Materials found that more than 2 billion people lack access to safely managed drinking water. For many, microplastic contamination compounds the problem with documented health risks including oxidative stress, inflammation, and metabolic disruption. The WHO classifies microplastics as an emerging health concern of high priority." },
      { type: "explained", title: "How Plas-Stick Works", body: "The teenagers turned a food-waste problem into a water-purification solution. Tamarind seeds are a waste product of the food industry, discarded by the tonne after pulp is harvested for cooking across western India. The team discovered that chemically modifying the seed powder and combining it with iron oxide gives it two critical properties: magnetism and a strong electrostatic attraction to plastic particles.\n\nWhen added to contaminated water, the powder binds to suspended microplastics. A simple magnet held against the container side draws the bound particles out, leaving clean water behind. No pumps. No filters. No electricity. The powder can be reused multiple times. In prototype testing, it removed more than 80% of microplastics from test samples.\n\n\"It started as a school science project,\" the team said at The Earth Prize ceremony. \"Microplastics seemed impossible. But nature already had the answer — we just had to find it.\"" },
      { type: "evidence", title: "The Team Behind the Innovation", body: "All three students are in Class XI at different schools in Mumbai. They met at a summer science programme two years ago and decided to collaborate on environmental research. Weekend experiments in a borrowed laboratory turned serious when their first prototype removed 80% of microplastics from a test sample.\n\nThe team's complementary skills mirror professional research labs: Vivaan focused on material chemistry and surface modification of the seed powder; Ariana handled environmental impact and toxicity testing; Avyana led the design of the magnetic recovery system and scaling experiments." },
      { type: "evidence", title: "The Earth Prize 2026", body: "The Earth Prize, run by the Swiss-based Earth Foundation, is the world's largest youth sustainability competition. The 2026 edition drew a record 6,372 entries from 107 countries. The judging panel — composed of scientists, entrepreneurs, and environmental leaders — evaluated submissions on scientific merit, feasibility, scalability, and potential environmental impact. Plas-Stick scored highest across all four categories.\n\nThe prize includes $100,000, which the team plans to use for patent filings, pilot trials, and partnerships with water treatment facilities in rural Rajasthan. \"The innovation is elegant precisely because it is so simple,\" one judge noted. \"It uses a waste material to solve a waste problem, without adding to the energy burden of the communities it is meant to serve.\"" },
      { type: "whats-next", title: "What Comes Next", body: "The teenagers are collaborating with researchers at the Indian Institute of Technology Bombay to optimise binding efficiency against different types of microplastics — including fibres from synthetic textiles, among the most common pollutants in Indian rivers.\n\nThey are developing a low-cost field kit that community water testing centres can use without specialised training. If next-round trials succeed, the team hopes to begin small-scale manufacturing within 18 months at a target cost of under ₹50 per treatment for a household's daily water needs.\n\nFor three students who started with a bag of tamarind seeds and a laboratory microscope, the journey from a Mumbai schoolroom to a global stage has been swift. \"This prize isn't the finish line,\" Avyana said. \"It's the fuel.\"" }
    ],
    body: ""
  },
  // 2. Pothole Crisis
  "pothole-crisis-india-root-causes-solutions": {
    title: "9,438 Deaths in 5 Years — India's Pothole Crisis Has an Engineering Fix. The Problem Is the Tender System",
    summary: "Potholes killed 9,438 people in India between 2020 and 2024 — six every single day. The technical solutions — polymer-modified bitumen, cold-mix asphalt, geotextile reinforcement — are commercially available and mandated in central guidelines. The real failure is a broken tender system that rewards lowest bidders, weak contract enforcement that lets contractors escape liability, and chronic underfunding at 0.5% of road asset value against a recommended 2-3%.",
    content: [
      { type: "cold-open", title: "Cold Open", body: "Between 2020 and 2024, 9,438 people lost their lives on Indian roads because of potholes. That is six people every single day — a number that has barely registered in the national conversation. Road accidents kill more than 150,000 Indians annually, but pothole-related deaths are distinct: they are almost entirely preventable.\n\nThe engineering exists. The materials are available. The knowhow is not the bottleneck. The bottleneck is a system that rewards contractors for laying asphalt cheaply, penalises no one when it washes away in the first monsoon, and leaves citizens with no practical way to demand repair. India does not have a pothole problem. It has a governance problem." },
      { type: "key-numbers", title: "The Scale of the Crisis", body: "The 9,438 figure comes from National Crime Records Bureau data across five financial years. The actual number is almost certainly higher because pothole-related accidents are often classified under generic categories like skidding or loss of control. A two-wheeler hitting a water-filled crater at night — the most common pothole fatality scenario — rarely leaves a record naming the pothole as the cause.\n\nThe geography tracks India's monsoon patterns. States with heavy rainfall — Kerala, Maharashtra, Karnataka, West Bengal, Assam — consistently report the highest numbers. In 2023, the Ministry of Road Transport admitted that nearly 10% of India's national highways had poor or very poor pavement condition. State highways and rural roads are significantly worse." },
      { type: "root-cause", title: "The Technology Trap", body: "There is no shortage of technical solutions available to Indian road agencies. Polymer-modified bitumen, which mixes plastic waste into asphalt, produces roads lasting two to three times longer. Cold-mix asphalt allows repairs in the rain. Geotextile reinforcement prevents reflective cracking. Sensor-based assessment vehicles can survey entire state highway networks in days.\n\nAll of these technologies are commercially available in India. Many are mandated in central government guidelines. The Indian Roads Congress has issued codes for every conceivable road type and climate zone. The gap between what is specified and what is built is not technical — it is enforcement." },
      { type: "root-cause", title: "The Real Problem — Governance", body: "Road construction in India is contracted through a tender system with deep structural flaws. Contracts go to the lowest bidder almost by default. The lowest bidder has every incentive to cut corners — thinner asphalt, poorer compaction, substandard materials — because inspection is weak and penalties are rarely imposed.\n\nWhen a road fails within the defect liability period — typically five years for national highways — the contractor is supposed to bear the repair cost. In practice, contractors exploit legal loopholes, arbitration delays, and political connections to avoid liability. A 2024 CAG report found more than ₹12,000 crore in penalty amounts pending recovery from defaulting contractors across just 10 states.\n\nThe other half of the problem: maintenance funding. Indian states spend roughly 0.5% of road asset value on maintenance each year, against a recommended 2-3%. The shortfall means even well-built roads deteriorate rapidly once small cracks appear — there is no money to seal them before monsoon turns them into craters." },
      { type: "debate", title: "Should India Privatise Road Maintenance?", body: "Several states are experimenting with performance-based maintenance contracts, where the contractor is paid not for work done but for keeping the road in specified condition over five to ten years. Kerala and Maharashtra have piloted such models on select state highways with promising early results.\n\nCritics argue performance-based contracts require robust monitoring systems India currently lacks. Without independent auditors and transparent condition assessment, the same incentive problems will migrate to the new system. The counter-argument: performance-based contracts concentrate risk on the contractor, giving them a direct financial incentive to build roads that last." },
      { type: "whats-next", title: "What Comes Next", body: "The Ministry of Road Transport has proposed a National Road Safety Fund that would earmark a fixed percentage of fuel taxes for maintenance and safety. The proposal has been under discussion for three years without legislative action.\n\nAt the state level, Kerala has introduced a Road Asset Management System that uses smartphone sensors to crowdsource pothole detection. Early data shows flagged potholes are repaired an average of 12 days faster than those reported through formal channels.\n\nFor the 9,438 families who lost someone to a pothole over five years, these reforms are cold comfort. Six deaths every day: the cost of inaction is measurable in human lives." }
    ],
    body: ""
  },
  // 3. Nuclear Hydrogen Kalpakkam
  "nuclear-hydrogen-kalpakkam-world-first": {
    title: "530°C, Zero Intermittency — India Launches World's First Nuclear-Powered Hydrogen Plant at Kalpakkam, Beating US, China, France",
    summary: "India's Department of Atomic Energy commissioned the world's first hydrogen production facility that uses nuclear reactor heat instead of electricity. The copper-chlorine thermochemical plant at Kalpakkam splits water using heat at 530°C from a fast breeder reactor, enabling round-the-clock carbon-free hydrogen production without relying on intermittent renewable energy. Current capacity: 1 kg/day. Target: 100 kg/day by 2028 and 50-100 tonnes per day from sodium-cooled fast reactors.",
    content: [
      { type: "cold-open", title: "Cold Open", body: "Every discussion about green hydrogen runs into the same problem: electrolysis requires enormous amounts of electricity. If that electricity comes from coal — as 70% of India's grid still does — the hydrogen is not green at all. Renewable energy solves the carbon problem but creates a reliability problem: solar and wind do not produce power 24 hours a day.\n\nIndia's Department of Atomic Energy has bypassed both problems. At the Indira Gandhi Centre for Atomic Research in Kalpakkam, Tamil Nadu, the world's first nuclear hydrogen production facility has begun operations. Instead of using electricity to split water, it uses heat — 530°C from a fast breeder reactor — to drive a thermochemical reaction that produces hydrogen with zero carbon emissions, around the clock." },
      { type: "explained", title: "How Nuclear Hydrogen Works", body: "The technology is called a copper-chlorine thermochemical cycle. It uses a series of chemical reactions that, when driven by high-temperature heat, split water molecules into hydrogen and oxygen. Unlike electrolysis, which requires electricity to force the separation, the thermochemical cycle uses heat directly.\n\nAt Kalpakkam, the plant is coupled to a prototype fast breeder reactor that supplies process heat at 530°C. The copper-chlorine cycle operates at these temperatures with high efficiency — approximately 40% thermal-to-hydrogen efficiency, comparable to electrolysis using renewable electricity but without the intermittency problem." },
      { type: "evidence", title: "Why This Matters Globally", body: "Global hydrogen demand is projected to reach 500 million tonnes per year by 2050, up from approximately 90 million tonnes today. Most current production comes from steam methane reforming, which emits roughly 9 tonnes of CO₂ for every tonne of hydrogen — about 830 million tonnes of CO₂ annually, more than Germany's total emissions.\n\nNuclear hydrogen offers a pathway to decarbonise hard-to-abate sectors like steel, fertiliser, and heavy transport. India's annual steel production of 120 million tonnes could be decarbonised using nuclear hydrogen, reducing sector emissions by an estimated 200 million tonnes of CO₂ per year." },
      { type: "global-comparison", title: "How India Compares Internationally", body: "Several countries are exploring nuclear hydrogen, but India is the first with an operational plant. The US Department of Energy has funded demonstrations including a project at New York's Nine Mile Point plant that uses electrolysis powered by nuclear electricity — not direct heat. China announced plans in 2024 but has not commissioned a facility. France, which derives 70% of its electricity from nuclear, is researching high-temperature electrolysis at lab scale.\n\nIndia's lead comes from a unique position: it already operates a fast breeder reactor producing the high temperatures needed for thermochemical cycles, and its national hydrogen mission explicitly includes nuclear pathways alongside renewable electrolysis." },
      { type: "evidence", title: "The Technology Behind It", body: "The copper-chlorine cycle was first proposed by researchers at Argonne National Laboratory in the 1970s but remained largely experimental due to materials challenges. The cycle has four main steps: hydrolysis of copper chloride, thermolysis of copper oxychloride, electrolysis of copper chloride, and drying of copper chloride — each at different temperatures requiring precise heat integration.\n\nThe Indian team at IGCAR spent over a decade developing corrosion-resistant materials and heat-exchange systems. A particular challenge was the intermediate step producing molten copper oxychloride at 530°C, which is highly corrosive to conventional stainless steel. The solution: a proprietary nickel-based alloy with controlled chromium and molybdenum content." },
      { type: "whats-next", title: "What Comes Next", body: "The current plant produces 1 kilogram of hydrogen per day — sufficient for research. DAE has announced plans for a pilot plant 100 times larger, targeting 100 kg/day by 2028, sufficient to supply a small industrial facility.\n\nThe long-term vision involves coupling nuclear hydrogen to India's planned fleet of large sodium-cooled fast reactors, each capable of producing 50 to 100 tonnes of hydrogen per day. At that scale, nuclear hydrogen could meet a significant fraction of India's projected industrial hydrogen demand of 12 million tonnes per year by 2030, avoiding approximately 100 million tonnes of CO₂ annually." }
    ],
    body: ""
  },
  // 4. CBI Operation Chakra
  "cbi-operation-chakra-vi-digital-arrest": {
    title: "Fake Supreme Court Website, 72-Hour Video Call Ordeals — CBI Raids 80 Locations Across 16 States to Break ₹50 Crore 'Digital Arrest' Racket",
    summary: "Operation Chakra-VI saw CBI raid 80 locations across 16 states, arresting two kingpins in a digital arrest scam network that used a fake Supreme Court website to extort victims. The network defrauded victims of over ₹50 crore in 18 months by impersonating law enforcement and conducting fake video-call court proceedings. Victims were kept on video calls for up to 72 hours straight while their bank accounts were drained.",
    content: [
      { type: "cold-open", title: "Cold Open", body: "The phone rang. The caller ID showed a Delhi number. The voice on the other end identified itself as a Supreme Court registrar. \"You have been implicated in a money laundering case. A warrant has been issued. You are under digital arrest.\"\n\nFor hundreds of victims across India, this call was the beginning of an elaborate extortion scheme. Over the following days, victims were kept on video calls for up to 72 hours straight, their movements monitored through phone cameras, their bank accounts drained — all while the scammers conducted what appeared to be official court proceedings through a website mimicking the Supreme Court's authentic URL." },
      { type: "explained", title: "How the Digital Arrest Scam Worked", body: "The scam network operated through call centres in Delhi NCR and Gujarat. Trained callers, working from scripts, contacted potential victims claiming to be from the Supreme Court registry or Enforcement Directorate. The victim was told a parcel sent in their name had been intercepted with illegal items, or their identity had been used in a financial crime.\n\nIf the victim showed fear, the caller escalated to a senior posing as a judge or senior police officer. The victim was placed under \"digital arrest\": confined to home, required to keep their phone camera on, and forbidden from contacting family or lawyers. A fake court hearing was conducted over video call showing an official-looking court order bearing the Supreme Court seal.\n\nThe scammers used the URL supremecourt-ofindia.in, differing from the official supremecourtofindia.nic.in by just a few characters. The fake site displayed the Supreme Court emblem, scrolling judgments, and news updates." },
      { type: "evidence", title: "Operation Chakra-VI — The Crackdown", body: "CBI launched Operation Chakra-VI in coordination with state police and international law enforcement. On the day of the operation, 80 simultaneous raids were conducted across 16 states, spanning Delhi, Mumbai, Bengaluru, Ahmedabad, and smaller towns.\n\nInvestigators seized 47 mobile phones, 32 laptops, 12 servers, and over 250 SIM cards. The two main accused, arrested from Delhi and Ahmedabad, are believed to have coordinated the network. Preliminary investigations suggest the network defrauded victims of over ₹50 crore in the past 18 months.\n\nCBI has requested assistance from Microsoft and Google to trace domain registrations. The fake Supreme Court website was registered through a privacy-protected domain service based in Panama." },
      { type: "root-cause", title: "Why Digital Arrest Scams Are So Effective", body: "Digital arrest scams exploit a specific psychological vulnerability: fear of state power. India's legal system — with its hierarchical courts, unfamiliar procedures, and perceived severity — creates an environment where victims can be intimidated into compliance. The scammers weaponise this fear by creating urgency and isolation.\n\nSeveral structural factors enable these scams. Prepaid SIM cards obtained with forged documents provide anonymity. VoIP technology allows caller ID spoofing. Payment aggregators and crypto exchanges allow quick layering of stolen funds. Investigators estimate the network made over 100,000 calls per month — a 0.1% success rate still generates substantial revenue.\n\nA 2025 report by the Indian Cyber Crime Coordination Centre found that digital arrest scams accounted for 23% of all cyber fraud losses in India — the single largest category by financial impact." },
      { type: "debate", title: "Is Digital Arrest a Legal Concept?", body: "\"Digital arrest\" has no basis in Indian law. The Code of Criminal Procedure recognises physical arrest, where a person is taken into custody and produced before a magistrate. No provision allows a police officer or court official to confine a person to their home through a video call.\n\nThe Supreme Court itself noted the misuse in a March 2026 judgment: \"The phenomenon of digital arrest is a complete fabrication. No court in India issues orders through video calls, and no investigating agency places individuals under digital arrest.\" The court directed the government to launch a public awareness campaign." },
      { type: "whats-next", title: "What Comes Next", body: "CBI is working with MeitY to develop a real-time domain monitoring system that can detect lookalike government websites using machine learning to scan new domain registrations. Expected operational within six months.\n\nThe government has proposed a Digital Fraud Registry allowing banks and payment processors to flag scam-associated accounts. A pilot with five major banks is scheduled for September 2026.\n\nFor victims, recovering lost funds remains difficult. Under current RBI guidelines, banks must reverse fraudulent transactions only if reported within three working days. Many victims discover the fraud weeks later, making them ineligible for automatic reversal." }
    ],
    body: ""
  },
  // 5. NEET
  "neet-2026-the-exam-that-broke-india": {
    title: "2.3 Million Students, ₹50 Crore Leak, 12 Arrested — How NEET 2026 Became India's Biggest Exam Scandal and Why the System Keeps Failing",
    summary: "NEET-UG 2026, the medical entrance exam for 2.3 million students, was cancelled after a paper leak traced from a printing press in Haryana through 5 levels of intermediaries to students who paid ₹5-30 lakh for advance access. Total collection estimated at ₹50 crore. The cancellation is the largest exam scandal in Indian history, exposing systematic failures in the National Testing Agency's outsourced printing and transportation chain.",
    content: [
      { type: "cold-open", title: "Cold Open", body: "On June 12, 2026, over 2.3 million students across India sat down to take NEET-UG, the National Eligibility cum Entrance Test for undergraduate medical courses. By June 15, the exam had been cancelled — not because of a technical glitch or natural disaster, but because someone had broken into the system and sold the question paper for cash.\n\nThe NEET-UG 2026 cancellation is the largest exam scandal in Indian history, surpassing even the NEET-UG 2024 controversy. The paper leak, traced from a printing press in Haryana to a private hostel in Rajasthan to a tutorial centre in Pune, has exposed what investigators describe as a systematic failure in the examination system." },
      { type: "explained", title: "What Actually Happened", body: "According to FIRs filed by the Central Bureau of Investigation, the paper was leaked approximately 48 hours before the scheduled examination. The leak originated at a printing press in Haryana where question papers were being printed under tight security. From there, the chain of custody was broken.\n\nInvestigators have arrested 12 individuals so far, including two employees of the testing agency, four intermediaries, and six students who had paid for advance access. Payments ranged from ₹5 lakh to ₹30 lakh depending on the medical college quota and candidate profile.\n\nA critical piece of evidence was a WhatsApp group chat showing the leaked paper being transmitted through five levels of intermediaries. Each intermediary took a cut. The total collection is estimated at ₹50 crore." },
      { type: "root-cause", title: "Why NEET Keeps Breaking", body: "NEET-UG has had security controversies in every edition since 2022. The 2024 exam faced allegations of grace-mark manipulation. The 2025 exam saw a smaller leak in Bihar. The 2026 leak is different in scale but not in kind.\n\nThe structural problems are consistent. The National Testing Agency handles over 10 million examinations annually across multiple tests but operates with a permanent staff of fewer than 300 people. The bulk of exam work — printing, transportation, invigilation — is outsourced to private contractors selected through a lowest-bidder process. The printing and transportation chain is the weakest link: papers pass through printers, packers, couriers, district coordinators, and centre supervisors, each paid modest wages with no formal background checks." },
      { type: "evidence", title: "The Human Cost", body: "For 2.3 million students, the cancellation means months of lost preparation and uncertain futures. Many spent over ₹1 lakh on coaching classes, study materials, and examination fees. Some travelled from rural areas to urban centres, incurring significant expenses.\n\nThe psychological impact is harder to quantify. A 2024 study in the Indian Journal of Psychiatry found 14% of NEET aspirants exhibited moderate to severe depression symptoms during preparation. For first-generation learners from rural areas who took loans to fund their preparation, financial distress compounds academic uncertainty." },
      { type: "debate", title: "What Should Replace NEET?", body: "The cancellation has revived debate about whether India should have a single high-stakes medical entrance exam. Proposals include multiple exam windows during the year, decentralised state-level exams with central equivalency, and a two-stage process where the first stage is low-stakes screening.\n\nThe Medical Council of India has proposed the National Medical Admission Test, conducted four times a year from a secure question bank with results valid for two years. Critics argue multiple exams multiply security challenges and strengthen the coaching industry stranglehold. The real solution, they say, is institutional reform — strengthening the NTA, professionalising testing, and breaking the nexus between coaching centres and exam officials." },
      { type: "whats-next", title: "What Comes Next", body: "The retest has been scheduled for August 15, 2026. The NTA has announced enhanced security protocols including biometric access controls at printing presses and GPS-tracked transportation.\n\nThe government has announced a high-level committee headed by a former Supreme Court judge to review the entire examination security framework, with a report expected within three months.\n\nFor the 12 accused, CBI has invoked IPC sections for cheating, criminal conspiracy, and theft, plus the Information Technology Act. If convicted, the main accused face up to 10 years imprisonment." }
    ],
    body: ""
  }
};

// Helper to generate body HTML from content sections
function generateBody(title, content) {
  let html = `<h1>${escapeHtml(title)}</h1>\n`;
  for (const section of content) {
    html += `<h2>${escapeHtml(section.title)}</h2>\n`;
    const paragraphs = section.body.split('\n\n');
    for (const p of paragraphs) {
      if (p.trim()) {
        html += `<p>${escapeHtml(p.trim())}</p>\n`;
      }
    }
  }
  return html.trim();
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Build new file
let output = '// Auto-generated by build-content.mjs — do not edit directly\n';
output += 'import type { IntelligenceReport, Category } from \'@/types\'\n\n';
output += 'export const ALL_STORIES: (IntelligenceReport & { body?: string })[] = [\n';

let storyCount = 0;
for (const { slug, story } of stories) {
  const rewrite = rewrites[slug];
  if (!rewrite) {
    console.log(`No rewrite defined for: ${slug} — keeping original`);
    // Keep original
    output += story.objStr + ',\n\n';
    storyCount++;
    continue;
  }
  
  // Build content array string
  const contentStr = rewrite.content.map(s => JSON.stringify(s, null, 2)).join(',\n      ');
  const bodyStr = generateBody(rewrite.title, rewrite.content);
  
  // Build full story
  const newStory = {
    slug: slug,
    title: rewrite.title,
    summary: rewrite.summary,
    category: story.category,
    tags: story.tags,
    publishedAt: story.publishedAt,
    readTime: story.readTime,
    hero: story.hero,
    caption: story.caption,
    author: story.author,
    content: rewrite.content,
    metadata: story.metadata,
    body: bodyStr
  };
  
  output += JSON.stringify(newStory, null, 2) + ',\n\n';
  storyCount++;
  console.log(`Rewrote: ${slug}`);
}

output += '];\n';

fs.writeFileSync(filePath, output, 'utf8');
console.log(`\nDone! Wrote ${storyCount} stories to ${filePath}`);
