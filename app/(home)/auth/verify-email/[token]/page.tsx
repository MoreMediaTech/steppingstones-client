
import { env } from "@lib/env"

async function checkTokenValidity(token: string) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}auth/verify-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: token,
      type: 'EMAIL',
    }),
    cache: 'no-store',
  })

  if (!response.ok) return { valid: false }
  const data = await response.json()

  if (!data.success) return { valid: false }

  await fetch(`${env.NEXT_PUBLIC_API_URL}auth/update-user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: data.userId,
      emailVerified: true,
    }),
    cache: 'no-store',
  })

  return {
    valid: true,
  }
}

export default async function VerifyEmail({
  params,
}: {
  params: { token: string }
}) {
  const { valid } = await checkTokenValidity(params.token)
  return (
      <main className="bg-white text-gray-900 ">
        <section className="relative flex h-screen content-center items-center justify-center pb-32 pt-16">
          <div className="flex items-center justify-center ">
            <p className="mb-5 text-2xl ">
              {valid
                ? 'Thank you for verifying your email address. You may close this page.'
                : 'It looks like you may have clicked on an invalid link. Please close this window and try again.'}
            </p>
          </div>
        </section>
      </main>
  )
}
