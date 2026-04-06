// ─── Input validation helpers ───────────────────────────────────────────────

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[a-zA-ZÀ-ÿ\s'-]{1,50}$/;
const ROOM_ID_RE = /^[a-zA-Z0-9_-]{1,100}$/;
const RESERVATION_ID_RE = /^[a-zA-Z0-9_-]{1,100}$/;
const PHONE_RE = /^\+?[0-9\s\-()]{5,20}$/;

export function isValidDate(value: unknown): value is string {
  return typeof value === "string" && ISO_DATE_RE.test(value) && !isNaN(Date.parse(value));
}

export function isDateRangeValid(checkIn: string, checkOut: string): boolean {
  return new Date(checkOut) > new Date(checkIn);
}

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value);
}

export function isValidName(value: unknown): value is string {
  return typeof value === "string" && NAME_RE.test(value);
}

export function isValidRoomId(value: unknown): value is string {
  return typeof value === "string" && ROOM_ID_RE.test(value);
}

export function isValidReservationId(value: unknown): value is string {
  return typeof value === "string" && RESERVATION_ID_RE.test(value);
}

export function isValidGuests(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 20;
}

export function isValidPhone(value: unknown): boolean {
  if (value === undefined || value === null || value === "") return true; // optional
  return typeof value === "string" && PHONE_RE.test(value);
}

const SUPPORTED_CURRENCIES = new Set([
  "IDR", "USD", "EUR", "GBP", "JPY", "KRW", "SGD", "MYR", "THB",
  "AUD", "CNY", "INR", "PHP", "VND", "CAD", "CHF", "HKD", "TWD",
  "AED", "SAR", "BRL", "RUB", "NZD",
]);

export function isValidCurrency(value: unknown): value is string {
  return typeof value === "string" && SUPPORTED_CURRENCIES.has(value);
}
