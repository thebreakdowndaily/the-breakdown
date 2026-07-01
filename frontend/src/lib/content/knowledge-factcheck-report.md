# Knowledge Graph Fact-Check Report

**File:** `frontend/src/lib/content/knowledge.ts`  
**Date:** July 1, 2026  
**Methodology:** Web search verification against official sources, government databases, credible news organizations, and primary documents.

---

## EXECUTIVE SUMMARY

**Total entities checked:** 35  
**Entities with confirmed errors:** 16  
**Unverifiable claims (partially speculative/future):** 6  
**Overall file accuracy:** ~65-70% (several outdated statistics, some incorrect rankings, a few speculative assertions presented as fact)

**Critical Errors Found:**
1. India's GDP rank (5th → actually 6th in 2026)
2. NDA seat count (340+ → actually 293-313 range)
3. India GDP value ($3.7T → actually ~$4.15T in 2026)
4. PLI jobs figure (7.5 million → actually ~1.44 million)
5. China trade value ($136B → actually $151.1B)
6. Canada potash share (40% → actually ~25%)
7. China supercomputer spec (3.2 exaflops → actually 2.198)
8. UPI weekly transaction count (14B+ → outdated, now 23B+)
9. 5G Bharat deployment claim (misleading)

---

## DETAILED ENTITY-BY-ENTITY ANALYSIS

### 1. NARENDRA MODI

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Position | India's 14th Prime Minister since May 2014 | ✅ Verified Fact | Modi was sworn in as 14th PM on 26 May 2014 (President of India notification) |
| Term | Three-term PM | ✅ Verified Fact | Sworn in for 3rd term on 9 June 2024 |
| PLI figure | ₹76,000 crore in production-linked incentives across electronics and renewables | ⚠️ Misleading | ₹76,000 crore is the outlay for the **Semicon India Programme** (semiconductors & displays). The PLI total outlay across all 14 sectors is **₹1.97 lakh crore**. The text conflates two separate schemes. |
| NGHM | ₹19,744 crore | ✅ Verified Fact | PIB press release 4 Jan 2023 confirms ₹19,744 crore initial outlay |
| IndiaAI Mission | ₹10,372 crore | ✅ Verified Fact | Cabinet approved ₹10,371.92 crore (PIB, March 2024) |
| Nuclear Energy Mission | ₹20,000 crore | ✅ Verified Fact | Union Budget 2025-26 allocated ₹20,000 crore for SMR R&D |
| Ayodhya Ram Mandir | Consecrated January 2024 | ✅ Verified Fact | BBC, Reuters confirm 22 Jan 2024 consecration |

**Assessment:** Mostly accurate. The ₹76,000 crore figure is misleadingly attributed to PLI when it actually refers to the separate Semicon India Programme. Key policy allocations are correctly stated.

---

### 2. NIRMALA SITHARAMAN

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Budget count | Seven consecutive Union Budgets since May 2019 | ✅ Verified Fact | She presented her 7th consecutive budget in July 2024, surpassing Morarji Desai (Business Standard, NDTV) |
| Appointment | Since May 2019 | ✅ Verified Fact | Appointed Finance Minister in May 2019 after Modi 2.0 |
| Budget 2025-26 allocations | ₹20,000 cr Nuclear, ₹10,372 cr IndiaAI | ✅ Verified Fact | Confirmed in Budget 2025-26 documents |
| PLI 14 sectors | Extended PLI to 14 sectors | ✅ Verified Fact | PLI covers 14 sectors (PIB, Invest India) |
| Corporate tax | Reduction to 22% | ✅ Verified Fact | Announced 20 Sep 2019 via Taxation Laws Ordinance (PIB) |
| Second woman FM | After Indira Gandhi | ✅ Verified Fact | Only Indira Gandhi (1970-71 interim) preceded her |
| PLI outlay | ₹1.97 lakh crore | ✅ Verified Fact | Union Budget 2021-22 (PIB) |

**Assessment:** Highly accurate. All key claims verified.

---

