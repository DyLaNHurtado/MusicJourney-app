<!-- src/components/ui/Button.vue -->
<template>
    <button
      :class="[
        'px-4 py-2 rounded-full font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200',
        variantClasses[variant],
        sizeClasses[size],
        { 'opacity-50 cursor-not-allowed': disabled }
      ]"
      :disabled="disabled"
      @click="$emit('click')"
    >
      <slot></slot>
    </button>
  </template>
  
  <script setup>
  const props = defineProps({
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'danger', 'basic'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
  
  const variantClasses = {
    primary: 'bg-green-500 text-white hover:bg-green-600',
    secondary: 'bg-yellow-500 text-gray-900 hover:bg-yellow-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    basic: 'bg-gray-700 text-gray-100 hover:bg-gray-600',
  }
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  </script>