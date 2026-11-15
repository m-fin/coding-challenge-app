const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const DAY_MS = 86_400_000;

export type CountdownCopy = {
  headline: string;
  unit: string;
  detail: string;
};

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function thanksgivingDate(year: number): Date {
  const novemberFirst = new Date(year, 10, 1);
  const daysUntilThursday = (4 - novemberFirst.getDay() + 7) % 7;
  return new Date(year, 10, 1 + daysUntilThursday + 21);
}

export function nextThanksgiving(today: Date): Date {
  const thisYear = thanksgivingDate(today.getFullYear());
  if (startOfDay(today).getTime() <= startOfDay(thisYear).getTime()) {
    return thisYear;
  }
  return thanksgivingDate(today.getFullYear() + 1);
}

export function daysUntil(today: Date, target: Date): number {
  return Math.round((startOfDay(target).getTime() - startOfDay(today).getTime()) / DAY_MS);
}

export function formatLongDate(date: Date): string {
  return `${WEEKDAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

export function countdownCopy(today: Date): CountdownCopy {
  const target = nextThanksgiving(today);
  const days = daysUntil(today, target);
  if (days === 0) {
    return {
      headline: 'Today',
      unit: '',
      detail: 'Thanksgiving is here. Save a seat.',
    };
  }
  if (days === 1) {
    return {
      headline: '1',
      unit: 'day',
      detail: 'Tomorrow the good plates come out.',
    };
  }
  return {
    headline: String(days),
    unit: 'days',
    detail: formatLongDate(target),
  };
}
