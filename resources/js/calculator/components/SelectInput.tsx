import { useEffect, useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <FieldShell label={label} htmlFor={id} error={error} optional={optional}>
      <div className="relative" ref={containerRef}>
        <button
          id={id}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-11 w-full items-center justify-between rounded-xl border bg-white px-4 text-left text-sm transition focus:ring-2 focus:ring-mint/15 ${
            isOpen ? "border-mint ring-2 ring-mint/15" : "border-line"
          } ${error ? "border-danger" : ""}`}
        >
          <span className={selectedOption ? "text-ink" : "text-ink/40"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`h-4 w-4 text-ink/40 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute left-0 z-50 mt-2 w-full origin-top transform rounded-2xl border border-line bg-white p-1.5 shadow-2xl animate-fade-in">
            <div className="max-h-60 overflow-y-auto scroll-smooth">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`group flex w-full flex-col items-start rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-soft ${
                    value === option.value ? "bg-soft" : ""
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      value === option.value ? "text-mint" : "text-ink"
                    }`}
                  >
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="mt-0.5 text-xs text-ink/50 group-hover:text-ink/60">
                      {option.description}
                    </span>
                  )}
                </button>
              ))}
              {options.length === 0 && (
                <div className="px-3 py-4 text-center text-sm text-ink/40">No options available</div>
              )}
            </div>
          </div>
        )}
      </div>
    </FieldShell>
  );
}
