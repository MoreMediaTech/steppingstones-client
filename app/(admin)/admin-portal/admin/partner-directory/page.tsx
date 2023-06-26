'use client'
import { PartnerDirectorySection } from 'app/(admin)/admin-portal/admin/partner-directory/PartnerDirectory'
import Button from 'app/components/Button'
import { useAppDispatch } from 'app/global-state/hooks'
import {
  setType,
  setOpenEditModal,
} from 'app/global-state/features/editor/editorSlice'
import Header from 'app/components/Header'

export default function PartnerDirectory() {
  const dispatch = useAppDispatch()

  return (
    <section className="overflow-auto md:h-screen">
      <section className="my-4 w-full space-y-4 rounded-md border px-2 sm:mx-auto sm:max-w-screen-lg sm:px-4">
        <div className="mt-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between ">
            <Header title="Partner Directory" order={2} />
            <Button
              type="button"
              color="outline"
              className="w-50 md:w-1/4"
              onClick={() => {
                dispatch(setOpenEditModal(true))
                dispatch(setType('Create'))
              }}
            >
              Add Partner
            </Button>
          </div>
        </div>
        <PartnerDirectorySection />
      </section>
    </section>
  )
}
