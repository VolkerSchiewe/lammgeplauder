import { getEpisodeGuid } from "./getEpisodeGuid";

describe("get GUID", () => {
  it.each([
    ["Weihnachtsfolge", "1ffc217e0d83dfda4638c6d2728dc5a7", "weihnachtsfolge-1ffc217e0d"],
    ["Grüne Folge", "c8a440", "grüne-folge-c8a440"],
  ])('should return same guid', (name, hash, guid) => {
    const result = getEpisodeGuid(name, hash)
    expect(result).toBe(guid)
  });

})