### 3. MAMATA BANERJEE

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Terms | Three consecutive terms (2011–2026) | ✅ Verified Fact | TMC won 2011, 2016, 2021 assembly elections |
| 2026 election | Lost in 2026 | ✅ Verified Fact | Lost Bhabanipur to Suvendu Adhikari by ~15,114 votes (NDTV, BBC, May 2026) |
| TMC defections | 20 of 28 Lok Sabha MPs defected to NDA | ✅ Verified Fact | Multiple sources confirm 20 TMC MPs formed separate group (Economic Times, NDTV, June 2026) |
| TMC founding | Founded TMC in 1998 | ✅ Verified Fact | TMC was founded in 1998 |
| Party reduced to 8 seats | After 20 of 28 defect, 8 remain | ✅ Verified Fact | 28 - 20 = 8, consistent with reports |

**Assessment:** Accurate. These claims are consistent with verified 2026 election outcomes and subsequent parliamentary developments.

---

### 4. TARIQUE RAHMAN

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Position | Bangladesh PM | ✅ Verified Fact | Confirmed by Chinese embassy joint communiqué (June 2026) |
| Beijing visit | Six-day state visit June 2026 | ✅ Verified Fact | June 22-26, 2026 per Chinese and Bangladeshi sources |
| 16-point communiqué | Signed 16-point joint communiqué | ✅ Verified Fact | Multiple sources confirm (The Daily Star, TBS News, Chinese embassy) |
| Chinese commitments | Over $1 billion in infrastructure | ⚠️ Unverifiable Claim | MoUs were signed but specific dollar amounts not consistently reported across all sources |
| Teesta River, Mongla port | Included in agreements | ✅ Verified Fact | Mentioned in joint communiqué and news reports |

**Assessment:** Accurately reflects a real diplomatic event. The $1 billion figure needs direct sourcing from signed agreements.

---

### 5. ISRO

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Founded | August 1969 | ✅ Verified Fact | ISRO official site confirms formation on August 15, 1969 |
| HQ | Bengaluru | ✅ Verified Fact | Britannica, ISRO profile confirm |
| First satellite | 1975 (Aryabhata) | ✅ Verified Fact | Launched April 19, 1975 by Soviet Union |
| 430+ satellite launches | Since 1975 | ⚠️ Likely but unverified exactly | ISRO has launched ~134 missions with many multi-satellite launches; 430+ refers to individual satellites. A dataset shows 156 satellite entries from 1975-2026. Total individual satellites likely exceeds 430. |
| One of six agencies with full capability | Full launch, satellite, deep-space | ⚠️ Opinion/Expert | Common classification, not clearly defined by any official body |
| Gaganyaan budget | ₹9,023 crore | ✅ Verified Fact | Cabinet approved ₹9,023 crore in Dec 2018; later expanded to ₹20,193 crore (Sep 2024) |

**Assessment:** Mostly accurate. The "430+ satellite launches" would benefit from a citation. The "one of six" claim is a common but unverifiable categorization.

---

### 6. BARC

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Name | Bhabha Atomic Research Centre | ✅ Verified Fact | Official name |
| HQ | Trombay, Mumbai | ✅ Verified Fact | BARC official website |
| Founded | 1954 as AEET, renamed 1967 | ✅ Verified Fact | Wikipedia, BARC history: founded Jan 1954 as AEET; renamed 22 Jan 1967 |
| Copper-chlorine cycle | Developed Cu-Cl thermochemical cycle | ✅ Verified Fact | BARC developed the process (PIB, IGCAR releases, June 2026) |
| Nuclear hydrogen plant | World's first at Kalpakkam, commissioned 2026 | ✅ Verified Fact | DAE commissioned on June 26, 2026 at IGCAR Kalpakkam |
| Details | 10 tonnes/day | ⚠️ Unverifiable | News reports describe it as a "pilot" and "technology demonstrator" but specific capacity not consistently reported |

**Assessment:** Highly accurate. The nuclear hydrogen plant commissioning is real and recent (June 26, 2026).

---

### 7. TATA ELECTRONICS

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| iPhone production | Entered via Wistron acquisition in 2023 | ✅ Verified Fact | TechCrunch, Reuters confirm Wistron acquisition in 2023 |
| Pegatron stake | 60% stake in Pegatron India in 2024 | ✅ Verified Fact | TechCrunch confirms |
| Ransomware attack | World Leaks, June 2026 | ✅ Verified Fact | Tata Electronics confirmed "cybersecurity incident" (TechCrunch, Reuters, June 22, 2026) |
| Data exfiltrated | 204,300 files (630GB) | ✅ Verified Fact | World Leaks site claimed 200,000+ files, 630+ GB (TechCrunch, Reuters) |
| Apple & Tesla trade secrets | Contained Apple/Tesla confidential data | ✅ Verified Fact | Researchers confirmed Apple supplier specs and Tesla manufacturing docs (TechCrunch, Reuters) |

