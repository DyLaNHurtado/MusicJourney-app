<template>
    <div class="flex items-center space-x-4 w-full bg-gray-800 rounded-lg p-3">
    <div class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold">
        {{ userInitials }}
    </div>
    <div>
        <h3 class="text-sm font-medium">{{ userName }}</h3>
        <p class="text-xs text-gray-400">{{ userStatus }}</p>
    </div>
    </div>
</template>
<script setup>
  import { computed } from 'vue'
  const userName = 'John Doe'
  const userStatus = 'GuitarHero en proceso'
  const userInitials = computed(() => {
    return userName.split(' ').map(n => n[0]).join('').toUpperCase()
  })
</script>