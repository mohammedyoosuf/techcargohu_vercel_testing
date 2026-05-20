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
    case "10-20kg":
      return "10-20kg";
    case "21-30kg":
      return "21-30kg";
    case "31-40kg":
      return "31-40kg";
    default:
      return value || "selected range";
  }
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
  const currentBreakdown = {
    warehouseRent: toNumber(presentCosts.warehouseRent),
    monthlyCapexAllocation: toNumber(presentCosts.monthlyCapexAllocation),
    staffCosts: toNumber(presentCosts.staffCosts),
    utilities: toNumber(presentCosts.utilities),
    otherExpenses: toNumber(presentCosts.otherExpenses),
    wms: toNumber(presentCosts.wms),
  };

  const storage = cbm * days * STORAGE_RATE_PER_CBM_DAY + (CONTAINER_SURCHARGE[stepOne.containerType] ?? 0);
  const fulfilment = fulfilmentUnits * FULFILMENT_UNIT_RATE;
  const handling = handlingUnits * HANDLING_UNIT_RATE + packingUnits * PICK_PACK_UNIT_RATE;
  const tchTotal = storage + fulfilment + handling;
  const currentTotal = Object.values(currentBreakdown).reduce((sum, value) => sum + value, 0);
  const savings = currentTotal - tchTotal;
  const savingsPercent =
    currentTotal > 0 ? (Math.abs(savings) / currentTotal) * 100 : 0;
  const storageSummary = `${cbm || 0} CBM x ${days || 0} days x (${formatCurrency(
    STORAGE_RATE_PER_CBM_DAY,
  )} per CBM / ${productWeightLabel(stepOne.productWeight)}, ${containerLabel(
    stepOne.containerType,
  )})`;

  return {
    customerName: businessDetails.yourName,
    organizationName: businessDetails.organizationName,
    currentBreakdown,
    currentTotal,
    storage,
    fulfilment,
    handling,
    tchTotal,
    storageSummary,
    savings,
    savingsPercent,
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