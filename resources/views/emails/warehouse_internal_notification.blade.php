<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Warehouse Calculator Lead</title>
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #f0f4f3; }
        .wrapper { padding: 24px 16px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }

        .header { background-color: #0D3832; padding: 22px 28px; }
        .header-badge { display: inline-block; background-color: #01A68C; color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; margin-bottom: 8px; }
        .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; }
        .header p { margin: 6px 0 0; color: rgba(255,255,255,0.6); font-size: 13px; }

        .content { padding: 24px 28px; }

        .section-title {
            font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
            color: #01A68C; padding: 0 0 8px; border-bottom: 2px solid #e2f5f1;
            margin: 24px 0 14px;
        }
        .section-title:first-child { margin-top: 0; }

        .data-table { width: 100%; border-collapse: collapse; }
        .data-table tr { border-bottom: 1px solid #f3f4f6; }
        .data-table tr:last-child { border-bottom: none; }
        .data-table th { text-align: left; padding: 9px 0; color: #9ca3af; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; width: 42%; vertical-align: top; }
        .data-table td { text-align: right; padding: 9px 0; color: #111827; font-size: 14px; font-weight: 600; word-break: break-word; }
        .data-table td a { color: #01A68C; text-decoration: none; }
        .data-table .sub-note { font-size: 11px; color: #9ca3af; font-weight: 400; display: block; margin-top: 2px; }

        .total-row th, .total-row td { border-top: 2px solid #e5e7eb !important; padding-top: 12px; font-size: 15px !important; color: #111827 !important; }
        .highlight-row th, .highlight-row td { color: #01A68C !important; font-size: 15px !important; }

        .savings-strip {
            border-radius: 8px; padding: 14px 18px; margin-top: 16px;
            display: table; width: 100%; box-sizing: border-box;
        }
        .savings-strip.positive { background-color: #ecfdf5; border: 1px solid #6ee7b7; }
        .savings-strip.negative { background-color: #fff1f2; border: 1px solid #fca5a5; }
        .savings-left { display: table-cell; vertical-align: middle; }
        .savings-right { display: table-cell; text-align: right; vertical-align: middle; white-space: nowrap; }
        .savings-status { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .savings-status.positive { color: #065f46; }
        .savings-status.negative { color: #9f1239; }
        .savings-desc { font-size: 12px; color: #6b7280; margin-top: 2px; }
        .savings-val { font-size: 22px; font-weight: 800; }
        .savings-val.positive { color: #059669; }
        .savings-val.negative { color: #e11d48; }
        .savings-pct { font-size: 13px; font-weight: 700; }
        .savings-pct.positive { color: #065f46; }
        .savings-pct.negative { color: #9f1239; }

        .footer { background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 14px 28px; text-align: center; font-size: 11px; color: #9ca3af; }
    </style>
</head>
<body>
<div class="wrapper">
<div class="container">

    <div class="header">
        <div class="header-badge">New Lead</div>
        <h1>Warehouse Calculator Submission</h1>
        <p>{{ now()->format('d M Y, h:i A') }} &nbsp;&middot;&nbsp; Warehouse Cost Calculator</p>
    </div>

    <div class="content">

        {{-- Client Info --}}
        <p class="section-title">Client Information</p>
        <table class="data-table">
            <tr><th>Organization</th><td>{{ $data['organizationName'] }}</td></tr>
            <tr><th>Contact Person</th><td>{{ $data['yourName'] }}</td></tr>
            <tr><th>Email</th><td><a href="mailto:{{ $data['email'] }}">{{ $data['email'] }}</a></td></tr>
            <tr><th>Phone</th><td>{{ $data['phone'] }}</td></tr>
            <tr><th>Product Type</th><td>{{ $data['productTypeLabel'] }}</td></tr>
        </table>

        {{-- Current Costs --}}
        <p class="section-title">Current Monthly Operational Costs</p>
        <table class="data-table">
            <tr><th>Warehouse Rent</th><td>LKR {{ number_format($data['presentCosts']['warehouseRent'] ?: 0, 2) }}</td></tr>
            <tr><th>Capex Allocation</th><td>LKR {{ number_format($data['presentCosts']['monthlyCapexAllocation'] ?: 0, 2) }}</td></tr>
            <tr><th>Staff Costs</th><td>LKR {{ number_format($data['presentCosts']['staffCosts'] ?: 0, 2) }}</td></tr>
            <tr><th>Utilities</th><td>LKR {{ number_format($data['presentCosts']['utilities'] ?: 0, 2) }}</td></tr>
            <tr><th>Other Expenses</th><td>LKR {{ number_format($data['presentCosts']['otherExpenses'] ?: 0, 2) }}</td></tr>
            <tr><th>WMS</th><td>LKR {{ number_format($data['presentCosts']['wms'] ?: 0, 2) }}</td></tr>
            <tr class="total-row"><th>Monthly Total</th><td>LKR {{ number_format($data['result']['currentTotal'], 2) }}</td></tr>
        </table>

        {{-- TCH Estimate --}}
        <p class="section-title">TCH Estimate</p>
        <table class="data-table">
            <tr><th>Volume</th><td>{{ $data['stepOne']['cbm'] }} CBM</td></tr>
            <tr><th>Storage Days</th><td>{{ $data['stepOne']['days'] }} days</td></tr>
            <tr>
                <th>Storage Cost</th>
                <td>
                    LKR {{ number_format($data['result']['storage'], 2) }}
                    @if(!empty($data['result']['storageSummary']))
                        <span class="sub-note">{{ $data['result']['storageSummary'] }}</span>
                    @endif
                </td>
            </tr>
            @if($data['result']['handling'] > 0)
            <tr>
                <th>Additional Handling</th>
                <td>
                    LKR {{ number_format($data['result']['handling'], 2) }}
                    @if(!empty($data['result']['handlingSummary']))
                        <span class="sub-note">{{ $data['result']['handlingSummary'] }}</span>
                    @endif
                </td>
            </tr>
            @endif
            @if($data['result']['sorting'] > 0)
            <tr>
                <th>Fulfilment Charges</th>
                <td>
                    LKR {{ number_format($data['result']['sorting'], 2) }}
                    @if(!empty($data['result']['sortingSummary']))
                        <span class="sub-note">{{ $data['result']['sortingSummary'] }}</span>
                    @endif
                </td>
            </tr>
            @endif
            <tr class="highlight-row"><th>TCH Total Cost</th><td>LKR {{ number_format($data['result']['tchTotal'], 2) }}</td></tr>
        </table>

        {{-- Savings --}}
        <div class="savings-strip {{ $data['result']['isSavingsPositive'] ? 'positive' : 'negative' }}">
            <div class="savings-left">
                <div class="savings-status {{ $data['result']['isSavingsPositive'] ? 'positive' : 'negative' }}">
                    {{ $data['result']['isSavingsPositive'] ? 'Savings Detected' : 'Higher Cost' }}
                </div>
                <div class="savings-desc">vs current monthly cost of LKR {{ number_format($data['result']['currentTotal'], 2) }}</div>
            </div>
            <div class="savings-right">
                <div class="savings-val {{ $data['result']['isSavingsPositive'] ? 'positive' : 'negative' }}">
                    LKR {{ number_format(abs($data['result']['savings']), 2) }}
                </div>
                <div class="savings-pct {{ $data['result']['isSavingsPositive'] ? 'positive' : 'negative' }}">
                    {{ number_format($data['result']['savingsPercent'], 2) }}%
                </div>
            </div>
        </div>

    </div>

    <div class="footer">
        <p>Tech Cargo Hub &mdash; Warehouse Cost Calculator &mdash; {{ now()->format('Y') }}</p>
    </div>

</div>
</div>
</body>
</html>
