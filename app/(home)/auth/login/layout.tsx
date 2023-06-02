import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

function checkUserCookie() {
  const cookie = cookies()
  const userCookie = cookie.get('ss_refresh_token')
  if (userCookie) {
    return true
  }
  return false
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (checkUserCookie()) {
    return redirect('/')
  }
  return <section>{children}</section>
}
