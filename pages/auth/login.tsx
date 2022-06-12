import { LoginForm } from '@components/forms'
import { MainLayout } from 'layout'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {
  return (
    <MainLayout title="Login">
      <section className=" h-screen w-full bg-white">
        <div className="grid h-full md:grid-cols-2">
          <div className="flex flex-col items-center bg-teal-500 px-4 py-32 md:px-12">
            <div className="flex w-full flex-col items-center space-y-10 p-4 ">
              <h1 className="flex items-center gap-2 text-5xl">
                <FaSignInAlt fontSize={40} color="#01E2FD" />
                <span className="text-indigo-900">Sign In</span>
              </h1>
              <p className="text-2xl font-thin text-white">
                Welcome to Stepping Stones
              </p>
            </div>
            <LoginForm />
          </div>
          <div className="hidden flex-col items-center justify-center space-y-12 bg-white md:flex">
            <div>
              <Image
                src={'/android-chrome-512x512.png'}
                alt="Stepping stones app logo"
                width={150}
                height={150}
              />
            </div>
            <div>
              <Image
                src={'/nottingham-county.png'}
                alt="Stepping stones app logo"
                width={350}
                height={550}
              />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const cookies = req.cookies.ss_refresh_token

  if (cookies) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Login
