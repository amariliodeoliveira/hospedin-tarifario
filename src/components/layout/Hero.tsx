import { StaticImageData } from "next/image";

interface Props {
  children: React.ReactNode;
  backgroundImage?: StaticImageData;
}

export default function Hero({ children, backgroundImage }: Props) {
  return (
    <div
      className="hero bg-base-200 min-h-screen bg-cover bg-center"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage.src})` }
          : undefined
      }
    >
      {backgroundImage && <div className="hero-overlay" />}
      <div className="hero-content w-full max-w-4xl">{children}</div>
    </div>
  );
}
