# Dinga Car Rental

A modern, responsive car rental website built with Next.js 15, Tailwind CSS, and Clerk authentication. The app offers vehicle browsing, category filtering, dashboard access, and booking flows for Kenyan users.

## Features

- Landing page with featured vehicles, categories, testimonials, and FAQs
- Browse cars by category, price, fuel type, and ratings
- Customer dashboard with bookings and profile management
- Clerk-powered sign in / sign up and session handling
- Responsive UI built with Tailwind CSS and Framer Motion
- Smooth vehicle browsing experience with carousels and search

## Tech Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Clerk for authentication
- Framer Motion for animations
- React Hot Toast for notifications
- Embla Carousel for vehicle sliders

## Prerequisites

- Node.js 18+ or newer
- npm, Yarn, or pnpm installed
- Clerk account and API keys for authentication

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root with the required Clerk variables.

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```bash
http://localhost:3000
```

## Environment Variables

The project expects the following variables in `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

> Use your Clerk project keys for the publishable and secret values.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Run the production build locally
- `npm run lint` - Run Next.js linting

## Deployment

This app can be deployed on platforms that support Next.js, such as Vercel.

If deploying to Vercel, connect the repository and set the same environment variables in your Vercel project settings.

## Project Structure

- `app/` - Next.js app routes and layouts
- `components/` - UI components, shared widgets, and page sections
- `data/` - vehicle data and utility functions
- `lib/` - local stores and helper utilities
- `public/` - static assets
- `types/` - TypeScript type definitions

## Notes

- The homepage uses the root route at `app/(root)/page.tsx`
- Authentication is managed via Clerk in `app/layout.tsx`
- Vehicle categories include economy, sedan, SUV, pickup, luxury, electric, sports, and vans
