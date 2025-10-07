import { Link } from 'react-router-dom'
import { useListings } from '../hooks/useListings'
import SearchBar from '../components/SearchBar'
import FeaturedListings from '../components/FeaturedListings'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const { listings, loading } = useListings()
  const navigate = useNavigate()

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      navigate(`/listings?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  // Calculate category counts
  const categoryCounts = {
    bird: listings.filter(l => l.type === 'bird').length,
    equipment: listings.filter(l => l.type === 'equipment').length,
    food: listings.filter(l => l.type === 'food').length,
    supplies: listings.filter(l => l.type === 'supplies').length,
    wanted: listings.filter(l => l.type === 'wanted').length,
  }

  const categoryCards = [
    { id: 'bird', name: 'Birds', icon: '🦜', color: 'bg-primary', count: categoryCounts.bird },
    { id: 'equipment', name: 'Equipment', icon: '🏠', color: 'bg-secondary', count: categoryCounts.equipment },
    { id: 'food', name: 'Food', icon: '🌾', color: 'bg-purple-500', count: categoryCounts.food },
    { id: 'supplies', name: 'Supplies', icon: '📦', color: 'bg-pink-500', count: categoryCounts.supplies },
    { id: 'wanted', name: 'Wanted', icon: '🔍', color: 'bg-gray-500', count: categoryCounts.wanted },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🦜</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-primary to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Birds NZ Classifieds
            </h1>
            <p className="text-xl md:text-2xl text-green-100">
              New Zealand's marketplace for the bird breeding community
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search for birds, equipment, supplies..."
            />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8 text-center">
            <div>
              <div className="text-3xl font-bold">{listings.length}</div>
              <div className="text-green-100 text-sm">Active Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5</div>
              <div className="text-green-100 text-sm">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold">NZ Wide</div>
              <div className="text-green-100 text-sm">Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Browse Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categoryCards.map((category) => (
            <Link
              key={category.id}
              to={`/listings?type=${category.id}`}
              className={`${category.color} text-white rounded-lg p-6 hover:opacity-90 transition shadow-md hover:shadow-lg`}
            >
              <div className="text-center">
                <div className="text-5xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                <p className="text-sm opacity-90">{category.count} listings</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Latest Listings
          </h2>
          <Link
            to="/listings"
            className="text-primary hover:text-green-600 font-medium flex items-center"
          >
            View All
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <FeaturedListings listings={listings} count={6} />
      </section>

      {/* How it works */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                1. Browse Listings
              </h3>
              <p className="text-gray-600">
                Search through hundreds of listings for birds, equipment, and supplies across New Zealand.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                2. Contact Sellers
              </h3>
              <p className="text-gray-600">
                Found what you're looking for? Send a message directly to the seller through our platform.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                3. Post Your Own
              </h3>
              <p className="text-gray-600">
                Have something to sell? Create your free listing in minutes and reach the NZ bird community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-gradient-to-r from-primary to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-green-100 mb-6">
            Join New Zealand's premier bird breeding community marketplace
          </p>
          <Link
            to="/create"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition shadow-lg"
          >
            Post a Free Listing
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
