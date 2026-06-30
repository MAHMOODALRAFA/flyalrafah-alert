import { supabase } from "@/lib/supabase";

type Deal = {
  id: string;
  airline: string;
  route: string;
  old_price: number | null;
  new_price: number;
  booking_link: string;
};

function formatRoute(route: string) {
  const routes: Record<string, string> = {
    "MCT-SYZ": "مسقط → شيراز",
    "SYZ-MCT": "شيراز → مسقط",
    "MCT-THR": "مسقط → طهران",
    "THR-MCT": "طهران → مسقط",
    "MCT-MHD": "مسقط → مشهد",
    "MHD-MCT": "مشهد → مسقط",
  };

  return routes[route] || route;
}

export default async function Deals() {
  const { data: deals, error } = await supabase
    .from("deals")
    .select("id, airline, route, old_price, new_price, booking_link")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) return null;
  if (!deals || deals.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-lg px-6 pb-20">
      <h2 className="mb-5 text-center text-2xl font-bold text-white">
        🔥 أحدث عروض الرحلات
      </h2>

      <div className="space-y-4">
        {deals.map((deal: Deal) => (
          <div
            key={deal.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 text-right text-white shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-[#D4A83F]/15 px-3 py-1 text-sm text-[#D4A83F]">
                عرض خاص
              </span>
              <span className="text-sm text-gray-300">{deal.airline}</span>
            </div>

            <h3 className="text-2xl font-bold">{formatRoute(deal.route)}</h3>

            <div className="mt-4 flex items-end justify-between">
              <a
                href={deal.booking_link}
                target="_blank"
                className="rounded-2xl bg-[#D4A83F] px-5 py-3 font-bold text-black"
              >
                احجز الآن
              </a>

              <div>
                {deal.old_price && (
                  <p className="text-sm text-gray-400 line-through">
                    {deal.old_price} OMR
                  </p>
                )}

                <p className="text-4xl font-extrabold text-[#D4A83F]">
                  {deal.new_price} OMR
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
