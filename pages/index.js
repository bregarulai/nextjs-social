import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const {data: session, status} = useSession()
  console.log('session: ', useSession())

  useEffect(() => {

    if (status === "loading") return // Do nothing while loading
    if (!session){
       router.push('/auth/login')
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 transition duration-200">
      <Head>
        <title>Jovan Social</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    { session && <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Jovan Social
          </a>
        </h1>


      </main>}

    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session
    }
  }
}

{/* <a href="https://iconscout.com/icons/google" target="_blank">Google Icon</a> by <a href="https://iconscout.com/contributors/icon-mafia" target="_blank">Icon Mafia</a> */}
