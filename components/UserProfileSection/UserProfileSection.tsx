import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Button, Loader } from '@mantine/core'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

import Avatar from '@components/Avatar'
import { UpdateUserForm, UpdateUserPassForm } from '@components/forms'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import EditImageModal from '@components/EditImageComponent/EditImageModal'
import { CurrentUser } from '@lib/types'
import { useVerifyEmailMutation } from 'features/auth/authApiSlice'
import { showNotification } from '@mantine/notifications'


const UserProfileSection = () => {
  const [opened, setOpened] = useState<boolean>(false)
  const [responseMessage, setResponseMessage] = useState<string>('')
  const { data: user, isLoading, refetch } = useGetUserQuery()
  const [verifyEmail, { isSuccess }] = useVerifyEmailMutation()

  const handleVerifyEmail = useCallback(async () => {
    try {
      const response = await verifyEmail({
        id: user?.id,
        name: user?.name,
        email: user?.email,
      }).unwrap()
      if (response?.success) {
        setResponseMessage(response?.message)
        showNotification({
          message: response?.message ?? 'Email verification email sent',
          color: 'green',
          autoClose: 3000,
        })
      }
    } catch (error: any) {
      showNotification({
        message: error?.message ?? 'Error sending email verification',
        color: 'red',
        autoClose: 3000,
      })
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    )
  }

  return (
    <>
      <section className="container relative mx-auto mt-24 w-full max-w-screen-xl space-y-4 py-6 sm:px-4">
        <h1 className="text-xl font-semibold">User Settings</h1>
        {!user?.emailVerified && (
          <div className="mb-4 flex items-center justify-between rounded bg-white px-4 py-2 shadow-md">
            {!isSuccess ? (
              <>
                <p className="font-poppins text-base">
                  <strong>Note:</strong> <span>Your email</span> (
                  <span className="text-primary">{user?.email}</span>) is
                  unverified.
                </p>
                <Button
                  type="button"
                  color="primary"
                  className="rounded-md bg-primary px-4 py-2 text-center font-semibold text-white transition delay-150 
                duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-secondary md:text-lg"
                  onClick={handleVerifyEmail}
                >
                  Verify
                </Button>
              </>
            ) : (
              <p>{responseMessage}</p>
            )}
          </div>
        )}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <section className="w-full space-y-4 lg:col-span-1">
            <div className="flex w-full items-center space-x-6 rounded-md bg-white  p-6 shadow-xl">
              <div className="mr-2 rounded-full">
                <Avatar
                  imageUrl={user?.imageUrl as string}
                  classes="rounded-lg bg-white w-24 h-24"
                />
              </div>
              <div className="space-y-1">
                <div>
                  <h1 className="text-base font-semibold">{user?.name}</h1>
                  <h3 className="text-sm text-gray-500">{user?.role}</h3>
                </div>
                <Button
                  type="button"
                  className="rounded-md bg-primary px-4 py-2 text-center font-semibold text-white shadow-xl transition delay-150 
                duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-secondary md:text-lg"
                  onClick={() => setOpened(true)}
                >
                  Change Picture
                </Button>
              </div>
            </div>
          </section>
          <section className="space-y-4 lg:col-span-2">
            <div className=" w-full space-y-4 rounded-md bg-white px-4 pt-6 pb-8 shadow-xl">
              <h1 className="text-xl font-bold">General Information</h1>
              <UpdateUserForm
                refetch={refetch}
                user={user as CurrentUser}
                disabled
              />
            </div>
            <div className="w-full space-y-4 rounded-md bg-white px-4 pt-6 pb-8 shadow-xl">
              <h1 className="text-xl font-bold">Password Information</h1>
              <UpdateUserPassForm
                refetch={refetch}
                user={user as CurrentUser}
              />
            </div>
          </section>
        </section>
        <section className=" flex w-full flex-col items-center justify-between space-y-4 rounded-md bg-white p-6 shadow-xl md:flex-row md:space-y-0">
          <div className="flex flex-col items-center space-y-2 text-gray-400 md:flex-row md:space-y-0 md:space-x-4">
            <Link href="#" className=" hover:cursor-pointer hover:underline">
              
                Terms and Conditions
              
            </Link>
            <Link href="#" className=" hover:cursor-pointer hover:underline">
              
                Privacy Policy
              
            </Link>
            <Link href="#" className=" hover:cursor-pointer hover:underline">
              
                Cookie Policy
              
            </Link>
            <Link href="#" className=" hover:cursor-pointer hover:underline">
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4 text-gray-400 md:flex-row">
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
      <EditImageModal
        opened={opened}
        setOpened={setOpened}
        refetch={refetch}
        user={user as CurrentUser}
      />
    </>
  )
}

export default UserProfileSection
