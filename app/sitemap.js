const BASE_URL = "https://dealsforte.com";

export default function sitemap() {
  const lastModified = new Date();

  const routes = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    {
      path: "/affiliate-disclosure",
      priority: 0.3,
      changeFrequency: "yearly",
    },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
