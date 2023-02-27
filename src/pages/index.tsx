import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Header from '@/components/Header'
import Link from 'next/link'
import Router from "next/router"
import { useState } from 'react'

const Home = () => {
  const [showVocabGame, setShowVocabGame] = useState<Boolean>(false)
  const [showConjugationGame, setShowConjugationGame] = useState<Boolean>(false)

  const sendProps = (long: number) => {
    Router.push({
      pathname: "conjugation",
      query: {
        long
      }
    })
  }

  return (
    <>
      <Head>
        <title>Anglicky Ceska</title>
      </Head>
      <Header />
      <div className=" h-screen min-h-screen -mt-14 flex justify-center items-center bg-duo-eel">
        <div className='flex flex-col space-y-2 bg-blue-600 rounded-xl mx-2 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 py-9 px-3 md:px-9 bg-duo-hare border-b-4 border-b-duo-wolf'>
          <button className='button bg-duo-humpback text-white hover:bg-duo-macaw' onClick={() => setShowVocabGame(!showVocabGame)}>
            Vocabulary
          </button>
          {/* {showVocabGame &&
            <div className='flex justify-center space-y-2 py-2 bg-duo-wolf rounded-xl border-t-4 border-b-duo-eel'>
              <button className='button bg-duo-macaw'>
                <Link href="/vocabulary">Start Game </Link>
              </button>
            </div>
          } */}
          <button className='button bg-duo-humpback text-white hover:bg-duo-macaw' onClick={() => setShowConjugationGame(!showConjugationGame)}>
            Verbs
          </button>
          {showConjugationGame &&
            <div className='flex justify-center space-y-2 py-2 bg-duo-wolf rounded-xl border-t-4 border-b-duo-eel'>
              <button className='button bg-duo-humpback  text-white hover:bg-duo-macaw'>
                <a onClick={() => sendProps(2)}>Start Game </a>
              </button>
            </div>
          }
          {/* <button className='button bg-duo-macaw' >
            Genders
          </button> */}
        </div>
      </div>
    </>
  )
}

export default Home