export function getEpisodeGuid(name: string, md5Hash: string): string {
  const shortHash = md5Hash.slice(0, 10)
  return `${ name.toLowerCase().replace(" ", "-") }-${ shortHash }`
}
