import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Header from '@/components/Header'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <>
      <Head>
        <title>Anglicky Ceska</title>
      </Head>
      <Header />
      <div className=" h-screen min-h-screen -mt-14 flex justify-center items-center bg-duo-eel">
        <div className='flex flex-col bg-blue-600 rounded-xl mx-2 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 py-9 px-3 md:px-9 bg-duo-hare border-b-4 border-b-duo-wolf'>
          <button className='button bg-duo-macaw'>
            <Link href="/vocabulary">Vocabulary Game </Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Home