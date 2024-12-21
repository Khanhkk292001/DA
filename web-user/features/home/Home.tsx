import { Carousel, NewRelease, News } from './components'
import { PackageNew } from './components/PackageNew'

export const Home = () => {
  return (
    <>
      <Carousel />

      <News />

      <NewRelease />

      <PackageNew />
    </>
  )
}
