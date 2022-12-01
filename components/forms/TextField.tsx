import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  multiline?: boolean;
  lines?: number;
  placeholder?: string;
  type?: "date" | "text";
  name: string;
  className?: string;
  errors: FieldErrors;
  register: UseFormRegister<any>;
  required?: boolean;
}

const TexField: React.FC<Props> = ({
  name,
  required = false,
  label,
  multiline,
  errors,
  className = "",
  lines,
  placeholder,
  type = "text",
  register,
}) => {
  const error = errors?.[name]?.message;
  return (
    <label className={`block ${className}`}>
      <span className="text-gray-700">{label}</span>
      {multiline ? (
        <textarea
          {...register(name, { required })}
          className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          rows={lines}
        />
      ) : (
        <input
          {...register(name, { required })}
          type={type}
          className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          placeholder={placeholder}
        />
      )}
      <span className={"text-red-800"}>{error?.toString()}</span>
    </label>
  );
};

export default TexField;