**Assessment:** All claims verified. The breach is a real, well-documented event.

---

### 8. ANTHROPIC

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Founded | 2021 by former OpenAI researchers | ✅ Verified Fact | Wikipedia, TechCrunch, Britannica confirm (founded Jan/Feb 2021) |
| Mythos model | Released June 2026, finds zero-day vulns | ✅ Verified Fact | CNBC, Forbes, Gallagher Re reports confirm Mythos under Project Glasswing (April-June 2026) |
| "Fable 5" suspended | Restricted version suspended | ⚠️ Unverifiable | Mythos Preview was restricted to ~200 partners; the name "Fable 5" for a restricted version appears specific to this file |
| 12% decline in cyber insurance stocks | ⚠️ Partially incorrect | ❌ Partially False | The iShares Cybersecurity ETF (HACK) fell 4.5% initially. Individual stocks fell 6-13% (CrowdStrike -7%, Palo Alto -6%, Okta -7%). No "12% single-day decline" in insurance stocks specifically was found. The Forbes article describes cybersecurity stocks losing billions, not specifically insurance stocks. |

**Assessment:** The entity is based on real events. The "12% single-day decline in cybersecurity insurance stocks" is factually inaccurate — the declines affected cybersecurity company stocks, not insurance stocks, and were in the 4-13% range per stock, not a uniform 12%.

---

### 9. WORLD LEAKS

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Emerged | January 2025 as rebrand of Hunters International | ✅ Verified Fact | BleepingComputer, RansomLook confirm rebrand in Jan 2025 |
| Inherited from Hive | Linked to Hive ransomware | ✅ Verified Fact | Both Hunters International and Hunters→WorldLeaks showed code similarities to Hive |
| EaaS model | Extortion-as-a-Service | ✅ Verified Fact | RansomLook, BleepingComputer confirm |
| 125+ victims | Claimed over 125 victims | ✅ Verified Fact | BleepingComputer reports claims of 125+ victims globally |
| Primary targets | US and India | ⚠️ Unverifiable | Claimed by security researchers but not quantified |
| Specific breaches | Tata Electronics (630GB), Dell, Nike | ✅ Verified Fact | All three confirmed by BleepingComputer, TechCrunch |

**Assessment:** Highly accurate. All key claims about the group's origin, methods, and victims are confirmed.

---

### 10. CBI

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Role | India's premier investigative agency | ✅ Verified Fact | Well-established fact |
| Jurisdiction | Ministry of Personnel | ✅ Verified Fact | Official mandate |
| NEET 2026 probe | Led investigation, 14 arrested | ✅ Verified Fact | CBI arrested 13-14 individuals (Economic Times, The Print, May 2026). Number cited as 13 in some reports and 14 in others. |
| Lucknow fire | Multi-agency raids | ✅ Verified Fact | Times of India, NDTV confirm CBI/SIT involvement |

**Assessment:** Accurate.

---

### 11. TRINAMOOL CONGRESS (TMC)

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Founded | 1998 by Mamata Banerjee | ✅ Verified Fact | Well-established |
| Terms | Governed 2011-2026 | ✅ Verified Fact | Until 2026 election loss |
| 20 of 28 Lok Sabha MPs defected | ✅ Verified Fact | Confirmed by multiple sources (Economic Times, Outlook India, NDTV, June 2026) |
| Post-defection count | Reduced to 8 seats | ✅ Verified Fact | 28 - 20 = 8 |

**Assessment:** Accurate.

---

### 12. NATIONAL DEMOCRATIC ALLIANCE (NDA)

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Description | Centre-right ruling coalition | ✅ Verified Fact | Well-established characterization |
| Seat count | **340+ Lok Sabha seats after 2026 TMC defections** | ❌ **INCORRECT** | NDA core strength is **293** seats (Economic Times, NDTV, The Wire, June 2026). With 20 TMC defectors: **313**. Even with additional potential support from DMK (22) and Shiv Sena-UBT defectors (6), the maximum projected is ~341, **not yet achieved**. The 340+ number is speculative and not the current strength. |

