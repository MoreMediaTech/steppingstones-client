import { RegisterForm } from '@components/forms'
import { MainLayout } from 'layout'
import { FaUser } from 'react-icons/fa'

const Register = () => {
  return (
    <MainLayout>
      <section className="flex h-screen w-full bg-white">
        <div className="container mx-auto flex flex-col items-center space-y-16 py-8">
          <div className="space-y-4 text-center">
            <h1 className="flex items-center gap-2 text-5xl">
              <FaUser fontSize={34} color="#01E2FD" />
              <span className='text-indigo-900'>Register</span>
            </h1>
            <p className="text-2xl font-bold text-gray-400">
              Please create an account
            </p>
          </div>
          <RegisterForm />
        </div>
      </section>
    </MainLayout>
  )
}

export default Register
