import { LoginForm } from '@components/forms'
import { MainLayout } from 'layout'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {
  return (
    <MainLayout title="Login">
      <section className=" w-full h-screen bg-white">
        <div className="grid md:grid-cols-2 h-full">
          
            <div className='bg-white hidden md:block'></div>
            <div className="flex flex-col items-center px-4 md:px-12 py-32 bg-teal-500">
              <div className="flex w-full flex-col items-center space-y-10 p-4 ">
                <h1 className="flex items-center gap-2 text-5xl">
                  <FaSignInAlt fontSize={40} color="#01E2FD" />
                  <span className="text-indigo-900">Sign In</span>
                </h1>
                <p className='text-2xl font-thin text-white'>Welcome to Stepping Stones</p>
              </div>
              <LoginForm />
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
