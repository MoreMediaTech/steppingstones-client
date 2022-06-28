
import Avatar from '@components/Avatar'
import { GeneralInformationForm } from '@components/forms'
import { Button } from '@mantine/core'
import { useGetUserQuery } from 'features/user/usersApiSlice'

const UserProfileSection = () => {
    const { data: user, isLoading, isError, error } = useGetUserQuery()
  return (
    <section className="relative w-full space-y-4 bg-slate-300 px-4 py-6">
      <h1 className="text-xl font-semibold">User Settings</h1>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="w-full space-y-4 lg:col-span-1">
          <div className="flex w-full items-center space-x-6 rounded-md bg-white  p-6 shadow-xl">
            <div className="mr-2 w-20 rounded-full">
              <Avatar imageUrl="" classes="rounded-lg" />
            </div>
            <div className="space-y-1">
              <div>
                <h1 className="text-xl font-semibold">{user?.name}</h1>
                <h3 className="text-sm text-gray-500">{user?.role}</h3>
              </div>
              <Button
                type="button"
                className="rounded-md bg-[#5E17EB] px-4 py-2 text-center font-semibold text-white shadow-xl transition delay-150 
                duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#3A0B99] md:text-lg"
              >
                Change Picture
              </Button>
            </div>
          </div>
          <div className="h-[400px] w-full rounded-md bg-white shadow-xl"></div>
          <div className="h-[400px] w-full rounded-md bg-white shadow-xl"></div>
          <div className="h-[400px] w-full rounded-md bg-white shadow-xl"></div>
        </section>
        <section className="space-y-4 lg:col-span-2">
          <div className="h-[700px] w-full rounded-md bg-white px-4 pt-6 pb-8 shadow-xl space-y-4">
            <h1 className='font-bold text-xl'>General Information</h1>
            <GeneralInformationForm />
          </div>
          <div className="h-[400px] w-full rounded-md bg-white shadow-xl"></div>
          <div className="h-[200px] w-full rounded-md bg-white shadow-xl"></div>
        </section>
      </section>
    </section>
  )
}

export default UserProfileSection
