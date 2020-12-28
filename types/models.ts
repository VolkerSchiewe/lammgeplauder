export interface Podcast {
  name: string
  description: string
  homepageBackgroundColor: string
  logoUrl: string
  logoAlt: string
}

export interface Episode {
  id?: string
  name: string,
  audio: {
    mimeType: string;
    size: number;
    url: string
    duration: number
    md5Hash: string
  },
  description: string
  publishingDate: string
  published: boolean
}
