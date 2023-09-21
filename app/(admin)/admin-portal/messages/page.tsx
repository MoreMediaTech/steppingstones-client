import { CreateMessage } from "./CreateMessage";
import { MessagesSection } from "./MessagesSection";
import Header from "app/components/Header";

export default function Messages() {
  return (
    <section className="overflow-auto md:h-screen">
      <section className="mx-auto my-2 mb-8 mt-4 space-y-2 overflow-y-auto  rounded-md border px-2 py-4 sm:max-w-screen-xl ">
        <div className="flex w-full items-center justify-between py-4">
          <Header title="Enquires" order={2} />
          <CreateMessage />
        </div>
        <MessagesSection />
      </section>
    </section>
  );
}
