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
            <p>Dear {{ $data['name'] }},</p>
            <p>Thank you for using the Tech Cargo Hub Pricing Calculator. Attached below is the summary of your quotation estimate.</p>
            
            <table class="quote-table">
                <tr>
                    <th colspan="2" style="border-radius: 6px 6px 0 0;">Shipment Details</th>
                </tr>
                <tr>
                    <td>Container Type</td>
                    <td>
                        @if($data['containerType'] == '40')
                            40 Footer
                        @elseif($data['containerType'] == '20')
                            20 Footer
                        @else
                            {{ $data['containerType'] ?? '-' }}
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>No. of Containers/month</td>
                    <td>{{ $data['num_containers'] ?? '-' }}</td>
                </tr>
                <tr>
                    <td>Approximate CBM</td>
                    <td>{{ $data['calculatedCBM'] ? $data['calculatedCBM'] . ' CBM' : '-' }}</td>
                </tr>
                 <tr>
                    <th colspan="2" style="padding-top: 20px;">User Information</th>
                </tr>
                <tr>
                    <td>Product Type</td>
                    <td>{{ $data['productType'] ?? '-' }}</td>
                </tr>
                 <tr>
                    <td>Service Requirement Timeline</td>
                    <td>{{ $data['serviceTime'] ?? 'Not specified' }}</td>
                </tr>
                <tr>
                    <th colspan="2" style="padding-top: 20px;">Estimated Charges</th>
                </tr>
                <!-- <tr>
                    <td>Est. Charge for 15 Days</td>
                    <td class="highlight">Rs. {{ number_format($data['cost15Days'], 2) }}</td>
                </tr> -->
                <tr>
                    <td>Est. Charge for 30 Days</td>
                    <td class="highlight">Rs. {{ number_format($data['cost30Days'], 2) }}</td>
                </tr>
            </table>

            <p>Please note that this is an estimate. Our team will contact you shortly to discuss your requirements.</p>
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