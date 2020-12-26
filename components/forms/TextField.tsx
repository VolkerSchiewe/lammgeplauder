import React from "react";
import { FieldErrors } from "react-hook-form";

interface Props {
  label: string
  multiline?: boolean
  lines?: number
  placeholder?: string
  type?: "date" | "text"
  name: string
  className?: string
  errors: FieldErrors
}


const TexField = React.forwardRef<HTMLInputElement & HTMLTextAreaElement, Props>(
  ({ label, multiline, errors, className = "", lines, placeholder, type = "text", name }, ref) => {
    const error = errors[name]?.message
    return (
      <label className={ `block ${ className }` }>
        <span className="text-gray-700">{ label }</span>
        { multiline ? (
          <textarea name={ name } ref={ ref }
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    rows={ lines }/>
        ) : (
          <input type={ type } name={ name } ref={ ref }
                 className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                 placeholder={ placeholder }/>
        ) }
        <span className={ "text-red-800" }>{ error }</span>
      </label>
    );
  })

export default TexField
