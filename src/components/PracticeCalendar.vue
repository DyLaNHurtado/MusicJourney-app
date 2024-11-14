<!-- src/components/PracticeCalendar.vue -->
<template>
    <div class="card">
      <h2 class="text-xl font-bold mb-4">Calendario de Práctica</h2>
      <div class="grid grid-cols-7 gap-1">
        <div v-for="day in 35" :key="day" class="aspect-square">
          <div
            :class="[
              'w-full h-full rounded-lg flex items-center justify-center cursor-pointer transition-colors',
              isPracticeDay(day) ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
            ]"
            @click="togglePracticeDay(day)"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const practiceDays = ref(new Set([1, 3, 5, 7, 10, 12, 15, 18, 20, 22, 25, 28, 30]));
  
  const isPracticeDay = (day) => practiceDays.value.has(day);
  
  const togglePracticeDay = (day) => {
    if (practiceDays.value.has(day)) {
      practiceDays.value.delete(day);
    } else {
      practiceDays.value.add(day);
    }
  };
  </script>