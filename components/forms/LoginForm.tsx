import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormData } from '@lib/types'
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>()
  const handleSignUp: SubmitHandler<IFormData> = async (data) => {
      console.log(data)
    try {
    //   const response = await fetch('http://localhost:5001/api/users/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   })
    //   const responseData = await response.json()
    //   console.log(responseData)
      reset()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="flex w-full flex-col items-center space-y-2 max-w-screen-sm px-2"
    >
      <div className="w-full rounded-md border-2 border-gray-200 bg-white">
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            },
          })}
          className="focus:shadow-outline w-full appearance-none rounded-md p-2 focus:outline-none"
        />
      </div>
      <div className="w-full rounded-md border-2 border-gray-200 bg-white">
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          {...register('password', { required: true })}
          className="focus:shadow-outline w-full appearance-none rounded-md p-2 focus:outline-none"
        />
      </div>
      <div className="w-full">
        <button
          type="submit"
          className="rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default LoginForm
