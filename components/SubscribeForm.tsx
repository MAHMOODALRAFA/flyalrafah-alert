"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SubscribeForm() {
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [route, setRoute] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    alert("تم الاشتراك بنجاح 🎉");

    setFullName("");
    setWhatsapp("");
    setRoute("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full rounded-3xl border border-white/10 bg-white/5 p-6 text-right shadow-2xl backdrop-blur-xl"
    >
      <h2 className="mb-6 text-center text-2xl font-bold">
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