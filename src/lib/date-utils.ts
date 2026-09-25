/**
 * Utility functions for parsing and sorting event dates and times.
 */

export function parseEventDate(dateStr?: string): number {
  if (!dateStr) return 0;

  // 1. Direct ISO check or valid Date string
  const direct = new Date(dateStr);
  if (!isNaN(direct.getTime())) {
    return direct.getTime();
  }

  // 2. Clean ordinal suffixes: 1st, 2nd, 3rd, 4th, 29th -> 1, 2, 3, 4, 29
  let clean = dateStr.replace(/(\d+)(st|nd|rd|th)/gi, '$1');

  // 3. Clean time format like 2.00PM -> 2:00 PM
  clean = clean.replace(/(\d+)\.(\d+)\s*(AM|PM)/gi, '$1:$2 $3');

  // 4. Replace middle dot separator
  clean = clean.replace(/·/g, ' ');

  const cleanedDate = new Date(clean);
  if (!isNaN(cleanedDate.getTime())) {
    return cleanedDate.getTime();
  }

  // 5. Fallback: extract Day Month Year via regex
  const match = clean.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (match) {
    const months: Record<string, number> = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
    };
    const month = months[match[2].toLowerCase().slice(0, 3)];
    if (month !== undefined) {
      return new Date(parseInt(match[3], 10), month, parseInt(match[1], 10)).getTime();
    }
  }

  return 0;
}

export function getEventTimestamp(event: {
  date_iso?: string;
  date?: string;
  createdAt?: string;
  created_at?: string;
}): number {
  if (event.date_iso) {
    const t = parseEventDate(event.date_iso);
    if (t > 0) return t;
  }
  if (event.date) {
    const t = parseEventDate(event.date);
    if (t > 0) return t;
  }
  if (event.createdAt || event.created_at) {
    const t = parseEventDate(event.createdAt || event.created_at);
    if (t > 0) return t;
  }
  return 0;
}
