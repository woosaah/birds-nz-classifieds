// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number (NZ format)
export const isValidPhone = (phone) => {
  if (!phone) return true // Phone is optional
  const phoneRegex = /^(0\d{1,3}[\s-]?\d{3}[\s-]?\d{4}|02\d[\s-]?\d{3}[\s-]?\d{4})$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Validate listing form
export const validateListing = (formData) => {
  const errors = {}

  if (!formData.title || formData.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters'
  }

  if (!formData.type) {
    errors.type = 'Please select a category'
  }

  if (formData.type === 'bird' && (!formData.species || formData.species.trim().length < 2)) {
    errors.species = 'Species is required for bird listings'
  }

  if (!formData.description || formData.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters'
  }

  if (formData.type !== 'wanted' && (!formData.price || formData.price < 0)) {
    errors.price = 'Please enter a valid price'
  }

  if (!formData.location || formData.location.trim().length < 2) {
    errors.location = 'Location is required'
  }

  if (!formData.contactName || formData.contactName.trim().length < 2) {
    errors.contactName = 'Contact name is required'
  }

  if (!formData.contactEmail || !isValidEmail(formData.contactEmail)) {
    errors.contactEmail = 'Please enter a valid email address'
  }

  if (formData.contactPhone && !isValidPhone(formData.contactPhone)) {
    errors.contactPhone = 'Please enter a valid NZ phone number'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Validate contact form
export const validateContactForm = (formData) => {
  const errors = {}

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name is required'
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
