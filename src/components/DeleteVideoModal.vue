<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-auto text-gray-100">
        <h2 class="text-2xl font-bold mb-4">Confirmar Eliminación</h2>
        <p class="mb-6">¿Estás seguro de que quieres eliminar el video " <span class="font-semibold">{{ video.title }}</span>"? Esta acción no se puede deshacer.</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition duration-150 ease-in-out"
          >
            Cancelar
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    video: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['close', 'confirm'])
  
  const confirmDelete = () => {
    emit('confirm', props.video.id)
  }
  </script>