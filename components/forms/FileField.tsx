import React from "react";
import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
  useWatch,
} from "react-hook-form";

interface Props {
  label: string;
  name: string;
  disabled?: boolean;
  accept: string;
  errors: FieldErrors;
  control: any;
  register: UseFormRegister<any>;
}

const FileField: React.FC<Props & RegisterOptions> = ({
  errors,
  label,
  name,
  accept,
  disabled,
  control,
  register,
  ...registerOptions
}) => {
  const error = errors?.[name]?.message;
  const value: FileList | undefined = useWatch({ name, control });
  const fileName = value ? value[0]?.name : "";
  return (
    <div className={"flex-grow max-w-xs"}>
      <label
        className={`flex flex-col items-center px-4 py-6 rounded-lg tracking-wide uppercase border ${
          disabled
            ? "bg-gray-100 text-gray-600"
            : "cursor-pointer shadow-lg bg-white text-black hover:bg-gray-700 hover:text-white"
        }`}
      >
        <div className={"flex items-center space-x-3"}>
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span>{label}</span>
        </div>
        <span className={"text-xs normal-case"}>{fileName}</span>
        <input
          {...register(name, registerOptions)}
          type="file"
          className="hidden"
          accept={accept}
          name={name}
          disabled={disabled}
        />
      </label>
      <span className={"text-red-800"}>{error?.toString()}</span>
    </div>
  );
};

export default FileField;
