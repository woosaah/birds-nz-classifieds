import { useState, useEffect, useMemo } from 'react'
import { getListings, initializeStorage } from '../utils/storage'

// Custom hook for managing listings with filtering and sorting
export const useListings = (filters = {}) => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  // Load listings from localStorage
  useEffect(() => {
    try {
      // Initialize storage with seed data if needed
      initializeStorage()
      const data = getListings()
      setListings(data)
    } catch (error) {
      console.error('Error loading listings:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Refresh listings (call after add/update/delete)
  const refreshListings = () => {
    const data = getListings()
    setListings(data)
  }

  // Filter and sort listings based on provided filters
  const filteredListings = useMemo(() => {
    let result = [...listings]

    // Filter by status (default to active only)
    if (filters.status !== undefined) {
      result = result.filter(listing => listing.status === filters.status)
    } else {
      result = result.filter(listing => listing.status === 'active')
    }

    // Filter by type/category
    if (filters.type) {
      result = result.filter(listing => listing.type === filters.type)
    }

    // Filter by search query (searches title, species, description)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(listing =>
        listing.title.toLowerCase().includes(searchLower) ||
        listing.species.toLowerCase().includes(searchLower) ||
        listing.description.toLowerCase().includes(searchLower)
      )
    }

    // Filter by location
    if (filters.location) {
      result = result.filter(listing =>
        listing.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      result = result.filter(listing => listing.price >= filters.minPrice)
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter(listing => listing.price <= filters.maxPrice)
    }

    // Sort listings
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    } else {
      // Default: sort by date (newest first)
      result.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
    }

    return result
  }, [listings, filters])

  return {
    listings: filteredListings,
    allListings: listings,
    loading,
    refreshListings
  }
}

export default useListings
