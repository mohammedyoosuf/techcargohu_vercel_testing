<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Warehousing Quotation from Tech Cargo Hub</title>
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0f4f3; -webkit-font-smoothing: antialiased; }
        .wrapper { padding: 30px 16px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #0D3832 0%, #01A68C 100%); padding: 28px 32px; text-align: center; }
        .header img { max-width: 220px; height: auto; }
        .header-title { color: #ffffff; font-size: 22px; font-weight: 700; margin: 16px 0 4px; letter-spacing: -0.3px; }
        .header-sub { color: rgba(255,255,255,0.8); font-size: 14px; margin: 0; }

        .content { padding: 28px 32px; color: #4a5568; font-size: 15px; line-height: 1.7; }
        .greeting { font-size: 16px; color: #2d3748; margin-bottom: 8px; }
        .intro { color: #718096; margin-bottom: 24px; font-size: 14px; }

        .section-label {
            font-size: 11px; font-weight: 700; text-transform: uppercase;
            letter-spacing: 1px; color: #01A68C; margin: 24px 0 10px;
            padding-bottom: 6px; border-bottom: 2px solid #e2f5f1;
        }
        .cost-table { width: 100%; border-collapse: collapse; }
        .cost-table td { padding: 9px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #4a5568; }
        .cost-table td:last-child { text-align: right; font-weight: 600; color: #2d3748; white-space: nowrap; }
        .cost-table .total-row td { border-top: 2px solid #d1d5db; border-bottom: none; padding-top: 12px; font-weight: 700; font-size: 15px; color: #1a202c; }
        .cost-table .sub-text { font-size: 12px; color: #a0aec0; display: block; margin-top: 2px; font-weight: 400; }

        .tch-section { background-color: #f0faf6; border: 1px solid #c6f0e2; border-radius: 8px; padding: 18px 20px; margin: 16px 0; }
        .tch-section .section-label { margin-top: 0; border-bottom-color: #c6f0e2; }
        .tch-section .cost-table td:last-child { color: #0D3832; }
        .tch-total-row td { border-top: 2px solid #a7e8ce !important; color: #01A68C !important; font-size: 16px !important; }

        .savings-box {
            border-radius: 10px; padding: 22px 24px; margin: 20px 0; text-align: center;
        }
        .savings-box.positive { background-color: #e8f5f1; border: 1px solid #68d9b3; }
        .savings-box.negative { background-color: #fff5f5; border: 1px solid #fc8181; }
        .savings-label { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .savings-label.positive { color: #276749; }
        .savings-label.negative { color: #c53030; }
        .savings-amount { font-size: 28px; font-weight: 800; letter-spacing: -0.5px; margin: 6px 0; }
        .savings-amount.positive { color: #188b63; }
        .savings-amount.negative { color: #e53e3e; }
        .savings-pct { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
        .savings-pct.positive { color: #276749; }
        .savings-pct.negative { color: #c53030; }
        .savings-note { font-size: 13px; color: #718096; margin: 0; }

        .services-grid { display: table; width: 100%; }
        .service-item { display: table-row; }
        .service-icon { display: table-cell; padding: 5px 10px 5px 0; color: #01A68C; font-size: 16px; vertical-align: top; width: 20px; }
        .service-text { display: table-cell; padding: 5px 0; font-size: 13px; color: #4a5568; vertical-align: top; }

        .disclaimer { background-color: #f7fafc; border-left: 3px solid #cbd5e0; border-radius: 0 6px 6px 0; padding: 12px 16px; margin: 20px 0 0; font-size: 13px; color: #718096; }

        .footer { background-color: #0D3832; padding: 20px 32px; text-align: center; }
        .footer p { margin: 4px 0; font-size: 12px; color: rgba(255,255,255,0.6); }
        .footer a { color: #68d9b3; text-decoration: none; }
    </style>
</head>
<body>
<div class="wrapper">
<div class="container">
    <div class="header">
        <img src="https://www.techcargohub.com/assets/images/second-logo.png" alt="Tech Cargo Hub">
        <p class="header-title">Your Cost Comparison Report</p>
        <p class="header-sub">Detailed breakdown and savings analysis</p>
    </div>

    <div class="content">
        <p class="greeting">Dear {{ $data['yourName'] }},</p>
        <p class="intro">Thank you for using the Tech Cargo Hub Warehouse Cost Calculator. Below is your personalised cost comparison report based on the details you provided.</p>

        {{-- Section 1: Present Costs --}}
        <p class="section-label">1. How much is it costing you at present</p>
        <table class="cost-table">
            <tr><td>Warehouse Rent</td><td>LKR {{ number_format($data['result']['currentBreakdown']['warehouseRent'], 2) }}</td></tr>
            <tr><td>Monthly Capex Allocation</td><td>LKR {{ number_format($data['result']['currentBreakdown']['monthlyCapexAllocation'], 2) }}</td></tr>
            <tr><td>Staff Costs</td><td>LKR {{ number_format($data['result']['currentBreakdown']['staffCosts'], 2) }}</td></tr>
            <tr><td>Utilities</td><td>LKR {{ number_format($data['result']['currentBreakdown']['utilities'], 2) }}</td></tr>
            <tr><td>Other Expenses</td><td>LKR {{ number_format($data['result']['currentBreakdown']['otherExpenses'], 2) }}</td></tr>
            <tr><td>WMS</td><td>LKR {{ number_format($data['result']['currentBreakdown']['wms'], 2) }}</td></tr>
            <tr class="total-row"><td>Monthly Total</td><td>LKR {{ number_format($data['result']['currentTotal'], 2) }}</td></tr>
        </table>

        {{-- Section 2: TCH Costs --}}
        <div class="tch-section">
            <p class="section-label">2. How much will it cost at TCH</p>
            <table class="cost-table">
                <tr>
                    <td>
                        Storage
                        @if(!empty($data['result']['storageSummary']))
                            <span class="sub-text">{{ $data['result']['storageSummary'] }}</span>
                        @endif
                    </td>
                    <td>LKR {{ number_format($data['result']['storage'], 2) }}</td>
                </tr>
                @if($data['result']['handling'] > 0)
                <tr>
                    <td>
                        Additional Handling
                        @if(!empty($data['result']['handlingSummary']))
                            <span class="sub-text">{{ $data['result']['handlingSummary'] }}</span>
                        @endif
                    </td>
                    <td>LKR {{ number_format($data['result']['handling'], 2) }}</td>
                </tr>
                @endif
                @if($data['result']['sorting'] > 0)
                <tr>
                    <td>
                        Fulfilment Charges
                        @if(!empty($data['result']['sortingSummary']))
                            <span class="sub-text">{{ $data['result']['sortingSummary'] }}</span>
                        @endif
                    </td>
                    <td>LKR {{ number_format($data['result']['sorting'], 2) }}</td>
                </tr>
                @endif
                <tr class="total-row tch-total-row">
                    <td>TCH Total Cost</td>
                    <td>LKR {{ number_format($data['result']['tchTotal'], 2) }}</td>
                </tr>
            </table>
        </div>

        {{-- Section 3: Savings --}}
        @if($data['result']['isSavingsPositive'])
        <div class="savings-box positive">
            <p class="savings-label positive">You Save with Tech Cargo Hub</p>
            <p class="savings-amount positive">LKR {{ number_format($data['result']['savings'], 2) }}</p>
            <p class="savings-pct positive">{{ number_format($data['result']['savingsPercent'], 2) }}% monthly savings</p>
            <p class="savings-note">Compared to your current monthly cost of LKR {{ number_format($data['result']['currentTotal'], 2) }}</p>
        </div>
        @else
        <div class="savings-box negative">
            <p class="savings-label negative">Cost Comparison</p>
            <p class="savings-amount negative">LKR {{ number_format(abs($data['result']['savings']), 2) }}</p>
            <p class="savings-pct negative">{{ number_format($data['result']['savingsPercent'], 2) }}% more than current costs</p>
            <p class="savings-note">Current monthly cost: LKR {{ number_format($data['result']['currentTotal'], 2) }}</p>
        </div>
        @endif

        {{-- Services --}}
        <p class="section-label" style="margin-top:24px;">Services Included</p>
        <div class="services-grid">
            <div class="service-item"><span class="service-icon">&#10003;</span><span class="service-text">Inventory Control (CargoWise WMS + Stock Reports)</span></div>
            <div class="service-item"><span class="service-icon">&#10003;</span><span class="service-text">BI Dashboards (Microsoft Power BI)</span></div>
            <div class="service-item"><span class="service-icon">&#10003;</span><span class="service-text">Secure Storage, Loading &amp; Unloading</span></div>
            <div class="service-item"><span class="service-icon">&#10003;</span><span class="service-text">24/7 CCTV Camera Access</span></div>
            <div class="service-item"><span class="service-icon">&#10003;</span><span class="service-text">Fully Insured Facility</span></div>
            <div class="service-item"><span class="service-icon">&#10003;</span><span class="service-text">Dedicated Customer Service</span></div>
        </div>

        <div class="disclaimer">
            This is an automated estimate. Our team will contact you shortly to provide a customised proposal based on your specific requirements. A minimum storage period of 15 days is applicable.
        </div>

        <p style="margin-top:24px; font-size:14px; color:#4a5568;">Best Regards,<br><strong>The Tech Cargo Hub Team</strong></p>
    </div>

    <div class="footer">
        <p>&copy; {{ date('Y') }} Tech Cargo Hub. All Rights Reserved.</p>
        <p><a href="https://techcargohub.com">techcargohub.com</a></p>
    </div>
</div>
</div>
</body>
</html>
