import { Inputs } from 'pages/auth/forgot-password/[token]'
import React from 'react'
import { FieldError, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

interface IChangePasswordResetForm {
  submitHandler: SubmitHandler<Inputs>
  errors: {
    password?: FieldError | undefined
    confirmPassword?: FieldError | undefined
  }
  isLoading: boolean
  register: UseFormRegister<Inputs>
  handleSubmit: UseFormHandleSubmit<Inputs>
}

const ChangePasswordForm = ({submitHandler, register, handleSubmit, errors}: IChangePasswordResetForm) => {
  return (
    <div>ChangePasswordForm</div>
  )
}

export default ChangePasswordForm