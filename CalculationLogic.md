
---

# 📦 TCH Warehousing & Fulfillment - Calculation Logic

This document details the functional logic, data tables, and mathematical formulas required to build the TCH Cost Comparison Calculator.

---

## 1. Input Variable Definitions

### A. Current Operational Costs (At Present)
1. **Warehouse Rent (WR):** Current monthly rental cost.
2. **Monthly Capex Allocation (CA):** Monthly capital expenditure.
3. **Staff Costs (SC):** Total monthly salary and labor costs.
4. **Utilities (UT):** Monthly electricity, water, and internet bills.
5. **Other Expenses (OE):** Miscellaneous operational costs.
6. **WMS Cost (WMS):** Monthly cost of Warehouse Management Software.

### B. TCH Costing Factors
1. **Weight Range (WRG):** Category based on item weight (Dropdown selection).
2. **Total CBM (CBM):** Total Cubic Meter volume of the goods.
3. **Storage Days (Days):** Number of days goods are stored.
4. **Additional Handling Units (HU):** Number of units for optional handling services.
5. **Handling Size (HS):** Physical size category for handling (Dropdown).
6. **Sorting/Labelling Units (SU):** Number of units for optional sorting/labelling.
7. **Sorting Size (SS):** Physical size category for sorting (Dropdown).

---

## 2. Calculation Steps & Formulas

### Step 1: Calculate Total Present Monthly Cost
$$Total Present Cost = WR + CA + SC + UT + OE + WMS$$

### Step 2: Calculate TCH Storage Cost
The daily rate per CBM depends on the selected **Weight Range**. 
* **Storage Rate (SR):** Fetched from *Data Table 1*.

$$Storage Cost = CBM \times Days \times SR$$

### Step 3: Calculate Additional Handling Cost (Optional)
The rate per unit depends on the **Size** and **Weight Range**.
* **Handling Rate (HR):** Fetched from *Data Table 2*.

$$Handling Total = HU \times HR$$

### Step 4: Calculate Picking, Sorting & Labelling Cost (Optional)
The rate per unit depends on the **Size** and **Weight Range**.
* **Sorting Rate (SRT):** Fetched from *Data Table 3*.

$$Sorting Total = SU \times SRT$$

### Step 5: Final TCH Total Cost
$$TCH Total Cost = Storage Cost + Handling Total + Sorting Total$$

---

## 3. Savings Analysis & Result Modal

### Difference Calculation
$$Difference = Total Present Cost - TCH Total Cost$$

### Percentage Analysis
$$Savings Percentage = \left| \frac{Difference}{Total Present Cost} \right| \times 100$$

### UI Visualization Logic:
1. **If Difference > 0 (Savings Detected):**
   * **Message:** "TCH saves you [Value]"
   * **Visual Color:** **Green** (#188b63)
   * **Sub-text:** "You are saving [Percentage]% compared to your present costs."

2. **If Difference < 0 (Higher Cost):**
   * **Message:** "TCH costs more [Value]"
   * **Visual Color:** **Red** (#c44949)
   * **Sub-text:** "TCH is [Percentage]% more expensive than your present setup."

---

## 4. Static Data Tables

### Table 1: Storage Rates (LKR per CBM per Day)
| Weight Range Category | Rate (LKR) |
| :--- | :--- |
| 10-20kg (Household Goods/Electrical/Lighting) | 90.00 |
| 20-30kg (Kitchen Appliances/Auto Spare Parts) | 100.00 |
| 30-40kg (Machinery Spares/Pumps/Motors/Tool Kits) | 118.00 |

### Table 2: Additional Handling Charges (Per Unit)
| Size (Dropdown Label) | <10kg | 10-20kg | 20-30kg | 30-40kg |
| :--- | :---: | :---: | :---: | :---: |
| **<10kg (24" x 24" x 24")** | 60 | 120 | 180 | 240 |
| **<10kg (36" x 36" x 36")** | 88 | 176 | 264 | 352 |
| **<10kg (48" x 48" x 48")** | 198 | 396 | 594 | 792 |

### Table 3: Sorting & Labelling Charges (Per Unit)
| Size (Dropdown Label) | <10kg | 10-20kg | 20-30kg | 30-40kg |
| :--- | :---: | :---: | :---: | :---: |
| **<10kg (24" x 24" x 24")** | 11 | 40 | 65 | 125 |
| **<10kg (36" x 36" x 36")** | 22 | 80 | 130 | 250 |
| **<10kg (48" x 48" x 48")** | 33 | 120 | 195 | 375 |

---

## 5. Developer Implementation Rules

1. **Handling Empty Units:** If "Units" fields for Handling or Sorting are empty, the logic must treat them as `0`.
2. **Currency Formatting:** Display all monetary values with the "LKR" prefix and two decimal places (e.g., `LKR 10,500.00`).
3. **Trigger Logic:** Recalculate or show the "Refreshing" state as soon as any input field or dropdown selection changes.
4. **Minimum Requirements:** Ensure the UI displays the following static notes:
    * "A minimum storage period of 15 days is applicable."
    * "6 months key money is waived for TCH clients."
5. **Responsiveness:** The Modal and Input sections must be fully responsive for mobile and desktop views.

---