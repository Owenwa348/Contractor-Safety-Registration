<template>
  <div>
    <Navbar />
    <div class="flex">
      <Sidebar />
      <div class="flex-1 p-6">
        <StepProgress />
        <div class="mt-3">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
import StepProgress from './StepProgress.vue'
</script>
