export function formatClassYear(classYear: number): string {
  return `'${String(classYear).slice(-2)}`;
}

export function formatLocation(city: string, country: string): string {
  return `${city}, ${country}`;
}

export function formatDuration(durationMinutes: number): string {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}
