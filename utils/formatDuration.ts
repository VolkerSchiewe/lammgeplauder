export default function formatDuration(s: number): string {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s - (hours * 3600)) / 60);
  const seconds = s - (hours * 3600) - (minutes * 60);
  let duration = ""
  if (hours)
    duration += `${ hours }h `
  if (minutes)
    duration += `${ minutes }min `
  if (seconds)
    duration += `${ seconds }s`

  return duration.trim()
}
