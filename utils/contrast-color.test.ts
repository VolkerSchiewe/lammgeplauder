import { getContrastColor } from "./contrast-color";

describe("contrast color", () => {
  it('should return black for light background colors', () => {
    const expectedColor = "black"
    expect(getContrastColor("#ffffff")).toBe(expectedColor)
    expect(getContrastColor("#ffc4c4")).toBe(expectedColor)
    expect(getContrastColor("#96b0ff")).toBe(expectedColor)
    expect(getContrastColor("#53fc3b")).toBe(expectedColor)
    expect(getContrastColor("#4ba93d")).toBe(expectedColor)
  });
  it('should return white for dark background colors', () => {
    const expectedColor = "white"
    expect(getContrastColor("#000000")).toBe(expectedColor)
    expect(getContrastColor("#4e2a2a")).toBe(expectedColor)
    expect(getContrastColor("#2a3556")).toBe(expectedColor)
    expect(getContrastColor("#23541b")).toBe(expectedColor)
    expect(getContrastColor("#cc49d0")).toBe(expectedColor)
  });

});
