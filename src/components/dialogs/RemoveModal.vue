<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Card class="w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Confirmar Eliminación</h2>
        <p class="mb-4">¿Estás seguro de que deseas eliminar este video? Esta acción no se puede deshacer.</p>
        <div class="flex justify-end space-x-2">
          <Button variant="secondary" @click="$emit('close')">Cancelar</Button>
          <Button variant="danger" @click="$emit('confirm')">Eliminar</Button>
        </div>
      </Card>
    </div>
  </template>
  
  <script setup>
  import Card from '../ui/Card.vue';
  </script>
  