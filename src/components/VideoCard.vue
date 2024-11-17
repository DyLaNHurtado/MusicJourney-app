<template>
  <div class="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
    <div class="aspect-w-16 aspect-h-9" ref="fullscreenContainer">
      <video 
        ref="videoRef"
        :src="video.videoUrl"
        :poster="video.thumbnail"
        class="object-cover w-full h-full"
        preload="metadata"
        @click="togglePlay"
      ></video>
      <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300"
           :class="{ 'opacity-0': isPlaying && !showControls }">
        <button @click.stop="togglePlay" class="text-white p-4 rounded-full bg-indigo-600 bg-opacity-75 hover:bg-opacity-100 transition-all duration-300">
          <svg v-if="!isPlaying" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.90588 4.53682C6.50592 4.2998 6 4.58808 6 5.05299V18.947C6 19.4119 6.50592 19.7002 6.90588 19.4632L18.629 12.5162C19.0211 12.2838 19.0211 11.7162 18.629 11.4838L6.90588 4.53682Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" stroke="currentColor" stroke-width="1.5"></path>
          </svg>
        </button>
      </div>
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300"
           :class="{ 'opacity-0': !showControls }"
           @mouseenter="showControls = true"
           @mouseleave="hideControls">
        <div class="flex items-center justify-between mb-2">
          <span class="text-white text-sm">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
          <div class="flex items-center space-x-2">
            <button @click.stop="toggleMute" class="text-white hover:text-indigo-400">
              <svg v-if="isMuted" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 14L20.0005 12M22 10L20.0005 12M20.0005 12L18 10M20.0005 12L22 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M2 13.8571V10.1429C2 9.03829 2.89543 8.14286 4 8.14286H6.9C7.09569 8.14286 7.28708 8.08544 7.45046 7.97772L13.4495 4.02228C14.1144 3.5839 15 4.06075 15 4.85714V19.1429C15 19.9392 14.1144 20.4161 13.4495 19.9777L7.45046 16.0223C7.28708 15.9146 7.09569 15.8571 6.9 15.8571H4C2.89543 15.8571 2 14.9617 2 13.8571Z" stroke="currentColor" stroke-width="1.5"></path>
              </svg>
              <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13.8571V10.1429C1 9.03829 1.89543 8.14286 3 8.14286H5.9C6.09569 8.14286 6.28708 8.08544 6.45046 7.97772L12.4495 4.02228C13.1144 3.5839 14 4.06075 14 4.85714V19.1429C14 19.9392 13.1144 20.4161 12.4495 19.9777L6.45046 16.0223C6.28708 15.9146 6.09569 15.8571 5.9 15.8571H3C1.89543 15.8571 1 14.9617 1 13.8571Z" stroke="currentColor" stroke-width="1.5"></path>
                <path d="M17.5 7.5C17.5 7.5 19 9 19 11.5C19 14 17.5 15.5 17.5 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M20.5 4.5C20.5 4.5 23 7 23 11.5C23 16 20.5 18.5 20.5 18.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <button @click.stop="toggleFullScreen" class="text-white hover:text-indigo-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 9L20 4M20 4V8M20 4H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M9 15L4 20M4 20V16M4 20H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="relative w-full h-1 bg-gray-600 rounded-full overflow-hidden">
          <div class="absolute top-0 left-0 h-full bg-indigo-500 rounded-full" :style="{ width: `${progress}%` }"></div>
        </div>
      </div>
    </div>
    <div class="p-4 flex flex-col justify-between flex-grow">
      <div>
        <h3 class="text-lg font-semibold text-white mb-2 truncate">{{ video.title }}</h3>
        <p class="text-sm text-gray-400 mb-4 line-clamp-2">{{ video.description }}</p>
      </div>
      <div class="flex flex-wrap justify-between items-center text-xs text-gray-500">
        <div v-if="video.date" class="flex items-center space-x-2 mb-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ formatDate(video.date) }}</span>
        </div>
        <div v-if="video.duration!=null" class="flex items-center space-x-2 mb-2">
          <svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6L12 12L18 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          <span>{{ video.duration }}</span>
        </div>
        <div v-if="video.category!=null && video.category!==''" class="flex items-center space-x-2 mb-2">
          <svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          <span>{{ video.category }}</span>
        </div>
      </div>
      <div v-if="video.tags.length>0" class="flex flex-wrap gap-2 mt-2">
        <span v-for="tag in video.tags" :key="tag" class="px-2 py-1 bg-indigo-600 text-white text-xs rounded-full">
          {{ tag }}
        </span>
      </div>
      <div class="flex justify-between mt-4">
        <button @click="$emit('edit', video)" class="text-indigo-400 hover:text-indigo-300 transition-colors duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button @click="$emit('delete', video.id)" class="text-red-400 hover:text-red-300 transition-colors duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete'])

const videoRef = ref(null)
const fullscreenContainer = ref(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const showControls = ref(false)
const isFullScreen = ref(false)

const progress = computed(() => {
  return (currentTime.value / duration.value) * 100 || 0
})

const togglePlay = () => {
  const video = videoRef.value
  if (video.paused) {
    video.play()
    isPlaying.value = true
  } else {
    video.pause()
    isPlaying.value = false
  }
}

const updateTime = () => {
  currentTime.value = videoRef.value.currentTime
  duration.value = videoRef.value.duration
}

const toggleMute = () => {
  const video = videoRef.value
  video.muted = !video.muted
  isMuted.value = video.muted
}

const toggleFullScreen = () => {
  const container = fullscreenContainer.value
  if (!document.fullscreenElement) {
    if (container.requestFullscreen) {
      container.requestFullscreen()
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen()
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

const hideControls = () => {
  if (isPlaying.value) {
    showControls.value = false
  }
}

let hideControlsTimeout

onMounted(() => {
  const video = videoRef.value
  video.addEventListener('timeupdate', updateTime)
  video.addEventListener('loadedmetadata', () => {
    duration.value = video.duration
  })
  
  fullscreenContainer.value.addEventListener('mousemove', () => {
    showControls.value = true
    clearTimeout(hideControlsTimeout)
    hideControlsTimeout = setTimeout(hideControls, 3000)
  })
})
onBeforeUnmount(() => {
  const video = videoRef.value
  video.removeEventListener('timeupdate', updateTime)
  clearTimeout(hideControlsTimeout)
})
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
  
}
.aspect-h-9 {
  position: relative;
  width: 100%;
  height: 100%;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>