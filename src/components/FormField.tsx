import { Controller, UseFormProps } from "react-hook-form";

interface FormFieldProps<T> {
  label: string;
  name: keyof T;
  control: UseFormProps<T>["control"];
  maxLength?: number;
  validate?: (value: any) => boolean | string;
  errorMessage?: string;
}

function FormField<T>({
  label,
  name,
  control,
  maxLength,
  validate,
  errorMessage,
}: FormFieldProps<T>) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name as string}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{
          maxLength: maxLength && {
            value: maxLength,
            message: `Must be at most ${maxLength} characters`,
          },
          validate,
        }}
        render={({ field }) => (
          <>
            <input
              type="text"
              id={name as string}
              {...field}
              className={`mt-1 p-2 block w-full border rounded-md focus:ring-orange-500 focus:border-orange-500 ${
                errorMessage ? "border-red-500" : ""
              }`}
            />
            {errorMessage && (
              <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
            )}
          </>
        )}
      />
    </div>
  );
}

export default FormField;
