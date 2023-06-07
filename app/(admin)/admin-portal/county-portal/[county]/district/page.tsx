'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@mantine/core'
import dynamic from 'next/dynamic'

import { ComponentShield } from 'app/components/NextShield'
import PortalHeader from 'app/components/PortalHeader'
import Button from 'app/components/Button'
import { CreateLASectionForm } from 'app/components/forms'
import { DistrictSectionProps } from '@lib/types'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import {
  useGetDistrictByIdQuery,
  useCreateDistrictSectionMutation,
} from 'app/global-state/features/editor/editorApiSlice'
import PortalButton from 'app/components/PortalButton'
import Districts from './districts'

const Map = dynamic(() => import('app/components/Map'), { ssr: false })

type Props = {
  searchParams: {
    county: string
    countyId: string
    district: string
    districtId: string
  }
}

export default function Page({ searchParams }: Props) {
  return (
    <>
      <Districts searchParams={searchParams} />
    </>
  )
}
