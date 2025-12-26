export const traces = [
  {
    traceId: "1baf0f0e-5305-4e54-9a0c-890adc391d63",
    name: "competitor_selection",
    metadata: { sellerAsin: "B0SELLER01" },
    steps: [
      {
        name: "keyword_generation",
        input: {
          title: "Stainless Steel Water Bottle 32oz Insulated",
          category: "Sports & Outdoors",
        },
        output: {
          keywords: [
            "stainless steel water bottle insulated",
            "vacuum insulated bottle 32oz",
          ],
        },
        reasoning: "Extracted material, capacity, and insulation features",
      },
      {
        name: "candidate_search",
        output: { fetched: 3 },
        reasoning: "Fetched top results by keyword relevance",
      },
      {
        name: "apply_filters",
        rules: {
          price_range: { min: 15, max: 60 },
          min_rating: { value: 3.8 },
          min_reviews: { value: 100 },
        },
        evaluations: [
          {
            subjectId: "B0COMP01",
            qualified: true,
            checks: {
              price_range: { passed: true, reason: "44.99 within range" },
            },
          },
          {
            subjectId: "B0COMP03",
            qualified: false,
            checks: {
              price_range: { passed: false, reason: "8.99 below min" },
            },
          },
        ],
        reasoning: "Applied price, rating, and review filters",
      },
    ],
  },
];
