import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { ComponentShield } from '@components/NextShield'
import { AdminLayout } from 'layout'
import { CurrentUser } from '@lib/types'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import Spinner from '@components/spinner'
import PortalHeader from '@components/PortalHeader'

const VatAndTax = ({ district }: { district: string }) => {
 const router = useRouter()
 const { data: user, isLoading, isError, isFetching } = useGetUserQuery()
 return (
   <AdminLayout title="County - Editor Dashboard">
     {isLoading && <Spinner classes="w-24 h-24" message="Loading..." />}
     {isError && (
       <div className="flex h-full items-center justify-center">
         An Error has occurred
       </div>
     )}
     <ComponentShield
       RBAC
       showForRole={'SS_EDITOR'}
       userRole={user?.role ?? ''}
     >
       <section className="h-screen">
         <PortalHeader user={user as CurrentUser} district={district} />
         <div className="px-4 py-2">
           <button
             type="button"
             className="rounded-md bg-[#0c6980] px-4 py-2 font-semibold text-white drop-shadow-lg"
             onClick={() => {
               router.back()
             }}
           >
             Go Back
           </button>
         </div>
         <section className="flex items-center justify-center md:h-[700px] md:py-28">
           <h1>{district}</h1>
         </section>
       </section>
     </ComponentShield>
   </AdminLayout>
 )
}
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const cookies = req.cookies.ss_refresh_token
  const { district } = context.query

  if (!cookies) {
    context.res.writeHead(302, {
      Location: '/auth/login',
    })
    context.res.end()
  }

  return {
    // props: { user: user as SessionProps },
    props: {
      district: district,
    },
  }
}

export default VatAndTax
