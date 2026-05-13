import type { ReactNode } from "react";

type FieldShellProps = {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
};

export function FieldShell({
  label,
  htmlFor,
  error,
  optional = false,
  children,
}: FieldShellProps) {
  return (
    <label className="flex min-w-0 flex-col gap-2" htmlFor={htmlFor}>
      <span className="text-[13px] font-medium text-ink/80">
        {label}
        {optional ? <span className="ml-1 text-ink/45">(optional)</span> : null}
      </span>
      {children}
      {error ? <span className="text-xs text-danger">{error}</span> : null}
    </label>
  );
}
