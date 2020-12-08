declare module "podcast" {
  interface Feed {
    title: string
    feedUrl: string
    siteUrl: string
    author: string
  }

  interface FeedItem {
    title: string
    url: string
  }

  class Podcast {
    constructor(feed: Feed) {
    }

    addItem(item: FeedItem)

    buildXml(intent: string)
  }

  export default Podcast
}
