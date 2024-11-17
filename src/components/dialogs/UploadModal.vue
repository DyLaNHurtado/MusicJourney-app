<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Card class="w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Subir Video</h2>
        <Input id="videoTitle" v-model="newVideo.title" label="Título" class="mb-4" />
        <Input id="videoDescription" v-model="newVideo.description" label="Descripción" class="mb-4" />
        <div class="flex justify-end space-x-2">
          <Button variant="secondary" @click="$emit('close')">Cancelar</Button>
          <Button @click="$emit('submit')">Subir</Button>
        </div>
      </Card>
    </div>
  </template>
  
  <script setup>
  import Input from '../ui/Input.vue';
  import Card from '../ui/Card.vue';
  
  defineProps(['newVideo']);
  </script>
  