<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Price Calculator Submission</title>
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; background-color: #f4f7f6; color: #3d4852; }
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
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Lead from Price Calculator</h1>
        </div>
        <div class="content">
            <p>A new submission has been received through the website's price calculator. The full details are listed below for your review and follow-up.</p>

            <div class="section-header">Client Information</div>
            <table class="data-table">
                <tr>
                    <th>Organization Name</th>
                    <td>{{ $data['organization'] ?? '-' }}</td>
                </tr>
                 <tr>
                    <th>Contact Person</th>
                    <td>{{ $data['name'] ?? '-' }}</td>
                </tr>
                <tr>
                    <th>Email Address</th>
                    <td><a href="mailto:{{ $data['email'] ?? '' }}" style="color: #01A68C; text-decoration: none;">{{ $data['email'] ?? '-' }}</a></td>
                </tr>
                <tr>
                    <th>Phone Number</th>
                    <td>{{ $data['phone'] ?? '-' }}</td>
                </tr>
            </table>

            <div class="section-header">Shipment & Service Details</div>
            <table class="data-table">
                 <tr>
                    <th>Container Type</th>
                    <td>@if($data['containerType'] == '40') 40 Footer @elseif($data['containerType'] == '20') 20 Footer @else - @endif</td>
                </tr>
                <tr>
                    <th>No. of Containers/month</th>
                    <td>{{ $data['num_containers'] ?? '-' }}</td>
                </tr>
                <tr>
                    <th>Total Approximate CBM</th>
                    <td>{{ $data['calculatedCBM'] ? $data['calculatedCBM'] . ' CBM' : '-' }}</td>
                </tr>
                 <tr>
                    <th>Product Type</th>
                    <td>{{ $data['productType'] ?? '-' }}</td>
                </tr>
                 <tr>
                    <th>Service Timeline</th>
                    <td>{{ $data['serviceTime'] ?? '-' }}</td>
                </tr>
            </table>
            
            <div class="section-header">Calculated Estimate</div>
            <table class="data-table">
                <tr>
                    <th>Est. Charge (30 Days)</th>
                    <td style="font-weight: bold; color: #01A68C;">Rs. {{ number_format($data['cost30Days'], 2) }}</td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>