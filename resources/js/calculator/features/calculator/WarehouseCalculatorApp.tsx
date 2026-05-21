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
          <div className="grid gap-5 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-start">
            <div className="min-w-0 space-y-5">
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
                <header className="mb-4">
                  <h2 className="text-[1.5rem] font-semibold leading-none tracking-[-0.04em] text-ink sm:text-[1.8rem]">
                    <span className="bg-gradient-to-r from-brand to-mint bg-clip-text text-transparent">
                      How much is it costing me at present
                    </span>
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

                <div className="mt-4 rounded-2xl border border-danger/25 bg-danger/10 px-4 py-2.5 text-sm leading-6 text-danger">
                  A minimum six (6) months&apos; key money is applicable to all warehouses.
                  However, this requirement is waived for clients utilizing TCH.
                </div>
              </SectionCard>

              <SectionCard className="border-mint/20 bg-gradient-to-r from-[#f7fcf7] via-[#eef8f0] to-[#eaf8ef] shadow-[0_8px_24px_rgba(31,169,122,0.08)]">
                <div>
                  <h2 className="text-[1.05rem] font-semibold text-[#21354b] sm:text-[1.1rem]">
                    Important Notes
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-[#4c5d75]">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mint" />
                      <span>
                        Services include secure storage solutions, loading and unloading
                        operations, advanced inventory management through CargoWise WMS, and
                        Tier 1 business intelligence powered by Microsoft Power BI.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mint" />
                      <span>Packing and labelling material to be provided by the client.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mint" />
                      <span>
                        TCH shall not be held liable for any content displayed on stickers or
                        logos of the customers.
                      </span>
                    </li>
                  </ul>
                </div>
              </SectionCard>
            </div>

            <div className="min-w-0 space-y-3">
              <SectionCard>
                <header className="mb-2.5">
                  <h2 className="text-[1.5rem] font-semibold leading-none tracking-[-0.04em] text-ink sm:text-[1.8rem]">
                    <span className="bg-gradient-to-r from-brand to-mint bg-clip-text text-transparent">
                      How much will it cost at TCH
                    </span>
                  </h2>
                </header>
                <div className="space-y-3">
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

                  <div className="border-t border-line pt-2.5">
                    <p className="text-center text-[1.05rem] font-semibold text-[#243247] sm:text-[1.15rem]">
                      Goods Type
                    </p>
                    <div className="mt-2 flex justify-center">
                      <p className="inline-flex max-w-full items-center justify-center rounded-[999px] bg-gradient-to-r from-brand to-mint px-4 py-2 text-center text-[0.82rem] font-semibold text-white shadow-[0_8px_18px_rgba(15,61,51,0.18)] sm:px-5 sm:text-[0.88rem]">
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
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleContinue}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand px-5 text-sm font-medium text-white transition hover:bg-brand/92 sm:w-auto"
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