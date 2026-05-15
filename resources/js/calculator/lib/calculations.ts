import type {
  BusinessDetailsState,
  EstimateResult,
  PresentCostState,
  StepOneFormState,
} from "../features/calculator/types";

const STORAGE_RATES: Record<string, number> = {
  "10-20kg": 90.0,
  "20-30kg": 100.0,
  "30-40kg": 118.0,
};

const HANDLING_RATES: Record<string, number> = {
  "24-under-10": 60,
  "24-10-20": 120,
  "24-20-30": 180,
  "24-30-40": 240,
  "36-under-10": 88,
  "36-10-20": 176,
  "36-20-30": 264,
  "36-30-40": 352,
  "48-under-10": 198,
  "48-10-20": 396,
  "48-20-30": 594,
  "48-30-40": 792,
};

const SORTING_RATES: Record<string, number> = {
  "24-under-10": 11,
  "24-10-20": 40,
  "24-20-30": 65,
  "24-30-40": 125,
  "36-under-10": 22,
  "36-10-20": 80,
  "36-20-30": 130,
  "36-30-40": 250,
  "48-under-10": 33,
  "48-10-20": 120,
  "48-20-30": 195,
  "48-30-40": 375,
};

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
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
  const handlingUnits = toNumber(stepOne.handlingUnits);
  const packingUnits = toNumber(stepOne.packingUnits);

  const storageRate = STORAGE_RATES[stepOne.productWeight] || 0;
  const storage = cbm * days * storageRate;

  const handlingRate = HANDLING_RATES[stepOne.handlingSize] || 0;
  const handling = handlingUnits * handlingRate;

  const sortingRate = SORTING_RATES[stepOne.packingSize] || 0;
  const fulfilment = packingUnits * sortingRate; // Mapping "fulfilment" to sorting/labelling result

  const tchTotal = storage + handling + fulfilment;
  const currentTotal = calculateCurrentMonthlyCost(presentCosts);
  const savings = currentTotal - tchTotal;

  return {
    customerName: businessDetails.yourName,
    organizationName: businessDetails.organizationName,
    currentTotal,
    storage,
    fulfilment,
    handling,
    tchTotal,
    savings,
    isSavingsPositive: savings >= 0,
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace("LKR", "LKR ");
}
