import * as crypto from "crypto"

export function getShortHash(hashName: string, path: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const hash = crypto.createHash(hashName);
      const res = await fetch(path)
      hash.update(Buffer.from(await res.arrayBuffer()))
      const hashLong = hash.digest('hex')
      resolve(hashLong.slice(0, 6))
    } catch (e) {
      reject(e)
    }
  });
}
