import { FieldShell } from "./FieldShell";

type TextInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "number";
  placeholder?: string;
  error?: string;
  optional?: boolean;
  min?: number;
};

export function TextInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  optional,
  min,
}: TextInputProps) {
  return (
    <FieldShell label={label} htmlFor={id} error={error} optional={optional}>
      <input
        id={id}
        type={type}
        inputMode={type === "number" ? "numeric" : undefined}
        min={min}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full min-w-0 rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none transition focus:border-mint focus:ring-2 focus:ring-mint/15"
      />
    </FieldShell>
  );
}
