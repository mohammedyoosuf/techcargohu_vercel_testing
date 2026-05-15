import type { CalculatorOption } from "../features/calculator/types";

export const storageWeightOptions: CalculatorOption[] = [
  {
    value: "10-20kg",
    label: "10-20kg",
    description: "Household Goods / Electrical Appliances / Lighting Fixtures",
  },
  {
    value: "20-30kg",
    label: "20-30kg",
    description: "Kitchen Appliances / Auto Spare Parts",
  },
  {
    value: "30-40kg",
    label: "30-40kg",
    description: "Machinery Spares / Pumps / Motors / Tool Kits",
  },
];

export const containerTypeOptions: CalculatorOption[] = [
  { value: "40-footer", label: "40 Footer" },
  { value: "20-footer", label: "20 Footer" },
  { value: "lcl", label: "LCL" },
];

export const sizeOptions: CalculatorOption[] = [
  { value: "24-under-10", label: "<10kg (24\" x 24\" x 24\" / 60.98cm)" },
  { value: "24-10-20", label: "10-20kg (24\" x 24\" x 24\" / 60.98cm)" },
  { value: "24-20-30", label: "20-30kg (24\" x 24\" x 24\" / 60.98cm)" },
  { value: "24-30-40", label: "30-40kg (24\" x 24\" x 24\" / 60.98cm)" },
  { value: "36-under-10", label: "<10kg (36\" x 36\" x 36\" / 91.44cm)" },
  { value: "36-10-20", label: "10-20kg (36\" x 36\" x 36\" / 91.44cm)" },
  { value: "36-20-30", label: "20-30kg (36\" x 36\" x 36\" / 91.44cm)" },
  { value: "36-30-40", label: "30-40kg (36\" x 36\" x 36\" / 91.44cm)" },
  { value: "48-under-10", label: "<10kg (48\" x 48\" x 48\" / 121.92cm)" },
  { value: "48-10-20", label: "10-20kg (48\" x 48\" x 48\" / 121.92cm)" },
  { value: "48-20-30", label: "20-30kg (48\" x 48\" x 48\" / 121.92cm)" },
  { value: "48-30-40", label: "30-40kg (48\" x 48\" x 48\" / 121.92cm)" },
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
