declare module "podcast" {
  interface ITunesCategory {
    text: string,
    subcats?: Array<ITunesCategory>
  }

  interface Feed {
    title: string
    feedUrl: string
    siteUrl: string
    author: string
    language: string
    description: string
    imageUrl: string
    itunesCategory: Array<ITunesCategory>
    itunesOwner: {
      name: string,
      email: string
    }
  }

  interface FeedItem {
    title: string
    guid: string
    enclosure: {
      url: string,
      size: string,
      type: string
    }
    date: string
    description: string
    url: string
    itunesDuration: number
  }

  class Podcast {
    constructor(feed: Feed)

    addItem(item: FeedItem)

    buildXml(intent: string)
  }

  export default Podcast
}
