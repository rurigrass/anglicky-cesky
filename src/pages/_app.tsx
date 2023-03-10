import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url: any) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url: any) => (url === router.asPath) && setLoading(false);
    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)
    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  })

  return loading ? (
    <div>
      <div>Loading...</div>
    </div>
  ) : (<div className='hidden' />)
}

export default function App({ Component, pageProps }: AppProps) {
  return (<><Loading /><Component {...pageProps} /></>)
}
