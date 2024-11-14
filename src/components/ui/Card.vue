<!-- src/components/ui/Card.vue -->
<template>
    <div class="bg-gray-700 rounded-lg shadow-md overflow-hidden">
      <div v-if="$slots.header" class="px-6 py-4 bg-gray-800 border-b border-gray-600">
        <slot name="header"></slot>
      </div>
      <div class="p-6">
        <slot></slot>
      </div>
      <div v-if="$slots.footer" class="px-6 py-4 bg-gray-800 border-t border-gray-600">
        <slot name="footer"></slot>
      </div>
    </div>
  </template>