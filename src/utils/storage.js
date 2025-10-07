const STORAGE_KEY = 'birds-nz-classifieds-data'

// Initialize storage with seed data if empty
export const initializeStorage = () => {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    const seedData = {
      listings: [
        {
          id: '1',
          type: 'bird',
          title: 'Rainbow Lorikeet Breeding Pair',
          species: 'Rainbow Lorikeet',
          description: 'Beautiful, healthy breeding pair. Proven breeders with 3 successful clutches. Very colorful and friendly birds. DNA sexed male and female.',
          price: 800,
          location: 'Auckland',
          images: ['https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800', 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800'],
          contactName: 'Sarah Johnson',
          contactEmail: 'sarah.j@email.com',
          contactPhone: '021 234 5678',
          datePosted: '2025-10-01T10:00:00.000Z',
          status: 'active'
        },
        {
          id: '2',
          type: 'equipment',
          title: 'Large Bird Cage with Accessories',
          species: '',
          description: 'Excellent condition large bird cage (90cm x 60cm x 150cm high). Includes perches, feeders, and water bottles. Perfect for medium to large parrots. Must pick up.',
          price: 150,
          location: 'Wellington',
          images: ['https://images.unsplash.com/photo-1535338793269-419aa2f71e30?w=800'],
          contactName: 'Mike Thompson',
          contactEmail: 'mike.t@email.com',
          contactPhone: '',
          datePosted: '2025-10-02T14:30:00.000Z',
          status: 'active'
        },
        {
          id: '3',
          type: 'bird',
          title: 'Hand-Raised Cockatoo Baby',
          species: 'Sulphur-Crested Cockatoo',
          description: 'Gorgeous hand-raised baby cockatoo, 12 weeks old. Very tame and affectionate. Eating pellets and fresh food. Comes with hatch certificate and care guide.',
          price: 2500,
          location: 'Christchurch',
          images: ['https://images.unsplash.com/photo-1552728089-4e955583eb32?w=800', 'https://images.unsplash.com/photo-1586803255936-cda74f7fe412?w=800'],
          contactName: 'Emma Wilson',
          contactEmail: 'emma.w@email.com',
          contactPhone: '027 987 6543',
          datePosted: '2025-10-03T09:15:00.000Z',
          status: 'active'
        },
        {
          id: '4',
          type: 'food',
          title: 'Premium Parrot Pellets 20kg',
          species: '',
          description: 'High-quality parrot pellet food, 20kg bag. Suitable for all medium to large parrots. Freshly imported. Nationwide delivery available for additional cost.',
          price: 95,
          location: 'Nationwide',
          images: ['https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800'],
          contactName: 'Pet Supplies NZ',
          contactEmail: 'orders@petsupplies.co.nz',
          contactPhone: '0800 738 787',
          datePosted: '2025-09-28T08:00:00.000Z',
          status: 'active'
        },
        {
          id: '5',
          type: 'bird',
          title: 'Budgies - Various Colors',
          species: 'Budgerigar',
          description: 'Beautiful budgies in various colors - blue, green, yellow, white. Young birds, perfect for breeding or pets. $30 each or 2 for $50.',
          price: 30,
          location: 'Hamilton',
          images: ['https://images.unsplash.com/photo-1552728089-4c8b57ea0253?w=800'],
          contactName: 'Dave Patterson',
          contactEmail: 'dave.p@email.com',
          contactPhone: '021 445 6677',
          datePosted: '2025-10-04T16:45:00.000Z',
          status: 'active'
        },
        {
          id: '6',
          type: 'supplies',
          title: 'Nesting Boxes - Handmade',
          species: '',
          description: 'Handcrafted wooden nesting boxes suitable for cockatiels, conures, and small parrots. Made from untreated pine. Various sizes available. $25-$45 depending on size.',
          price: 35,
          location: 'Dunedin',
          images: ['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800'],
          contactName: 'John Crafts',
          contactEmail: 'john.crafts@email.com',
          contactPhone: '',
          datePosted: '2025-09-30T11:20:00.000Z',
          status: 'active'
        },
        {
          id: '7',
          type: 'bird',
          title: 'Kakariki Pair - Red Fronted',
          species: 'Red-Fronted Kakariki',
          description: 'Proven breeding pair of red-fronted kakariki. Native NZ species. Healthy and active. Have had 2 successful breeding seasons.',
          price: 350,
          location: 'Palmerston North',
          images: ['https://images.unsplash.com/photo-1555169062-013468b47731?w=800'],
          contactName: 'Lisa Brown',
          contactEmail: 'lisa.b@email.com',
          contactPhone: '022 334 5566',
          datePosted: '2025-10-05T13:00:00.000Z',
          status: 'active'
        },
        {
          id: '8',
          type: 'wanted',
          title: 'Wanted: Aviary Panels',
          species: '',
          description: 'Looking for second-hand aviary panels, any size. Must be in good condition with no rust. Will collect within Auckland region.',
          price: 0,
          location: 'Auckland',
          images: [],
          contactName: 'Tom Richards',
          contactEmail: 'tom.r@email.com',
          contactPhone: '021 888 9999',
          datePosted: '2025-10-06T10:30:00.000Z',
          status: 'active'
        },
        {
          id: '9',
          type: 'equipment',
          title: 'Outdoor Aviary - Complete Setup',
          species: '',
          description: 'Large outdoor aviary 3m x 2m x 2.5m high. Galvanized mesh, wooden frame. Includes safety porch. Dismantled and ready for pickup. Buyer must arrange transport.',
          price: 450,
          location: 'Tauranga',
          images: ['https://images.unsplash.com/photo-1501706362039-c06b2d715385?w=800'],
          contactName: 'Peter Walsh',
          contactEmail: 'peter.w@email.com',
          contactPhone: '027 111 2222',
          datePosted: '2025-09-29T15:00:00.000Z',
          status: 'active'
        },
        {
          id: '10',
          type: 'bird',
          title: 'Cockatiel Babies - Handfed',
          species: 'Cockatiel',
          description: 'Adorable handfed cockatiel babies ready for their new homes. Pearl, pied, and normal grey available. Very friendly and tame. 8-10 weeks old.',
          price: 120,
          location: 'Nelson',
          images: ['https://images.unsplash.com/photo-1559393628-f78d7c1ab2b6?w=800', 'https://images.unsplash.com/photo-1552728089-4c8b57ea0249?w=800'],
          contactName: 'Anna Lee',
          contactEmail: 'anna.lee@email.com',
          contactPhone: '022 555 6666',
          datePosted: '2025-10-07T08:30:00.000Z',
          status: 'active'
        }
      ],
      myListingIds: [] // Track which listings belong to this user (by ID)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData))
    return seedData
  }
  return JSON.parse(existing)
}

// Get all data
export const getData = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : initializeStorage()
}

