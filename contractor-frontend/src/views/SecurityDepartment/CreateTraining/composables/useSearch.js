import { ref, computed } from 'vue';

export function useSearch(events) {
  const searchQuery = ref('');

  const filteredEvents = computed(() => {
    if (!searchQuery.value.trim()) return events.value;
    
    const query = searchQuery.value.toLowerCase().trim();
    return events.value.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.type.toLowerCase().includes(query) ||
      event.examiner.toLowerCase().includes(query) ||
      event.room.toLowerCase().includes(query)
    );
  });

  const clearSearch = () => {
    searchQuery.value = '';
  };

  return {
    searchQuery,
    filteredEvents,
    clearSearch
  };
}