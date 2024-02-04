import React from 'react'
import { CountyPortalLayoutWrapper } from './content-portal-layout-wrapper'

export default function CountyPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CountyPortalLayoutWrapper>{children}</CountyPortalLayoutWrapper>
    </>
  )
}
