import { MessagesSection } from './MessagesSection'
import Header from 'app/components/Header'

export default function Messages() {

  return (
    <section className="overflow-auto md:h-screen">
      <section className="mx-auto my-2 mb-8 mt-4 space-y-2 overflow-y-auto  rounded-md border py-4 px-2 sm:max-w-screen-xl ">
        <Header title="Enquires" order={2} />
        <MessagesSection />
      </section>
    </section>
  )
}
