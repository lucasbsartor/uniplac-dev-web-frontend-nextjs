import type { NextPage } from 'next'
import { HeroText } from '../components/Home/Hero'

const Home: NextPage = () => {
  return (
    <div>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <main>
        <HeroText />
      </main>

      <footer></footer>
    </div>
  )
}

export default Home