// Save all data
export const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Get all listings
export const getListings = () => {
  const data = getData()
  return data.listings || []
}

// Get single listing by ID
export const getListing = (id) => {
  const listings = getListings()
  return listings.find(listing => listing.id === id)
}

// Add new listing
export const addListing = (listing) => {
  const data = getData()
  const newListing = {
    ...listing,
    id: Date.now().toString(),
    datePosted: new Date().toISOString(),
    status: 'active'
  }
  data.listings.unshift(newListing) // Add to beginning
  data.myListingIds.push(newListing.id) // Track as user's listing
  saveData(data)
  return newListing
}

// Update listing
export const updateListing = (id, updates) => {
  const data = getData()
  const index = data.listings.findIndex(listing => listing.id === id)
  if (index !== -1) {
    data.listings[index] = { ...data.listings[index], ...updates }
    saveData(data)
    return data.listings[index]
  }
  return null
}

// Delete listing
export const deleteListing = (id) => {
  const data = getData()
  data.listings = data.listings.filter(listing => listing.id !== id)
  data.myListingIds = data.myListingIds.filter(listingId => listingId !== id)
  saveData(data)
}

// Get user's listings
export const getMyListings = () => {
  const data = getData()
  return data.listings.filter(listing => data.myListingIds.includes(listing.id))
}

// Check if listing belongs to user
export const isMyListing = (id) => {
  const data = getData()
  return data.myListingIds.includes(id)
}

// Clear all data (for testing)
export const clearData = () => {
  localStorage.removeItem(STORAGE_KEY)
}
