import { LoginForm } from '@components/forms'
import { MainLayout } from 'layout'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {
  return (
    <MainLayout title="Login">
      <section className=" w-full  bg-white">
        <div className="container mx-auto  py-12">
          <div className="flex w-full flex-col items-center space-y-10 p-4 ">
            <h1 className="flex items-center gap-2 text-5xl">
              <FaSignInAlt fontSize={40} color="#01E2FD" />
              <span className="text-indigo-900">Login</span>
            </h1>
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
  const cookies = req.cookies.ss_access_token

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
