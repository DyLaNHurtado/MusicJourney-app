<template>
  <div class="text-white flex flex-col items-center justify-between py-6 px-4">
    <Transition name="fade">
    <h1 v-if="!isPracticing" class="mb-6 text-gray-300"> Toca en el centro para cambiar el instrumento</h1>
  </Transition>
    
    <div class="relative w-80 h-80" ref="dialContainer">
      <svg class="w-full h-full" viewBox="0 0 100 100">
        <defs>
          <!-- Gradient ajustado para un efecto circular -->
          <linearGradient id="dialGradient" gradientUnits="userSpaceOnUse" x1="50" y1="50" r="44">
            <stop offset="0%" style="stop-color:#4C51BF;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#7F9CF5;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="#2D3748" />
        <circle cx="50" cy="50" r="44" fill="none" stroke="#4A5568" stroke-width="1" />
        <g class="dial-marks"></g>
        <path
          :d="arcPath"
          fill="none"
          stroke="url(#dialGradient)"
          stroke-width="8"
          stroke-linecap="round"
        />
      </svg>
      <div
        class="absolute w-16 h-16 bg-indigo-600 rounded-full shadow-lg cursor-pointer flex items-center justify-center"
        :style="knobPosition"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <div class="w-2 h-8 bg-white rounded-full transform -translate-y-2"></div>
      </div>
      <!-- TODO: Hacer que cuando cambie currentInstrument hago un bounce de bounce en la img -->
      
      <div @click="changeInstrument()" class="absolute inset-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-indigo-600 transition-all duration-300">
        <img :src="currentInstrument.image"
            :alt="currentInstrument.name" 
            :class="{ 'animate-bounce': bounceActive, 'animate-swing': isPracticing }" 
            class="w-3/4 h-3/4 object-contain drop" />
      </div>

    </div>

    <div class="mt-6 text-center">
      <span class="text-6xl font-bold text-gray-100">{{ isPracticing ? formatTime(practiceSeconds) : formatTime(practiceTime * 60) }}</span>
    </div>

    <!-- Botones de control -->
    <div class="mt-8 flex flex-col items-center w-full max-w-xs">
      <button v-if="!isPracticing"
        @click="startPractice"
        class="w-full animate-scale bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-colors duration-300 mb-4"
      >
        ¡A practicar!
      </button>
      <button v-if="!isPracticing"
        @click="goToMonthlyProgress"
        class="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
      >
        Ver progreso mensual
      </button>

      <button v-if="isPracticing"
        @click="stopPractice"
        class=" mt-8 w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
      >
        Parar de practicar
      </button>
    </div>

    <!-- Notas musicales -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="(note, index) in musicalNotes" :key="index"
           class="absolute text-indigo-300 opacity-20 animate-float"
           :style="note.style">
        {{ note.symbol }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const instruments = [
  { name: 'Guitarra', image: 'https://media.istockphoto.com/id/636379014/es/foto/manos-la-formaci%C3%B3n-de-una-forma-de-coraz%C3%B3n-con-silueta-al-atardecer.jpg?s=612x612&w=0&k=20&c=R2BE-RgICBnTUjmxB8K9U0wTkNoCKZRi-Jjge8o_OgE=', sound:'' },
  { name: 'Bajo', image: '/placeholder.svg?height=200&width=200', sound:'' },
  { name: 'Microfono', image: '/placeholder.svg?height=200&width=200' , sound:'' },
  { name: 'Piano', image: '/placeholder.svg?height=200&width=200' , sound:'' },
  { name: 'Batería', image: '/placeholder.svg?height=200&width=200' , sound:'' },
  { name: 'Violín', image: '/placeholder.svg?height=200&width=200' , sound:'' },
]
const practiceTime = ref(30)
const isDragging = ref(false)
const dialContainer = ref(null);
const isPracticing = ref(false);
const currentInstrument = ref(instruments[0])
const musicalNotes = ref([])
const practiceSeconds = ref(practiceTime.value * 60);
const bounceActive = ref(false);


const minTime = 5
const maxTime = 120
const totalAngle = 280

// Gradiente ajustado para mantener inicio/fin uniforme
const arcPath = computed(() => {
  const progress = isPracticing.value
    ? practiceProgress.value
    : (practiceTime.value - minTime) / (maxTime - minTime);
  const endAngle = -135 + progress * totalAngle;
  const largeArcFlag = endAngle - -135 <= 180 ? 0 : 1;
  const startX = 50 + 44 * Math.cos(-135 * Math.PI / 180);
  const startY = 50 + 44 * Math.sin(-135 * Math.PI / 180);
  const endX = 50 + 44 * Math.cos(endAngle * Math.PI / 180);
  const endY = 50 + 44 * Math.sin(endAngle * Math.PI / 180);
  return `M ${startX} ${startY} A 44 44 0 ${largeArcFlag} 1 ${endX} ${endY}`;
});


const knobPosition = computed(() => {

  const angle = -135 + (isPracticing.value ? practiceProgress.value : ((practiceTime.value - minTime) / (maxTime - minTime))) * totalAngle
  const x = 50 + 44 * Math.cos(angle * (Math.PI / 180))
  const y = 50 + 44 * Math.sin(angle * (Math.PI / 180))
  return { left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }
})

// Formato del tiempo
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
  }
  return `${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
};

// Eventos de práctica
let practiceInterval = null;

const startPractice = () => {
  if (isPracticing.value) return; // Evitar múltiples inicios
  isPracticing.value = true;
  practiceSeconds.value = practiceTime.value * 60;

  practiceInterval = setInterval(() => {
    if (practiceSeconds.value > 0) {
      practiceSeconds.value -= 1;
    } else {
      stopPractice();
      console.log('¡Práctica terminada!');
    }
  }, 1000);
};

const stopPractice = () => {
  clearInterval(practiceInterval);
  isPracticing.value = false;
};

const practiceProgress = computed(() => {
  if (!isPracticing.value) return 1;
  return practiceSeconds.value / (practiceTime.value * 60);
});


const changeInstrument = () => {
  if(!isPracticing.value){
  const currentIndex = instruments.findIndex(i => i.name === currentInstrument.value.name)
  currentInstrument.value = instruments[(currentIndex + 1) % instruments.length]
    // Vibración para móviles
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  // Reproduce sonido
  const switchSound = new Audio(currentInstrument.value.sound);
  switchSound.currentTime = 0; // Reinicia sonido
  switchSound.play();

  // Activar efecto bounce
  bounceActive.value = true;
  const idtimeOut = setTimeout(() => {
    bounceActive.value = false;
    clearTimeout(idtimeOut);
  }, 500);
}
}
const goToMonthlyProgress = () => console.log('Ir al progreso mensual')

// Notas musicales dinámicas
const generateMusicalNotes = () => {
  const symbols = ['♪', '♫', '♩', '♬', '♭', '♮', '♯']
  musicalNotes.value = Array.from({ length: 15 }, () => ({
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 30 + 10}px`,
      animationDuration: `${Math.random() * 10 + 5}s`,
      animationDelay: `${Math.random() * 5}s`,
    }
  }))
}
const generateDialMarks = () => {
  const dialMarks = document.querySelector('.dial-marks')
  if(dialMarks!=null){
  for (let i = 0; i <= 6; i++) {
    const angle = -135 + i * (totalAngle / 6)
    const x1 = 50 + 42 * Math.cos(angle * (Math.PI / 180))
    const y1 = 50 + 42 * Math.sin(angle * (Math.PI / 180))
    const x2 = 50 + 46 * Math.cos(angle * (Math.PI / 180))
    const y2 = 50 + 46 * Math.sin(angle * (Math.PI / 180))
    const mark = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    mark.setAttribute('x1', x1)
    mark.setAttribute('y1', y1)
    mark.setAttribute('x2', x2)
    mark.setAttribute('y2', y2)
    mark.setAttribute('stroke', '#718096')
    mark.setAttribute('stroke-width', '2')
    dialMarks.appendChild(mark)
  }
}

};

const startDrag = (event) => {
  if (isPracticing.value) return;
  event.preventDefault();
  if (navigator.vibrate) {
      navigator.vibrate(50);
  }
  isDragging.value = true;
  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);
};

const drag = (event) => {
  if (!isDragging.value || !dialContainer.value) return;

  const rect = dialContainer.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const clientX = event.clientX || event?.touches[0]?.clientX;
  const clientY = event.clientY || event?.touches[0]?.clientY;
  const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  let mappedAngle = (angle + 135 + 360) % 360;

  if (mappedAngle > totalAngle) {
    mappedAngle = mappedAngle > totalAngle + (360 - totalAngle) / 2 ? 0 : totalAngle;
  }

  practiceTime.value = Math.round((mappedAngle / totalAngle) * (maxTime - minTime) + minTime);
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('touchmove', drag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchend', stopDrag);
};

onMounted(()=>{
  generateMusicalNotes();
  generateDialMarks();
})
</script>

<style scoped>
@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  50% {
    transform: translateY(-200px) rotate(15deg) scale(1.3);
  }
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}
</style>
