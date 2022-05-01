import { LoginForm } from '@components/forms'
import { MainLayout } from 'layout'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {
  return (
    <MainLayout title="Login">
      <section className="flex h-screen w-full  bg-white">
        <div className="container mx-auto  py-12">
          <div className="flex w-full flex-col items-center space-y-10 p-4 ">
            <h1 className="flex items-center gap-2 text-5xl">
              <FaSignInAlt fontSize={34} />
              <span>Login</span>
            </h1>
            <LoginForm />
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default Login
