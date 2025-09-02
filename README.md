# NextGen-CTO Landing Page

A modern landing page for NextGen-CTO courses with integrated Google Sheets waitlist functionality.

## Features

- 🎯 Modern, responsive design with Tailwind CSS
- 📝 Waitlist form with Google Sheets integration
- 🎨 Shadcn/ui components
- ⚡ Next.js 14 with App Router
- 🔒 Form validation with Zod
- 📊 Real-time data submission to Google Sheets

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Cloud account (for Sheets integration)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up Google Sheets integration (see [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md))

4. Create `.env.local` file with your Google service account credentials:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Google Sheets Integration

The waitlist form automatically submits data to a Google Sheet. To set this up:

1. Follow the detailed setup guide in [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
2. Test the connection by visiting `/api/test-sheets` after setup
3. The target sheet: [NextGen-CTO Waitlist](https://docs.google.com/spreadsheets/d/1et5vnMqLptGodbs9W7jzoLpnItKxdB6XK1E6NSAPui8/edit)

### Data Structure

The form submits the following data to the sheet:
- **Timestamp**: When the form was submitted
- **Email**: User's email address (required)
- **Name**: User's name (optional)
- **Source**: Always "NextGen-CTO Landing Page"

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── waitlist/          # Waitlist form API endpoint
│   │   └── test-sheets/       # Google Sheets connection test
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   └── Waitlist.tsx       # Main waitlist form component
│   └── ui/                    # Shadcn/ui components
└── lib/
    └── validations.ts         # Form validation schemas
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
