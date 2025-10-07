import ListingCard from './ListingCard'

/**
 * FeaturedListings - Display featured listings on homepage
 * Props:
 * - listings: array of listing objects
 * - count: number of listings to display (default 6)
 */
function FeaturedListings({ listings, count = 6 }) {
  const featured = listings.slice(0, count)

  if (featured.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No listings available yet. Be the first to post!
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featured.map((listing) => (
        <ListingCard key={listing.id} listing={listing} featured={true} />
      ))}
    </div>
  )
}

export default FeaturedListings
