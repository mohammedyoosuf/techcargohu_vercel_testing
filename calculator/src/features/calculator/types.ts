export type CalculatorOption = {
  value: string;
  label: string;
  description?: string;
};

export type StepOneFormState = {
  productWeight: string;
  cbm: string;
  days: string;
  containerType: string;
  fulfilmentSize: string;
  fulfilmentUnits: string;
  handlingSize: string;
  handlingUnits: string;
  packingSize: string;
  packingUnits: string;
};

export type PresentCostState = {
  warehouseRent: string;
  monthlyCapexAllocation: string;
  staffCosts: string;
  utilities: string;
  otherExpenses: string;
  wms: string;
};

export type BusinessDetailsState = {
  organizationName: string;
  yourName: string;
  email: string;
  phone: string;
  productType: string;
};

export type EstimateResult = {
  customerName: string;
  organizationName: string;
  currentTotal: number;
  storage: number;
  fulfilment: number;
  handling: number;
  tchTotal: number;
  savings: number;
  isSavingsPositive: boolean;
};
