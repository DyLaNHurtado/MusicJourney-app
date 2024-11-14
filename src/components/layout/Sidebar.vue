<!-- src/components/layout/Sidebar.vue -->
<template>
    <div>
      <!-- Sidebar for larger screens -->
      <div
        :class="[
          'bg-gray-900 text-gray-100 h-full w-64 space-y-6 py-7 px-2 inset-y-0 left-0 transform transition duration-200 ease-in-out z-30 max-md:hidden'
        ]"
      >
        <div class="flex items-center justify-between px-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
            <span class="text-2xl font-extrabold">MusicJourney</span>
          <button @click="toggleSidebar" class="md:hidden text-gray-300 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <nav class="space-y-2">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" :aria-label="`Ir a ${item.name}`">
            <span v-html="item.icon" class="w-5 h-5 mr-3"></span>
            {{ item.name }}
          </router-link>
        </nav>
        <div class="absolute bottom-0 left-0 right-0 p-4">
            <AvatarProfile/>
        </div>
      </div>
  
      <!-- Bottom navigation for mobile -->
      <div class="fixed bottom-0 left-0 right-0 bg-gray-900 text-gray-100 flex justify-around items-center h-16 md:hidden z-30">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="flex flex-col items-center justify-center w-full h-full" :aria-label="`Ir a ${item.name}`">
          <span v-html="item.icon" class="w-6 h-6"></span>
          <span class="text-xs mt-1">{{ item.name }}</span>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
import AvatarProfile from '../ui/AvatarProfile.vue';
  
  
  const navItems = [
    { 
      name: 'Vista principal', 
      path: '/', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>'
    },
    { 
      name: 'Canciones', 
      path: '/songs', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>'
    },
    { 
      name: 'Videos', 
      path: '/videos', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>'
    },
    { 
      name: 'Logros', 
      path: '/achievements', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>'
    },
  ]

  </script>
  
  <style scoped>
  </style>