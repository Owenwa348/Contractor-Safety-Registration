<!-- App.vue -->
<template>
  <div class="bg-gray-50 min-h-screen">
    <component :is="isPublicPage ? 'div' : LayoutWrapper">
      <router-view />
    </component>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import LayoutWrapper from './components/LayoutWrapper.vue'

const route = useRoute()
const isPublicPage = computed(() => route.meta.public === true)
</script>