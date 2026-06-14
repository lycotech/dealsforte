import deals from "../data/deals.json";
import Hero from "../components/Hero";
import DealsSection from "../components/DealsSection";
import Newsletter from "../components/Newsletter";

export default function HomePage() {
  const categoryCount = new Set(deals.map((d) => d.category)).size;

  return (
    <>
      <Hero dealCount={deals.length} categoryCount={categoryCount} />

      <DealsSection deals={deals} />

      <div className="container">
        <div className="ad-slot">Advertisement</div>
      </div>

      <Newsletter />
    </>
  );
}
