import React from "react";

interface Props {
  label: string
  name: string
  defaultChecked?: boolean
}


const CheckboxField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, name, defaultChecked = true }, ref) => {
    return (
      <div className={ "flex flex-col" }>
        <label className="inline-flex items-center">
          <input type="checkbox" ref={ ref } name={ name } defaultChecked={ defaultChecked }
                 className="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"/>
          <span className="ml-2">{ label }</span>
        </label>
      </div>
    );
  })

export default CheckboxField