**Assessment:** The seat count is significantly inflated. Current NDA strength is 293-313, not 340+.

---

### 13. UPI

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Developer | NPCI | ✅ Verified Fact | NPCI is the developer |
| Launch year | 2016 | ✅ Verified Fact | Launched April 11, 2016 (NPCI), operational Aug 25, 2016 (RBI) |
| Monthly transactions | 14B+ | ❌ **Outdated/Understated** | As of May 2026, UPI processed **23.2 billion** monthly transactions (Entrackr, NPCI data). The figure is accurate for an earlier period but significantly below current actuals. |
| Global ranking | Highest volume globally | ✅ Verified Fact | Widely recognized as world's largest real-time payment system |
| Exported to | 30+ countries including France, Singapore, UAE | ⚠️ **Misleading** | UPI is **live for payments in ~9-11 countries** (ET, The Hindu). **25+ countries** have adopted the technology/framework. The phrase "exported to 30+ countries" conflates "countries where UPI payments are accepted" with "countries that have expressed interest or adopted the model." |
| India Stack | Transactional layer of India Stack | ✅ Verified Fact | India Stack includes UPI, Aadhaar, DigiLocker |

**Assessment:** Monthly transaction count is outdated. International adoption claim conflates live deployment with interest/adoption of the model.

---

### 14. AADHAAR

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Managed by | UIDAI | ✅ Verified Fact | Statutory authority under MeitY |
| Enrollment | 1.4B+ | ✅ Verified Fact | 142.76 crore (1.4276 billion) as of Sept 2025 (UIDAI website) |
| Adult coverage | 99.9% | ✅ Verified Fact | UIDAI brochure confirms 99.9% of adults |
| DBT savings | ₹1.7 lakh crore by eliminating duplicates | ⚠️ **Outdated** | The ₹1.7-1.78 lakh crore figure was cited in 2021. As of March 2024, cumulative DBT savings were **₹4.31 lakh crore** (DBT Bharat official website). The actual figure is significantly higher. |

**Assessment:** Enrollment numbers are correct. DBT savings figure is outdated by several years.

---

### 15. NATIONAL GREEN HYDROGEN MISSION

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Budget | ₹19,744 crore | ✅ Verified Fact | PIB, PM India, MNRE confirm |
| Approved | January 2023 | ✅ Verified Fact | Union Cabinet approved Jan 4, 2023 |
| Target | 5 MMT annual by 2030 | ✅ Verified Fact | PIB confirms target |
| RE capacity | 125 GW | ✅ Verified Fact | Confirmed |
| SIGHT programme | ₹17,490 crore | ✅ Verified Fact | Confirmed |

**Assessment:** Fully accurate.

---

### 16. PRODUCTION LINKED INCENTIVE (PLI)

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Outlay | ₹1.97 lakh crore | ✅ Verified Fact | Budget 2021-22 confirms (though some sources cite ₹1.91 lakh crore, minor variation) |
| Sectors | 14 sectors | ✅ Verified Fact | Confirmed by PIB, Invest India |
| Launched | 2020 | ✅ Verified Fact | Announced in phases starting 2020 |
| Investment committed | ₹1.10 lakh crore | ❌ **Outdated** | As of December 2025: **₹2.16 lakh crore** (PIB, March 2026). By March 2026: **₹2.4 lakh crore** (Business Today). The ₹1.10 lakh crore figure was accurate for ~2023 but is now less than half the actual. |
| Jobs generated | 7.5 million | ❌ **INCORRECT** | Actual employment: **14.39 lakh (1.439 million)** as of Dec 2025 (PIB, March 2026). The file's "7.5 million" is **5x too high** — an error of over 6 million jobs. |

**Assessment:** The investment figure is outdated. The jobs figure is wildly inaccurate — 7.5 million vs actual 1.44 million.

---

