import formatDuration from "./formatDuration";

describe("Format duration", () => {
  it('should format seconds to duration', () => {
    expect(formatDuration(10)).toBe("10s")
    expect(formatDuration(70)).toBe("1min 10s")
    expect(formatDuration(118)).toBe("1min 58s")
    expect(formatDuration(3800)).toBe("1h 3min 20s")
    expect(formatDuration(45 * 60)).toBe("45min")
  });
})
