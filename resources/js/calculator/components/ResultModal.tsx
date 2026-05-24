import { useEffect } from "react";
import { formatCurrency } from "../lib/calculations";
import type { EstimateResult } from "../features/calculator/types";

type ResultModalProps = {
  result: EstimateResult;
  onClose: () => void;
};

function DetailRow({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex items-start justify-between gap-6 ${className}`.trim()}>
      <span className="text-[1.05rem] text-[#4a5a72]">{label}</span>
      <span className="text-right text-[1.05rem] font-medium text-[#161616]">{value}</span>
    </div>
  );
}

export function ResultModal({ result, onClose }: ResultModalProps) {
  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 sm:p-6">
      <div className="flex max-h-[88vh] w-full max-w-[620px] md:max-w-[850px] lg:max-w-[950px] flex-col overflow-hidden rounded-[1.7rem] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
        <div className="shrink-0 rounded-t-[1.7rem] bg-gradient-to-r from-brand to-mint px-5 py-4 text-white sm:px-7 sm:py-5">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h2 className="text-[1.7rem] font-semibold tracking-[-0.04em] sm:text-[2.05rem]">
                Your Cost Comparison
              </h2>
              <p className="mt-1.5 text-base font-medium text-white/95 sm:text-[1.05rem]">
                Detailed breakdown and savings analysis
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-3xl leading-none text-white/95 transition hover:text-white"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section className="w-full h-full flex flex-col rounded-[1.35rem] border border-[#d8dde7] bg-gradient-to-r from-[#fafbfd] to-[#f5f7fb] px-4 py-4 shadow-[0_8px_24px_rgba(18,32,57,0.08)] sm:px-5 sm:py-4">
              <h3 className="text-[1.18rem] font-semibold tracking-[-0.03em] text-[#18243a] sm:text-[1.32rem]">
                1. How much is it costing me at present
              </h3>
              <div className="mt-4 space-y-2.5 flex-1">
              <DetailRow
                label="Warehouse Rent:"
                value={formatCurrency(result.currentBreakdown.warehouseRent)}
              />
              <DetailRow
                label="Monthly Capex Allocation:"
                value={formatCurrency(result.currentBreakdown.monthlyCapexAllocation)}
              />
              <DetailRow
                label="Staff Costs:"
                value={formatCurrency(result.currentBreakdown.staffCosts)}
              />
              <DetailRow
                label="Utilities:"
                value={formatCurrency(result.currentBreakdown.utilities)}
              />
              <DetailRow
                label="Other Expenses:"
                value={formatCurrency(result.currentBreakdown.otherExpenses)}
              />
              <DetailRow label="WMS:" value={formatCurrency(result.currentBreakdown.wms)} />
            </div>
            <div className="mt-4 border-t border-[#c7cdd7] pt-3">
              <DetailRow
                label="Monthly Total:"
                value={formatCurrency(result.currentTotal)}
                className="items-end"
              />
            </div>
          </section>

            <section className="w-full h-full flex flex-col rounded-[1.35rem] border border-[#99f2bf] bg-gradient-to-r from-[#f2fcf6] to-[#eefcf4] px-4 py-4 shadow-[0_8px_24px_rgba(31,169,122,0.08)] sm:px-5 sm:py-4">
              <h3 className="text-[1.18rem] font-semibold tracking-[-0.03em] text-[#18243a] sm:text-[1.32rem]">
                2. How much will it cost at TCH
              </h3>
              <div className="mt-4 space-y-2 flex-1">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <p className="text-[0.98rem] font-semibold text-[#18243a]">Storage / Loading and Unloading / Inventory Control</p>
                  <p className="mt-1 text-[0.9rem] leading-6 text-[#4a5a72]">
                    {result.storageSummary}
                  </p>
                </div>
                <p className="shrink-0 text-right text-[0.98rem] font-semibold text-[#161616]">
                  {formatCurrency(result.storage)}
                </p>
              </div>
              {result.handling > 0 ? (
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <p className="text-[0.98rem] font-semibold text-[#18243a]">Additional Handling</p>
                    {result.handlingSummary ? (
                      <p className="mt-1 text-[0.9rem] leading-6 text-[#4a5a72]">{result.handlingSummary}</p>
                    ) : null}
                  </div>
                  <p className="shrink-0 text-right text-[0.98rem] font-semibold text-[#161616]">
                    {formatCurrency(result.handling)}
                  </p>
                </div>
              ) : null}
              {result.sorting > 0 ? (
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <p className="text-[0.98rem] font-semibold text-[#18243a]">Fulfilment Charges</p>
                    {result.sortingSummary ? (
                      <p className="mt-1 text-[0.9rem] leading-6 text-[#4a5a72]">{result.sortingSummary}</p>
                    ) : null}
                  </div>
                  <p className="shrink-0 text-right text-[0.98rem] font-semibold text-[#161616]">
                    {formatCurrency(result.sorting)}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="mt-4 border-t border-[#c7cdd7] pt-3">
              <div className="flex items-end justify-between gap-6">
                <span className="text-[1rem] font-semibold text-[#161616]">
                  TCH Total Cost:
                </span>
                <span className="text-right text-[1.18rem] font-semibold text-[#1fa97a] sm:text-[1.3rem]">
                  {formatCurrency(result.tchTotal)}
                </span>
              </div>
            </div>
            </section>
          </div>

          <section
            className={`w-full rounded-[1.35rem] border px-4 py-4 shadow-[0_8px_24px_rgba(18,32,57,0.06)] sm:px-5 sm:py-4 ${
              result.isSavingsPositive
                ? "border-[#8de2b3] bg-gradient-to-r from-[#f4fcf7] to-[#f6fffa]"
                : "border-[#ff6b6b] bg-gradient-to-r from-[#fff7f7] to-[#fffafb]"
            }`}
          >
            <h3 className="text-[1.18rem] font-semibold tracking-[-0.03em] text-[#18243a] sm:text-[1.32rem]">
              3. Savings Analysis
            </h3>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p
                  className={`text-[1.02rem] font-semibold ${
                    result.isSavingsPositive ? "text-[#109863]" : "text-[#d60000]"
                  }`}
                >
                  {result.isSavingsPositive ? "You save with TCH" : "TCH costs more"}
                </p>
                <p className="mt-1.5 text-[0.9rem] text-[#4a5a72]">
                  {result.isSavingsPositive ? "Estimated monthly savings" : "Additional monthly cost"}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p
                  className={`text-[1.85rem] font-semibold tracking-[-0.04em] sm:text-[2.15rem] ${
                    result.isSavingsPositive ? "text-[#109863]" : "text-[#ed0000]"
                  }`}
                >
                  {formatCurrency(Math.abs(result.savings))}
                </p>
                <p
                  className={`mt-1 text-[0.92rem] font-semibold ${
                    result.isSavingsPositive ? "text-[#109863]" : "text-[#ed0000]"
                  }`}
                >
                  {result.savingsPercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-[#e5e7eb] pt-3.5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-12 w-full items-center justify-center rounded-[1.35rem] bg-gradient-to-r from-brand to-mint px-6 text-[1rem] font-semibold text-white shadow-[0_10px_24px_rgba(15,61,51,0.22)] transition hover:opacity-95"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}