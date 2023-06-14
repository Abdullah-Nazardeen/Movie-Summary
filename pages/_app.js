import Layout from '../components/Layout'
import '../styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'


function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  )
}

export default MyApp
