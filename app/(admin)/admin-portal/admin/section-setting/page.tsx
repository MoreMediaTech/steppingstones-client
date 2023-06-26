import { SectionsSettings } from './SectionSettings'

import Header from 'app/components/Header'

export default function SectionSettingsPage() {
  return (
    <section className="h-screen overflow-auto">
      <section className="mx-auto mt-2 space-y-4 overflow-y-auto px-2 sm:px-4 md:max-w-screen-xl">
        <div className="gap2 grid grid-cols-1">
          <Header title="Section Settings" order={2} />
          <SectionsSettings />
        </div>
      </section>
    </section>
  )
}
