# Activations

Activations track where a license is being used. Each activation represents one site, device, user, or server using the software.

## Activation Types

The activation type is set on the **plan** and determines what you're counting:

| Type | What it tracks | Example |
|------|---------------|---------|
| Domain | Websites | `example.com` |
| Device | Computers or phones | `MacBook-Pro-ABC123` |
| Seat | Individual users | `user@company.com` |
| Instance | Servers | `server-prod-01` |

## How It Works

When a customer installs your software, it connects to LicenseDock to register where it's being used:

1. **Activate** – registers the site, device, or user against the license
2. **Validate** – checks if the license is still valid for that location
3. **Deactivate** – removes an activation, freeing up a slot

## Activation Limit

Each plan defines a maximum number of activations. When the limit is reached, further activations are blocked until the customer deactivates an existing one.

Set the limit to `0` for unlimited activations.

## For Developers

If you're building the license check into your software, see the API reference:

- [Activate License](/api/activate)
- [Deactivate License](/api/deactivate)
- [Validate License](/api/validate)
