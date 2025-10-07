import { Link } from 'react-router-dom'

/**
 * ListingCard - Displays a single listing in card format
 * Props:
 * - listing: object with id, title, type, species, price, location, images, datePosted
 * - featured: boolean to apply accent styling for featured listings
 */
function ListingCard({ listing, featured = false }) {
  const { id, title, type, species, price, location, images, datePosted } = listing

  // Format date to relative time
  const getTimeAgo = (date) => {
    const now = new Date()
    const posted = new Date(date)
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`

    return posted.toLocaleDateString()
  }

  // Get category badge color
  const getCategoryColor = (type) => {
    const colors = {
      bird: 'bg-primary text-white',
      equipment: 'bg-secondary text-white',
      food: 'bg-purple-500 text-white',
      supplies: 'bg-pink-500 text-white',
      wanted: 'bg-gray-500 text-white'
    }
    return colors[type] || 'bg-gray-500 text-white'
  }

  // Format category display name
  const getCategoryName = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <Link
      to={`/listing/${id}`}
      className={`block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
        featured ? 'ring-2 ring-accent' : ''
      }`}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {images && images.length > 0 ? (
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-6xl">🦜</span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(type)}`}>
            {getCategoryName(type)}
          </span>
        </div>

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-2 right-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-white">
              Featured
            </span>
          </div>
        )}

        {/* Multiple images indicator */}
        {images && images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            📷 {images.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
          {title}
        </h3>

        {species && (
          <p className="text-sm text-gray-600 mb-2">
            {species}
          </p>
        )}

        <div className="flex items-center justify-between mt-3">
          <div>
            {type === 'wanted' ? (
              <p className="text-lg font-bold text-gray-700">Wanted</p>
            ) : (
              <p className="text-xl font-bold text-primary">
                ${price.toLocaleString()}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">📍 {location}</p>
            <p className="text-xs text-gray-500 mt-1">{getTimeAgo(datePosted)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ListingCard
