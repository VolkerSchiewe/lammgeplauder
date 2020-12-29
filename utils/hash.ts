import * as crypto from "crypto"

export async function getShortHash(hashName: string, file: File): Promise<string> {
  const hash = crypto.createHash(hashName);
  hash.update(Buffer.from(await file.arrayBuffer()))
  const hashLong = hash.digest('hex')
  return hashLong.slice(0, 6)
}
