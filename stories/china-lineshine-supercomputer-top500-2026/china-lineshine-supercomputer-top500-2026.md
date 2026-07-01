---
title: "China's LineShine: 2.2 Exaflops, 13.79 Million Cores, Zero Foreign Chips"
summary: "China's LineShine supercomputer hit 2.198 exaflops on TOP500, beating US El Capitan by 20%. Built with 40,960 domestic LX2 processors, 13.79 million ARMv9 cores, no GPUs, no US semiconductors. A direct response to export controls that banned NVIDIA and AMD chips to China."
category: "Technology"
tags:
  - "China"
  - "supercomputer"
  - "LineShine"
  - "TOP500"
  - "exascale"
  - "Huawei"
  - "semiconductors"
  - "export-controls"
  - "El-Capitan"
  - "HPC"
published_at: "2026-06-25T10:00:00Z"
reading_time: 8
fact_check_image: /images/stories/china-lineshine-supercomputer-top500-2026.jpg
hero: /images/stories/china-lineshine-supercomputer-top500-2026.jpg
caption: "Representational image of a data centre — an actual photograph of China's LineShine supercomputer has not been publicly released"
author: "The Breakdown Desk"
---

## Cold Open

On June 23, 2026, in Hamburg, a Chinese supercomputer named LineShine appeared at number one on the TOP500 list with 2.198 exaflops — roughly 20 per cent faster than the American El Capitan it displaced. No photograph of the system has been released. No Western chip is inside it. LineShine uses 40,960 domestically produced LX2 processors, 13.79 million ARMv9 cores, zero GPUs, and no imported silicon. China stopped submitting Linpack results to TOP500 in 2019, citing US sanctions. Nine years later, it returned with a machine built entirely from components Washington tried to prevent it from developing.

## Technical Specifications

The system runs on an all-CPU architecture — unusual at the exascale level, where every other contender relies on GPU accelerators. Each of the 40,960 LX2 processors contains 304 ARMv9 cores at 1.55 GHz, distributed across 20,480 compute nodes. The nodes communicate through a proprietary interconnect called LingQi, developed in-house to replace InfiniBand and Ethernet. The operating system is Kylin, also Chinese-developed. Power draw is 42.2 megawatts across 92 cabinets at the National Supercomputing Centre in Shenzhen. On the HPCG benchmark, which measures memory-intensive workloads closer to real scientific computing, LineShine placed first at 22.00 petaflops. On mixed-precision AI benchmarks, it ranked fourth at 7.92 exaflops — the trade-off for omitting tensor cores and GPU accelerators.

## The LineShine Supercomputer

Chief designer Lu Yutong had previewed the architecture in preliminary form in April 2026, but the full system was kept largely under wraps. This secrecy marked a shift from 2017, when China's Sunway TaihuLight — the last Chinese system to top the list at 93 petaflops — was heavily publicised well before its debut. LineShine's emergence after a nine-year absence from the top spot caught the global high-performance computing community by surprise. The machine was developed at the National Supercomputing Centre in Shenzhen, with a design philosophy that deliberately sidesteps the supply-chain vulnerabilities that constrain every other exascale contender.

## Global Supercomputing Race

Every other exascale system relies on US-designed GPU accelerators subject to strict export controls. El Capitan, now ranked second, uses AMD MI-series accelerators. Frontier uses AMD MI250X GPUs. Fugaku uses Fujitsu-designed ARM processors but contains significant US-designed components. Europe's Jupiter, still under construction, will use Intel and NVIDIA hardware. LineShine avoids this entire dependency chain. Its CPU-only design demonstrates indigenous capability across processor design, interconnect technology, operating system, and system integration — without relying on any foreign semiconductor technology.

## Geopolitical Implications

LineShine is a direct rebuttal of the US strategy of containing Chinese technological development through export controls on advanced semiconductors and chip-making equipment. China built a machine that does not need the chips it cannot buy. The system suggests that Chinese semiconductor designers have made significant progress in high-core-count server processors that can compete with Western designs in specific HPC niches, even if they lag in general-purpose performance. For US policymakers, LineShine raises uncomfortable questions about whether export controls, which have restricted sales of NVIDIA and AMD chips while accelerating Chinese investment in indigenous alternatives, are achieving their intended effect. LineShine is the sound of a country proving it can compute without permission.
