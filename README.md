## CozyStay Apartment Booking

Next.js + Tailwind apartment booking site with channel-manager integration layer (e.g. SmartOrder).

### Features

- **Real-time room listing**: Rooms, pricing and availability are fetched via `/api/rooms` from `lib/channelManager.ts`.
- **Online booking**: Guests select a room, choose dates and confirm a booking. API calls are wired to `createBookingInChannelManager`.
- **Online check-in**: Guests can check in using their confirmation code and last name, wired to `completeOnlineCheckIn`.
- **Responsive design**: Modern, professional, light-colour layout that works on desktop and mobile.

### SmartOrder / Channel Manager Integration

The `lib/channelManager.ts` file contains a mock implementation that you should replace with real SmartOrder API calls:

- Set environment variables such as `SMARTORDER_API_KEY` and `SMARTORDER_PROPERTY_ID`.
- Replace the mock functions with `fetch(...)` requests to SmartOrder's endpoints.

### Getting Started

```bash
cd apartment-booking
npm install
npm run dev
```

Then visit `http://localhost:3000`.

