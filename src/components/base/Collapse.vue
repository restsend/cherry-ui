<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  collapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapse: false,
})

const openCollapse = ref(props.collapse)
function changeCollapse() {
  setTimeout(() => {
    openCollapse.value = !openCollapse.value
    const a = document.getElementById('content')
    console.log(a)
  }, 200)
}
</script>

<template>
  <div class="p-4 border border-gray-100 rounded-md w-80">
    <div class="flex justify-between" @click=" changeCollapse">
      <p> <slot name="title" /></p>
      <div class="transition duration-300 ease-in-out" :class="openCollapse ? ' transform rotate-180' : 'transform-none'">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5  text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
    <div class="duration-300 ease-in-out transform translate-y-6 " :class="openCollapse ? 'block' : 'hidden h-0'">
      <slot id="content" name="content" />
    </div>
  </div>
</template>
