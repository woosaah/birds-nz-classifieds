import { Routes, Route, Link, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ListingsPage from './pages/ListingsPage'
import ListingDetailPage from './pages/ListingDetailPage'
import CreateListingPage from './pages/CreateListingPage'
import MyListingsPage from './pages/MyListingsPage'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🦜</span>
              <span className="text-xl font-bold text-primary">Birds NZ Classifieds</span>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`${location.pathname === '/' ? 'text-primary' : 'text-gray-700'} hover:text-primary transition`}
              >
                Home
              </Link>
              <Link
                to="/listings"
                className={`${location.pathname === '/listings' ? 'text-primary' : 'text-gray-700'} hover:text-primary transition`}
              >
                Browse
              </Link>
              <Link
                to="/create"
                className={`${location.pathname === '/create' ? 'text-primary' : 'text-gray-700'} hover:text-primary transition`}
              >
                Post Ad
              </Link>
              <Link
                to="/my-listings"
                className={`${location.pathname === '/my-listings' ? 'text-primary' : 'text-gray-700'} hover:text-primary transition`}
              >
                My Listings
              </Link>
            </nav>

            {/* Mobile menu button */}
            <Link
              to="/create"
              className="md:hidden bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition"
            >
              Post Ad
            </Link>
          </div>

          {/* Mobile nav */}
          <nav className="md:hidden flex space-x-4 pb-3 overflow-x-auto">
            <Link
              to="/"
              className={`${location.pathname === '/' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'} whitespace-nowrap pb-1 text-sm`}
            >
              Home
            </Link>
            <Link
              to="/listings"
              className={`${location.pathname === '/listings' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'} whitespace-nowrap pb-1 text-sm`}
            >
              Browse
            </Link>
            <Link
              to="/my-listings"
              className={`${location.pathname === '/my-listings' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'} whitespace-nowrap pb-1 text-sm`}
            >
              My Listings
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listing/:id" element={<ListingDetailPage />} />
          <Route path="/create" element={<CreateListingPage />} />
          <Route path="/my-listings" element={<MyListingsPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Birds NZ Classifieds</h3>
              <p className="text-sm text-gray-600">
                New Zealand's marketplace for the bird breeding community
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/listings?type=bird" className="hover:text-primary">Birds</Link></li>
                <li><Link to="/listings?type=equipment" className="hover:text-primary">Equipment</Link></li>
                <li><Link to="/listings?type=food" className="hover:text-primary">Food</Link></li>
                <li><Link to="/listings?type=supplies" className="hover:text-primary">Supplies</Link></li>
                <li><Link to="/listings?type=wanted" className="hover:text-primary">Wanted</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/create" className="hover:text-primary">Post an Ad</Link></li>
                <li><Link to="/my-listings" className="hover:text-primary">My Listings</Link></li>
                <li><Link to="/listings" className="hover:text-primary">Browse All</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
            <p>&copy; 2025 Birds NZ Classifieds. Built for the NZ bird breeding community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
