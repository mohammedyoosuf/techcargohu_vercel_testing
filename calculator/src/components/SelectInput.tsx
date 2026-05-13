import type { CalculatorOption } from "../features/calculator/types";
import { FieldShell } from "./FieldShell";

type SelectInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: CalculatorOption[];
  placeholder?: string;
  error?: string;
  optional?: boolean;
};

export function SelectInput({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  optional,
}: SelectInputProps) {
  return (
    <FieldShell label={label} htmlFor={id} error={error} optional={optional}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full min-w-0 rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none transition focus:border-mint focus:ring-2 focus:ring-mint/15"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.description
              ? `${option.label} - ${option.description}`
              : option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
