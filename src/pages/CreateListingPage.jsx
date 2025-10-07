import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addListing } from '../utils/storage'
import { validateListing } from '../utils/validation'
import { processImages, validateImages } from '../utils/imageHelper'

function CreateListingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: form, 2: preview

  const [formData, setFormData] = useState({
    type: '',
    title: '',
    species: '',
    description: '',
    price: '',
    location: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    images: []
  })

  const [errors, setErrors] = useState({})
  const [imageFiles, setImageFiles] = useState([])
  const [imageError, setImageError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files)
    setImageError('')

    // Validate images
    const validation = validateImages(files, 5)
    if (!validation.valid) {
      setImageError(validation.error)
      return
    }

    try {
      // Process and resize images
      const processedImages = await processImages(files, 5)
      setFormData(prev => ({ ...prev, images: processedImages }))
      setImageFiles(files)
    } catch (error) {
      console.error('Error processing images:', error)
      setImageError('Error processing images. Please try again.')
    }
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handlePreview = (e) => {
    e.preventDefault()

    // Validate form
    const validation = validateListing(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setStep(2)
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    try {
      // Add listing to storage
      const newListing = addListing({
        ...formData,
        price: parseFloat(formData.price) || 0
      })

      // Navigate to the new listing
      navigate(`/listing/${newListing.id}`)
    } catch (error) {
      console.error('Error creating listing:', error)
      alert('Error creating listing. Please try again.')
      setSubmitting(false)
    }
  }

  const handleBack = () => {
    setStep(1)
  }

  const NZ_REGIONS = [
    'Northland', 'Auckland', 'Waikato', 'Bay of Plenty', 'Gisborne',
    'Hawke\'s Bay', 'Taranaki', 'Manawatu-Wanganui', 'Wellington',
    'Tasman', 'Nelson', 'Marlborough', 'West Coast', 'Canterbury',
    'Otago', 'Southland', 'Nationwide'
  ]

  if (step === 2) {
    // Preview step
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Preview Your Listing</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* Images */}
          {formData.images.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Category */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-sm font-semibold">
              {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{formData.title}</h2>

          {/* Species */}
          {formData.species && (
            <p className="text-lg text-gray-600 mb-4">Species: {formData.species}</p>
          )}

          {/* Price */}
          {formData.type === 'wanted' ? (
            <div className="text-2xl font-bold text-gray-700 mb-4">Wanted</div>
          ) : (
            <div className="text-3xl font-bold text-primary mb-4">
              ${parseFloat(formData.price).toLocaleString()}
            </div>
          )}

          {/* Location */}
          <p className="text-gray-600 mb-4">📍 {formData.location}</p>

          {/* Description */}
          <div className="border-t pt-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{formData.description}</p>
          </div>

          {/* Contact info */}
          <div className="border-t pt-4 bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
            <p className="text-gray-700">{formData.contactName}</p>
            <p className="text-gray-700">{formData.contactEmail}</p>
            {formData.contactPhone && <p className="text-gray-700">{formData.contactPhone}</p>}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
          >
            ← Back to Edit
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Posting...' : 'Post Listing'}
          </button>
        </div>
      </div>
    )
  }

  // Form step
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Listing</h1>
      <p className="text-gray-600 mb-6">Fill in the details below to create your listing</p>

      <form onSubmit={handlePreview} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { id: 'bird', name: 'Birds', icon: '🦜' },
              { id: 'equipment', name: 'Equipment', icon: '🏠' },
              { id: 'food', name: 'Food', icon: '🌾' },
              { id: 'supplies', name: 'Supplies', icon: '📦' },
              { id: 'wanted', name: 'Wanted', icon: '🔍' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: cat.id }))}
                className={`p-4 border-2 rounded-lg text-center transition ${
                  formData.type === cat.id
                    ? 'border-primary bg-primary bg-opacity-10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-1">{cat.icon}</div>
                <div className="text-sm font-medium">{cat.name}</div>
              </button>
            ))}
          </div>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Rainbow Lorikeet Breeding Pair"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Species (only for birds) */}
        {formData.type === 'bird' && (
          <div>
            <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-1">
              Species *
            </label>
            <input
              type="text"
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.species ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Rainbow Lorikeet"
            />
            {errors.species && <p className="text-red-500 text-sm mt-1">{errors.species}</p>}
          </div>
        )}

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Provide detailed information about your listing..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Price */}
        {formData.type !== 'wanted' && (
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (NZD) *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
        )}

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a region...</option>
            {NZ_REGIONS.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photos (up to 5)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}

          {/* Image previews */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

          <div className="space-y-4">
            {/* Contact Name */}
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.contactName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>}
            </div>

            {/* Contact Email */}
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
            </div>

            {/* Contact Phone */}
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone (optional)
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.contactPhone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="021 234 5678"
              />
              {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="border-t pt-6">
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition font-medium text-lg"
          >
            Preview Listing
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateListingPage
