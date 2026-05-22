import { useState } from "react";
import { ResultModal } from "../../components/ResultModal";
import { SectionCard } from "../../components/SectionCard";
import { SelectInput } from "../../components/SelectInput";
import { TextInput } from "../../components/TextInput";
import {
  containerTypeOptions,
  goodsTypeLabel,
  productTypeOptions,
  sizeOptions,
  storageWeightOptions,
} from "../../data/options";
import { buildEstimateResult } from "../../lib/calculations";
import { validateStepOne, validateStepTwo } from "../../lib/validation";
import type {
  BusinessDetailsState,
  EstimateResult,
  PresentCostState,
  StepOneFormState,
} from "./types";

const initialStepOne: StepOneFormState = {
  productWeight: "",
  cbm: "",
  days: "",
  containerType: "",
  fulfilmentSize: "",
  fulfilmentUnits: "",
  handlingSize: "",
  handlingUnits: "",
  packingSize: "",
  packingUnits: "",
};

const initialPresentCosts: PresentCostState = {
  warehouseRent: "",
  monthlyCapexAllocation: "",
  staffCosts: "",
  utilities: "",
  otherExpenses: "",
  wms: "",
};

const initialBusinessDetails: BusinessDetailsState = {
  organizationName: "",
  yourName: "",
  email: "",
  phone: "",
  productType: "",
};

type Step = 1 | 2;

export function WarehouseCalculatorApp() {
  const [step, setStep] = useState<Step>(1);
  const [stepOne, setStepOne] = useState<StepOneFormState>(initialStepOne);
  const [presentCosts, setPresentCosts] = useState<PresentCostState>(initialPresentCosts);
  const [businessDetails, setBusinessDetails] = useState<BusinessDetailsState>(initialBusinessDetails);
  const [stepOneErrors, setStepOneErrors] = useState<Record<string, string>>({});
  const [stepTwoErrors, setStepTwoErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<EstimateResult | null>(null);

  function updateStepOne<K extends keyof StepOneFormState>(key: K, value: StepOneFormState[K]) {
    setStepOne((current) => ({ ...current, [key]: value }));
    setStepOneErrors((current) => ({ ...current, [key]: "" }));
  }

  function updatePresentCost<K extends keyof PresentCostState>(key: K, value: PresentCostState[K]) {
    setPresentCosts((current) => ({ ...current, [key]: value }));
    setStepOneErrors((current) => ({ ...current, [key]: "" }));
  }

  function updateBusinessDetails<K extends keyof BusinessDetailsState>(
    key: K,
    value: BusinessDetailsState[K],
  ) {
    setBusinessDetails((current) => ({ ...current, [key]: value }));
    setStepTwoErrors((current) => ({ ...current, [key]: "" }));
  }

  function handleContinue() {
    const errors = validateStepOne(stepOne, presentCosts);
    setStepOneErrors(errors);
    if (Object.keys(errors).length === 0) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleEstimate() {
    const errors = validateStepTwo(businessDetails);
    setStepTwoErrors(errors);
    if (Object.keys(errors).length === 0) {
      const estimateResult = buildEstimateResult(stepOne, presentCosts, businessDetails);
      setResult(estimateResult);

      fetch("/api/submit-warehouse-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stepOne,
          presentCosts,
          businessDetails,
          result: estimateResult,
          productTypeLabel: businessDetails.productType,
        }),
      }).catch(() => { });
    }
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-canvas px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1380px]">
        {step === 1 ? (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-stretch">
            <div className="min-w-0 flex flex-col gap-5 h-full">
              <section className="pt-1">
                <h1 className="max-w-[17ch] text-[2rem] font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-[2.3rem]">
                  Get An Instant Quote For{" "}
                  <span className="bg-gradient-to-r from-brand to-mint bg-clip-text text-transparent">
                    Warehousing Solutions.
                  </span>
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-ink/70">
                  Our services are powered by cutting-edge technology. Use our calculator to
                  get a quick estimate and plan your logistics with confidence.
                </p>
              </section>

              <SectionCard>
                <header className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0D3832]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"></path></svg>
                  </div>
                  <h2 className="text-[1.15rem] font-bold leading-none text-[#01A68C] sm:text-[1.3rem]">
                    How much is it costing me at present
                  </h2>
                </header>
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextInput
                    id="warehouseRent"
                    label="Warehouse Rent*"
                    type="number"
                    value={presentCosts.warehouseRent}
                    onChange={(value) => updatePresentCost("warehouseRent", value)}
                    error={stepOneErrors.warehouseRent}
                  />
                  <TextInput
                    id="monthlyCapexAllocation"
                    label="Monthly Capex Allocation*"
                    type="number"
                    value={presentCosts.monthlyCapexAllocation}
                    onChange={(value) => updatePresentCost("monthlyCapexAllocation", value)}
                    error={stepOneErrors.monthlyCapexAllocation}
                  />
                  <TextInput
                    id="staffCosts"
                    label="Staff Costs*"
                    type="number"
                    value={presentCosts.staffCosts}
                    onChange={(value) => updatePresentCost("staffCosts", value)}
                    error={stepOneErrors.staffCosts}
                  />
                  <TextInput
                    id="utilities"
                    label="Utilities*"
                    type="number"
                    value={presentCosts.utilities}
                    onChange={(value) => updatePresentCost("utilities", value)}
                    error={stepOneErrors.utilities}
                  />
                  <TextInput
                    id="otherExpenses"
                    label="Other Expenses*"
                    type="number"
                    value={presentCosts.otherExpenses}
                    onChange={(value) => updatePresentCost("otherExpenses", value)}
                    error={stepOneErrors.otherExpenses}
                  />
                  <TextInput
                    id="wms"
                    label="WMS*"
                    type="number"
                    value={presentCosts.wms}
                    onChange={(value) => updatePresentCost("wms", value)}
                    error={stepOneErrors.wms}
                  />
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#fca5a5] bg-[#fef2f2] px-4 py-3 text-sm leading-6 text-[#dc2626]">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dc2626]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  </div>
                  <p>
                    A minimum six (6) months&apos; key money is applicable to all warehouses.
                    However, this requirement is waived for clients utilizing TCH.
                  </p>
                </div>
              </SectionCard>

              <SectionCard className="border-none bg-[#f4faf7] shadow-sm flex-1">
                <div>
                  <header className="mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#01A68C]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <h2 className="text-[1.15rem] font-bold leading-none text-[#01A68C] sm:text-[1.3rem]">
                      Important Notes
                    </h2>
                  </header>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-[#4c5d75]">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#01A68C]" />
                      <span>
                        Services include secure storage solutions, loading and unloading
                        operations, advanced inventory management through CargoWise WMS, and
                        Tier 1 business intelligence powered by Microsoft Power BI.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#01A68C]" />
                      <span>Packing and labelling material to be provided by the client.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#01A68C]" />
                      <span>
                        TCH shall not be held liable for any content displayed on stickers or
                        logos of the customers.
                      </span>
                    </li>
                  </ul>
                </div>
              </SectionCard>
            </div>

            <div className="min-w-0 flex flex-col h-full">
              <SectionCard className="flex-1 flex flex-col">
                <header className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0D3832]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2-4h14l2 4"></path><line x1="4" y1="21" x2="4" y2="10"></line><line x1="20" y1="21" x2="20" y2="10"></line><path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"></path></svg>
                  </div>
                  <h2 className="text-[1.15rem] font-bold leading-none text-[#01A68C] sm:text-[1.3rem]">
                    How much will it cost at TCH
                  </h2>
                </header>
                <div className="space-y-6 flex-1 flex flex-col">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Storage / Loading and Unloading / Inventory Control
                    </p>
                    <div className="mt-2 space-y-2">
                      <SelectInput
                        id="productWeight"
                        label="Kg - Range*"
                        value={stepOne.productWeight}
                        onChange={(value) => updateStepOne("productWeight", value)}
                        options={storageWeightOptions}
                        error={stepOneErrors.productWeight}
                        placeholder="Choose a range"
                      />
                      <div className="grid gap-2.5 sm:grid-cols-3">
                        <TextInput
                          id="cbm"
                          label="CBM*"
                          type="number"
                          value={stepOne.cbm}
                          onChange={(value) => updateStepOne("cbm", value)}
                          error={stepOneErrors.cbm}
                        />
                        <TextInput
                          id="days"
                          label="Days*"
                          type="number"
                          value={stepOne.days}
                          onChange={(value) => updateStepOne("days", value)}
                          error={stepOneErrors.days}
                          min={1}
                        />
                        <SelectInput
                          id="containerType"
                          label="Container Type"
                          value={stepOne.containerType}
                          onChange={(value) => updateStepOne("containerType", value)}
                          options={containerTypeOptions}
                          error={stepOneErrors.containerType}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-line pt-2.5">
                    <p className="text-sm font-semibold text-ink">Fulfilment Charges</p>
                    <div className="mt-2 grid gap-2">
                      <SelectInput
                        id="fulfilmentSize"
                        label="Additional Handling"
                        value={stepOne.fulfilmentSize}
                        onChange={(value) => updateStepOne("fulfilmentSize", value)}
                        options={sizeOptions}
                        optional
                        placeholder="Select size"
                      />
                      <TextInput
                        id="fulfilmentUnits"
                        label="Units"
                        type="number"
                        value={stepOne.fulfilmentUnits}
                        onChange={(value) => updateStepOne("fulfilmentUnits", value)}
                        optional
                      />
                    </div>
                  </div>

                  <div className="border-t border-line pt-2.5">
                    <p className="text-sm font-semibold text-ink">
                      Picking sorting packing and labelling (Optional)
                    </p>
                    <div className="mt-2 grid gap-2">
                      <SelectInput
                        id="packingSize"
                        label="Size (in inches)"
                        value={stepOne.packingSize}
                        onChange={(value) => updateStepOne("packingSize", value)}
                        options={sizeOptions}
                        optional
                        placeholder="Select size"
                      />
                      <TextInput
                        id="packingUnits"
                        label="Units"
                        type="number"
                        value={stepOne.packingUnits}
                        onChange={(value) => updateStepOne("packingUnits", value)}
                        optional
                      />
                    </div>
                  </div>

                  <div className="border-t border-line pt-2.5 flex-1 flex flex-col justify-center pb-2">
                    <p className="text-center text-[1.05rem] font-semibold text-[#243247] sm:text-[1.15rem]">
                      Goods Type
                    </p>
                    <div className="mt-2 flex justify-center">
                      <p className="inline-flex max-w-full items-center justify-center rounded-[999px] bg-gradient-to-r from-[#0D3832] to-[#01A68C] px-4 py-2 text-center text-[0.82rem] font-semibold text-white shadow-md sm:px-5 sm:text-[0.88rem]">
                        {goodsTypeLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionCard>


            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-start">
            <div className="min-w-0 space-y-6 pt-1">
              <section>
                <h1 className="max-w-[17ch] text-[2rem] font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-[2.3rem]">
                  Get An Instant Quote For{" "}
                  <span className="bg-gradient-to-r from-brand to-mint bg-clip-text text-transparent">
                    Warehousing Solutions.
                  </span>
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-ink/70">
                  Our services are powered by cutting-edge technology. Use our calculator to
                  get a quick estimate and plan your logistics with confidence.
                </p>
              </section>

              <SectionCard className="border-[#bcd5ff] bg-gradient-to-r from-[#f5f9ff] via-[#eef4ff] to-[#f6f9ff] px-5 py-5 shadow-[0_10px_30px_rgba(74,134,255,0.10)] sm:px-6 sm:py-6">
                <h2 className="text-[1rem] font-semibold text-[#16233a] sm:text-[1.05rem]">
                  Disclaimer:
                </h2>
                <ul className="mt-4 space-y-3 text-[0.84rem] leading-6 text-[#56657c] sm:text-[0.88rem]">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5aa2ff]" />
                    <span>
                      We adhere to a strict code of confidentiality; all information shared
                      will not be disclosed.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5aa2ff]" />
                    <span>
                      Please double-check your contact details before submitting to ensure
                      accuracy.
                    </span>
                  </li>
                </ul>
              </SectionCard>
            </div>

            <SectionCard className="rounded-[2rem] px-5 py-5 shadow-[0_14px_38px_rgba(15,61,51,0.10)] sm:px-6 sm:py-6">
              <header className="mb-5">
                <h2 className="text-[1.75rem] font-semibold tracking-[-0.04em] text-[#16233a]">
                  Business Details
                </h2>
              </header>

              <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
                <TextInput
                  id="organizationName"
                  label="Organization Name*"
                  value={businessDetails.organizationName}
                  onChange={(value) => updateBusinessDetails("organizationName", value)}
                  error={stepTwoErrors.organizationName}
                />
                <TextInput
                  id="yourName"
                  label="Your Name*"
                  value={businessDetails.yourName}
                  onChange={(value) => updateBusinessDetails("yourName", value)}
                  error={stepTwoErrors.yourName}
                />
                <TextInput
                  id="email"
                  label="Email*"
                  type="email"
                  value={businessDetails.email}
                  onChange={(value) => updateBusinessDetails("email", value)}
                  error={stepTwoErrors.email}
                />
                <TextInput
                  id="phone"
                  label="Phone*"
                  type="tel"
                  value={businessDetails.phone}
                  onChange={(value) => updateBusinessDetails("phone", value)}
                  error={stepTwoErrors.phone}
                />
                <div className="sm:col-span-2">
                  <SelectInput
                    id="productType"
                    label="Product Type*"
                    value={businessDetails.productType}
                    onChange={(value) => updateBusinessDetails("productType", value)}
                    options={productTypeOptions}
                    error={stepTwoErrors.productType}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex h-11 w-full items-center justify-center rounded-[1.2rem] border border-[#ccd3df] bg-white px-6 text-[0.98rem] font-semibold text-[#34435b] transition hover:border-[#aeb7c6] sm:flex-1"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleEstimate}
                  className="inline-flex h-11 w-full items-center justify-center rounded-[1.2rem] bg-gradient-to-r from-brand to-mint px-6 text-[0.98rem] font-semibold text-white shadow-[0_10px_24px_rgba(15,61,51,0.20)] transition hover:opacity-95 sm:flex-1"
                >
                  Get Estimate
                </button>
              </div>
            </SectionCard>
          </div>
        )}
        {step === 1 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleContinue}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#0D3832] to-[#01A68C] px-8 text-[1rem] font-medium text-white shadow-lg transition hover:opacity-90 sm:w-auto min-w-[280px]"
            >
              Continue to Business Details
            </button>
          </div>
        )}
      </div>


      {result ? <ResultModal result={result} onClose={() => setResult(null)} /> : null}
    </main>
  );
}