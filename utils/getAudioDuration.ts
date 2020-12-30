export default function getAudioDuration(file: File): Promise<number> {
  return new Promise(resolve => {
    const audio = document.createElement('audio');
    audio.addEventListener('loadedmetadata', function () {
      resolve(audio.duration)
    }, false);
    audio.src = URL.createObjectURL(file)
    audio.remove()
  })

}
