import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getListing, deleteListing, isMyListing } from '../utils/storage'
import ImageGallery from '../components/ImageGallery'
import ContactForm from '../components/ContactForm'

function ListingDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showContactForm, setShowContactForm] = useState(false)
  const [isMine, setIsMine] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const data = getListing(id)
    if (data) {
      setListing(data)
      setIsMine(isMyListing(id))
    }
    setLoading(false)
  }, [id])

  const handleDelete = () => {
    deleteListing(id)
    navigate('/my-listings')
  }

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard!')
  }

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

  const getCategoryName = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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

  if (!listing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Not Found</h2>
          <p className="text-gray-600 mb-6">
            This listing may have been removed or doesn't exist.
          </p>
          <Link
            to="/listings"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Browse Listings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:grid md:grid-cols-2 gap-6 p-6">
          {/* Left column - Images */}
          <div>
            <ImageGallery images={listing.images} alt={listing.title} />
          </div>

          {/* Right column - Details */}
          <div>
            {/* Category badge */}
            <div className="mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(listing.type)}`}>
                {getCategoryName(listing.type)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {listing.title}
            </h1>

            {/* Species */}
            {listing.species && (
              <p className="text-lg text-gray-600 mb-4">
                Species: <span className="font-medium">{listing.species}</span>
              </p>
            )}

            {/* Price */}
            {listing.type === 'wanted' ? (
              <div className="text-2xl font-bold text-gray-700 mb-6">
                Wanted
              </div>
            ) : (
              <div className="text-3xl font-bold text-primary mb-6">
                ${listing.price.toLocaleString()}
              </div>
            )}

            {/* Location and Date */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {listing.location}
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Posted on {formatDate(listing.datePosted)}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              {isMine ? (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center text-green-700 font-medium">
                    ✓ This is your listing
                  </div>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-medium"
                  >
                    Delete Listing
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition font-medium"
                >
                  Contact Seller
                </button>
              )}

              <button
                onClick={handleShare}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Listing
              </button>
            </div>
          </div>
        </div>

        {/* Description section */}
        <div className="border-t p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {listing.description}
          </p>
        </div>

        {/* Seller information */}
        {!isMine && (
          <div className="border-t bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Seller Information</h2>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {listing.contactName}
              </div>
              <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {listing.contactEmail}
              </div>
              {listing.contactPhone && (
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {listing.contactPhone}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
        listingTitle={listing.title}
        sellerEmail={listing.contactEmail}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowDeleteConfirm(false)}></div>
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Listing?</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this listing? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListingDetailPage
