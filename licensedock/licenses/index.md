# Managing Licenses

Licenses are generated automatically when an order is completed. Each license is tied to a specific product and plan.

## License Fields

| Field | Description |
|-------|-------------|
| **License Key** | Unique key the customer uses to activate your software |
| **Status** | Active, Inactive, or Expired |
| **Activation Limit** | How many sites/devices/users can use this license (from the plan) |
| **Expires At** | When the license expires (for subscriptions, renews with each payment) |

## Admin Management

Go to **Components → LicenseDock → Licenses** to view and manage all licenses.

From here you can:

- Search by license key, customer name, or product
- Filter by status
- View activation details
- Manually change license status

## License Lifecycle

1. **Created** – when order completes, status set to Active
2. **Active** – customer can activate and use the software
3. **Expired** – subscription ended without renewal
4. **Inactive** – manually disabled by admin or revoked by refund

## Next Steps

- [Activations](/licensedock/licenses/activations) – how activation tracking works
