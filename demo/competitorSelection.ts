import { XRay } from "../xray/index.js";

import { inMemoryStore } from "../xray/store/InMemoryStore.js";


// ---------------- INPUT ----------------
const sellerProduct = {
  asin: "B0SELLER01",
  title: "Stainless Steel Water Bottle 32oz Insulated",
  category: "Sports & Outdoors",
  price: 29.99,
  rating: 4.2,
  reviews: 1247,
};

// ---------------- START TRACE ----------------
const trace = XRay.startTrace("competitor_selection", {
  sellerAsin: sellerProduct.asin,
});

// ---------------- STEP 1: KEYWORD GEN ----------------
const keywordStep = trace.startStep("keyword_generation", {
  title: sellerProduct.title,
  category: sellerProduct.category,
});

const keywords = [
  "stainless steel water bottle insulated",
  "vacuum insulated bottle 32oz",
];

keywordStep.complete(
  { keywords, model: "mock-gpt-4" },
  "Extracted material, capacity, and insulation features"
);

// ---------------- STEP 2: SEARCH ----------------
const searchStep = trace.startStep("candidate_search", {
  keyword: keywords[0],
});

const candidates = [
  { asin: "B0COMP01", title: "HydroFlask 32oz", price: 44.99, rating: 4.5, reviews: 8932 },
  { asin: "B0COMP02", title: "Yeti Rambler 26oz", price: 34.99, rating: 4.4, reviews: 5621 },
  { asin: "B0COMP03", title: "Generic Bottle", price: 8.99, rating: 3.2, reviews: 45 },
];

searchStep.complete(
  { fetched: candidates.length, candidates },
  "Fetched top results by keyword relevance"
);

// ---------------- STEP 3: FILTER ----------------
const filterStep = trace.startStep("apply_filters", {
  referenceProduct: sellerProduct,
});

filterStep.addRule("price_range", { min: 15, max: 60 });
filterStep.addRule("min_rating", { value: 3.8 });
filterStep.addRule("min_reviews", { value: 100 });

for (const c of candidates) {
  filterStep.evaluate(
    c.asin,
    { price: c.price, rating: c.rating, reviews: c.reviews },
    {
      price_range: {
        passed: c.price >= 15 && c.price <= 60,
        reason: `${c.price} within 15–60`,
      },
      min_rating: {
        passed: c.rating >= 3.8,
        reason: `${c.rating} >= 3.8`,
      },
      min_reviews: {
        passed: c.reviews >= 100,
        reason: `${c.reviews} >= 100`,
      },
    }
  );
}

filterStep.complete(
  { evaluated: candidates.length },
  "Applied price, rating, and review filters"
);

// ---------------- END TRACE ----------------
trace.end();

// ---------------- PRINT TRACE ----------------
console.log(
  JSON.stringify(inMemoryStore.getAll(), null, 2)
);
