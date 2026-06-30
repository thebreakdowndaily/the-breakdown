---
title: "China's LineShine Supercomputer Retakes World #1 â€” Built Without Any Foreign Chips"
summary: "China's LineShine supercomputer achieved 2.198 exaflops to retake the TOP500 #1 spot from the US. Built entirely from domestic CPUs with no GPUs or accelerators â€” a direct response to US export controls."
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

# China's LineShine Supercomputer Retakes World #1

## Cold Open

On June 23, 2026, at the ISC High Performance conference in Hamburg, Germany, a previously unreported Chinese supercomputer called LineShine debuted at number one on the TOP500 list, achieving 2.198 exaflops on the Linpack benchmark â€” roughly twenty per cent faster than the American El Capitan system that had held the top spot. What made the announcement startling was not merely the performance figure, but the architecture behind it: LineShine was built with no foreign chips, no GPUs, and no hardware accelerators of any kind. It is a machine purpose-built to demonstrate that United States export controls cannot contain Chinese computing ambition.

## The LineShine Supercomputer

LineShine was developed at the National Supercomputing Centre in Shenzhen under the leadership of chief designer Lu Yutong, who had previewed the system architecture in preliminary form in April 2026. The project had been kept largely under wraps â€” a notable shift from the 2017 era when China's Sunway TaihuLight, the last Chinese system to hold the top spot at 93 petaflops, was extensively publicised well before its debut. China had stopped submitting Linpack benchmark results to the TOP500 list starting in 2019, citing United States sanctions, so LineShine's emergence at number one after a nine-year absence from the top spot caught the global high-performance computing community by surprise.

## Technical Specifications

LineShine's architecture is unprecedented at the exascale level. The system uses 40,960 LX2 processors, each containing 304 ARMv9 cores running at 1.55 GHz, for a total of 13.79 million cores distributed across 20,480 compute nodes. The nodes are linked by a proprietary interconnect called LingQi, developed in-house to replace the InfiniBand and Ethernet technologies that dominate Western supercomputers, and the system runs the Chinese-developed Kylin operating system. Power consumption is substantial at 42.2 megawatts, placing LineShine among the most energy-intensive supercomputers ever built, though its performance per watt is competitive given the all-CPU design. The system occupies 92 cabinets at the Shenzhen facility. Notably, LineShine also achieved the top position on the HPCG benchmark at 22.00 petaflops, demonstrating strong performance on memory-intensive workloads that better reflect real-world scientific computing. However, on mixed-precision AI benchmarks it placed fourth at 7.92 exaflops â€” the trade-off for a design that deliberately omits the tensor cores and GPU accelerators that dominate rival systems.

## Global Supercomputing Race

Every other exascale system in the world relies on US-designed GPU accelerators that are subject to strict export controls. The American El Capitan, now ranked second, uses AMD MI-series accelerators. Frontier, the former number one, uses AMD MI250X GPUs. Fugaku in Japan, though not purely exascale, relies on Fujitsu-designed ARM processors but with significant US-designed components. Europe's Jupiter system, still under construction, will use Intel and NVIDIA hardware. LineShine sidesteps this entire supply chain vulnerability with a CPU-only design that uses no imported silicon anywhere in the architecture. The system demonstrates that China has achieved indigenous capability across the full stack â€” processor design, interconnect technology, operating system, and system integration â€” without relying on any foreign semiconductor technology.

## Geopolitical Implications

LineShine's debut represents a direct rebuttal of the US strategy of containing Chinese technological development through export controls on advanced semiconductors and chip-making equipment. The message is unambiguous: China built a machine that does not need the chips it cannot buy. The system's existence suggests that Chinese semiconductor designers have made significant progress in developing high-core-count server processors that can compete with Western designs in specific high-performance computing niches, even if they lag in general-purpose performance. For US policymakers, LineShine raises uncomfortable questions about the effectiveness of export controls that have restricted sales of NVIDIA and AMD chips to China while simultaneously accelerating Chinese investment in indigenous alternatives. LineShine is the sound of a country proving it can compute without permission.
