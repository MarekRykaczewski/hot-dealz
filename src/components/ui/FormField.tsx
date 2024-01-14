import { Controller, FieldValues, useFormContext } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
}

function FormField({
  label,
  name,
  type,
  placeholder,
  required,
}: FormFieldProps) {
  const { control } = useFormContext<FieldValues>();

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-gray-900 text-sm font-medium mb-2"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            id={name}
            placeholder={placeholder}
            className="w-full border rounded-md p-2"
            required={required}
          />
        )}
      />
    </div>
  );
}

export default FormField;
