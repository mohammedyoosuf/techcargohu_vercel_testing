import type { CalculatorOption } from "../features/calculator/types";

export const storageWeightOptions: CalculatorOption[] = [
  {
    value: "10-20kg",
    label: "10-20kg",
    description: "Household Goods / Electrical Appliances / Lighting Fixtures",
  },
  {
    value: "21-30kg",
    label: "21-30kg",
    description: "Kitchen Appliances / Auto Spare Parts",
  },
  {
    value: "31-40kg",
    label: "31-40kg",
    description: "Machinery Spares / Pumps / Motors / Tool Kits",
  },
];

export const containerTypeOptions: CalculatorOption[] = [
  { value: "40-footer", label: "40 Footer" },
  { value: "20-footer", label: "20 Footer" },
  { value: "lcl", label: "LCL" },
];

export const sizeOptions: CalculatorOption[] = [
  { value: "24-24-24-under-10", label: "<10kg (24in x 24in x 24in)" },
  { value: "24-24-24-11-20", label: "11-20kg (24in x 24in x 24in)" },
  { value: "24-24-24-21-30", label: "21-30kg (24in x 24in x 24in)" },
  { value: "24-24-24-31-40", label: "31-40kg (24in x 24in x 24in)" },
  { value: "36-36-36-under-10", label: "<10kg (36in x 36in x 36in)" },
  { value: "36-36-36-11-20", label: "11-20kg (36in x 36in x 36in)" },
  { value: "36-36-36-21-30", label: "21-30kg (36in x 36in x 36in)" },
  { value: "36-36-36-31-40", label: "31-40kg (36in x 36in x 36in)" },
  { value: "48-48-48-under-10", label: "<10kg (48in x 48in x 48in)" },
  { value: "48-48-48-11-20", label: "11-20kg (48in x 48in x 48in)" },
  { value: "48-48-48-21-30", label: "21-30kg (48in x 48in x 48in)" },
  { value: "48-48-48-31-40", label: "31-40kg (48in x 48in x 48in)" },
];

export const productTypeOptions: CalculatorOption[] = [
  { value: "Apparel", label: "Apparel" },
  { value: "Garments", label: "Garments" },
  { value: "Automobile Spare Parts", label: "Automobile Spare Parts" },
  { value: "Household Goods", label: "Household Goods" },
  { value: "Lighting Fixtures", label: "Lighting Fixtures" },
  { value: "Consumer Electronics", label: "Consumer Electronics" },
  { value: "Electronic Components", label: "Electronic Components" },
  { value: "Fabrics/Textiles", label: "Fabrics/Textiles" },
  { value: "Pumps", label: "Pumps" },
  { value: "Tool Kits", label: "Tool Kits" },
  { value: "Motors", label: "Motors" },
  { value: "Home Appliances", label: "Home Appliances" },
  { value: "Machinery Spare Parts", label: "Machinery Spare Parts" },
  { value: "Logistics Company", label: "Logistics Company" },
  { value: "E-Commerce", label: "E-Commerce" },
  { value: "Stationary", label: "Stationary" },
  { value: "Toys", label: "Toys" },
  { value: "Tiles", label: "Tiles" },
  { value: "Solar panel", label: "Solar panel" },
  { value: "Kitchen Appliances", label: "Kitchen Appliances" },
  { value: "Other", label: "Other" },
];

export const goodsTypeLabel =
  "General Goods / Non DG / Non Perishables / Non Pharma";
