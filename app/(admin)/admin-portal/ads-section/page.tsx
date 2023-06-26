'use client'
import { ComponentShield } from 'app/components/NextShield'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import PortalHeader from 'app/components/PortalHeader'
import { CurrentUser } from '@lib/types'

export default function Advertisements() {
  const { data: user } = useGetUserQuery()
  return (
    <section className="overflow-y-auto">
      <h1 className="px-4 text-2xl font-bold">Advertisements</h1>
    </section>
  )
}
