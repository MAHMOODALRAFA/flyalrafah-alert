import { supabase } from "@/lib/supabase";

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

export default async function LiveDealsBar() {
  const { data: deal } = await supabase
    .from("deals")
    .select("route, new_price")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!deal) return null;

  return (
    <div className="mx-auto mb-6 w-full max-w-lg px-6">
      <div className="rounded-2xl border border-[#D4A83F]/30 bg-[#D4A83F]/10 px-4 py-3 text-center text-sm font-bold text-[#D4A83F]">
        🔴 آخرین تخفیف: {formatRoute(deal.route)} فقط {deal.new_price} OMR
      </div>
    </div>
  );
}