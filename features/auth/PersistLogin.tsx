import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRefreshMutation } from './authApiSlice'
import usePersist from '@hooks/usePersist'
import { useAppSelector } from 'app/hooks'
import { selectCurrentToken } from './authSlice'
import { OutletProps } from '@lib/types'

interface Error {
    data: {
        message: string
    }
    status: number
}

function checkIsError(obj: unknown): obj is Error{
  return (
    typeof obj === 'object' && obj !== null && 'data' in obj && 'status' in obj
  )
}

declare function Outlet(props: OutletProps): React.ReactElement | null 



const PersistLogin = () => {
  const [persist] = usePersist()
  const token = useAppSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log('verifying refresh token')
        try {
          //const response =
          await refresh().unwrap()
          //const { token } = response.data
          setTrueSuccess(true)
        } catch (err) {
          console.error(err)
        }
      }

      if (!token && persist) verifyRefreshToken()
    }

    return () => {
      effectRan.current = true
    }

    // eslint-disable-next-line
  }, [])

  let content: React.ReactElement | null = null
  if (!persist) {
    // persist: no
    console.log('no persist')
    content = <Outlet />
  } else if (isLoading) {
    //persist: yes, token: no
    console.log('loading')
    content = <p>Loading...</p>
  } else if (isError) {
    //persist: yes, token: no
    console.log('error')
    content = (
      <p className="text-red-500 font-semibold text-lg text-center">
        {checkIsError(error) && error.data?.message as string}
        <Link href="/login">Please login again</Link>.
      </p>
    )
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log('success')
    content = <Outlet />
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log('token and uninit')
    console.log(isUninitialized)
    content = <Outlet />
  }

  return content
}

export default PersistLogin
