import type {
  BusinessDetailsState,
  EstimateResult,
  PresentCostState,
  StepOneFormState,
} from "../features/calculator/types";

const STORAGE_RATE_PER_CBM_DAY = 2.35;
const CONTAINER_SURCHARGE: Record<string, number> = {
  "40-footer": 280,
  "20-footer": 160,
  lcl: 90,
};
const FULFILMENT_UNIT_RATE = 5.4;
const HANDLING_UNIT_RATE = 4.15;
const PICK_PACK_UNIT_RATE = 6.25;

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
  const fulfilmentUnits = toNumber(stepOne.fulfilmentUnits);
  const handlingUnits = toNumber(stepOne.handlingUnits);
  const packingUnits = toNumber(stepOne.packingUnits);

  const storage = cbm * days * STORAGE_RATE_PER_CBM_DAY + (CONTAINER_SURCHARGE[stepOne.containerType] ?? 0);
  const fulfilment = fulfilmentUnits * FULFILMENT_UNIT_RATE;
  const handling = handlingUnits * HANDLING_UNIT_RATE + packingUnits * PICK_PACK_UNIT_RATE;
  const tchTotal = storage + fulfilment + handling;
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
    maximumFractionDigits: 0,
  }).format(value);
}
