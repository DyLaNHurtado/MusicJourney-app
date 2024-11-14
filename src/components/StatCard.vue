<!-- src/components/StatCard.vue -->
<template>
    <div class="bg-gray-700 rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold mb-2 text-gray-300">{{ title }}</h3>
      <p class="text-3xl font-bold text-white">
        {{ value }} <span class="text-sm font-normal text-gray-400">{{ unit }}</span>
      </p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    value: Number,
    unit: String
  })
  </script>