import dealsJson from "../data/deals.json";

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getVerifiedDate(index) {
  const date = new Date("2026-07-18T12:00:00Z");
  date.setDate(date.getDate() - (index % 6));
  return date.toISOString().split("T")[0];
}

export const deals = dealsJson.map((deal, index) => ({
  ...deal,
  slug: slugify(deal.title),
  storeSlug: slugify(deal.store),
  lastVerified: deal.lastVerified || getVerifiedDate(index),
}));

export const categories = [
  "Electronics",
  "Home & Kitchen",
  "Fashion",
  "Travel",
  "Health & Beauty",
  "Software & Apps",
  "Sports & Outdoors",
  "Toys & Games",
];

const STORE_METADATA = {
  Amazon: {
    logo: "📦",
    description:
      "Amazon offers fast shipping and a huge selection of everyday essentials, gadgets, and home favorites.",
  },
  "Best Buy": {
    logo: "🛍️",
    description:
      "Best Buy is a go-to for consumer electronics, gaming gear, and smart home tech.",
  },
  Target: {
    logo: "🎯",
    description:
      "Target combines style, home, and family essentials into one convenient shopping destination.",
  },
  Wayfair: {
    logo: "🪑",
    description:
      "Wayfair makes it easy to refresh your home with furniture, décor, and household essentials.",
  },
  Nordstrom: {
    logo: "👞",
    description:
      "Nordstrom is known for designer style, quality fashion staples, and elevated everyday essentials.",
  },
  "Macy's": {
    logo: "🧥",
    description:
      "Macy's brings classic fashion, seasonal style, and home-ready staples to shoppers nationwide.",
  },
  Expedia: {
    logo: "✈️",
    description:
      "Expedia helps travelers compare flights, hotels, and vacation packages for better value.",
  },
  "Booking.com": {
    logo: "🏨",
    description:
      "Booking.com makes it easy to compare hotels, resorts, and flexible stay options.",
  },
  Sephora: {
    logo: "💄",
    description:
      "Sephora delivers beauty favorites, skincare essentials, and prestige makeup at a great value.",
  },
  Ulta: {
    logo: "✨",
    description:
      "Ulta offers makeup, haircare, skincare, and wellness products from top beauty brands.",
  },
  NortonLifeLock: {
    logo: "🛡️",
    description:
      "NortonLifeLock provides trusted digital security tools for home, work, and personal devices.",
  },
  pCloud: {
    logo: "☁️",
    description:
      "pCloud offers secure cloud storage with simple backup and sharing features for everyday users.",
  },
  Skylum: {
    logo: "🖼️",
    description:
      "Skylum makes photo editing accessible with creative tools that work for beginners and pros alike.",
  },
  "Dick's Sporting Goods": {
    logo: "🏀",
    description:
      "Dick's Sporting Goods carries performance gear, activewear, and fitness essentials for every season.",
  },
};

export function getDealBySlug(slug) {
  return deals.find((deal) => deal.slug === slug) || null;
}

export function getDealsForCategory(category) {
  return deals.filter((deal) => deal.category === category);
}

export function getStoreDeals(storeSlug) {
  const storeName = Object.keys(STORE_METADATA).find(
    (name) => slugify(name) === storeSlug
  );

  if (!storeName) {
    return [];
  }

  return deals
    .filter((deal) => deal.store === storeName)
    .sort((a, b) => b.discount - a.discount || a.title.localeCompare(b.title));
}

export function getStoreMetadata(storeName) {
  return (
    STORE_METADATA[storeName] || {
      logo: "🏷️",
      description:
        "This retailer is featured on DealsForte for hand-picked savings and limited-time offers.",
    }
  );
}

export function getRelatedDeals(currentDeal, limit = 4) {
  return deals
    .filter((deal) => deal.category === currentDeal.category && deal.id !== currentDeal.id)
    .slice(0, limit);
}

export function getCategorySlug(category) {
  return slugify(category);
}

export function getCategoryTitle(slug) {
  return categories.find((category) => getCategorySlug(category) === slug) || "Deals";
}

export function getAllStoreSlugs() {
  return Array.from(new Set(deals.map((deal) => slugify(deal.store))));
}

export function getAllStoreNames() {
  return Array.from(new Set(deals.map((deal) => deal.store))); 
}
