import '../styles/globals.css'
import { PlasmicRootProvider } from "@plasmicapp/loader"
import { ParallaxProvider } from 'react-scroll-parallax';

function MyApp({ Component, pageProps }) {
  return (
    <ParallaxProvider>
      <PlasmicRootProvider>
        <Component {...pageProps} />
      </PlasmicRootProvider>
    </ParallaxProvider>
  )
}

export default MyApp