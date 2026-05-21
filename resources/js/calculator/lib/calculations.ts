import { sizeOptions } from "../data/options";
import type {
  BusinessDetailsState,
  EstimateResult,
  PresentCostState,
  StepOneFormState,
} from "../features/calculator/types";

// Storage rates (LKR per CBM per day) — keys match storageWeightOptions values in data/options.ts
const STORAGE_RATES: Record<string, number> = {
  "under-10kg": 80.0,
  "10-20kg": 90.0,
  "21-30kg": 100.0,
  "31-40kg": 118.0,
};

// Additional handling charges (per unit) — keys match sizeOptions values in data/options.ts
const HANDLING_RATES: Record<string, number> = {
  "24-24-24-under-10": 60,
  "24-24-24-11-20": 120,
  "24-24-24-21-30": 180,
  "24-24-24-31-40": 240,
  "36-36-36-under-10": 88,
  "36-36-36-11-20": 176,
  "36-36-36-21-30": 264,
  "36-36-36-31-40": 352,
  "48-48-48-under-10": 198,
  "48-48-48-11-20": 396,
  "48-48-48-21-30": 594,
  "48-48-48-31-40": 792,
};

// Sorting & Labelling charges (per unit) — keys match sizeOptions values in data/options.ts
const SORTING_RATES: Record<string, number> = {
  "24-24-24-under-10": 11,
  "24-24-24-11-20": 40,
  "24-24-24-21-30": 65,
  "24-24-24-31-40": 125,
  "36-36-36-under-10": 22,
  "36-36-36-11-20": 80,
  "36-36-36-21-30": 130,
  "36-36-36-31-40": 250,
  "48-48-48-under-10": 33,
  "48-48-48-11-20": 120,
  "48-48-48-21-30": 195,
  "48-48-48-31-40": 375,
};

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function containerLabel(value: string) {
  switch (value) {
    case "40-footer":
      return "40 Footer";
    case "20-footer":
      return "20 Footer";
    case "lcl":
      return "LCL";
    default:
      return value || "Container";
  }
}

function productWeightLabel(value: string) {
  switch (value) {
    case "under-10kg":
      return "<10kg";
    case "10-20kg":
      return "11-20kg";
    case "21-30kg":
      return "21-30kg";
    case "31-40kg":
      return "31-40kg";
    default:
      return value || "selected range";
  }
}

function getSizeLabel(value: string) {
  return sizeOptions.find((o) => o.value === value)?.label ?? value;
}

export function calculateCurrentMonthlyCost(presentCosts: PresentCostState) {
  return Object.values(presentCosts).reduce((sum, value) => sum + toNumber(value), 0);
}

export function buildEstimateResult(
  stepOne: StepOneFormState,
  presentCosts: PresentCostState,
  businessDetails: BusinessDetailsState,
): EstimateResult {
  const cbm = toNumber(stepOne.cbm);
  const days = toNumber(stepOne.days);

  // Additional Handling — form binds to fulfilmentSize / fulfilmentUnits
  const handlingUnits = toNumber(stepOne.fulfilmentUnits);
  const handlingRate = HANDLING_RATES[stepOne.fulfilmentSize] ?? 0;
  const handling = handlingUnits * handlingRate;

  // Sorting & Labelling — form binds to packingSize / packingUnits
  const sortingUnits = toNumber(stepOne.packingUnits);
  const sortingRate = SORTING_RATES[stepOne.packingSize] ?? 0;
  const sorting = sortingUnits * sortingRate;

  const currentBreakdown = {
    warehouseRent: toNumber(presentCosts.warehouseRent),
    monthlyCapexAllocation: toNumber(presentCosts.monthlyCapexAllocation),
    staffCosts: toNumber(presentCosts.staffCosts),
    utilities: toNumber(presentCosts.utilities),
    otherExpenses: toNumber(presentCosts.otherExpenses),
    wms: toNumber(presentCosts.wms),
  };

  // Step 2: Storage cost = CBM × Days × rate
  const storageRate = STORAGE_RATES[stepOne.productWeight] ?? 0;
  const storage = cbm * days * storageRate;

  // Step 5: TCH Total = Storage + Handling + Sorting
  const tchTotal = storage + handling + sorting;

  const currentTotal = Object.values(currentBreakdown).reduce((sum, v) => sum + v, 0);
  const savings = currentTotal - tchTotal;
  const savingsPercent = currentTotal > 0 ? (Math.abs(savings) / currentTotal) * 100 : 0;

  const storageSummary = `${cbm || 0} CBM x ${days || 0} days x (${formatCurrency(storageRate)} per CBM / ${productWeightLabel(stepOne.productWeight)}, ${containerLabel(stepOne.containerType)})`;
  const handlingSummary =
    handlingUnits > 0 && stepOne.fulfilmentSize
      ? `${handlingUnits} units x ${getSizeLabel(stepOne.fulfilmentSize)}`
      : "";
  const sortingSummary =
    sortingUnits > 0 && stepOne.packingSize
      ? `${sortingUnits} units x ${getSizeLabel(stepOne.packingSize)}`
      : "";

  return {
    customerName: businessDetails.yourName,
    organizationName: businessDetails.organizationName,
    currentBreakdown,
    currentTotal,
    storage,
    handling,
    sorting,
    fulfilment: sorting,
    tchTotal,
    storageSummary,
    handlingSummary,
    sortingSummary,
    savings,
    savingsPercent,
    isSavingsPositive: savings >= 0,
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
