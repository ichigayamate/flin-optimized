import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>
  type?: string;
}


export default function Input<T extends FieldValues>({
  name,
  control,
  ...props
}: Readonly<InputProps<T>>) {
  return <Controller
  name={name}
  render={({ field }) => (
    <input
      {...props}
      value={field.value ?? ""}
      onChange={(e) => field.onChange(e.target.value)}
      onBlur={field.onBlur}
      className={`border border-neutral-300 px-2 py-1 rounded ${props.className ?? ""}`}
    />
  )}
  control={control}
  />
}