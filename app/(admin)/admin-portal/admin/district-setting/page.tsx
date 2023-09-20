// components
import { DistrictSettings } from './DistrictSettings'
import Header from '@components/Header'

export default function Page() {

  return (
    <section className="h-screen overflow-auto">
      <section className="mx-auto my-2 py-4 overflow-y-auto px-2 sm:px-4 sm:my-0 sm:mt-20 sm:max-w-screen-xl border rounded-md">
        <div className='grid grid-cols-1 space-y-4'>
          <Header title="District Setting" order={2} />
          <DistrictSettings />
        </div>
      </section>
    </section>
  )
}
