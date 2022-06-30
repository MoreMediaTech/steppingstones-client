import Link from 'next/link'
import { Button } from '@mantine/core'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

import Avatar from '@components/Avatar'
import { GeneralInformationForm, ProfileChangePassForm } from '@components/forms'
import { useGetUserQuery } from 'features/user/usersApiSlice'

const UserProfileSection = () => {
    const { data: user, isLoading, isError, error } = useGetUserQuery()
    // console.log("🚀 ~ file: UserProfileSection.tsx ~ line 9 ~ UserProfileSection ~ user", user)
  return (
    <section className="container relative mx-auto w-full max-w-screen-xl space-y-4 px-4 py-6">
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
        </section>
        <section className="space-y-4 lg:col-span-2">
          <div className=" w-full space-y-4 rounded-md bg-white px-4 pt-6 pb-8 shadow-xl">
            <h1 className="text-xl font-bold">General Information</h1>
            <GeneralInformationForm />
          </div>
          <div className="w-full space-y-4 rounded-md bg-white px-4 pt-6 pb-8 shadow-xl">
            <h1 className="text-xl font-bold">Password Information</h1>
            <ProfileChangePassForm />
          </div>
        </section>
      </section>
      <section className=" flex w-full items-center justify-between rounded-md bg-white p-6 shadow-xl">
        <div className="flex flex-row items-center space-x-4 text-gray-400">
          <Link href="#">
            <a className="hover:cursor-pointer hover:underline">
              Terms and Conditions
            </a>
          </Link>
          <Link href="#">
            <a className="hover:cursor-pointer hover:underline">
              Privacy Policy
            </a>
          </Link>
          <Link href="#">
            <a className="hover:cursor-pointer hover:underline">
              Cookie Policy
            </a>
          </Link>
          <Link href="#">
            <a className="hover:cursor-pointer hover:underline">Contact</a>
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-4 text-gray-400">
          <a href="#" className="hover:cursor-pointer ">
            <FaFacebook />
          </a>
          <a href="#" className="hover:cursor-pointer">
            <FaInstagram />
          </a>
          <a href="#" className="hover:cursor-pointer">
            <FaTwitter />
          </a>
        </div>
      </section>
    </section>
  )
}

export default UserProfileSection
