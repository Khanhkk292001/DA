export function convertUrlYoutube(url: string) {
  try {
    const urlObj = new URL(url)
    let videoId

    // Check if the URL is a standard video URL
    if (urlObj.searchParams.has('v')) {
      videoId = urlObj.searchParams.get('v')
    } else {
      // For live streams, the video ID is part of the path
      const pathSegments = urlObj.pathname.split('/')
      videoId = pathSegments[pathSegments.length - 1]
    }

    return videoId ? videoId : 'error'
  } catch (err) {
    console.log(err)
  }
}
