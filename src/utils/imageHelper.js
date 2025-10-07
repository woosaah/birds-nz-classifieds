// Convert file to base64 string
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

// Resize image to max dimensions while maintaining aspect ratio
export const resizeImage = (file, maxWidth = 1200, maxHeight = 1200) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target.result

      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        // Convert to base64 with quality compression
        const resizedBase64 = canvas.toDataURL('image/jpeg', 0.85)
        resolve(resizedBase64)
      }

      img.onerror = reject
    }

    reader.onerror = reject
  })
}

// Process multiple image files
export const processImages = async (files, maxCount = 5) => {
  const fileArray = Array.from(files).slice(0, maxCount)
  const promises = fileArray.map(file => resizeImage(file))
  return Promise.all(promises)
}

// Validate image file
export const isValidImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPG, PNG, and WebP images are allowed' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be less than 10MB' }
  }

  return { valid: true }
}

// Validate multiple images
export const validateImages = (files, maxCount = 5) => {
  if (files.length > maxCount) {
    return { valid: false, error: `Maximum ${maxCount} images allowed` }
  }

  for (let file of files) {
    const validation = isValidImageFile(file)
    if (!validation.valid) {
      return validation
    }
  }

  return { valid: true }
}
