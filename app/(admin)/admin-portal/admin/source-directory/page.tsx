import { SourceDirectory } from "app/(admin)/admin-portal/admin/source-directory/SourceDirectory";
import Header from "app/components/Header";
import { CreateSourceForm } from "./createSourceForm";

export default function SourceDirectoryPage() {
  return (
    <section className="overflow-auto md:h-screen">
      <section className="mx-auto mb-8 mt-4 w-full overflow-y-auto rounded-md border px-2 py-2 sm:px-4 md:max-w-screen-lg">
        <div className="flex w-full items-center justify-between py-4">
          <Header title="Source Directory" order={2} />
          <CreateSourceForm />
        </div>
        <SourceDirectory />
      </section>
    </section>
  );
}
