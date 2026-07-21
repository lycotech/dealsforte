import { deals, categories, getCategorySlug } from "../lib/deals";

const BASE_URL = "https://dealsforte.com";

const guides = [
  "best-software-apps-deals-this-month",
  "how-to-stack-coupons-for-maximum-savings",
  "fashion-deals-guide-what-to-buy-on-sale-vs-full-price",
];

export default function sitemap() {
  const lastModified = new Date();

  const routes = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/guides", priority: 0.7, changeFrequency: "weekly" },
    { path: "/stores", priority: 0.7, changeFrequency: "weekly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    {
      path: "/affiliate-disclosure",
      priority: 0.3,
      changeFrequency: "yearly",
    },
    ...deals.map((deal) => ({
      path: `/deal/${deal.slug}`,
      priority: 0.9,
      changeFrequency: "weekly",
    })),
    ...Array.from(new Set(deals.map((deal) => deal.storeSlug))).map((storeSlug) => ({
      path: `/store/${storeSlug}`,
      priority: 0.8,
      changeFrequency: "weekly",
    })),
    ...categories.map((category) => ({
      path: `/category/${getCategorySlug(category)}`,
      priority: 0.8,
      changeFrequency: "weekly",
    })),
    ...guides.map((slug) => ({
      path: `/guides/${slug}`,
      priority: 0.7,
      changeFrequency: "monthly",
    })),
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