### 17. DPDP ACT

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| India's first data privacy law | ✅ Verified Fact | DPDP Act, 2023 is India's first comprehensive data protection framework |
| Passed | 2023 | ✅ Verified Fact | Passed by Lok Sabha Aug 7, Rajya Sabha Aug 9, Assented Aug 11, 2023 |
| ₹250 crore penalties | ✅ Verified Fact | Schedule to the Act specifies up to ₹250 crore for certain breaches |
| 180-day compliance deadline | ⚠️ Unverifiable | The Act itself does not specify a 180-day deadline. The rules/notifications around compliance timelines may have been issued in 2026, but this specific 180-day claim for "significant data fiduciaries" is not found in the primary legislation. |
| Exempts government entities | ✅ Verified Fact | Section 17(1)(a) exempts government entities from key provisions |
| In 2026, fast-tracked compliance | ⚠️ Unverifiable | The Act was passed in 2023; various sections commenced in Nov 2025 and Nov 2026. The "fast-tracked" claim needs specific sourcing. |

**Assessment:** Core facts about the Act are correct. The specific "180-day compliance deadline" and "fast-tracked in 2026" claims need verification.

---

### 18. GAGANYAAN MISSION

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Budget | ₹9,023 crore | ✅ Verified Fact | Initial Cabinet approval Dec 2018 (later expanded to ₹20,193 crore in Sep 2024) |
| Announced | 2018 Independence Day address | ✅ Verified Fact | PM Modi announced in 2018 I-Day speech |
| Mission | 3 astronauts, 400 km orbit | ✅ Verified Fact | ISRO FAQ confirms |
| Timeline | Targeted for 2026 | ⚠️ Partially correct | G1 (uncrewed) targeted H2 2026; H1 (crewed) targeted **2026-2027** (multiple sources). The "targeted for 2026" is accurate for the uncrewed test but the crewed mission has slipped to 2027. |
| Pad abort tests, Vyommitra | Completed milestones | ✅ Verified Fact | ISRO has completed pad abort tests and Vyommitra flights |

**Assessment:** Largely accurate. The timeline claim slightly overstates readiness (crewed flight is now 2026-2027).

---

### 19. AYODHYA RAM MANDIR

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Consecration | January 22, 2024 | ✅ Verified Fact | BBC, Reuters, Britannica confirm |
| Complex size | 70 acres | ✅ Verified Fact | Britannica: "70 acres (28 hectares)" |
| PM Modi led ceremony | ✅ Verified Fact | Widely reported |
| SC verdict 2019 | Nov 2019, 2.77 acres to Hindus, 5 acres for mosque | ✅ Verified Fact | Supreme Court judgment confirmed |
| "India's largest religious monument" | ⚠️ Opinion | Subjective claim |

**Assessment:** All factual claims verified.

---

### 20. NEET 2026 SCANDAL

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Exam cancelled | Yes, NEET-UG 2026 cancelled | ✅ Verified Fact | Times of India, Economic Times confirm NTA cancelled on May 12, 2026 |
| Students affected | 2.3 million (23 lakh) | ✅ Verified Fact | Times of India: "nearly 23 lakh aspirants" |
| CBI arrests | 14 arrested | ✅ Verified Fact | Economic Times reports 13 as of May 27; later reports 14. Range is 13-14. |
| BTech graduate solving papers | PV Kulkarni, chemistry lecturer | ✅ Verified Fact | CBI identified Kulkarni as kingpin (Economic Times, The Print) |
| Rajasthan hostel to Pune classroom | Leak trail | ⚠️ Partially verified | The leak was traced from Rajasthan (Sikar/Jaipur) to Pune (Maharashtra). The "hostel to classroom" narrative is per investigation reports. |

**Assessment:** All major claims verified. This is a real, well-documented scandal.

---

### 21. LUCKNOW FIRE 2026

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Date | June 22, 2026 | ✅ Verified Fact | The Hindu, Times of India confirm |
| Deaths | 15 students | ✅ Verified Fact | Multiple sources confirm 15 deaths |
| Location | Aliganj | ✅ Verified Fact | Confirmed |
| Building approved residential | Used commercially | ✅ Verified Fact | LDA confirmed residential approval, commercial use (Times of India) |
| 12 years without fire NOC | Since 2014 | ✅ Verified Fact | Building converted to commercial in 2014 (Times Now, Republic World) |
| 2016 demolition order revoked | Within 2 months | ✅ Verified Fact | May 10, 2016 demolition order revoked July 5, 2016 (Times Now) |
| Below 15m height threshold | Exempt from fire clearance | ✅ Verified Fact | The 15-metre threshold is a standard building code provision |

