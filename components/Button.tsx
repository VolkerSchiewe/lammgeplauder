import React from "react";

interface Props {
  label: string
  type?: "button" | "submit"
  form?: string
  onClick?: () => void
}

const Button: React.FC<Props> = ({ label, type = "button", form, onClick }) => (
  <button type={ type } form={ form } onClick={ onClick }
          className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-xs px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
    { label }
  </button>
)
export default Button
