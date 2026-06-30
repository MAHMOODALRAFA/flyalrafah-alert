import Image from "next/image";
import SubscribeForm from "./SubscribeForm";

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#060914] text-white px-6 py-10">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center text-center">
        <Image
          src="/logos/flyalrafah-logo.png"
          alt="FlyAlrafah"
          width={150}
          height={150}
          priority
          className="mb-8 drop-shadow-[0_0_20px_rgba(212,168,63,0.25)]"
        />

        <div className="mb-6 inline-flex rounded-full border border-[#D4A83F]/30 px-4 py-2 text-sm text-[#D4A83F]">
          FlyAlrafah Alert
        </div>

        <h1 className="text-5xl font-extrabold leading-tight">
          أفضل عروض الرحلات
          <br />
          <span className="text-[#D4A83F]">إلى إيران</span>
        </h1>

        <p className="mt-6 text-lg leading-9 text-gray-300">
          اشترك مجانًا وخلك أول شخص يعرف عن تخفيضات الرحلات قبل الجميع.
        </p>

        <SubscribeForm />
      </div>
    </section>
  );
}
