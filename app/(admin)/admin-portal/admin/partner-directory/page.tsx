import { PartnerDirectory } from './PartnerDirectory'
import Header from 'app/components/Header'
import { CreatePartnerForm } from './createPartnerForm'

export default function Page() {

  return (
    <section className="container mx-auto overflow-auto md:h-screen">
      <section className="my-4 w-full space-y-4 rounded-md border px-2 py-4 sm:mt-2 sm:px-4">
        <div className="mt-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between ">
            <Header title="Partner Directory" order={2} />
            <CreatePartnerForm />
          </div>
        </div>
        <PartnerDirectory />
      </section>
    </section>
  );
}
