export default function getImageDimensions(file: File): Promise<{ width: number, height: number }> {
  return new Promise(resolve => {
    const image = new Image();
    image.src = URL.createObjectURL(file)
    image.onload = () => {
      resolve({ width: image.width, height: image.height })
    }
  })

}
