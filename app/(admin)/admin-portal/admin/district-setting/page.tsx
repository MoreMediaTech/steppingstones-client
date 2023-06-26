import { DistrictSettings } from './DistrictSettings'
import Header from 'app/components/Header'

export default function Page() {

  return (
    <section className="h-screen overflow-auto">
      <section className="mx-auto my-2 py-4 overflow-y-auto px-2 sm:px-4 sm:my-4 sm:max-w-screen-md border rounded-md">
        <div className='grid grid-cols-1 gap2'>
          <Header title="District Setting" order={2} />
          <DistrictSettings />
        </div>
      </section>
    </section>
  )
}