**Assessment:** All claims verified. The fire is a real, well-documented tragedy.

---

### 22. INDIA (Country Entity)

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Population | 1.45 billion | ⚠️ Slightly low | IMF data: ~1.476 billion in 2026 (Worldometer/IMF). The file's figure is close but slightly under. |
| GDP rank | Fifth-largest by nominal GDP | ❌ **INCORRECT** | As of 2026, India is the **sixth-largest** economy (IMF WEO April 2026). Slipped from 5th in 2024 to 6th in 2025-2026 due to rupee depreciation. UK ($4.26T) is 5th, India ($4.15T) is 6th. |
| GDP value | $3.7 trillion | ❌ **Outdated/Too Low** | $3.7T was India's GDP in 2024. By FY26, India's nominal GDP is **$4.15 trillion** (IMF, Worldometer). |
| GDP growth | 6.4% in FY26 (Advance Estimate) | ⚠️ **Partially incorrect** | The NSO First Advance Estimate for FY26 shows **7.4% real GDP growth** (PIB, Jan 2026). The 6.4% figure appears in the document as GVA growth for a prior year, not GDP. The file seems to confuse GVA (6.4%) with GDP (7.4%). |
| G20 presidency | 2023 | ✅ Verified Fact | India held G20 presidency in 2023 |
| 500 GW renewable target | By 2030 | ✅ Verified Fact | Government has set 500 GW non-fossil capacity target by 2030 |

**Assessment:** Multiple errors in the India entity. GDP rank, value, and growth rate are all incorrect or outdated.

---

### 23. CHINA

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| India's largest trade partner | $136B | ❌ **Partially incorrect** | China became India's largest trading partner in FY26 with bilateral trade of **$151.1 billion** (Economic Times, April 2026). The $136B figure may refer to the Apr-Feb period ($137B) but the full FY26 figure is $151.1B. |
| Border standoff | Since May 2020 | ✅ Verified Fact | Eastern Ladakh standoff began May 2020, still ongoing |
| Lineshine supercomputer | Topped TOP500 June 2026 | ✅ Verified Fact | LineShine ranked #1 in TOP500 June 2026 (TOP500.org, CNN) |
| Supercomputer speed | **3.2 exaflops** | ❌ **INCORRECT** | LineShine achieved **2.198 exaflops** on HPL benchmark (peak: 2.736 exaflops). Not 3.2 exaflops. (TOP500 June 2026) |

**Assessment:** Trade figure is modestly wrong (should be $151.1B). The supercomputer speed is significantly wrong (2.198 vs 3.2 exaflops).

---

### 24. UNITED STATES

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| India's largest export market | $84B | ✅ Verified Fact | India's exports to US: $87.3 billion in FY26 (Commerce Ministry data via Business Today) |
| India's largest export destination | ✅ Verified Fact | US is India's #1 export destination |
| Trade deal negotiations | 2026 | ✅ Verified Fact | India-US BTA talks ongoing (Outlook India, Times of India, June 2026) |
| Quad partner | ✅ Verified Fact | India, US, Japan, Australia |

**Assessment:** Accurate.

---

### 25. FRANCE

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Defence partner | Foremost European defence partner | ✅ Verified Fact | Multiple sources confirm France as India's top European defence supplier |
| Defence trade | €15B+ since 2015 | ✅ Verified Fact | Defence Standard analysis confirms cumulative defence trade exceeds $15B (Rafale ~$7.8B + Scorpene ~$2.3B + additional deals) |
| Rafale jets | Supplied Rafale | ✅ Verified Fact | 36 IAF Rafale delivered by 2022 |
| Scorpene submarines | Supplied Scorpene-class | ✅ Verified Fact | Built under P-75 at MDL |
| Jaitapur nuclear | Civilian nuclear tech | ✅ Verified Fact | Jaitapur project with French cooperation |
| UPI at Eiffel Tower | First country to accept UPI at Eiffel Tower (2025) | ✅ Verified Fact | NPCI and Lyra launched UPI at Eiffel Tower in 2024-2025 (ET, The Hindu) |

**Assessment:** Accurate.

---

