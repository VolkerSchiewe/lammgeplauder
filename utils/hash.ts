import * as crypto from "crypto"

export async function getHash(hashName: string, file: File): Promise<string> {
  const hash = crypto.createHash(hashName);
  hash.update(Buffer.from(await file.arrayBuffer()))
  return hash.digest('hex')
}
