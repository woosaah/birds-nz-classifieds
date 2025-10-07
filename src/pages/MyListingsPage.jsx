import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMyListings } from '../utils/storage'
import ListingCard from '../components/ListingCard'

function MyListingsPage() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadListings()
  }, [])

  const loadListings = () => {
    const myListings = getMyListings()
    setListings(myListings)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🦜</div>
          <p className="text-gray-600">Loading your listings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          My Listings
        </h1>
        <p className="text-gray-600">
          Manage your posted listings
        </p>
      </div>

      {/* Empty state */}
      {listings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Listings Yet
          </h2>
          <p className="text-gray-600 mb-6">
            You haven't posted any listings. Start by creating your first listing!
          </p>
          <Link
            to="/create"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-medium"
          >
            Post Your First Listing
          </Link>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-primary mb-1">
                {listings.filter(l => l.status === 'active').length}
              </div>
              <div className="text-gray-600">Active Listings</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-gray-700 mb-1">
                {listings.length}
              </div>
              <div className="text-gray-600">Total Listings</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
              <Link
                to="/create"
                className="text-primary hover:text-green-600 font-medium flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Post New Listing
              </Link>
            </div>
          </div>

          {/* Listings grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MyListingsPage
