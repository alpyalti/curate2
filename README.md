# Curate - E-commerce Frontend

A modern, responsive e-commerce frontend built with React 18+, TypeScript, TailwindCSS, and shadcn/ui components. Designed for Mirakl marketplace integration with comprehensive product browsing, filtering, and shopping cart functionality.

## 🚀 Features

### Core Functionality
- **Mobile-first responsive design** with TailwindCSS
- **Product browsing** with advanced filtering and sorting
- **Shopping cart** and wishlist management
- **Search functionality** with autosuggest
- **Category navigation** with mega menu
- **Product detail pages** with image galleries and variants
- **Checkout flow** with payment integration ready

### UI/UX Features
- **Bento grid layout** for category tiles (Example1.png style)
- **Infinite scroll** product listings with pagination fallback
- **Hover effects** and smooth animations with framer-motion
- **Accessibility** WCAG 2.1 AA compliant
- **Dark/light mode** support
- **Loading states** with skeleton animations
- **Error boundaries** and robust error handling

### Technical Features
- **TypeScript** for type safety
- **TanStack Query** for data fetching and caching
- **Mirakl API integration** ready with comprehensive client
- **MSW** for API mocking during development
- **Storybook** for component documentation
- **Jest + RTL** for testing
- **ESLint + Prettier** for code quality

## 🛠 Technology Stack

- **React 18+** with functional components and hooks
- **TypeScript** for type safety
- **TailwindCSS** for styling with custom design system
- **shadcn/ui** component library
- **TanStack Query** for server state management
- **React Router** for client-side routing
- **Framer Motion** for animations
- **Axios** for HTTP requests
- **Lucide React** for icons

## 🏗 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Layout components (Header, Footer, etc.)
│   ├── pages/              # Page components
│   └── common/             # Reusable components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and configurations
├── types/                  # TypeScript type definitions
├── fixtures/               # Dummy data for development
└── styles/                 # Global styles and themes
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd curate2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Configuration

Create a `.env` file in the root directory:

```env
# Mirakl API Configuration (optional for development)
REACT_APP_MIRAKL_BASE_URL=https://your-mirakl-instance.mirakl.net/api
REACT_APP_MIRAKL_API_KEY=your-api-key-here

# App Configuration
REACT_APP_APP_NAME=Curate
REACT_APP_DEFAULT_CURRENCY=AED
REACT_APP_DEFAULT_LOCALE=en-AE
```

> **Note**: When Mirakl credentials are not provided, the app automatically uses dummy data for development.

## 📱 Pages & Components

### Homepage (`/`)
- **Bento grid** category navigation
- **Brand carousel** with infinite scroll
- **Product sliders** (New In, Trending, Curate Picks)
- **Editorial banners** for promotions

### Product Listing (`/c/:category`)
- **Advanced filtering** (brand, price, color, size, rating)
- **Active filter chips** with individual removal
- **Grid toggle** (3-up ↔ 4-up)
- **Infinite scroll** with pagination fallback
- **Sort options** (price, rating, newest, popularity)

### Product Detail (`/p/:id`)
- **Image gallery** with zoom and thumbnails
- **Variant selection** (color, size) with availability
- **Add to cart/wishlist** functionality
- **Product information** accordions
- **Related products** carousel
- **Reviews** and ratings

### Shopping Bag (`/bag`)
- **Cart management** (quantity, remove, move to wishlist)
- **Order summary** with totals
- **Promo code** application
- **Secure checkout** flow

## 🎨 Design System

### Colors
- Custom CSS variables for theming
- Dark/light mode support
- Brand colors with semantic naming

### Typography
- **Inter** font family
- Responsive typography scales
- Proper contrast ratios

### Components
- **shadcn/ui** base components
- Custom product-specific components
- Consistent spacing and sizing

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run storybook` - Start Storybook
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Component Development

Components are built using:
- **TypeScript** for props and state typing
- **shadcn/ui** for base UI components
- **TailwindCSS** for styling
- **Framer Motion** for animations

Example component structure:
```tsx
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
  // other props
}

export function Component({ className, ...props }: ComponentProps) {
  return (
    <div className={cn("default-classes", className)}>
      {/* component content */}
    </div>
  );
}
```

## 🌐 Mirakl Integration

### API Client
The project includes a comprehensive Mirakl API client (`src/lib/miraklClient.ts`) with:
- **Automatic retry** with exponential backoff
- **Error handling** with user feedback
- **TypeScript interfaces** for all Mirakl entities
- **Request/response interceptors**

### Data Hooks
Custom hooks provide clean interfaces for data fetching:
- `useProducts()` - Product listing with filters
- `useProduct()` - Single product details
- `useCart()` - Shopping cart management
- `useWishlist()` - Wishlist functionality

### Fallback Data
When Mirakl API is unavailable, the app uses dummy data from `src/fixtures/products.json` to enable full functionality during development.

## 🧪 Testing

### Component Testing
```bash
npm test
```

Tests are written using:
- **Jest** for test runner
- **React Testing Library** for component testing
- **MSW** for API mocking

Component documentation and visual testing with Storybook.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

## 📄 License

This project is built for Mirakl marketplace integration. Please refer to your Mirakl license agreement for usage terms.