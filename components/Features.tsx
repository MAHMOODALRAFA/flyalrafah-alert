export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "إشعارات فورية",
      description: "توصلك عروض الرحلات مباشرة أول ما تنزل.",
    },
    {
      icon: "💰",
      title: "أفضل الأسعار",
      description: "تابع تخفيضات رحلات إيران قبل الجميع.",
    },
    {
      icon: "✈️",
      title: "حجز مباشر",
      description: "كل عرض يحتوي على رابط حجز مباشر.",
    },
    {
      icon: "🔒",
      title: "موثوق وآمن",
      description: "مدعوم من FlyAlrafah الرسمي.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-lg px-6 pb-20">
      <h2 className="mb-5 text-center text-2xl font-bold text-white">
        لماذا FlyAlrafah Alert؟
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {features.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 text-right text-white"
          >
            <div className="mb-4 text-2xl">{item.icon}</div>
            <h3 className="mb-2 font-bold">{item.title}</h3>
            <p className="text-sm leading-6 text-gray-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
