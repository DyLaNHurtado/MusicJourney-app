<!-- src/components/ui/Input.vue -->
<template>
    <div>
      <label v-if="label" :for="id" class="block text-sm font-medium text-gray-300 mb-1">
        {{ label }}
      </label>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :class="[
          'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
          { 'opacity-50 cursor-not-allowed': disabled }
        ]"
        :disabled="disabled"
      >
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  defineProps({
    id: {
      type: String,
      required: true
    },
    label: String,
    modelValue: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
  
  defineEmits(['update:modelValue'])
  </script>