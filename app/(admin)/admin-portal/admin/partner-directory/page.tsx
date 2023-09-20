import { PartnerDirectory } from './PartnerDirectory'
import Header from 'app/components/Header'
import { CreatePartnerForm } from './createPartnerForm'

export default function Page() {

  return (
    <section className="overflow-auto md:h-screen">
      <section className="my-4 w-full sm:mt-20 space-y-4 rounded-md border px-2 sm:mx-auto sm:max-w-screen-lg sm:px-4 py-4">
        <div className="mt-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between ">
            <Header title="Partner Directory" order={2} />
            <CreatePartnerForm />
          </div>
        </div>
        <PartnerDirectory />
      </section>
    </section>
  )
}
