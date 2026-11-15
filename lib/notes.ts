export type DailyNote = {
  text: string;
  credit: string;
};

export const DAILY_NOTES: DailyNote[] = [
  { text: 'Set another plate. Someone you love is on the way.', credit: 'A Finley note' },
  { text: "A shared list is a quiet way of saying I've got this.", credit: 'A Finley note' },
  { text: 'The best room in the house is the one where everybody talks at once.', credit: 'A Finley note' },
  { text: 'Pass the good dish. The stories come with it.', credit: 'A Finley note' },
  { text: 'There is always room for one more chair.', credit: 'A Finley note' },
  { text: 'Coming home is its own kind of thank you.', credit: 'A Finley note' },
  { text: 'Write it down, then forget it until you reach the store.', credit: 'A Finley note' },
  { text: 'The kitchen light means somebody is already thinking of you.', credit: 'A Finley note' },
  { text: 'Gratitude is mostly just paying attention.', credit: 'A Finley note' },
  { text: "Save the leftovers. Tomorrow's lunch started as today's care.", credit: 'A Finley note' },
  { text: 'The people matter more than the menu.', credit: 'A Finley note' },
  { text: 'Count the days together, then put the calendar away.', credit: 'A Finley note' },
  { text: 'A full cart and a short checkout line is a small holiday.', credit: 'A Finley note' },
  { text: 'Call it a feast, even if tonight is only soup.', credit: 'A Finley note' },
];

const DAY_MS = 86_400_000;

export function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((current.getTime() - start.getTime()) / DAY_MS) + 1;
}

export function noteForDate(date: Date, notes: DailyNote[] = DAILY_NOTES): DailyNote {
  const index = (dayOfYear(date) - 1) % notes.length;
  return notes[index] ?? notes[0];
}
