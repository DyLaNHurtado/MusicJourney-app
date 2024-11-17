<template>
    <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-between py-8 px-4">
      <h1 class="text-2xl font-bold mb-8">Empieza a practicar hoy</h1>
      
      <div class="relative w-80 h-80">
        <!-- Círculo base para el slider -->
        <svg class="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#4C51BF"
            stroke-width="4"
          />
          <!-- Arco del slider -->
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#7F9CF5"
            stroke-width="4"
            stroke-linecap="round"
            :stroke-dasharray="`${circleCircumference} ${circleCircumference}`"
            :stroke-dashoffset="dashOffset"
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        <!-- Knob del slider -->
        <div
          class="absolute w-8 h-8 bg-white rounded-full shadow-lg cursor-pointer"
          :style="knobPosition"
          @mousedown="startDrag"
          @touchstart="startDrag"
        ></div>
        
        <!-- Contenedor del instrumento -->
        <div class="absolute inset-4 rounded-full bg-indigo-700 flex items-center justify-center overflow-hidden">
          <img src="/vite.svg" alt="Guitarra" class="w-3/4 h-3/4 object-contain" />
          <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
            <span class="text-white text-lg font-semibold">Cambiar instrumento</span>
          </div>
        </div>
        
        <!-- Tiempo de práctica -->
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-4xl font-bold">{{ formatTime(practiceTime) }}</span>
        </div>
      </div>
      
      <!-- Notas musicales decorativas -->
      <div class="absolute top-1/4 left-1/4 animate-float">♪</div>
      <div class="absolute top-1/3 right-1/4 animate-float animation-delay-200">♫</div>
      <div class="absolute bottom-1/4 left-1/3 animate-float animation-delay-400">♩</div>
      
      <div class="mt-8 flex flex-col items-center">
        <button
          @click="startPractice"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-colors duration-300 mb-4"
        >
          ¡A practicar!
        </button>
        
        <button
          @click="goToMonthlyProgress"
          class="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300"
        >
          Ver progreso mensual
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  
  const practiceTime = ref(30)
  const isDragging = ref(false)
  const startAngle = ref(0)
  
  const circleCircumference = 2 * Math.PI * 48
  
  const dashOffset = computed(() => {
    const progress = (practiceTime.value - 5) / (120 - 5)
    return circleCircumference * (1 - progress)
  })
  
  const knobPosition = computed(() => {
    const angle = ((practiceTime.value - 5) / (120 - 5)) * 360
    const x = 50 + 48 * Math.cos((angle - 90) * (Math.PI / 180))
    const y = 50 + 48 * Math.sin((angle - 90) * (Math.PI / 180))
    return {
      left: `${x}%`,
      top: `${y}%`,
      transform: 'translate(-50%, -50%)'
    }
  })
  
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins} min`
  }
  
  const startDrag = (event) => {
    event.preventDefault()
    isDragging.value = true
    const rect = event.target.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    startAngle.value = Math.atan2(
      event.clientY - centerY,
      event.clientX - centerX
    )
    document.addEventListener('mousemove', drag)
    document.addEventListener('touchmove', drag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('touchend', stopDrag)
  }
  
  const drag = (event) => {
    if (!isDragging.value) return
    const clientX = event.clientX || event.touches[0].clientX
    const clientY = event.clientY || event.touches[0].clientY
    const rect = event.target.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const angle = Math.atan2(clientY - centerY, clientX - centerX)
    let deltaAngle = angle - startAngle.value
    if (deltaAngle < 0) {
      deltaAngle += 2 * Math.PI
    }
    const percentage = deltaAngle / (2 * Math.PI)
    practiceTime.value = Math.round(percentage * (120 - 5) + 5)
    practiceTime.value = Math.max(5, Math.min(120, practiceTime.value))
  }
  
  const stopDrag = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('touchmove', drag)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('touchend', stopDrag)
  }
  
  const startPractice = () => {
    // Implementar lógica de inicio de práctica aquí
    console.log(`Iniciando sesión de práctica por ${practiceTime.value} minutos`)
  }
  
  const goToMonthlyProgress = () => {
    // Implementar navegación al progreso mensual aquí
    console.log('Navegando al progreso mensual')
  }
  
  onMounted(() => {
    document.addEventListener('mousemove', drag)
    document.addEventListener('touchmove', drag)
  })
  
  onUnmounted(() => {
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('touchmove', drag)
  })
  </script>
  
  <style scoped>
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animation-delay-200 {
    animation-delay: 0.2s;
  }
  
  .animation-delay-400 {
    animation-delay: 0.4s;
  }
  </style>