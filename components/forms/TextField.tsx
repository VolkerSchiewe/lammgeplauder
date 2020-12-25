import React from "react";

interface Props {
  label: string
  multiline?: boolean
  lines?: number
  placeholder?: string
  type?: "date" | "text"
}


const TexField: React.FC<Props> = ({ label, multiline, lines, placeholder, type = "text" }) => (
  <label className="block">
    <span className="text-gray-700">{ label }</span>
    { multiline ? (
      <textarea
        className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        rows={ lines }/>
    ) : (
      <input type={ type }
             className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
             placeholder={ placeholder }/>
    ) }

  </label>
)

export default TexField
