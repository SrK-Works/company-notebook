/* Verified annual disclosures; keep basis and profit measures with each record. */
window.COMPANY_FINANCIALS = {
  "hindustan-unilever": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Consolidated",
    "coverage": "Reported business segments",
    "unit": "₹ crore",
    "profitMetric": "Segment result",
    "definition": "Profit before other income, finance costs, exceptional items and tax. This is not profit after tax.",
    "rows": [
      {
        "name": "Home Care",
        "revenue": 23672,
        "profit": 4521
      },
      {
        "name": "Beauty & Wellbeing",
        "revenue": 14990,
        "profit": 4161
      },
      {
        "name": "Personal Care",
        "revenue": 9564,
        "profit": 1805
      },
      {
        "name": "Foods",
        "revenue": 14061,
        "profit": 2824
      },
      {
        "name": "Others, including exports",
        "revenue": 2181,
        "profit": 410
      }
    ],
    "source": "https://www.hul.co.in/files/annual-report-2025-26-single-page.pdf",
    "sourceLabel": "Official financial disclosure",
    "location": "PDF page 453 · printed page 451",
    "checked": "29 October 2026",
    "notes": "Continuing operations only. Discontinued ice-cream operations are excluded. The source states there are no inter-segment transactions.",
    "insight": "Home Care has the most revenue and the largest segment result. Beauty & Wellbeing earns almost as much segment profit on substantially lower revenue.",
    "revenueTotal": 64468,
    "profitTotal": 13721,
    "status": "segments"
  },
  "itc": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Standalone · parent company",
    "coverage": "Reported business segments",
    "unit": "₹ crore",
    "profitMetric": "Segment result (PBIT)",
    "definition": "Reported segment profit before interest and tax; finance costs, unallocated items and exceptional items reconcile this to company profit before tax.",
    "rows": [
      {
        "name": "FMCG – Cigarettes",
        "revenue": 37100,
        "profit": 21051
      },
      {
        "name": "FMCG – Other products",
        "revenue": 24210,
        "profit": 1803
      },
      {
        "name": "Agri Business",
        "revenue": 20296,
        "profit": 1496
      },
      {
        "name": "Paperboards, Paper & Packaging",
        "revenue": 8766,
        "profit": 797
      },
      {
        "name": "Other businesses",
        "revenue": 342,
        "profit": -8
      }
    ],
    "source": "https://itcportal.com/content/dam/itc-corporate/pdfs/financial-result/quarterly-results-2025-2026/march-2026/ITC-Quarterly-Result-Presentation-Q4-FY2026.pdf",
    "sourceLabel": "Official financial disclosure",
    "location": "Presentation page 34",
    "checked": "29 October 2026",
    "notes": "Parent company only, not all group subsidiaries. Segment revenue includes internal sales: ₹9,846 crore is deducted from ₹90,713 crore to reach ₹80,867 crore gross revenue. Cigarette tax changes affect comparability. Individually rounded revenue rows differ from the reported total by ₹1 crore.",
    "insight": "Cigarettes account for much more of segment earnings than their share of segment sales. Familiar food brands sit within FMCG – Other products, whose profit is much smaller.",
    "roundingTolerance": 1.01,
    "revenueTotal": 90713,
    "profitTotal": 25139,
    "revenueTotalLabel": "Segment revenue before internal-sales deduction",
    "status": "segments"
  },
  "reliance-industries": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Consolidated",
    "coverage": "Selected business highlights",
    "unit": "₹ crore",
    "profitMetric": "EBITDA",
    "definition": "Earnings before interest, tax, depreciation and amortisation. It excludes several costs that reduce net profit and is not cash flow.",
    "rows": [
      {
        "name": "Retail",
        "revenue": 371085,
        "profit": 27034
      },
      {
        "name": "Digital Services",
        "revenue": 176164,
        "profit": 76560
      },
      {
        "name": "Media & Entertainment",
        "revenue": 40682,
        "profit": 5842
      },
      {
        "name": "Oil to Chemicals",
        "revenue": 662401,
        "profit": 60546
      },
      {
        "name": "Oil & Gas",
        "revenue": 23861,
        "profit": 19050
      }
    ],
    "source": "https://www.ril.com/ar2025-26/index.html",
    "sourceLabel": "Official financial disclosure",
    "location": "Business overview · individual business highlights",
    "checked": "29 October 2026",
    "notes": "Selected business highlights, not a reconciliation to group revenue or net profit. Retail uses the report’s value-of-sales revenue presentation. Inter-business transactions and other activities prevent treating these rows as shares of consolidated revenue.",
    "insight": "Oil to Chemicals has the largest reported revenue here, while Digital Services has the largest EBITDA. Sales leadership and earnings leadership are different.",
    "status": "segments"
  },
  "mahindra-and-mahindra": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Consolidated",
    "coverage": "Reported business segments",
    "unit": "₹ crore",
    "profitMetric": "Segment result",
    "definition": "Results after exceptional items and share of profit or loss of associates and joint ventures, before the remaining group-level reconciliation to profit before tax.",
    "rows": [
      {
        "name": "Automotive",
        "revenue": 117834.13,
        "profit": 10383.47
      },
      {
        "name": "Farm Equipment",
        "revenue": 42568.39,
        "profit": 5516.9
      },
      {
        "name": "Financial Services",
        "revenue": 20949.32,
        "profit": 3778.53
      },
      {
        "name": "Industrial Businesses & Consumer Services",
        "revenue": 22748.93,
        "profit": 3704.64
      }
    ],
    "source": "https://www.mahindra.com/sites/default/files/2026-05/Quarterly%20Result%20for%20Q4F26.pdf",
    "sourceLabel": "Official financial disclosure",
    "location": "PDF page 2 · consolidated segment information, section C",
    "checked": "29 October 2026",
    "notes": "₹5,462.22 crore of inter-segment revenue is deducted from ₹2,04,100.77 crore to reach ₹1,98,638.55 crore income from operations. Finance costs outside Financial Services and unallocated income further change group profit.",
    "insight": "Automotive is the largest revenue and segment-result contributor. Farm Equipment is smaller by sales but remains a substantial earnings contributor.",
    "revenueTotal": 204100.77,
    "profitTotal": 23383.54,
    "status": "segments"
  },
  "larsen-and-toubro": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Consolidated",
    "coverage": "Reported business segments",
    "unit": "₹ crore",
    "profitMetric": "Segment result",
    "definition": "Reported segment results before inter-segment margin adjustments, remaining finance costs, unallocated income, exceptional items and tax.",
    "rows": [
      {
        "name": "Infrastructure Projects",
        "revenue": 135344.58,
        "profit": 7759.98
      },
      {
        "name": "Energy Projects",
        "revenue": 54888.59,
        "profit": 3374.38
      },
      {
        "name": "Hi-Tech Manufacturing",
        "revenue": 14488.79,
        "profit": 2105.13
      },
      {
        "name": "IT & Technology Services",
        "revenue": 53946.53,
        "profit": 8633.94
      },
      {
        "name": "Financial Services",
        "revenue": 17283.43,
        "profit": 4032.05
      },
      {
        "name": "Development Projects",
        "revenue": 5118.51,
        "profit": 538.95
      },
      {
        "name": "Others",
        "revenue": 7978.01,
        "profit": 2085.7
      }
    ],
    "source": "https://investors.larsentoubro.com/upload/Quarterly/FY2026QuarterlyLTResultMarch2026.pdf",
    "sourceLabel": "Official financial disclosure",
    "location": "Audited consolidated segment-wise revenue and results",
    "checked": "29 October 2026",
    "notes": "Segment revenue of ₹2,89,048.44 crore includes ₹3,174.08 crore internal sales, leaving ₹2,85,874.36 crore net revenue. Financial Services has its own funding costs within its reported economics.",
    "insight": "Infrastructure is the largest business by revenue. IT & Technology Services contributes the largest segment result in this table, despite lower revenue.",
    "revenueTotal": 289048.44,
    "profitTotal": 28530.13,
    "status": "segments"
  },
  "infosys": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Consolidated",
    "coverage": "Reported business segments",
    "unit": "₹ crore",
    "profitMetric": "Segment operating income",
    "definition": "Operating income allocated to the reported customer-industry segments, before the reconciliation to overall company profit. It is not net profit.",
    "rows": [
      {
        "name": "Financial Services",
        "revenue": 49908,
        "profit": 12678
      },
      {
        "name": "Manufacturing",
        "revenue": 29078,
        "profit": 6444
      },
      {
        "name": "Energy, Utilities, Resources & Services",
        "revenue": 23818,
        "profit": 5984
      },
      {
        "name": "Retail",
        "revenue": 23077,
        "profit": 7089
      },
      {
        "name": "Communication",
        "revenue": 21765,
        "profit": 3861
      },
      {
        "name": "Hi-Tech",
        "revenue": 13928,
        "profit": 3228
      },
      {
        "name": "Life Sciences",
        "revenue": 12267,
        "profit": 2444
      },
      {
        "name": "All other segments",
        "revenue": 4809,
        "profit": 717
      }
    ],
    "source": "https://www.infosys.com/investors/reports-filings/annual-report/annual/documents/2025-26/managements-discussion-and-analysis.pdf",
    "sourceLabel": "Official financial disclosure",
    "location": "PDF page 6 · printed page 111",
    "checked": "29 October 2026",
    "notes": "Segments group customer industries, not individual Infosys products such as Topaz or Cobalt. Segment operating income is not the same as consolidated profit after tax.",
    "insight": "Financial Services is the largest contributor to both revenue and segment operating income. Retail earns more segment operating income than Manufacturing despite lower sales.",
    "revenueTotal": 178650,
    "profitTotal": 42445,
    "status": "segments"
  },
  "titan-company": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Consolidated",
    "coverage": "Reported business segments",
    "unit": "₹ crore",
    "profitMetric": "Segment profit / loss",
    "definition": "Profit or loss before finance costs, exceptional items and tax, including the source’s corporate unallocated line.",
    "rows": [
      {
        "name": "Watches",
        "revenue": 5267,
        "profit": 824
      },
      {
        "name": "Jewellery",
        "revenue": 79660,
        "profit": 7209
      },
      {
        "name": "Eyecare",
        "revenue": 916,
        "profit": 77
      },
      {
        "name": "Others",
        "revenue": 2006,
        "profit": 173
      },
      {
        "name": "Corporate, unallocated",
        "revenue": 287,
        "profit": -201
      }
    ],
    "source": "https://www.titancompany.in/sites/default/files/2026-05/Q4FY26%20-%20Financial%20results%20Uploaded_0.pdf",
    "sourceLabel": "Official financial disclosure",
    "location": "Consolidated segment information · year ended 31 March 2026",
    "checked": "29 October 2026",
    "notes": "Revenue includes other income and jewellery bullion and digi-gold sales. These figures therefore differ from the headline sales presentation that excludes bullion and digi-gold.",
    "insight": "Jewellery dominates both revenue and segment profit. Watches contribute a smaller sales base but meaningful profit; corporate costs reduce the combined result.",
    "revenueTotal": 88136,
    "profitTotal": 8082,
    "status": "segments"
  },
  "swiggy": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Consolidated",
    "coverage": "Reported business segments",
    "unit": "₹ crore",
    "profitMetric": "Segment result",
    "definition": "The financial statement’s segment result, before other income, share-based payments, finance costs, depreciation, exceptional items, associate losses and tax. It differs from adjusted EBITDA.",
    "rows": [
      {
        "name": "Food Delivery",
        "revenue": 7832,
        "profit": 1041
      },
      {
        "name": "Out-of-Home Consumption",
        "revenue": 375,
        "profit": 29
      },
      {
        "name": "Quick Commerce",
        "revenue": 3859,
        "profit": -3063
      },
      {
        "name": "Supply Chain & Distribution",
        "revenue": 10935,
        "profit": -77
      },
      {
        "name": "Platform Innovations",
        "revenue": 52,
        "profit": -195
      }
    ],
    "source": "https://www.swiggy.com/corporate/wp-content/uploads/2026/05/Q4-FY2026-Shareholder-letter.pdf",
    "sourceLabel": "Official financial disclosure",
    "location": "PDF page 33 · consolidated segment information",
    "checked": "29 October 2026",
    "notes": "Uses revenue after inter-segment adjustments from the financial statements, not adjusted revenue or gross order value. Source rows sum to ₹23,053 crore; rounded shareholder-letter highlights may differ by ₹1 crore.",
    "insight": "Supply Chain & Distribution has the most reported revenue, but Food Delivery has the largest positive segment result. Quick Commerce losses outweigh the positive results of Food Delivery and dining-out.",
    "revenueTotal": 23053,
    "profitTotal": -2265,
    "status": "segments"
  },
  "marico": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Consolidated",
    "coverage": "Reported business segments",
    "unit": "₹ crore",
    "profitMetric": "Segment result (PBIT)",
    "definition": "Profit before tax and interest as reported for India and International; unallocated costs still reduce company profit.",
    "rows": [
      {
        "name": "India",
        "revenue": 10348,
        "profit": 1661
      },
      {
        "name": "International",
        "revenue": 3263,
        "profit": 813
      }
    ],
    "source": "https://marico.com/investorspdf/Board_Meeting_Update_May_5_2026.pdf",
    "sourceLabel": "Official financial disclosure",
    "location": "PDF page 13 · consolidated segment information",
    "checked": "29 October 2026",
    "notes": "₹2,474 crore segment result is reduced by ₹53 crore finance costs and ₹144 crore net unallocated expenditure to ₹2,277 crore profit before tax. The split is geographical, not individual brands.",
    "insight": "India produces most sales and segment earnings. International has less revenue but a higher result relative to its sales.",
    "revenueTotal": 13611,
    "profitTotal": 2474,
    "status": "segments",
    "productRevenue": {
      "basis": "Consolidated · revenue by major product category",
      "unit": "₹ crore",
      "period": "FY 2025–26 · year ended 31 March 2026",
      "rows": [
        {
          "name": "Edible Oils",
          "revenue": 7049
        },
        {
          "name": "Hair oils",
          "revenue": 2624
        },
        {
          "name": "Personal care",
          "revenue": 2020
        },
        {
          "name": "Others",
          "revenue": 1918
        }
      ],
      "total": 13611,
      "source": "https://marico.com/investorspdf/Marico_Annual_Report_FY26.pdf",
      "location": "Consolidated Note 30 · PDF page 219 · printed pages 434–435",
      "checked": "29 October 2026",
      "financeCosts": 53,
      "unallocatedNetExpense": 144,
      "pbt": 2277,
      "tax": 464,
      "groupPat": 1813,
      "nonControlling": 51,
      "ownersPat": 1762
    }
  },
  "park-medi-world": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Consolidated",
    "coverage": "Single reported segment · company totals",
    "unit": "₹ crore",
    "profitMetric": "Profit after tax",
    "definition": "Whole-group net profit after tax, including the part attributable to non-controlling interests.",
    "rows": [
      {
        "name": "Healthcare business · whole group",
        "revenue": 1679.356,
        "profit": 273.557
      }
    ],
    "source": "https://www.parkhospital.in/public/uploads/financial-annual-report/Annual%20Report%202025-2026.pdf",
    "sourceLabel": "Official financial disclosure",
    "location": "PDF pages 180 and 196 · printed page 201 and segment policy",
    "checked": "29 October 2026",
    "notes": "The group reports one healthcare segment. No specialty-by-specialty profit allocation is provided here. Source amounts are ₹ million and are divided by 10 to display ₹ crore.",
    "insight": "Hospital services are reported as one segment. These totals cannot establish whether heart care, cancer care or a particular hospital makes the most profit.",
    "status": "single",
    "revenueTotal": 1679.356,
    "profitTotal": 273.557
  },
  "glass-wall-systems": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Standalone · parent company",
    "coverage": "Company totals only · no verified product split",
    "unit": "₹ crore",
    "profitMetric": "Profit after tax",
    "definition": "Net profit of the parent company after finance costs, depreciation and tax.",
    "rows": [
      {
        "name": "Whole parent company",
        "revenue": 430.019,
        "profit": 75.895
      }
    ],
    "source": "https://www.glasswallsystems.in/ipo-docs/70768f2eb63447c19e077624facbc935.pdf",
    "sourceLabel": "Official financial disclosure",
    "location": "PDF page 14 · standalone statement of profit and loss",
    "checked": "29 October 2026",
    "notes": "Source amounts are ₹ million, converted to ₹ crore by dividing by 10. A product- or service-level profit split has not been verified; the single row is a company total.",
    "insight": "The verified total shows the parent company is profitable for this year. It does not tell us the separate earnings from curtain walls, louvers, engineering or installation.",
    "status": "totals",
    "revenueTotal": 430.019,
    "profitTotal": 75.895
  },
  "kanohar-electricals": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Company financial statements",
    "coverage": "Company totals only · no verified business split",
    "unit": "₹ crore",
    "profitMetric": "Profit after tax",
    "definition": "Net profit after finance costs, depreciation and tax for the company financial statements shown.",
    "rows": [
      {
        "name": "Whole company",
        "revenue": 653.8384,
        "profit": 129.6368
      }
    ],
    "source": "https://www.kanohar.com/Asset/newkanweb/Audited_Fiancial_Statements_25-26.pdf",
    "sourceLabel": "Official financial disclosure",
    "location": "PDF page 16 · statement of profit and loss",
    "checked": "29 October 2026",
    "notes": "Source amounts are ₹ lakh, converted to ₹ crore by dividing by 100. Product-level or EPC-versus-equipment profit allocations have not been verified. Figures include the joint operation on the basis described by the report.",
    "insight": "These totals show overall revenue and net profit. They cannot establish whether transformers, switchgear or construction contracts are the most profitable activity.",
    "status": "totals",
    "revenueTotal": 653.8384,
    "profitTotal": 129.6368
  },
  "eternal": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Consolidated",
    "coverage": "Reported business segments",
    "unit": "₹ crore",
    "profitMetric": "Segment result",
    "definition": "Reported segment result before other income, share-based payments, finance costs, depreciation, exceptional items and tax. This differs from adjusted EBITDA.",
    "rows": [
      {
        "name": "India food ordering & delivery",
        "revenue": 10159,
        "profit": 2079
      },
      {
        "name": "Hyperpure supplies",
        "revenue": 5366,
        "profit": 16
      },
      {
        "name": "Quick Commerce",
        "revenue": 37779,
        "profit": 430
      },
      {
        "name": "Going Out",
        "revenue": 973,
        "profit": -292
      },
      {
        "name": "Other segments",
        "revenue": 87,
        "profit": -206
      }
    ],
    "source": "https://drive.google.com/file/d/1mz_hG7RPsvni3KAPKubphgQmuq0WiTS-/view",
    "sourceLabel": "Official financial disclosure",
    "location": "PDF page 34 · consolidated segment information; linked from Eternal’s Q4FY26 results announcement",
    "checked": "29 October 2026",
    "notes": "Revenue is from external customers, excluding internal transactions. Quick Commerce revenue includes full goods sales after its inventory-model change; it is not directly comparable with marketplace commission revenue. Segment results are not group net profit.",
    "insight": "Quick Commerce has the largest revenue, but India food delivery contributes the largest segment result. Going Out and Other segments report losses.",
    "revenueTotal": 54364,
    "profitTotal": 2027,
    "announcement": "https://www.eternal.com/blog/q4fy26/",
    "status": "segments"
  },
  "tcs": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Consolidated",
    "coverage": "Reported business segments",
    "unit": "₹ crore",
    "profitMetric": "Reported segment margin",
    "definition": "Segment earnings expressed as a percentage of segment revenue. These are the report’s rounded margins, not net-profit margins.",
    "rows": [
      {
        "name": "Banking, Financial Services & Insurance",
        "revenue": 103363,
        "profit": null,
        "margin": 26.1
      },
      {
        "name": "Consumer Business",
        "revenue": 42432,
        "profit": null,
        "margin": 28.5
      },
      {
        "name": "Communication, Media & Technology",
        "revenue": 39474,
        "profit": null,
        "margin": 29.1
      },
      {
        "name": "Life Sciences & Healthcare",
        "revenue": 27745,
        "profit": null,
        "margin": 27
      },
      {
        "name": "Manufacturing",
        "revenue": 26614,
        "profit": null,
        "margin": 30.3
      },
      {
        "name": "Others",
        "revenue": 27393,
        "profit": null,
        "margin": 22.9
      }
    ],
    "source": "https://www.tcs.com/content/dam/tcs/investor-relations/financial-statements/2025-26/ar/annual-report-2025-2026.pdf",
    "sourceLabel": "Official financial disclosure",
    "location": "Printed page 89 · management discussion, industry-vertical table",
    "checked": "29 October 2026",
    "notes": "Revenue is grouped by customer industry. Only reported margin percentages are shown; profit amounts are not reverse-calculated from rounded percentages. The total margin may include additional common costs.",
    "insight": "Banking, Financial Services & Insurance is the largest revenue source. Manufacturing has the highest reported segment margin in this table, but that does not make it the biggest profit contributor.",
    "profitKind": "margin",
    "revenueTotal": 267021,
    "status": "segments"
  },
  "nestle-india": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Standalone · Nestlé India Limited",
    "coverage": "One operating segment: Food · company profit only",
    "unit": "₹ crore",
    "profitMetric": "Profit after tax",
    "definition": "Company profit for the period after expenses, exceptional items and tax. This is not a separate profit for each product group or brand.",
    "rows": [
      {
        "name": "Nestlé India · whole company",
        "revenue": 23154.6,
        "profit": 3544.6
      }
    ],
    "source": "https://www.nestle.in/sites/g/files/pydnoa451/files/2026-04/AFRs31032026signed.pdf",
    "sourceLabel": "Official audited annual results",
    "location": "Standalone annual results · year ended 31 March 2026; cross-checked with official Key Financial Figures",
    "checked": "29 October 2026",
    "notes": "Amounts converted from ₹ million by dividing by 10. Revenue from operations includes sale of products and other operating revenue. Annual report Note 42 reports one Food operating segment; the cited disclosure does not give separate profits for the four product groups. Figures are historical annual results, not the latest quarter.",
    "insight": "Use the product-sales table below to see where sales come from. The profit figure above belongs to Nestlé India as a whole; it is not a separate result for each product group or brand.",
    "status": "single",
    "productSales": {
      "basis": "Standalone · sale of products",
      "unit": "₹ crore",
      "rows": [
        {
          "name": "Milk Products and Nutrition",
          "revenue": 7716.77
        },
        {
          "name": "Prepared Dishes and Cooking Aids",
          "revenue": 7274.01
        },
        {
          "name": "Powdered and Liquid Beverages",
          "revenue": 3638.12
        },
        {
          "name": "Confectionery",
          "revenue": 4442.56
        }
      ],
      "total": 23071.46,
      "otherOperatingRevenue": 83.14,
      "source": "https://www.nestle.in/sites/g/files/pydnoa451/files/2026-06/AnnualReport2025-26andAGMNotice.pdf",
      "location": "Note 24 · Class-Wise Details of Sales of Products; Note 42 · Segment Reporting · standalone financial statements",
      "checked": "29 October 2026"
    }
  },
  "britannia": {
    "period": "FY 2025–26 · year ended 31 March 2026",
    "basis": "Consolidated · Britannia group",
    "coverage": "One operating segment: Foods · group profit only",
    "unit": "₹ crore",
    "profitMetric": "Profit after tax attributable to owners",
    "definition": "Consolidated profit after expenses, equity-accounted results and tax, attributable to owners of Britannia. Excludes non-controlling interests. Not a separate brand or category profit.",
    "rows": [
      {
        "name": "Britannia · whole group",
        "revenue": 19151.59,
        "profit": 2533.49
      }
    ],
    "source": "https://media.britannia.co.in/Britannia_Annual_Report_2025_26_High_Resolution_c738982760.pdf",
    "sourceLabel": "Official FY 2025–26 annual report",
    "location": "PDF page 132 · printed page 261 · consolidated statement of profit and loss; Note 43 · printed page 309",
    "checked": "29 October 2026",
    "notes": "Source amounts already in ₹ crore. Group profit after tax is ₹2,537.01 crore, including ₹3.52 crore attributable to non-controlling interests; owners’ profit is ₹2,533.49 crore. Note 43 reports one Foods segment, not separate category profits. Joint ventures use the equity method. Historical annual figures, not the latest quarter.",
    "insight": "Read this as the result of the consolidated food group. The approximate product mix below shows the importance of bakery and salted snacks, but does not reveal which brand earns the most profit.",
    "status": "single",
    "context": {
      "goods": 18858.21,
      "otherOperating": 293.38,
      "groupPat": 2537.01,
      "nonControlling": 3.52,
      "turnoverMix": [
        {
          "name": "Bakery products and salted snacks",
          "share": 97
        },
        {
          "name": "Dairy products",
          "share": 3
        }
      ],
      "geographies": [
        {
          "name": "India",
          "revenue": 18043.67
        },
        {
          "name": "Outside India",
          "revenue": 1107.92
        }
      ],
      "jointVenture": {
        "name": "Britannia Bel Foods Private Limited",
        "loss": 59.93,
        "interest": 51,
        "shareOfLoss": 30.57
      },
      "locations": {
        "mix": "BRSR items 13 and 17 · printed pages 107–108",
        "geography": "Consolidated Note 43 · printed page 309",
        "jv": "Consolidated Notes 7 and 45 · printed pages 284 and 313",
        "sales": "Consolidated Notes 29 and 53 · printed pages 301 and 332"
      }
    }
  }
};
