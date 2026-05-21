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
        min={min !== undefined ? min : (type === "number" ? 0 : undefined)}
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          const val = event.target.value;
          // Extra safety check in case they paste a negative number
          if (type === "number" && val.includes("-")) return;
          onChange(val);
        }}
        onKeyDown={(event) => {
          if (type === "number" && (event.key === "-" || event.key === "e" || event.key === "E")) {
            event.preventDefault();
          }
        }}
        className="h-11 w-full min-w-0 rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none transition focus:border-mint focus:ring-2 focus:ring-mint/15"
      />
    </FieldShell>
  );
}
