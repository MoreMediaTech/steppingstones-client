'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLogoutMutation } from 'app/global-state/features/auth/authApiSlice'


export default function Logout() {
  const [logout] = useLogoutMutation()
  const router = useRouter()

  useEffect(() => {
    setTimeout(async () => {
        await logout().unwrap()
        localStorage.removeItem('_ssapp:token')
        router.push('/')
    }, 5000)
  }, [])

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center">
      <h1 className="font-mono text-3xl font-medium dark:text-gray-200">
        Logging out.......
      </h1>
    </section>
  )
}
