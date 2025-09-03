// usePagination.js
import { ref, computed } from 'vue'

export function usePagination(data, initialItemsPerPage = 25) {
  const currentPage = ref(1)
  const itemsPerPage = ref(initialItemsPerPage)

  const totalPages = computed(() => {
    return Math.ceil(data.value.length / itemsPerPage.value)
  })

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + parseInt(itemsPerPage.value)
    return data.value.slice(start, end)
  })

  const startIndex = computed(() => {
    return (currentPage.value - 1) * itemsPerPage.value
  })

  const setPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const setItemsPerPage = (items) => {
    itemsPerPage.value = items
    currentPage.value = 1 // Reset to first page
  }

  // Auto-adjust page if current page becomes invalid
  const adjustPageIfNeeded = () => {
    if (paginatedData.value.length === 0 && currentPage.value > 1) {
      currentPage.value = Math.max(1, currentPage.value - 1)
    }
  }

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    startIndex,
    setPage,
    setItemsPerPage,
    adjustPageIfNeeded
  }
}