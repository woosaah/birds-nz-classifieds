# Birds NZ Classifieds

A modern, responsive marketplace web application for the New Zealand bird breeding community. Built with React 18, Vite, and Tailwind CSS.

## Features

- **Browse Listings**: Search and filter through bird, equipment, food, supplies, and wanted listings
- **Category Navigation**: Quick access to all listing categories with live counts
- **Detailed Listings**: Full listing pages with image galleries and seller contact info
- **Post Listings**: Create and manage your own listings with image upload
- **Contact Sellers**: Built-in contact form to reach out to sellers
- **Responsive Design**: Mobile-first design that works on all devices
- **Offline-Ready**: Uses localStorage for data persistence (no backend required)
- **Seed Data**: Comes pre-loaded with 10 example listings

## Tech Stack

- **React 18**: Functional components with hooks
- **Vite**: Fast development and build tooling
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first styling
- **localStorage**: Data persistence

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd bird-classifieds
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ListingCard.jsx
│   ├── SearchBar.jsx
│   ├── CategoryNav.jsx
│   ├── ImageGallery.jsx
│   ├── ContactForm.jsx
│   └── FeaturedListings.jsx
├── pages/              # Route page components
│   ├── HomePage.jsx
│   ├── ListingsPage.jsx
│   ├── ListingDetailPage.jsx
│   ├── CreateListingPage.jsx
│   └── MyListingsPage.jsx
├── utils/              # Helper functions
│   ├── storage.js
│   ├── validation.js
│   └── imageHelper.js
├── hooks/              # Custom React hooks
│   ├── useListings.js
│   └── useLocalStorage.js
├── App.jsx             # Main app component with routing
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## Data Management

### localStorage Structure

Data is stored in localStorage under the key `birds-nz-classifieds-data`:

```javascript
{
  listings: [
    {
      id: "unique-id",
      type: "bird|equipment|food|supplies|wanted",
      title: "string",
      species: "string (for birds)",
      description: "string",
      price: number,
      location: "string (NZ region)",
      images: ["url1", "url2"],
      contactName: "string",
      contactEmail: "string",
      contactPhone: "string (optional)",
      datePosted: "ISO date",
      status: "active|sold|expired"
    }
  ],
  myListingIds: ["id1", "id2"] // Track user's listings
}
```

### Seed Data

The app comes with 10 pre-loaded example listings:
- Rainbow Lorikeet breeding pair
- Bird cage with accessories
- Hand-raised Cockatoo baby
- Parrot pellet food
- Budgies in various colors
- Handmade nesting boxes
- Kakariki breeding pair
- Wanted: Aviary panels
- Outdoor aviary setup
- Cockatiel babies

### Clearing Data

To reset the app and clear all data:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Run: `localStorage.removeItem('birds-nz-classifieds-data')`
4. Refresh the page

The app will reinitialize with the seed data.

## Features in Detail

### Browse Listings
- Filter by category (Birds, Equipment, Food, Supplies, Wanted)
- Search by keyword across title, species, and description
- Sort by date or price
- Responsive grid layout

### Listing Details
- Full-screen image gallery with thumbnails
- Complete description and specifications
- Seller contact information
- Contact seller modal form
- Share listing (copy link)
- Delete own listings

### Create Listing
- Step-by-step form with validation
- Category selection with icons
- Multiple image upload (up to 5 images)
- Automatic image resizing and compression
- Preview before posting
- Contact information fields

### Contact Seller
- Modal form with name, email, and message
- Form validation
- Simulated "message sent" confirmation
- (Note: Actual email sending would require a backend)

## Responsive Design

The app is fully responsive with breakpoints:
- Mobile: < 768px (single column, simplified navigation)
- Tablet: 768px - 1024px (2-column grid)
- Desktop: > 1024px (3-column grid, full navigation)

## Color Palette

- **Primary**: Emerald green (#10b981) - main actions, birds category
- **Secondary**: Sky blue (#0ea5e9) - equipment category
- **Accent**: Amber (#f59e0b) - featured listings
- **Background**: Light grey (#f9fafb)
- **Text**: Dark grey (#1f2937)
- **Food**: Purple (#a855f7)
- **Supplies**: Pink (#ec4899)
- **Wanted**: Grey (#6b7280)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features for future versions:
- Backend API integration
- User authentication
- Real email notifications
- Image hosting service integration
- Advanced search filters
- Favorites/saved listings
- Messaging system between buyers and sellers
- Rating and review system
- Payment integration
- Admin dashboard

## License

This project is open source and available for educational purposes.

## Contributing

This is a demonstration project. Feel free to fork and modify for your own use.

## Support

For issues or questions, please refer to the inline code comments or component documentation.

---

**Built for the New Zealand bird breeding community** 🦜
