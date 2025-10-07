import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useListings } from '../hooks/useListings'
import ListingCard from '../components/ListingCard'
import SearchBar from '../components/SearchBar'
import CategoryNav from '../components/CategoryNav'

function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Get initial filters from URL
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || null,
    search: searchParams.get('search') || '',
    sortBy: searchParams.get('sort') || 'date-desc'
  })

  const { listings, loading } = useListings(filters)

  // Update URL when filters change
  useEffect(() => {
    const params = {}
    if (filters.type) params.type = filters.type
    if (filters.search) params.search = filters.search
    if (filters.sortBy !== 'date-desc') params.sort = filters.sortBy
    setSearchParams(params)
  }, [filters, setSearchParams])

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, type: category }))
  }

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }))
  }

  const handleSortChange = (e) => {
    setFilters(prev => ({ ...prev, sortBy: e.target.value }))
  }

  const clearFilters = () => {
    setFilters({ type: null, search: '', sortBy: 'date-desc' })
  }

  const hasActiveFilters = filters.type || filters.search

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🦜</div>
          <p className="text-gray-600">Loading listings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Browse Listings
        </h1>
        <p className="text-gray-600">
          {listings.length} {listings.length === 1 ? 'listing' : 'listings'} available
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by title, species, description..."
        />
      </div>

      {/* Category navigation */}
      <div className="mb-6">
        <CategoryNav
          selectedCategory={filters.type}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Filters and sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:text-green-600 font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            value={filters.sortBy}
            onChange={handleSortChange}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Listings grid */}
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No listings found
          </h3>
          <p className="text-gray-600 mb-6">
            {hasActiveFilters
              ? 'Try adjusting your filters or search terms'
              : 'Be the first to post a listing!'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ListingsPage