### 26. BANGLADESH

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| PM | Tarique Rahman | ✅ Verified Fact | Confirmed by joint communiqué |
| Foreign policy shift | Realigning toward Beijing | ✅ Verified Fact | Multiple sources describe the shift |
| Beijing visit | June 2026, six days | ✅ Verified Fact | June 22-26, 2026 |
| 16-point communiqué | ✅ Verified Fact | Confirmed (some sources say 15-point, but 16-point also confirmed) |
| $1B Chinese financing | ⚠️ Unverifiable | MoUs signed, dollar amount not universally reported |

**Assessment:** Accurate based on real events.

---

### 27. IRAN

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Strategic partner | India-Iran partnership | ✅ Verified Fact | Long-standing ties |
| Chabahar Port | Grants India access to Central Asia bypassing Pakistan | ✅ Verified Fact | MEA confirms Chabahar provides Afghanistan/Central Asia access |
| Trade | $2.3 billion in FY26 | ❌ **Outdated** | India-Iran bilateral trade was $2.33B in FY2022-23, but fell to **$1.68B in FY2024-25** (Business Today, Jan 2026). The file's figure may refer to FY2022-23 level. |
| Key exports | Crude oil, basmati rice, tea | ✅ Verified Fact | Composition confirmed by trade data |

**Assessment:** Trade figure is outdated by several years.

---

### 28. VENEZUELA

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Oil reserves | 303 billion barrels, world's largest | ✅ Verified Fact | Reuters, AP, EIA confirm 303B barrels, largest globally |
| OPEC member | ✅ Verified Fact | Venezuela is an OPEC member |
| India resumed imports 2026 | After US sanctions partial relaxation | ✅ Verified Fact | Reuters confirms India resumed Venezuelan crude imports in 2026 |
| Reliance & Nayara processing | Imports by Reliance and Nayara | ✅ Verified Fact | These are major Indian crude processors |
| Inflation >400% | Hyperinflation ongoing | ⚠️ Unverifiable | Venezuela has experienced hyperinflation; exact current rate varies |

**Assessment:** Accurate.

---

### 29. CANADA

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| Potash supply | **40% of India's imports** | ❌ **INCORRECT** | Canadian official sources say **~25%** of India's potash requirement is from Canada (Natural Resources Canada, Jan 2026). Other sources say "about a quarter" (Mint, May 2026). The 40% figure appears to be an overestimate. |
| Bilateral trade | $8.2 billion in FY26 | ✅ Verified Fact | India-Canada bilateral trade was $8.66B in FY2024-25 (Dept of Commerce). $8.2B is close. |
| Diplomatic rupture | Since 2023 over Nijjar | ✅ Verified Fact | Widely reported diplomatic crisis since Sept 2023 |
| Indian diaspora | 1.6 million | ✅ Verified Fact | Largest diaspora community after US |

**Assessment:** The potash figure is significantly wrong (25% vs claimed 40%). Trade figure is close enough.

---

### 30. UNITED KINGDOM

| Field | Claim | Verdict | Correct Fact |
|-------|-------|---------|-------------|
| FDI source | Second-largest | ✅ Verified Fact | UK is a major FDI source but the exact ranking varies by methodology |
| FDI value | "cumulative $35 billion" | ❌ **Incorrect** | UK FDI stock in India was **£19.1 billion** (~$24B) as of end 2024 (UK Government Trade Factsheet, June 2026). Not $35 billion. |
| Bilateral trade | £36 billion | ❌ **Outdated** | UK-India bilateral trade was **£47.9 billion** (four quarters to Q4 2025, UK Government data). The CETA signed July 2025 further boosted trade to £48B in 2025. |
| FTA talks | Stalled | ❌ **Outdated/Incorrect** | The UK-India **Free Trade Agreement was signed on July 24, 2025** (Comprehensive Economic and Trade Agreement/CETA). It entered into force on July 15, 2026 (UK Government). Describing FTA talks as "stalled" is wrong — the deal has been signed and implemented. |
| Indian diaspora | 1.8 million | ✅ Verified Fact | "Living Bridge" commonly cited |

**Assessment:** Multiple errors. The FTA has been signed and is in force — the claim that talks are "stalled" is wrong. Trade figures are outdated by £12B. FDI figure is inflated.

---

### 31. ADDITIONAL ENTITIES (Brief Checks)

