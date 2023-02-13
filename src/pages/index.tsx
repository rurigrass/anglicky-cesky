import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <>
      <Head>
        <title>Anglicky Ceska</title>
      </Head>
      <Header />
      <div className=" h-screen min-h-screen -mt-14 flex justify-center items-center bg-yellow-200">
        <div className='bg-blue-600 rounded-xl mx-2 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 py-9 px-3 md:px-9'></div>
      </div>
    </>
  )
}

export default Home