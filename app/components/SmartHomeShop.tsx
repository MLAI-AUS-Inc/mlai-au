import { useMemo } from "react";
import { Check, Loader2, Lock, ShoppingCart } from "lucide-react";
import { wattClasses } from "~/lib/watt-theme";
import type { SmartHomeShopItem, SmartHomeShopState } from "~/lib/generic-hackathon";

export interface ShopFeedback {
  ok: boolean;
  message: string;
}

interface SmartHomeShopProps {
  shop: SmartHomeShopState | undefined;
  onBuy: (itemId: string) => void;
  buyingId: string | null;
  feedback: ShopFeedback | null;
}

function prettyCategory(category: string): string {
  const cleaned = String(category || "Upgrades").replace(/[_-]+/g, " ").trim();
  if (!cleaned) return "Upgrades";
  return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatMoney(value: number | null | undefined): string {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `$${Math.round(value).toLocaleString()}`;
}

function groupByCategory(items: SmartHomeShopItem[]): Array<[string, SmartHomeShopItem[]]> {
  const order: string[] = [];
  const map = new Map<string, SmartHomeShopItem[]>();
  for (const item of items) {
    const key = item.category || "Upgrades";
    if (!map.has(key)) {
      map.set(key, []);
      order.push(key);
    }
    map.get(key)!.push(item);
  }
  return order.map((key) => [key, map.get(key)!]);
}

function ShopCard({
  item,
  wallet,
  onBuy,
  isBuying,
}: {
  item: SmartHomeShopItem;
  wallet: number | null | undefined;
  onBuy: (itemId: string) => void;
  isBuying: boolean;
}) {
  const tooDear = typeof wallet === "number" && item.cost > wallet;
  return (
    <div
      className={`${wattClasses.panel} flex flex-col gap-3 p-4 transition ${
        item.owned ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`${wattClasses.title} text-sm`}>{item.name}</p>
          <p className={`${wattClasses.muted} mt-1 text-xs leading-relaxed`}>{item.summary}</p>
        </div>
        <span className={`${wattClasses.smallChip} shrink-0`}>{formatMoney(item.cost)}</span>
      </div>

      <div className="mt-auto">
        {item.owned ? (
          <span className="inline-flex items-center gap-1.5 rounded-[0.65rem] bg-[#e6efd7] px-3 py-2 text-sm font-black text-[#155420]">
            <Check className="h-4 w-4" aria-hidden="true" /> Owned
          </span>
        ) : isBuying ? (
          <button type="button" disabled className={`${wattClasses.buttonPrimary} w-full opacity-70`}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Buying…
          </button>
        ) : item.can_buy ? (
          <button
            type="button"
            onClick={() => onBuy(item.item_id)}
            className={`${wattClasses.buttonPrimary} w-full`}
          >
            Buy {formatMoney(item.cost)}
          </button>
        ) : (
          <button
            type="button"
            disabled
            title={tooDear ? "Not enough savings yet" : "Locked"}
            className={`${wattClasses.buttonOutline} w-full cursor-not-allowed opacity-60`}
          >
            <Lock className="mr-2 h-4 w-4" aria-hidden="true" />
            {tooDear ? `Need ${formatMoney(item.cost)}` : "Locked"}
          </button>
        )}
      </div>
    </div>
  );
}

export function SmartHomeShop({ shop, onBuy, buyingId, feedback }: SmartHomeShopProps) {
  const groups = useMemo(() => groupByCategory(shop?.items ?? []), [shop?.items]);
  const hasItems = (shop?.items?.length ?? 0) > 0;

  return (
    <section className={`${wattClasses.panelStrong} p-5 sm:p-6`}>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={wattClasses.iconTile}>
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className={wattClasses.eyebrow}>Upgrade Shop</p>
            <h2 className={`${wattClasses.title} text-lg`}>Spend your savings on permanent upgrades</h2>
          </div>
        </div>
        <span className={wattClasses.chip}>{formatMoney(shop?.wallet)} to spend</span>
      </header>

      {feedback && (
        <div className={`mt-4 ${feedback.ok ? wattClasses.successAlert : wattClasses.errorAlert}`}>
          {feedback.message}
        </div>
      )}

      {!hasItems ? (
        <div className={`${wattClasses.panelSoft} mt-4 p-5 text-center`}>
          <p className={`${wattClasses.title} text-sm`}>The shop opens as your campaign rolls on.</p>
          <p className={`${wattClasses.muted} mt-1 text-xs`}>
            Keep your house running and bank some savings — new upgrades unlock day by day. Check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-6">
          {groups.map(([category, items]) => (
            <div key={category}>
              <p className={`${wattClasses.smallChip} mb-3`}>{prettyCategory(category)}</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <ShopCard
                    key={item.item_id}
                    item={item}
                    wallet={shop?.wallet}
                    onBuy={onBuy}
                    isBuying={buyingId === item.item_id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
