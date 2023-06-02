import UserProfileSection from 'app/components/UserProfileSection'
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

export default function Profile() {
  if (!checkUserCookie()) {
    return redirect('/auth/login')
  }
  return (
    <section className="h-screen overflow-auto px-2 sm:px-4">
      <UserProfileSection />
    </section>
  )
}
