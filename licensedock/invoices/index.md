# Invoices

LicenseDock generates PDF invoices automatically for completed orders.

## Invoice Numbering

- **Order numbers** are random: `ORD-B45E8258`
- **Invoice numbers** are sequential: `INV-0001`, `INV-0002`, ...

Invoice numbers are generated only after successful payment. This ensures no gaps in the sequence.

## Settings

Configure invoices in **Components → LicenseDock → Settings**:

| Setting | Description |
|---------|-------------|
| **Invoice Prefix** | Prefix for invoice numbers (default: `INV`) |
| **Store Name** | Your business name on the invoice |
| **Store Address** | Business address displayed on the invoice |

## PDF Download

Customers can download invoice PDFs from:

- The **customer portal** (Orders section)
- The **thank-you page** after checkout

Admins can download invoices from the order detail view in admin.

## Invoice Content

Each invoice includes:

- Invoice number and date
- Store/seller details
- Customer billing details
- Product and plan name
- Amount, discount (if coupon used), and total
- Payment method and transaction ID
