import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import Image from "next/image";

export default function ForgotPasswordPage() {
  return (
    <main className="relative w-full xl:h-screen xl:overflow-hidden bg-black flex flex-col xl:flex-row items-start justify-start">
      <div className="w-full flex flex-col items-center justify-center max-xl:space-y-20 xl:w-3/5 relative lg:w-1/2 xl:h-full  xl:block">
        <Image
          src="/main-image-gym.webp"
          alt="Login page image"
          width={4000}
          height={4000}
          className="w-full h-[40vh] xl:h-screen object-cover block"
        />
        <Image
          src="/logo.png"
          alt="Gym Progress Tracking"
          width={400}
          height={400}
          className="w-[20rem] xl:absolute top-16 left-16 object-contain mb-14"
        />
        <div className="absolute top-[20vh] h-[20vh] w-full left-0 xl:top-0 xl:left-[85%] xl:w-[15%] xl:h-full bg-gradient-to-b xl:bg-gradient-to-r from-transparent via-black to-black"></div>
      </div>
      <ForgotPasswordForm />
    </main>
  );
}
