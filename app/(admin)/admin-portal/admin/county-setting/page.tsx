import Header from 'app/components/Header'
import { CountySettings } from './CountySettings'
import { CreateCountyForm } from './CreateCountyForm'

export default function Page() {
  return (
    <section className="my-4 mb-8 mt-4 space-y-4 overflow-y-auto overflow-x-hidden rounded-md border px-2 py-2 sm:mx-auto sm:max-w-screen-lg sm:px-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col justify-start space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <Header title="County Settings" order={2} />
          <CreateCountyForm />
        </div>
        <CountySettings />
      </div>
    </section>
  )
}
