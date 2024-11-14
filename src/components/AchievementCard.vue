<!-- src/components/AchievementCard.vue -->
<template>
    <Card>
      <div class="text-center">
        <div class="text-4xl mb-4">{{ achievement.icon }}</div>
        <h3 class="text-xl font-semibold text-white mb-2">{{ achievement.title }}</h3>
        <p class="text-sm text-gray-400">{{ achievement.description }}</p>
      </div>
    </Card>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import Card from './ui/Card.vue'
  
  defineProps({
    achievement: {
      type: Object,
      required: true
    }
  })
  </script>