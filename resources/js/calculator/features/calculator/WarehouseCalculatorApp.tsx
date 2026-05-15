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

  const [isSending, setIsSending] = useState(false);

  function handleContinue() {
    const errors = validateStepOne(stepOne, presentCosts);
    setStepOneErrors(errors);
    if (Object.keys(errors).length === 0) {
      setStep(2);
    }
  }

  async function handleEstimate() {
    const errors = validateStepTwo(businessDetails);
    setStepTwoErrors(errors);

    if (Object.keys(errors).length === 0) {
      const calculatedResult = buildEstimateResult(stepOne, presentCosts, businessDetails);
      setResult(calculatedResult);

      // Send to backend for email notification
      setIsSending(true);
      try {
        const productTypeLabel =
          productTypeOptions.find((opt) => opt.value === businessDetails.productType)?.label ||
          businessDetails.productType;

        await fetch("/api/submit-warehouse-estimate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            stepOne,
            presentCosts,
            businessDetails,
            result: calculatedResult,
            productTypeLabel,
          }),
        });
      } catch (error) {
        console.error("Failed to send estimate email:", error);
      } finally {
        setIsSending(false);
      }
    }
  }

  return (
    <main className="min-h-screen bg-canvas/50 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1380px]">
        <div className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-line bg-white px-4 py-3 sm:px-5">
          <div>
            <p className="text-sm font-medium text-ink">Warehouse Cost Calculator</p>
            <p className="text-xs text-ink/55">Step {step} of 2</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-2.5 w-14 rounded-full ${step >= 1 ? "bg-mint" : "bg-line"}`} />
            <div className={`h-2.5 w-14 rounded-full ${step === 2 ? "bg-mint" : "bg-line"}`} />
          </div>
        </div>

        {step === 1 ? (
          <div className="grid gap-5 lg:grid-cols-[minmax(340px,0.95fr)_minmax(0,1.45fr)] lg:items-start">
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

              <SectionCard title="How much is it costing me at present">
                <div className="rounded-2xl border border-danger/25 bg-danger/10 px-4 py-2.5 text-sm leading-6 text-danger">
                  A minimum six (6) months&apos; key money is applicable to all warehouses.
                  However, this requirement is waived for clients utilizing TCH.
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <TextInput
                    id="warehouseRent"
                    label="Warehouse Rent"
                    type="number"
                    value={presentCosts.warehouseRent}
                    onChange={(value) => updatePresentCost("warehouseRent", value)}
                    error={stepOneErrors.warehouseRent}
                  />
                  <TextInput
                    id="monthlyCapexAllocation"
                    label="Monthly Capex Allocation"
                    type="number"
                    value={presentCosts.monthlyCapexAllocation}
                    onChange={(value) => updatePresentCost("monthlyCapexAllocation", value)}
                    error={stepOneErrors.monthlyCapexAllocation}
                  />
                  <TextInput
                    id="staffCosts"
                    label="Staff Costs"
                    type="number"
                    value={presentCosts.staffCosts}
                    onChange={(value) => updatePresentCost("staffCosts", value)}
                    error={stepOneErrors.staffCosts}
                  />
                  <TextInput
                    id="utilities"
                    label="Utilities"
                    type="number"
                    value={presentCosts.utilities}
                    onChange={(value) => updatePresentCost("utilities", value)}
                    error={stepOneErrors.utilities}
                  />
                  <TextInput
                    id="otherExpenses"
                    label="Other Expenses"
                    type="number"
                    value={presentCosts.otherExpenses}
                    onChange={(value) => updatePresentCost("otherExpenses", value)}
                    error={stepOneErrors.otherExpenses}
                  />
                  <TextInput
                    id="wms"
                    label="WMS"
                    type="number"
                    value={presentCosts.wms}
                    onChange={(value) => updatePresentCost("wms", value)}
                    error={stepOneErrors.wms}
                  />
                </div>
              </SectionCard>

              <SectionCard title="Important Notes">
                <ul className="list-disc space-y-2 pl-4 text-sm leading-6 text-ink/74">
                  <li>
                    Services include secure storage solutions, loading and unloading operations,
                    advanced inventory management through CargoWise WMS, and Tier 1 business
                    intelligence powered by Microsoft Power BI.
                  </li>
                  <li>Packing and labelling material to be provided by the client.</li>
                  <li>
                    TCH shall not be held liable for any content displayed on stickers or logos.
                  </li>
                  <li>A minimum storage period of 15 days is applicable.</li>
                  <li>6 months key money is waived for TCH clients.</li>
                </ul>
              </SectionCard>
            </div>

            <div className="min-w-0 space-y-3">
              <SectionCard title="How much will it cost at TCH">
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Storage / Loading and Unloading / Inventory Control
                    </p>
                    <div className="mt-3 space-y-3">
                      <SelectInput
                        id="productWeight"
                        label="Kg - Range"
                        value={stepOne.productWeight}
                        onChange={(value) => updateStepOne("productWeight", value)}
                        options={storageWeightOptions}
                        error={stepOneErrors.productWeight}
                        placeholder="Choose a range"
                      />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <TextInput
                          id="cbm"
                          label="CBM"
                          type="number"
                          value={stepOne.cbm}
                          onChange={(value) => updateStepOne("cbm", value)}
                          error={stepOneErrors.cbm}
                        />
                        <TextInput
                          id="days"
                          label="Days"
                          type="number"
                          value={stepOne.days}
                          onChange={(value) => updateStepOne("days", value)}
                          error={stepOneErrors.days}
                          min={1}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-line pt-4">
                    <p className="text-sm font-semibold text-ink">Additional Handling Charges</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,220px)]">
                      <SelectInput
                        id="handlingSize"
                        label="Size and Weight Category"
                        value={stepOne.handlingSize}
                        onChange={(value) => updateStepOne("handlingSize", value)}
                        options={sizeOptions}
                        optional
                        placeholder="Select size/weight"
                      />
                      <TextInput
                        id="handlingUnits"
                        label="Units"
                        type="number"
                        value={stepOne.handlingUnits}
                        onChange={(value) => updateStepOne("handlingUnits", value)}
                        optional
                      />
                    </div>
                  </div>

                  <div className="border-t border-line pt-4">
                    <p className="text-sm font-semibold text-ink">
                      Picking, Sorting, Packing and Labelling
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,220px)]">
                      <SelectInput
                        id="packingSize"
                        label="Size and Weight Category"
                        value={stepOne.packingSize}
                        onChange={(value) => updateStepOne("packingSize", value)}
                        options={sizeOptions}
                        optional
                        placeholder="Select size/weight"
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

                  <div className="border-t border-line pt-4">
                    <p className="text-sm font-semibold text-ink">Goods Type</p>
                    <p className="mt-2.5 rounded-2xl border border-line bg-soft px-4 py-2.5 text-sm text-ink/74">
                      {goodsTypeLabel}
                    </p>
                  </div>
                </div>
              </SectionCard>

              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand px-5 text-sm font-medium text-white transition hover:bg-brand/92 sm:w-auto"
              >
                Continue to Business Details
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[minmax(320px,0.95fr)_minmax(0,1.45fr)] lg:items-start">
            <div className="min-w-0 space-y-5">
              <section className="pt-1">
                <h1 className="max-w-[16ch] text-[2rem] font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-[2.3rem]">
                  Business details for your warehouse estimate.
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-ink/70">
                  Share your contact details so we can package the estimate in a format your
                  team can review quickly.
                </p>
              </section>

              <SectionCard title="Disclaimer">
                <div className="space-y-2 text-sm leading-6 text-ink/74">
                  <p>
                    We adhere to a strict code of confidentiality; all information shared will
                    not be disclosed.
                  </p>
                  <p>
                    Please double-check your contact details before submitting to ensure
                    accuracy.
                  </p>
                </div>
              </SectionCard>
            </div>

            <SectionCard title="Business Details">
              <div className="grid gap-3 sm:grid-cols-2">
                <TextInput
                  id="organizationName"
                  label="Organization Name"
                  value={businessDetails.organizationName}
                  onChange={(value) => updateBusinessDetails("organizationName", value)}
                  error={stepTwoErrors.organizationName}
                />
                <TextInput
                  id="yourName"
                  label="Your Name"
                  value={businessDetails.yourName}
                  onChange={(value) => updateBusinessDetails("yourName", value)}
                  error={stepTwoErrors.yourName}
                />
                <TextInput
                  id="email"
                  label="Email"
                  type="email"
                  value={businessDetails.email}
                  onChange={(value) => updateBusinessDetails("email", value)}
                  error={stepTwoErrors.email}
                />
                <TextInput
                  id="phone"
                  label="Phone"
                  type="tel"
                  value={businessDetails.phone}
                  onChange={(value) => updateBusinessDetails("phone", value)}
                  error={stepTwoErrors.phone}
                />
                <div className="sm:col-span-2">
                  <SelectInput
                    id="productType"
                    label="Product Type"
                    value={businessDetails.productType}
                    onChange={(value) => updateBusinessDetails("productType", value)}
                    options={productTypeOptions}
                    error={stepTwoErrors.productType}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-line px-5 text-sm font-medium text-ink transition hover:border-ink/35 sm:w-auto"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleEstimate}
                  disabled={isSending}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand px-5 text-sm font-medium text-white transition hover:bg-brand/92 disabled:opacity-70 sm:w-auto"
                >
                  {isSending ? "Processing..." : "Get Estimate"}
                </button>
              </div>
            </SectionCard>
          </div>
        )}
      </div>

      {result ? <ResultModal result={result} onClose={() => setResult(null)} /> : null}
    </main>
  );
}
