export interface PostFrontmatter {
  title: string
  publishDate: Date
  description: string
  locale?: string
  minutesRead: string
}

export type NowPlayingData = {
  isPlaying: boolean
  track: string
  artist: string
  albumArt: string | null
}
