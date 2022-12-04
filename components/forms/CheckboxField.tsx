import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  defaultChecked?: boolean;
  register: UseFormRegister<any>;
}

const CheckboxField: React.FC<Props & RegisterOptions> = ({
  label,
  name,
  defaultChecked = true,
  register,
  ...regsiterOptions
}) => {
  return (
    <div className={"flex flex-col"}>
      <label className="inline-flex items-center">
        <input
          {...register(name, regsiterOptions)}
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
        />
        <span className="ml-2">{label}</span>
      </label>
    </div>
  );
};

export default CheckboxField;
