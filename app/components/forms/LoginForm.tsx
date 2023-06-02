'use client'
import { useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { showNotification } from '@mantine/notifications'
import { Button, PasswordInput } from '@mantine/core'
import ReCAPTCHA from 'react-google-recaptcha'
import Link from 'next/link'

import { useLoginMutation } from 'app/global-state/features/auth/authApiSlice'
import { NEXT_URL } from '@config/index'
import FormInput from './FormComponents/FormInput'
import { useAppDispatch } from 'app/global-state/hooks'
import { setCredentials } from 'app/global-state/features/auth/authSlice'
import usePersist from '@hooks/usePersist'
import FormCheckbox from './FormComponents/FormCheckBox'

type LoginFormProps = {
  email: string
  password: string
}

const LoginForm: React.FC = (): JSX.Element => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { theme } = useTheme()
  const [login, { isLoading, isError, error: loginError }] = useLoginMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormProps>()
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)
  const formInputRef = useRef<HTMLInputElement | null>(null)
  const [persist, setPersist] = usePersist()

  const handleLogin: SubmitHandler<LoginFormProps> = async (data) => {
    const token = await recaptchaRef.current?.executeAsync()
    recaptchaRef?.current?.reset()
    try {
      const responseData = await login({
        email: data.email,
        password: data.password,
        token,
      }).unwrap()
      dispatch(setCredentials({ token: responseData.token }))
      // localStorage.setItem('token', responseData.token)
      router.push(`/admin-portal`)
      reset()
    } catch (error) {
      if (!error?.response) {
        showNotification({
          message: 'No server response',
          autoClose: 3000,
          color: 'red',
        })
      } else if (error.response?.status === 400) {
        showNotification({
          message: 'Invalid credentials',
          autoClose: 3000,
          color: 'red',
        })
      } else if (error.response?.status === 401) {
        showNotification({
          message: 'Unauthorized',
          autoClose: 3000,
          color: 'red',
        })
      } else {
        showNotification({
          message: 'Login Failed',
          autoClose: 3000,
          color: 'red',
        })
      }
    }
  }

  const handleToggle = () =>
    setPersist((prev: boolean) => !prev) as React.Dispatch<
      React.SetStateAction<boolean>
    >
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="mt-2 grid w-full max-w-screen-sm gap-2 rounded-md bg-slate-100 dark:bg-slate-900 p-4 shadow-md "
    >
      <FormInput
        title="email"
        aria-label="Email"
        placeholder="Email"
        label="Username"
        type="email"
        resolvedTheme={theme}
        {...register('email', {
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        })}
        errors={errors.email}
        labelStyles={{ color: 'white' }}
        inputStyles={{ backgroundColor: 'white' }}
      />
      {errors.email && (
        <span className="text-center text-sm text-red-500">
          {errors.email?.message || 'Your email is required'}
        </span>
      )}

      <PasswordInput
        id="password"
        aria-label="password"
        label="Password"
        withAsterisk
        placeholder="Enter password"
        labelProps={{
          style: {
            display: 'block',
            fontSize: '0.875rem',
            color: theme === 'dark' ? 'white' : 'black',
          },
        }}
        {...register('password', {
          required: true,
          minLength: {
            value: 7,
            message: 'Please enter a password with at least 7 characters',
          },
          maxLength: {
            value: 15,
            message: 'Please enter a password not more than 15 characters',
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/,
            message:
              'Password must contain at least one uppercase letter, one number and one special character',
          },
        })}
        variant="default"
        className="w-full "
        styles={{
          label: { color: 'white' },
          input: { backgroundColor: 'white' },
        }}
        error={
          errors.password
            ? errors.password?.message || 'A password is required'
            : undefined
        }
      />

      <FormCheckbox
        type="persist"
        title="persist"
        label="Trust this device"
        onChange={handleToggle}
        checked={persist}
      />
      <div className=" place-self-start">
        <Link
          href={'/auth/forgot-password'}
          className="cursor-pointer  text-sm text-[#00DCB3]"
        >
          Forgot Password?
        </Link>
      </div>

      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
      />
      <div className="w-full">
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          size="md"
          className=" w-full rounded-md border border-[#5E17EB] bg-[#5E17EB] text-white hover:bg-[#3A0B99]"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
