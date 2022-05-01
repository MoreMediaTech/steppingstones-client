import React from 'react'
import { FieldError } from 'react-hook-form'
import { AiOutlineRight } from 'react-icons/ai'

export type Ref = HTMLSelectElement

type SelectProps = {
  title: string
  type: string
  list: string[]
  opened: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  errors: { county?: FieldError | undefined }
}

const FormRowSelect: React.FunctionComponent<
  SelectProps & React.RefAttributes<HTMLSelectElement>
> = React.forwardRef<Ref, SelectProps>(
  (
    { list, errors, title, type, opened, setOpen, ...props }: SelectProps,
    ref
  ) => (
    <>
      <div
        className="flex w-full items-center rounded-md border-2 border-gray-200 p-2"
        onClick={() => setOpen(() => !opened)}
      >
        <label htmlFor="jobType" className="mb-2 block text-base font-bold ">
          {title}
        </label>
        <select
          className="w-full appearance-none bg-white px-3 py-2 leading-tight text-gray-900 focus:outline-none focus:ring-0  dark:bg-white"
          id={`${type}`}
          ref={ref}
          aria-label={`${type}-input`}
          aria-errormessage={`${type}-error`}
          name={`${type}`}
          aria-invalid="true"
          onClick={() => setOpen(() => !opened)}
          {...props}
        >
          {list?.map((itemValue, index) => {
            return (
              <option
                key={`${index} + ${itemValue}`}
                value={itemValue}
                onChange={() => setOpen(() => !opened)}
              >
                {itemValue}
              </option>
            )
          })}
        </select>
        <span
          className={`${
            opened
              ? 'rotate-90 transition-all duration-150 ease-in-out '
              : 'rotate-0 transition-all duration-150 ease-in-out'
          }`}
        >
          <AiOutlineRight fontSize={18} />
        </span>
      </div>
      {errors.county && (
        <div
          id={`${type}-error`}
          className="text-gray-800 dark:text-yellow-500"
        >
          <p>{errors.county?.message}</p>
        </div>
      )}
    </>
  )
)

FormRowSelect.displayName = 'FormRowSelect'

export default FormRowSelect
