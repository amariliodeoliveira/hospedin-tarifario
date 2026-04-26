import HeroBg from "@img/hero-bg.jpeg";
import Hero from "@layout/Hero";
import HeroCard from "@layout/HeroCard";

export default function Home() {
  return (
    <main>
      <Hero backgroundImage={HeroBg}>
        <HeroCard />
      </Hero>
    </main>
  );
}
