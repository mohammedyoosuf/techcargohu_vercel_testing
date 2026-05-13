import type { ReactNode } from "react";

type SectionCardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function SectionCard({ title, children, className = "" }: SectionCardProps) {
  return (
    <section
      className={`min-w-0 rounded-panel border border-line bg-white p-4 shadow-panel sm:p-5 ${className}`.trim()}
    >
      {title ? (
        <header className="mb-4">
          <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
        </header>
      ) : null}
      {children}
    </section>
  );
}
