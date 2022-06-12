import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { MainLayout } from 'layout'
import axios from 'axios'
import { API_URL } from '@config/index'

const VerifyEmail = ({ valid } : { valid: boolean}) => {
  return (
    <MainLayout title="Email Verification">
      <main className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200">
        <section className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
          <div className="flex items-center justify-center ">
            <p className="mb-5 text-2xl ">
              {valid
                ? 'Thank you for verifying your email address. You may close this page.'
                : 'It looks like you may have clicked on an invalid link. Please close this window and try again.'}
            </p>
          </div>
        </section>
      </main>
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

  const { data } = await axios.post(`${API_URL}/api/v1/auth/verify-email`,{
    token: context.params?.token,
    type: 'EMAIL'
  })

  if(!data.success) return { props: { valid: false } }

    await axios.post(`${API_URL}/api/v1/auth/update-user`, {
        userId: data.userId,
        emailVerified: true
    })

  return {
    props: { valid: true },
  }
}

export default VerifyEmail
