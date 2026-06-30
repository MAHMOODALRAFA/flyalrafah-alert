export default function ShareSection() {
  const shareText =
    "✈️ اشترك مجانًا في FlyAlrafah Alert واحصل على إشعارات أفضل عروض الرحلات إلى إيران مباشرة على الواتساب: https://alert.flyalrafah.com";

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <section className="mx-auto w-full max-w-lg px-6 pb-24">
      <div className="rounded-3xl border border-[#25D366]/20 bg-[#25D366]/10 p-6 text-center text-white">
        <h2 className="mb-3 text-2xl font-bold">
          شارك FlyAlrafah Alert
        </h2>

        <p className="mb-5 text-sm leading-7 text-gray-300">
          إذا تعرف شخص يسافر إلى إيران باستمرار، أرسل له الصفحة ليستفيد من العروض.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          className="block w-full rounded-2xl bg-[#25D366] px-6 py-4 font-bold text-black transition hover:scale-[1.02]"
        >
          📲 شارك عبر الواتساب
        </a>
      </div>
    </section>
  );
}