"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Step = "form" | "success" | "install";
type Device = "android" | "iphone";

export default function SubscribeForm() {
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [route, setRoute] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [device, setDevice] = useState<Device>("android");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cleanedWhatsapp = whatsapp.replace(/\s/g, "");
    const omanPhoneRegex = /^(\+968|968)?[279]\d{7}$/;

    if (!omanPhoneRegex.test(cleanedWhatsapp)) {
      alert("الرجاء إدخال رقم واتساب عماني صحيح");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.from("subscribers").insert([
      {
        full_name: fullName.trim(),
        whatsapp: cleanedWhatsapp,
        preferred_route: route,
      },
    ]);

    setIsLoading(false);

    if (error) {
      console.error(error);

      if (error.code === "23505") {
        alert("هذا الرقم مسجل مسبقًا ✅");
        return;
      }

      alert("حدث خطأ أثناء التسجيل ❌");
      return;
    }

    setFullName("");
    setWhatsapp("");
    setRoute("");
    setStep("success");
  }

  const installSteps =
    device === "android"
      ? [
          "افتح المتصفح وانتقل إلى الموقع",
          "اضغط على قائمة المتصفح ⋮ ثم «تثبيت التطبيق»",
          "اضغط «تثبيت» للتأكيد",
          "افتح التطبيق واسمح بالإشعارات ✅",
        ]
      : [
          "افتح Safari وانتقل إلى الموقع",
          "اضغط على زر المشاركة في الأسفل",
          "اختر «إضافة إلى الشاشة الرئيسية»",
          "افتح التطبيق واسمح بالإشعارات ✅",
        ];

  if (step === "success") {
    return (
      <div className="mt-10 w-full rounded-3xl border border-[#D4A83F]/30 bg-white/5 p-6 text-center shadow-2xl backdrop-blur-xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-4xl">
          ✅
        </div>

        <h2 className="mb-3 text-2xl font-bold text-white">
          تم تسجيل اشتراكك!
        </h2>

        <p className="mb-6 text-sm leading-7 text-gray-300">
          سنرسل لك تنبيهات واتساب عند توفر عروض جديدة، أسعار مخفضة أو مقاعد
          متاحة على الرحلة التي اخترتها.
        </p>

        <button
          type="button"
          onClick={() => setStep("install")}
          className="w-full rounded-2xl bg-[#D4A83F] px-6 py-4 text-lg font-bold text-black shadow-lg transition hover:scale-[1.02] hover:bg-[#E5B94B]"
        >
          📲 تثبيت التطبيق للتنبيهات
        </button>

        <button
          type="button"
          onClick={() => setStep("form")}
          className="mt-4 w-full rounded-2xl border border-white/10 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
        >
          تسجيل رقم آخر
        </button>
      </div>
    );
  }

  if (step === "install") {
    return (
      <div className="mt-10 w-full rounded-3xl border border-white/10 bg-[#111622]/90 p-6 text-right shadow-2xl backdrop-blur-xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4A83F]/30 bg-[#D4A83F]/10 text-2xl">
          📱
        </div>

        <h2 className="mb-2 text-center text-2xl font-bold text-white">
          تثبيت FlyAlrafah Alert
        </h2>

        <p className="mb-6 text-center text-sm text-gray-400">
          حتى تصلك العروض بشكل أسرع من التطبيقات
        </p>

        <div className="mb-6 grid grid-cols-2 rounded-2xl bg-[#1A202D] p-1">
          <button
            type="button"
            onClick={() => setDevice("android")}
            className={`rounded-xl py-3 text-sm font-bold transition ${
              device === "android"
                ? "bg-[#D4A83F] text-black"
                : "text-gray-400"
            }`}
          >
            أندرويد
          </button>

          <button
            type="button"
            onClick={() => setDevice("iphone")}
            className={`rounded-xl py-3 text-sm font-bold transition ${
              device === "iphone"
                ? "bg-[#D4A83F] text-black"
                : "text-gray-400"
            }`}
          >
            آيفون
          </button>
        </div>

        <ol className="mb-6 space-y-4">
          {installSteps.map((item, index) => (
            <li
              key={item}
              className="flex items-start justify-end gap-3 text-sm leading-7 text-gray-300"
            >
              <span>{item}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4A83F]/20 text-xs font-bold text-[#D4A83F]">
                {index + 1}
              </span>
            </li>
          ))}
        </ol>

        <div className="mb-5 grid grid-cols-3 gap-2 text-center text-xs font-bold text-emerald-300">
          <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/10 px-2 py-3">
            ✓ إشعارات فورية
          </div>
          <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/10 px-2 py-3">
            ✓ فتح سريع
          </div>
          <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/10 px-2 py-3">
            ✓ مثل التطبيق
          </div>
        </div>

        <button
          type="button"
          onClick={() => setStep("form")}
          className="mb-4 w-full rounded-2xl bg-[#D4A83F] px-6 py-4 text-lg font-bold text-black shadow-lg transition hover:scale-[1.02] hover:bg-[#E5B94B]"
        >
          📲 تثبيت التطبيق
        </button>

        <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/10 px-4 py-3 text-center text-sm font-bold text-emerald-300">
          ✅ تم تفعيل إشعارات FlyAlrafah Alert
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full rounded-3xl border border-white/10 bg-white/5 p-6 text-right shadow-2xl backdrop-blur-xl"
    >
      <h2 className="mb-6 text-center text-2xl font-bold text-white">
        اشترك في تنبيهات الرحلات
      </h2>

      <input
        type="text"
        placeholder="الاسم الكامل"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="mb-4 w-full rounded-2xl border border-white/10 bg-[#101625] px-5 py-4 text-right text-white outline-none placeholder:text-gray-500 focus:border-[#D4A83F]"
        required
      />

      <input
        type="tel"
        placeholder="+968 XXXXXXXX"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        className="mb-4 w-full rounded-2xl border border-white/10 bg-[#101625] px-5 py-4 text-right text-white outline-none placeholder:text-gray-500 focus:border-[#D4A83F]"
        required
      />

      <select
        value={route}
        onChange={(e) => setRoute(e.target.value)}
        className="mb-5 w-full rounded-2xl border border-white/10 bg-[#101625] px-5 py-4 text-right text-white outline-none focus:border-[#D4A83F]"
        required
      >
        <option value="" disabled>
          اختر الرحلة
        </option>
        <option value="MCT-SYZ">مسقط → شيراز</option>
        <option value="SYZ-MCT">شيراز → مسقط</option>
        <option value="MCT-THR">مسقط → طهران</option>
        <option value="THR-MCT">طهران → مسقط</option>
        <option value="MCT-MHD">مسقط → مشهد</option>
        <option value="MHD-MCT">مشهد → مسقط</option>
      </select>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-2xl bg-[#D4A83F] px-6 py-4 text-lg font-bold text-black shadow-lg transition hover:scale-[1.02] hover:bg-[#E5B94B] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "جاري التسجيل..." : "🔔 اشترك الآن"}
      </button>

      <p className="mt-5 text-center text-sm text-gray-400">
        مجاني بالكامل • بدون رسائل مزعجة
      </p>
    </form>
  );
}