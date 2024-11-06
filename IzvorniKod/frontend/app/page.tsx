import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative w-full h-screen xl:overflow-hidden bg-black flex flex-col xl:flex-row items-start justify-start">
      <div className="w-full flex h-[40vh] flex-col items-center justify-center max-xl:space-y-20 xl:w-3/5 relative lg:w-1/2 xl:h-full xl:block">
        <Image
          src="/main-image-gym.webp"
          alt="Gym interior with equipment"
          priority
          quality={85}
          fill
          sizes="(max-width: 1280px) 100vw, 60vw"
          className="w-full h-[40vh] xl:h-screen object-cover block"
        />
      </div>

      <div className="flex flex-col items-center justify-center max-xl:pt-[4rem] max-xl:pb-[15vh] xl:h-screen overflow-auto w-full 2xl:w-2/5 xl:w-2/5 lg:w-1/2 md:w-full bg-black px-8 sm:px-24 xl:px-28 2xl:px-[10%] relative">
        <Image
          src="/logo.png"
          alt="Gym Progress Tracking Logo"
          width={480}
          height={120}
          priority
          className="w-full max-w-[30rem] object-contain mb-14"
        />

        <h1 className="text-4xl font-black text-center mb-8 text-white">
          App for tracking gym progress
        </h1>
        <p className="text-gray-300 text-sm mb-6">
          Track your gym progress with ease.
        </p>

        <Link
          href="/sign-up"
          className="bg-white flex space-x-5 font-semibold items-center justify-center py-3 px-6 rounded-sm text-black-foreground shadow hover:bg-white/90"
        >
          <span>Go to the app</span>
          <ArrowRight />
        </Link>
      </div>
    </main>
  );
}
