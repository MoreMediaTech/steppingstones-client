import { LoginForm } from '@components/forms'
import { MainLayout } from 'layout'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaSignInAlt } from 'react-icons/fa'
import useHasMounted from '@hooks/useHasMounted'

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const Login = () => {
  const hasMounted = useHasMounted()
  return hasMounted && (
    <MainLayout title="Login">
      <section className="relative h-screen w-full">
        <div className="absolute top-0 h-full w-full bg-cover bg-center">
          <div className="relative h-full w-full">
            <Image
              src={'/SS_Staircase.jpeg'}
              alt="Staircase image"
              quality={50}
              priority
              fill
            />
            <div
              id="blackOverlay"
              className="absolute h-full w-full bg-black opacity-50"
            ></div>
          </div>
        </div>
        <div className="container relative mx-auto h-full">
          <div className="flex h-full flex-col flex-wrap items-center justify-center">
            <motion.div
              className="flex w-full flex-col items-center  opacity-75"
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ delay: 1.0, duration: 2.0 }}
            >
              <div>
                <Image
                  src={'/android-chrome-512x512.png'}
                  alt="Stepping stones app logo"
                  width={250}
                  height={250}
                />
              </div>
              <h1 className="flex items-center gap-2 text-4xl">
                <FaSignInAlt fontSize={40} color="#00DCB3" />
                <span className="text-primary-dark-100">Sign In</span>
              </h1>
              <LoginForm />
            </motion.div>
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
