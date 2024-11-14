<!-- src/components/layout/Header.vue -->
<template>
    <header class="bg-gray-800 shadow-md">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-white">{{ currentRoute }}</h1>
          </div>
          <div class="flex flex-row gap-3 items-center justify-center">
            <AvatarProfile class="md:hidden"/>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import AvatarProfile from '../ui/AvatarProfile.vue'

  
  const route = useRoute()
  console.log(route.name)

  const currentRoute = computed(() => {
    switch (route.name) {
      case 'dashboard': return 'Vista principal'
      case 'songs': return 'Mis Canciones'
      case 'videos': return 'Mis Videos'
      case 'achievements': return 'Mis Logros'
      default: return ''
    }
  })
  </script>