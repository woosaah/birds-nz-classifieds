/**
 * CategoryNav - Category filter navigation
 * Props:
 * - selectedCategory: currently selected category (or null for all)
 * - onCategoryChange: callback function(category)
 * - counts: optional object with counts per category
 */
function CategoryNav({ selectedCategory, onCategoryChange, counts = {} }) {
  const categories = [
    { id: null, name: 'All', icon: '🦜', color: 'hover:bg-gray-100' },
    { id: 'bird', name: 'Birds', icon: '🦜', color: 'hover:bg-primary hover:bg-opacity-10' },
    { id: 'equipment', name: 'Equipment', icon: '🏠', color: 'hover:bg-secondary hover:bg-opacity-10' },
    { id: 'food', name: 'Food', icon: '🌾', color: 'hover:bg-purple-100' },
    { id: 'supplies', name: 'Supplies', icon: '📦', color: 'hover:bg-pink-100' },
    { id: 'wanted', name: 'Wanted', icon: '🔍', color: 'hover:bg-gray-100' },
  ]

  const getActiveStyle = (categoryId) => {
    if (selectedCategory === categoryId) {
      if (categoryId === null) return 'bg-gray-200 font-semibold'
      if (categoryId === 'bird') return 'bg-primary bg-opacity-20 text-primary font-semibold'
      if (categoryId === 'equipment') return 'bg-secondary bg-opacity-20 text-secondary font-semibold'
      if (categoryId === 'food') return 'bg-purple-200 text-purple-700 font-semibold'
      if (categoryId === 'supplies') return 'bg-pink-200 text-pink-700 font-semibold'
      if (categoryId === 'wanted') return 'bg-gray-300 font-semibold'
    }
    return ''
  }

  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {categories.map((category) => (
        <button
          key={category.id || 'all'}
          onClick={() => onCategoryChange(category.id)}
          className={`
            px-4 py-2 rounded-lg transition-all duration-200
            border border-gray-200
            ${getActiveStyle(category.id)}
            ${category.color}
            flex items-center space-x-2
          `}
        >
          <span className="text-lg">{category.icon}</span>
          <span className="text-sm md:text-base">{category.name}</span>
          {counts[category.id] !== undefined && (
            <span className="ml-1 text-xs bg-white bg-opacity-50 px-2 py-0.5 rounded-full">
              {counts[category.id]}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

export default CategoryNav
