import { SourceDirectory } from "./SourceDirectory";
import Header from "app/components/Header";
import { CreateSourceForm } from "./createSourceForm";

export default function SourceDirectoryPage() {
  return (
    <section className=" md:h-screen mx-auto container">
      <section className="my-4 w-full rounded-md border sm:px-4 ">
        <div className="flex flex-col sm:flex-row w-full sm:items-center sm:justify-between px-2 gap-2 py-4">
          <Header title="Source Directory" order={2} />
          <CreateSourceForm />
        </div>
        <SourceDirectory />
      </section>
    </section>
  );
}
