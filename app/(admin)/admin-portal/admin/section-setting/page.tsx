import { SectionsSettings } from './SectionSettings'

import Header from 'app/components/Header'

export default function SectionSettingsPage() {
  return (
    <section className="h-screen overflow-auto">
      <section className="mx-auto mb-8 mt-4 sm:mt-20 w-full overflow-y-auto rounded-md border px-2 py-2 sm:px-4 md:max-w-screen-lg">
        <div className="space-y-4">
          <Header title="Section Settings" order={2} />
          <SectionsSettings />
        </div>
      </section>
    </section>
  );
}
