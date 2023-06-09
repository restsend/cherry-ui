<script setup lang="ts">
import { onUnmounted, watch } from 'vue'

interface Props {
  placement?: 'top' | 'right' | 'bottom' | 'left'
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'left',
})

const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', !props.modelValue)
}

watch(
  () => props.modelValue,
  val => document.body.style.overflow = val ? 'hidden' : 'auto',
)

onUnmounted(() => {
  close()
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <Teleport to="body">
    <div
      v-bind="$attrs"
      class="fixed z-50 overflow-y-auto bg-white transition-all"
      :class="{
        'w-80 h-screen': placement === 'right' || placement === 'left',
        'top-0 -left-80': placement === 'left' && !modelValue,
        'top-0 left-0': placement === 'left' && modelValue,
        'top-0 -right-80': placement === 'right' && !modelValue,
        'top-0 right-0': placement === 'right' && modelValue,
        'w-full h-80': placement === 'top' || placement === 'bottom',
        'left-0 -top-80': placement === 'top' && !modelValue,
        'left-0 top-0': placement === 'top' && modelValue,
        'left-0 -bottom-80': placement === 'bottom' && !modelValue,
        'left-0 bottom-0': placement === 'bottom' && modelValue,
      }"
    >
      <slot />
    </div>
    <div
      v-if="modelValue"
      class="fixed inset-0 z-40"
      aria-hidden="true"
      @click="close"
    >
      <div class="absolute inset-0 bg-gray-500 opacity-75" />
    </div>
  </Teleport>
</template>
