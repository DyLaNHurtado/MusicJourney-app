<!-- src/App.vue -->
<template>
  <div class="flex h-screen bg-gray-900 text-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 max-md:pb-16">
        <div class="container mx-auto overflow-hidden  min-w-full min-h-full px-6 py-8">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/layout/Sidebar.vue'
import Header from './components/layout/Header.vue'
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

:root {
  --color-primary: #7289da;
  --color-secondary: #4e5d94;
  --color-accent: #ff7f50;
}
</style>