import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IFormData } from "@lib/types";

export type Ref = HTMLInputElement;

type InputProps = {
  title: string;
  errors: any;
  type: string;
  inputType: string;
};

const FormRowInput: React.FunctionComponent<
  React.ClassAttributes<HTMLInputElement> &
    React.InputHTMLAttributes<HTMLInputElement> &
    InputProps
> = React.forwardRef<Ref, InputProps>(
  ({ title, errors, type, inputType, ...props }: InputProps, ref) => (
    <div className="mb-4 w-full">
      <label htmlFor="position" className="mb-2 block text-base font-bold ">
        {title}
      </label>
      <input
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-900 shadow focus:outline-none dark:bg-white"
        id={`${type}`}
        ref={ref}
        type={`${inputType}`}
        placeholder={`${title}`}
        aria-label={`${type}-input`}
        aria-errormessage={`${type}-error`}
        name={`${type}`}
        aria-invalid="true"
        {...props}
      />
      {errors && (
        <span
          id={`${type}-error`}
          className="text-gray-800 dark:text-yellow-500"
        >
          {errors?.message}
        </span>
      )}
    </div>
  )
)

FormRowInput.displayName = "FormRowInput";

export default FormRowInput;
