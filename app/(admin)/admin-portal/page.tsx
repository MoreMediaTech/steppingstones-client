import Loader from '@components/Loader'
import { RenderInsights } from './Insights'
import { Suspense } from 'react'

export default function AdminPortal() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RenderInsights />
      </Suspense>
    </>
  )
}
