import { SourceDirectory } from 'app/(admin)/admin-portal/admin/source-directory/SourceDirectory'
import Header from 'app/components/Header'

export default function SourceDirectoryPage() {
  return (
    <section className="overflow-auto md:h-screen">
      <section className="mx-auto mt-4 mb-8 w-full overflow-y-auto rounded-md border px-2 py-2 sm:px-4 md:max-w-screen-lg">
        <Header title="Source Directory" order={2} />
        <SourceDirectory />
      </section>
    </section>
  )
}