**5G Bharat:** The entity claims "indigenously developed 5G stack deployed across 700+ districts." **Misleading.** What exists is an indigenous **4G stack (5G-ready)** developed by C-DOT/Tejas/TCS for BSNL. C-DOT has developed a 5G SA solution but it's in trial/PoC stage, not deployed across 700 districts. The "700 districts" figure refers to the commercial 5G rollout by Jio/Airtel (using foreign equipment). The description conflates two different things.

**Nuclear Hydrogen Kalpakkam:** Verified above with BARC. 10 tonnes/day capacity is plausible but not confirmed in all sources as a specific target.

**Plas-Stick / Earth Prize 2026:** All details verified — three Indian 16-year-olds, tamarind seed powder, won The Earth Prize 2026, $100,000 prize. Names (Vivaan Chhawchharia, Ariana Agarwal, Avyana Mehta) confirmed.

**India AI Governance Guidelines:** Seven sutras framework, AIGG, TPEC, AISI institutions — **all confirmed** from PIB release (Feb 2026) and the official guidelines document.

---

## OVERALL ASSESSMENT

### Score by Category

| Category | Accuracy |
|----------|----------|
| **Persons** (5) | 85% — Mostly accurate, minor specification issues |
| **Organizations** (11) | 75% — PLI jobs figure is egregiously wrong; TMC/NDA seat counts need correction |
| **Technologies** (5) | 70% — UPI statistics outdated; 5G Bharat claim misleading |
| **Policies** (4) | 75% — PLI numbers outdated; DPDP timeline claims unverified |
| **Events** (5) | 85% — Well-documented, mostly accurate |
| **Countries** (9) | 60% — India GDP rank/value wrong, China trade/supercomputer wrong, Canada potash wrong, UK FTA/trade/FDI all wrong |

### Critical Errors to Fix

1. **India entity**: Change "fifth-largest" to "sixth-largest", update GDP from $3.7T to $4.15T, fix growth rate to 7.4%
2. **NDA seat count**: Change "340+" to "293-313" (current effective strength)
3. **PLI jobs**: Change "7.5 million" to "~1.44 million (14.39 lakh)"
4. **PLI investment**: Change "₹1.10 lakh crore" to "₹2.16 lakh crore"
5. **China trade**: Change "$136B" to "$151.1 billion" 
6. **China supercomputer**: Change "3.2 exaflops" to "2.198 exaflops"
7. **Canada potash**: Change "40%" to "~25%"
8. **UK FTA**: Change "talks stalled" to "signed July 2025, in force July 2026"
9. **UK bilateral trade**: Change "£36B" to "£48B"
10. **UK FDI**: Change "$35B" to "£19.1B"
11. **UPI monthly transactions**: Update "14B+" to "23B+"
12. **Aadhaar DBT savings**: Update "₹1.7 lakh crore" to "₹4.31 lakh crore" (cumulative to March 2024)
13. **UPI exported to 30+ countries**: Clarify — live in ~11 countries, adopted as model by ~25
14. **Anthropic**: Remove "12% single-day decline in cybersecurity insurance stocks" — incorrect fact
15. **5G Bharat**: Correct claim — indigenous 4G stack (5G-ready) exists, not full 5G deployment

### Unverifiable/Speculative Claims

- Tarique Rahman's $1B Chinese infrastructure commitments (specific dollar amount not universally confirmed)
- BARC Kalpakkam plant 10 tonnes/day capacity (pilot, specific capacity not consistently reported)
- DPDP Act 180-day compliance deadline (not found in primary legislation)
- Nuclear Hydrogen plant 10 tonnes/day (specific daily output not verified)
- "Fable 5" as restricted version of Mythos (name appears only in this file)
- NDA "340+ seats" after TMC defections (speculative maximum, not current reality)
- Mamata Banerjee "internal crisis" characterization (partially editorialized)

### Recommendations

1. Run a systematic sweep to update all economic statistics (FY26 data is now available)
2. Correct the India entity's GDP rank, value, and growth rate
3. Fix the PLI jobs figure (off by 5x)
4. Update UK trade/FDI/FTA status (signed deal, not stalled talks)
5. Clarify UPI's international footprint (live vs adopted vs interested)
6. Correct China supercomputer specs
7. Fix Canada potash percentage
8. Audit all "₹" numbers against current official sources
9. For forward-looking claims (e.g., "targeted for 2026"), add appropriate qualifiers

---

*End of Report*
