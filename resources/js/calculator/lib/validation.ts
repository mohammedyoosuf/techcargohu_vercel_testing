import type {
  BusinessDetailsState,
  PresentCostState,
  StepOneFormState,
} from "../features/calculator/types";

type ErrorMap = Record<string, string>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateStepOne(
  stepOne: StepOneFormState,
  presentCosts: PresentCostState,
) {
  const errors: ErrorMap = {};

  if (!stepOne.productWeight) errors.productWeight = "Select a product range.";
  if (!stepOne.cbm) errors.cbm = "Enter CBM.";
  if (!stepOne.days) errors.days = "Enter days.";

  const requiredPresentFields: Array<keyof PresentCostState> = [
    "warehouseRent",
    "monthlyCapexAllocation",
    "staffCosts",
    "utilities",
    "otherExpenses",
    "wms",
  ];

  requiredPresentFields.forEach((field) => {
    if (!presentCosts[field]) {
      errors[field] = "This field is required.";
    }
  });

  return errors;
}

export function validateStepTwo(details: BusinessDetailsState) {
  const errors: ErrorMap = {};

  if (!details.organizationName.trim()) errors.organizationName = "Enter organization name.";
  if (!details.yourName.trim()) errors.yourName = "Enter your name.";
  if (!details.email.trim()) {
    errors.email = "Enter email.";
  } else if (!emailPattern.test(details.email)) {
    errors.email = "Enter a valid email.";
  }
  if (!details.phone.trim()) errors.phone = "Enter phone.";
  if (!details.productType) errors.productType = "Select a product type.";

  return errors;
}
