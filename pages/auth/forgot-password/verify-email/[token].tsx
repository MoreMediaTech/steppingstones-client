import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { MainLayout } from 'layout'
import { API_URL } from '@config/index'

const VerifyEmail = ({ valid } : { valid: boolean}) => {
  return (
    <MainLayout title="Email Verification">
      <main className="bg-white text-gray-900 ">
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
  
  const response = await fetch(`${API_URL}auth/verify-email`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    token: context.params?.token,
    type: 'EMAIL'
  })})

  if(!response.ok) return { props: { valid: false } }
  const data = await response.json()
  
  if(!data.success) return { props: { valid: false } }

    await fetch(`${API_URL}auth/update-user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: data.userId,
        emailVerified: true
    })})

  return {
    props: { valid: true },
  }
}

export default VerifyEmail
