import Hero from "@/components/Hero";
import HeroBg from "@img/hero-bg.jpeg";

export default function Home() {
  return (
    <main>
      <Hero backgroundImage={HeroBg}>
        <h1 className="text-5xl font-bold">Welcome to My Next.js App!</h1>
      </Hero>
    </main>
  );
}
