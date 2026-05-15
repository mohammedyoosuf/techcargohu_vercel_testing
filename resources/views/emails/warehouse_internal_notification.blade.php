<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Warehouse Calculator Submission</title>
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7f6; color: #3d4852; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e8e5ef; }
        .header { background-color: #0D3832; padding: 25px; text-align: center; }
        .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; }
        .content { padding: 30px; }
        .content p { line-height: 1.6; margin: 0 0 1em; }
        .data-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .data-table tr { border-bottom: 1px solid #e8e5ef; }
        .data-table tr:last-child { border-bottom: none; }
        .data-table th, .data-table td { text-align: left; padding: 15px 12px; }
        .data-table th { color: #7f8c8d; font-weight: 500; font-size: 14px; text-transform: uppercase; width: 40%; }
        .data-table td { color: #2c3e50; font-weight: 600; font-size: 16px; word-break: break-all; }
        .section-header { background-color: #f4f7f6; font-weight: bold; padding: 12px; border-radius: 6px; text-align: left; color: #0D3832; font-size: 18px; margin-top: 30px; margin-bottom: 15px; border-left: 4px solid #01A68C; }
        .highlight-row { background-color: #e8f5f3; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Warehouse Calculator Lead</h1>
        </div>
        <div class="content">
            <p>A new submission has been received from the Warehouse Cost Calculator. Details are below:</p>

            <div class="section-header">Client Information</div>
            <table class="data-table">
                <tr>
                    <th>Organization</th>
                    <td>{{ $data['organizationName'] }}</td>
                </tr>
                <tr>
                    <th>Contact Person</th>
                    <td>{{ $data['yourName'] }}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td><a href="mailto:{{ $data['email'] }}">{{ $data['email'] }}</a></td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>{{ $data['phone'] }}</td>
                </tr>
                <tr>
                    <th>Product Type</th>
                    <td>{{ $data['productTypeLabel'] }}</td>
                </tr>
            </table>

            <div class="section-header">Current Operational Costs</div>
            <table class="data-table">
                <tr>
                    <th>Rent</th>
                    <td>LKR {{ number_format($data['presentCosts']['warehouseRent'] ?: 0, 2) }}</td>
                </tr>
                <tr>
                    <th>Staff Costs</th>
                    <td>LKR {{ number_format($data['presentCosts']['staffCosts'] ?: 0, 2) }}</td>
                </tr>
                <tr>
                    <th>Utilities</th>
                    <td>LKR {{ number_format($data['presentCosts']['utilities'] ?: 0, 2) }}</td>
                </tr>
                <tr class="highlight-row">
                    <th>Total Present Cost</th>
                    <td>LKR {{ number_format($data['result']['currentTotal'], 2) }}</td>
                </tr>
            </table>

            <div class="section-header">TCH Estimate Details</div>
            <table class="data-table">
                <tr>
                    <th>Volume (CBM)</th>
                    <td>{{ $data['stepOne']['cbm'] }}</td>
                </tr>
                <tr>
                    <th>Storage Days</th>
                    <td>{{ $data['stepOne']['days'] }}</td>
                </tr>
                <tr>
                    <th>Storage Cost</th>
                    <td>LKR {{ number_format($data['result']['storage'], 2) }}</td>
                </tr>
                <tr>
                    <th>Handling Cost</th>
                    <td>LKR {{ number_format($data['result']['handling'], 2) }}</td>
                </tr>
                <tr>
                    <th>Fulfillment Cost</th>
                    <td>LKR {{ number_format($data['result']['fulfilment'], 2) }}</td>
                </tr>
                <tr class="highlight-row">
                    <th>TCH Total Cost</th>
                    <td>LKR {{ number_format($data['result']['tchTotal'], 2) }}</td>
                </tr>
            </table>

            <div class="section-header">Analysis</div>
            <table class="data-table">
                <tr>
                    <th>Savings Amount</th>
                    <td style="color: {{ $data['result']['isSavingsPositive'] ? '#188b63' : '#c44949' }};">
                        LKR {{ number_format($data['result']['savings'], 2) }}
                    </td>
                </tr>
                <tr>
                    <th>Savings Status</th>
                    <td>{{ $data['result']['isSavingsPositive'] ? 'SAVINGS DETECTED' : 'HIGHER COST' }}</td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
