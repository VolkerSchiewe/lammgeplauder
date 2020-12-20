export interface Podcast {
  title: string
  description: string
  logo: {
    url: string
    alt: string
  }
}

export interface Episode {
  name: string,
  audio: {
    mimeType: string;
    size: string;
    url: string
  },
  description: string
  updatedAt: string
}
