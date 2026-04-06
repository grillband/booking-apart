// Currency conversion from IDR base.
// Set EXCHANGE_RATE_API_KEY in .env.local to use live rates from exchangerate-api.com.
// Without the key, hardcoded approximate rates are used as fallback.

// ─── Hardcoded fallback rates (IDR → X) ─────────────────────────────────────
const FALLBACK_RATES: Record<string, number> = {
  IDR: 1,
  USD: 0.0000625,
  EUR: 0.0000575,
  GBP: 0.0000495,
  JPY: 0.00938,
  KRW: 0.0856,
  SGD: 0.0000838,
  MYR: 0.000281,
  THB: 0.00219,
  AUD: 0.0000969,
  CNY: 0.000456,
  INR: 0.00528,
  PHP: 0.00356,
  VND: 1.59,
  CAD: 0.0000875,
  CHF: 0.0000556,
  HKD: 0.000488,
  TWD: 0.00203,
  AED: 0.000230,
  SAR: 0.000234,
  BRL: 0.000356,
  RUB: 0.00575,
  NZD: 0.000106,
};

// ─── Live rate cache (server-side only) ──────────────────────────────────────
let cachedLiveRates: Record<string, number> | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function fetchLiveRates(): Promise<Record<string, number> | null> {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;
  if (!apiKey) return null;

  // Return cached rates if still fresh
  if (cachedLiveRates && Date.now() - cacheTimestamp < CACHE_TTL_MS) {
    return cachedLiveRates;
  }

  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${encodeURIComponent(apiKey)}/latest/IDR`
    );
    if (!res.ok) {
      console.error(`Exchange rate API error: ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (data.result === "success" && data.conversion_rates) {
      cachedLiveRates = data.conversion_rates as Record<string, number>;
      cacheTimestamp = Date.now();
      return cachedLiveRates;
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch live exchange rates:", err);
    return null;
  }
}

// ─── Locale → currency mapping ──────────────────────────────────────────────
const LOCALE_CURRENCY_MAP: Record<string, string> = {
  en_US: "USD", en_GB: "GBP", en_AU: "AUD", en_CA: "CAD", en_NZ: "NZD",
  en_SG: "SGD", en_HK: "HKD", en_PH: "PHP", en_IN: "INR",
  id: "IDR", id_ID: "IDR",
  ja: "JPY", ja_JP: "JPY",
  ko: "KRW", ko_KR: "KRW",
  zh: "CNY", zh_CN: "CNY", zh_TW: "TWD", zh_HK: "HKD",
  ms: "MYR", ms_MY: "MYR",
  th: "THB", th_TH: "THB",
  vi: "VND", vi_VN: "VND",
  de: "EUR", de_DE: "EUR", de_AT: "EUR", de_CH: "CHF",
  fr: "EUR", fr_FR: "EUR", fr_CA: "CAD", fr_CH: "CHF",
  es: "EUR", es_ES: "EUR",
  it: "EUR", it_IT: "EUR",
  nl: "EUR", nl_NL: "EUR",
  pt: "EUR", pt_PT: "EUR", pt_BR: "BRL",
  ru: "RUB", ru_RU: "RUB",
  ar: "SAR", ar_SA: "SAR", ar_AE: "AED",
  hi: "INR", hi_IN: "INR",
  fil: "PHP", fil_PH: "PHP",
};

// ─── Public API ─────────────────────────────────────────────────────────────

export function getCurrencyFromLocale(locale: string): string {
  const normalized = locale.replace("-", "_");
  if (LOCALE_CURRENCY_MAP[normalized]) return LOCALE_CURRENCY_MAP[normalized];
  const lang = normalized.split("_")[0];
  if (LOCALE_CURRENCY_MAP[lang]) return LOCALE_CURRENCY_MAP[lang];
  return "USD";
}

export async function convertFromIDR(
  amountIDR: number,
  targetCurrency: string
): Promise<number> {
  if (targetCurrency === "IDR") return amountIDR;

  // Only allow known currencies
  if (!FALLBACK_RATES[targetCurrency]) return amountIDR;

  // Try live rates first
  const live = await fetchLiveRates();
  if (live && live[targetCurrency]) {
    return amountIDR * live[targetCurrency];
  }

  // Fallback to hardcoded
  return amountIDR * FALLBACK_RATES[targetCurrency];
}

export function formatPrice(amount: number, currency: string): string {
  const noDecimalCurrencies = ["IDR", "VND", "KRW", "JPY", "CLP", "HUF"];
  const decimals = noDecimalCurrencies.includes(currency) ? 0 : 2;
  return amount.toFixed(decimals);
}

export function getSupportedCurrencies(): string[] {
  return Object.keys(FALLBACK_RATES);
}
