import { StaticImageData } from "next/image";

export default function Hero({
  children,
  backgroundImage,
}: {
  children: React.ReactNode;
  backgroundImage?: StaticImageData;
}) {
  return (
    <div
      className="hero bg-base-200 min-h-screen bg-cover bg-center"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage.src})` }
          : undefined
      }
    >
      <div className={`hero-overlay ${backgroundImage ? "" : "hidden"}`} />
      <div className="hero-content w-full max-w-4xl">{children}</div>
    </div>
  );
}
