declare module "podcast" {
  interface Feed {
    title: string
    feedUrl: string
    siteUrl: string
    author: string
    language: string
    description: string
    imageUrl: string
    itunesCategory: Array<{ text: string }>
    itunesOwner: {
      name: string,
      email: string
    }
  }

  interface FeedItem {
    title: string
    enclosure: {
      url: string,
      size: string,
      type: string
    }
    date: string
  }

  class Podcast {
    constructor(feed: Feed)

    addItem(item: FeedItem)

    buildXml(intent: string)
  }

  export default Podcast
}
