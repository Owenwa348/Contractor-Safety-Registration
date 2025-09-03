<!-- StatisticsCards.vue -->
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mt-6">
    <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-blue-600 text-sm font-medium">รวมทั้งหมด</p>
          <p class="text-2xl font-bold text-blue-700">{{ totalCount }}</p>
        </div>
        <div class="text-blue-400">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      </div>
    </div>
    
    <div 
      v-for="status in statusItems" 
      :key="status.name"
      :class="status.bgClass"
      class="border-l-4 p-4 rounded-r-lg hover:shadow-md transition-shadow"
    >
      <div class="flex items-center justify-between">
        <div>
          <p :class="status.textClass" class="text-sm font-medium">{{ status.label }}</p>
          <p :class="status.boldClass" class="text-2xl font-bold">{{ status.count }}</p>
        </div>
        <div :class="status.iconClass">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path v-html="status.iconPath" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticsCards',
  props: {
    totalCount: {
      type: Number,
      required: true
    },
    statusCounts: {
      type: Object,
      required: true
    }
  },
  computed: {
    statusItems() {
      return [
        {
          name: 'รอการอนุมัติ',
          label: 'รอการอนุมัติ',
          count: this.statusCounts['รอการอนุมัติ'] || 0,
          bgClass: 'bg-yellow-50 border-yellow-400',
          textClass: 'text-yellow-600',
          boldClass: 'text-yellow-700',
          iconClass: 'text-yellow-400',
          iconPath: 'fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"'
        },
        {
          name: 'อนุมัติแล้ว',
          label: 'อนุมัติแล้ว',
          count: this.statusCounts['อนุมัติแล้ว'] || 0,
          bgClass: 'bg-green-50 border-green-400',
          textClass: 'text-green-600',
          boldClass: 'text-green-700',
          iconClass: 'text-green-400',
          iconPath: 'fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"'
        },
        {
          name: 'ไม่อนุมัติ',
          label: 'ไม่อนุมัติ',
          count: this.statusCounts['ไม่อนุมัติ'] || 0,
          bgClass: 'bg-red-50 border-red-400',
          textClass: 'text-red-600',
          boldClass: 'text-red-700',
          iconClass: 'text-red-400',
          iconPath: 'fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"'
        },
        {
          name: 'ผ่านการอบรม',
          label: 'ผ่านการอบรม',
          count: this.statusCounts['ผ่านการอบรม'] || 0,
          bgClass: 'bg-indigo-50 border-indigo-400',
          textClass: 'text-indigo-600',
          boldClass: 'text-indigo-700',
          iconClass: 'text-indigo-400',
          iconPath: 'fill-rule="evenodd" d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" clip-rule="evenodd"'
        },
        {
          name: 'หมดอายุ',
          label: 'หมดอายุ',
          count: this.statusCounts['หมดอายุ'] || 0,
          bgClass: 'bg-gray-50 border-gray-400',
          textClass: 'text-gray-600',
          boldClass: 'text-gray-700',
          iconClass: 'text-gray-400',
          iconPath: 'fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"'
        },
        {
          name: 'ไม่ผ่าน',
          label: 'ไม่ผ่าน',
          count: this.statusCounts['ไม่ผ่าน'] || 0,
          bgClass: 'bg-orange-50 border-orange-400',
          textClass: 'text-orange-600',
          boldClass: 'text-orange-700',
          iconClass: 'text-orange-400',
          iconPath: 'fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"'
        }
      ];
    }
  }
}
</script>