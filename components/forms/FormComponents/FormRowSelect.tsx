import React from 'react'

export type Ref = HTMLSelectElement

type SelectProps = {
  title?: string
  type: string
  list: string[]
  label: string
}

const FormRowSelect: React.FunctionComponent<
  SelectProps & React.RefAttributes<HTMLSelectElement>
> = React.forwardRef<Ref, SelectProps>(
  ({ list, label, title, type, ...props }: SelectProps, ref) => (
    <>
      <div className="w-full space-y-2">
        <label
          htmlFor={type}
          className="my-2 text-sm font-semibold text-gray-900 dark:text-primary-light-100"
        >
          {label} <span className="text-red-500">*</span>
        </label>
        <select
          className="form-select block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
          id={`${type}`}
          ref={ref}
          aria-label={`${type}-input`}
          aria-errormessage={`${type}-error`}
          name={`${type}`}
          aria-invalid="true"
          {...props}
        >
          {list?.map((itemValue, index) => {
            return (
              <option key={`${index} + ${itemValue}`} value={itemValue}>
                {itemValue}
              </option>
            )
          })}
        </select>
      </div>
    </>
  )
)

FormRowSelect.displayName = 'FormRowSelect'

export default FormRowSelect
