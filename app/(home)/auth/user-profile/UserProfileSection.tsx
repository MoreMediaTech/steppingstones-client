"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

// components
import { Button } from "@components/ui/button";
import Avatar from "@components/Avatar";
import UpdateUserForm from "./UpdateUserForm";
import Loader from "@components/Loader";
import { UploadImageForm } from "@components/forms/UploadImageForm";
import Header from "@components/Header";

// zod schema
import { UserSchemaWithIdType } from "@models/User";

// hooks (controller)
import useUserController from "./useUserController";

const UserProfileSection = () => {
  const {
    isLoadingUser,
    isSuccess,
    responseMessage,
    user,
    refetch,
    verifyEmailHandler,
  } = useUserController();

  if (isLoadingUser) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <section className="container relative mx-auto mt-24 w-full max-w-screen-xl space-y-4 py-6 sm:px-4">
        <Header title="Profile" order={1} />
        {!user?.emailVerified && (
          <div className="mb-4 flex items-center justify-between rounded px-4 py-2  shadow-md dark:text-gray-200">
            {!isSuccess ? (
              <>
                <p className="font-poppins text-base">
                  <strong>Note:</strong> <span>Your email</span> (
                  <span className="text-primary">{user?.email}</span>) is
                  unverified.
                </p>
                <Button type="button" onClick={verifyEmailHandler}>
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
            <div className="flex w-full items-center space-x-6 rounded-md p-6 shadow-xl shadow-current  dark:text-gray-200">
              <div className="mr-2 rounded-full">
                <Avatar
                  imageUrl={user?.imageUrl as string}
                  classes="bg-white w-24 h-24"
                />
              </div>
              <div className="space-y-1">
                <div>
                  <h1 className="text-base font-semibold">{user?.name}</h1>
                  <h3 className="text-sm text-gray-500">{user?.role}</h3>
                </div>
                <UploadImageForm
                  type="user"
                  refetch={refetch}
                  user={user as UserSchemaWithIdType}
                />
              </div>
            </div>
          </section>
          <section className="space-y-4 lg:col-span-2">
            <div className=" w-full space-y-4 rounded-md px-4 pb-8 pt-6 shadow-xl shadow-current dark:text-gray-200">
              <h1 className="text-xl font-bold">General Information</h1>
              <UpdateUserForm user={user as UserSchemaWithIdType} disabled />
            </div>
          </section>
        </section>
        <section className=" flex w-full flex-col items-center justify-between space-y-4 rounded-md p-6 shadow-xl shadow-current dark:text-gray-200 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center space-y-2 text-gray-400 md:flex-row md:space-x-4 md:space-y-0">
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
    </>
  );
};

export default UserProfileSection;
