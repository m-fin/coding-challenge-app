export function greetingForHour(hour: number): string {
  if (hour < 12) return 'Good morning, Finleys';
  if (hour < 17) return 'Good afternoon, Finleys';
  return 'Good evening, Finleys';
}
