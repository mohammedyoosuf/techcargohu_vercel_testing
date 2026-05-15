<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Warehousing Quotation from Tech Cargo Hub</title>
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; -webkit-font-smoothing: antialiased; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 5px solid #01A68C; }
        .header { 
            background-color: #ffffff;
            padding: 20px; 
            text-align: center; 
            border-bottom: 5px solid #01A68C;
        }
        .header img { max-width: 300px; }
        .content { padding: 30px; color: #555555; line-height: 1.6; font-size: 16px; }
        .content h1 { color: #0D3832; font-size: 22px; margin-top: 0; margin-bottom: 20px; }
        .content p { margin: 0 0 15px; }
        .quote-table { width: 100%; border-collapse: collapse; margin: 25px 0; }
        .quote-table th, .quote-table td { text-align: left; padding: 12px; border-bottom: 1px solid #eeeeee; }
        .quote-table th { background-color: #f9f9f9; color: #333333; font-weight: bold; }
        .quote-table td { color: #333; }
        .quote-table .highlight { font-weight: bold; color: #01A68C; font-size: 1.1em; }
        .savings-box { 
            background-color: #e8f5f3; 
            border: 1px solid #01A68C; 
            border-radius: 8px; 
            padding: 20px; 
            text-align: center; 
            margin: 20px 0;
            color: #0D3832;
        }
        .savings-box h2 { margin: 0 0 10px; font-size: 18px; }
        .savings-box .amount { font-size: 24px; font-weight: bold; color: #188b63; }
        .services-list { margin: 20px 0; padding-left: 20px; color: #333; }
        .services-list li { margin-bottom: 8px; }
        .footer { background-color: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee; }
        .footer a { color: #01A68C; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://www.techcargohub.com/assets/images/second-logo.png" alt="Tech Cargo Hub Logo">
        </div>
        <div class="content">
            <h1>Welcome to Tech Cargo Hub!!</h1>
            <p>Dear {{ $data['yourName'] }},</p>
            <p>Thank you for using the Tech Cargo Hub Warehouse Cost Calculator. Here is a summary of your estimated costs and potential savings.</p>
            
            <table class="quote-table">
                <tr>
                    <th colspan="2" style="border-radius: 6px 6px 0 0;">Business Details</th>
                </tr>
                <tr>
                    <td>Organization</td>
                    <td>{{ $data['organizationName'] }}</td>
                </tr>
                <tr>
                    <td>Product Type</td>
                    <td>{{ $data['productTypeLabel'] }}</td>
                </tr>
                
                <tr>
                    <th colspan="2" style="padding-top: 20px;">TCH Cost Breakdown</th>
                </tr>
                <tr>
                    <td>Storage Cost</td>
                    <td>LKR {{ number_format($data['result']['storage'], 2) }}</td>
                </tr>
                <tr>
                    <td>Handling Cost</td>
                    <td>LKR {{ number_format($data['result']['handling'], 2) }}</td>
                </tr>
                <tr>
                    <td>Fulfillment Cost</td>
                    <td>LKR {{ number_format($data['result']['fulfilment'], 2) }}</td>
                </tr>
                <tr style="background-color: #f9f9f9; font-weight: bold;">
                    <td>Total TCH Cost</td>
                    <td class="highlight">LKR {{ number_format($data['result']['tchTotal'], 2) }}</td>
                </tr>
            </table>

            @if($data['result']['isSavingsPositive'])
            <div class="savings-box">
                <h2>Potential Monthly Savings</h2>
                <div class="amount">LKR {{ number_format($data['result']['savings'], 2) }}</div>
                <p>That's a significant reduction compared to your current monthly costs of LKR {{ number_format($data['result']['currentTotal'], 2) }}!</p>
            </div>
            @else
            <div class="savings-box" style="background-color: #fff5f5; border-color: #c44949; color: #852626;">
                <h2>Cost Comparison</h2>
                <p>Your current monthly cost: LKR {{ number_format($data['result']['currentTotal'], 2) }}</p>
                <p>TCH Total: LKR {{ number_format($data['result']['tchTotal'], 2) }}</p>
            </div>
            @endif

            <p><strong>Services Included in the Estimate:</strong></p>
            <ul class="services-list">
                <li>Inventory Control (CargoWise WMS + Stock reports)</li>
                <li>BI Dashboards (Microsoft Power BI)</li>
                <li>Secure Storage & Handling</li>
                <li>24/7 CCTV Camera Access</li>
                <li>Fully Insured Facility</li>
                <li>Dedicated Customer Service</li>
            </ul>

            <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;">

            <p>Please note that this is an automated estimate. Our team will contact you shortly to provide a customized proposal based on your specific requirements.</p>
            <p>Thank you for choosing Tech Cargo Hub!</p>
            <p>Best Regards,<br>The Tech Cargo Hub Team</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Tech Cargo Hub. All Rights Reserved.</p>
            <p><a href="https://techcargohub.com">Visit our website</a></p>
        </div>
    </div>
</body>
</html>
