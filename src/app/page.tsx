import Hero from "@/components/Hero";
import HeroBg from "@img/hero-bg.jpeg";
import HeroCard from "@/components/HeroCard";

export default function Home() {
  return (
    <main>
      <Hero backgroundImage={HeroBg}>
        <HeroCard />
      </Hero>
    </main>
  );
}
