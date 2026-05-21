/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Returns the current date in Korea Standard Time (KST, Asia/Seoul).
 * It shifts the local time to represent exactly KST.
 */
export function getTodayKST(): Date {
  const now = new Date();
  // Get time offset in ms
  const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
  // Shift by +9 hours to construct KST representation
  return new Date(utc + (9 * 60 * 60 * 1000));
}

/**
 * Returns the Korean day name for a given Date.
 */
export function getKoreanDayOfWeek(date: Date): string {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[date.getDay()];
}

/**
 * Formats a given Date to "M월 D일 W요일" (e.g., "5월 15일 금요일").
 */
export function formatKoreanDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = getKoreanDayOfWeek(date);
  return `${month}월 ${day}일 ${dayName}요일`;
}

/**
 * Formats a given Date to "YYYYMMDD" format.
 */
export function formatDateKey(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

/**
 * Returns an array of five Date objects from Monday to Friday of the week containing the given date.
 */
export function getWeekDates(date: Date): Date[] {
  const currentDay = date.getDay(); // 0 (Sun) to 6 (Sat)
  // Shift to find Monday (Mon = 1, Sun = 0)
  const offsetToMonday = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(date);
  monday.setDate(date.getDate() + offsetToMonday);

  const weekDates: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDates.push(d);
  }
  return weekDates;
}

/**
 * Calculates which week of the month the current date belongs to (e.g. "5월 3주차").
 */
export function getWeekOfMonth(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Find the day of week of the 1st day of the month
  const firstDay = new Date(year, date.getMonth(), 1);
  const firstDayOfWeek = firstDay.getDay(); // 0 is Sunday, 1 is Monday...

  // Compute standard week index
  const weekNum = Math.ceil((day + firstDayOfWeek) / 7);
  return `${month}월 ${weekNum}주차`;
}

/**
 * Returns the default selected date:
 * - If today is a weekday (Mon-Fri), returns today.
 * - If today is Saturday or Sunday, returns the upcoming Monday (Next Meal Day).
 */
export function getDefaultSelectedDate(today: Date): Date {
  const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
  
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    return new Date(today);
  } else if (dayOfWeek === 6) {
    // Saturday -> Nearest Monday (+2 days)
    const nextMon = new Date(today);
    nextMon.setDate(today.getDate() + 2);
    return nextMon;
  } else {
    // Sunday -> Nearest Monday (+1 day)
    const nextMon = new Date(today);
    nextMon.setDate(today.getDate() + 1);
    return nextMon;
  }
}
