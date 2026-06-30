import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8 text-center text-white">
      <div className="mx-auto max-w-lg">
        <Image
          src="/logos/flyalrafah-logo.png"
          alt="FlyAlrafah"
          width={90}
          height={90}
          className="mx-auto mb-4"
        />

        <p className="text-sm text-gray-400">
          Powered by FlyAlrafah Travel & Tourism
        </p>

        <div className="mt-4 flex items-center justify-center gap-4 text-sm">
          <a href="https://flyalrafah.com" target="_blank" className="text-[#D4A83F]">
            Website
          </a>
          <a href="https://wa.me/96879328961" target="_blank" className="text-[#D4A83F]">
            WhatsApp
          </a>
        </div>

        <p className="mt-5 text-xs text-gray-500">
          © 2026 FlyAlrafah. All rights reserved.
        </p>
      </div>
    </footer>
  );
}