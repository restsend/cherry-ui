<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: boolean
  type?: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'secondary' | 'accent'
  checked?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  type: 'primary',
  checked: false,
  disabled: false,
})

const emits = defineEmits<{
  (evt: 'update:modelValue', val: boolean): void
}>()

const checkValue = computed({
  get: () => props.modelValue || props.checked,
  set: val => emits('update:modelValue', val),
})
</script>

<template>
  <div class="flex h-6 items-center">
    <input
      v-model="checkValue"
      v-bind="$attrs"
      type="checkbox"
      :disabled="disabled"
      aria-describedby="comments-description"
      class="h-4 w-4 rounded border-gray-300 mr-2"
      :class="[
        {
          'opacity-30 cursor-not-allowed': disabled,
          'primary': type === 'primary',
          'secondary': type === 'secondary',
          'accent': type === 'accent',
          'success': type === 'success',
          'info': type === 'info',
          'warning': type === 'warning',
          'error': type === 'error',
        },
      ]"
    >
    <slot />
  </div>
</template>

<style scoped>
.primary {
  @apply text-primary-400 focus:ring-primary-500
}
.secondary {
  @apply text-secondary-400 focus:ring-secondary-500
}
.accent {
  @apply text-accent-400 focus:ring-accent-500
}
.success {
  @apply text-success-400 focus:ring-success-500
}
.info {
  @apply text-info-400 focus:ring-info-500
}
.warning {
  @apply text-warning-400 focus:ring-warning-500
}
.error {
  @apply text-error-400 focus:ring-error-500
}
</style>
