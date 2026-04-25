import HeroBg from "@img/hero-bg.jpeg";

import Hero from "@/components/Hero";
import HeroCard from "@/components/layout/HeroCard";

export default function Home() {
  return (
    <main>
      <Hero backgroundImage={HeroBg}>
        <HeroCard />
      </Hero>
    </main>
  );
}
