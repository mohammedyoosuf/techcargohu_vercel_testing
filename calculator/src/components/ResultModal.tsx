import { formatCurrency } from "../lib/calculations";
import type { EstimateResult } from "../features/calculator/types";

type ResultModalProps = {
  result: EstimateResult;
  onClose: () => void;
};

function ResultRow({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: number;
  emphasized?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-sm text-ink/72">{label}</span>
      <span className={emphasized ? "text-base font-semibold text-ink" : "text-sm font-medium text-ink"}>
        {formatCurrency(value)}
      </span>
    </div>
  );
}

export function ResultModal({ result, onClose }: ResultModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[24px] bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
          <div>
            <h2 className="text-2xl font-semibold text-ink">Your Cost Comparison</h2>
            <p className="mt-1 text-sm text-ink/65">
              {result.organizationName || result.customerName
                ? `Prepared for ${result.organizationName || result.customerName}`
                : "Review your current cost against TCH"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line px-3 py-2 text-sm text-ink transition hover:border-ink/35"
          >
            Close
          </button>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_1fr_0.92fr]">
          <div className="rounded-2xl border border-line bg-soft px-4 py-3.5">
            <h3 className="text-sm font-semibold text-ink">How much is it costing me at present</h3>
            <div className="mt-3">
              <ResultRow label="Monthly Total" value={result.currentTotal} emphasized />
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-soft px-4 py-3.5">
            <h3 className="text-sm font-semibold text-ink">How much will it cost at TCH</h3>
            <div className="mt-3 divide-y divide-line">
              <ResultRow label="Storage" value={result.storage} />
              <ResultRow label="Handling" value={result.handling} />
              <ResultRow label="Fulfilment" value={result.fulfilment} />
              <ResultRow label="Total" value={result.tchTotal} emphasized />
            </div>
          </div>

          <div
            className={`rounded-2xl border px-4 py-3.5 ${
              result.isSavingsPositive
                ? "border-success/25 bg-success/10"
                : "border-danger/25 bg-danger/10"
            }`}
          >
            <h3 className="text-sm font-semibold text-ink">Savings</h3>
            <p
              className={`mt-4 text-3xl font-semibold ${
                result.isSavingsPositive ? "text-success" : "text-danger"
              }`}
            >
              {formatCurrency(Math.abs(result.savings))}
            </p>
            <p className="mt-2 text-sm text-ink/72">
              {result.isSavingsPositive
                ? "You save with Tech Cargo Hub."
                : "TCH costs more than your current setup."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
