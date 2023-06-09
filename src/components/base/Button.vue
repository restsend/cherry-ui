<script setup lang="ts">
interface Props {
  type?: 'default' | 'success' | 'info' | 'warning' | 'error' | 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'base' | 'lg'
  disabled?: boolean
  custom?: string
}

withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'base',
  disabled: false,
  custom: '',
})
</script>

<template>
  <button
    v-bind="$attrs"
    type="button"
    :disabled="disabled"
    class="whitespace-nowrap inline-flex w-full items-center justify-center
    rounded-md shadow-sm text-xs font-sans font-semibold leading-4
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-30
    sm:w-auto"
    :class="custom || [[type], {
      'px-2 py-1': size === 'sm',
      'px-3 py-2.5 sm:py-2': size === 'base',
      'px-10 py-4': size === 'lg',
    }]"
  >
    <slot />
  </button>
</template>

<style scoped>
.default {
  @apply text-black bg-gray-100;
  @apply hover:bg-gray-200 focus:ring-gray-500;
}
.primary {
  @apply text-white bg-primary-500;
  @apply hover:bg-primary-600 focus:ring-primary-500;
}
.secondary {
  @apply text-white bg-secondary-500;
  @apply hover:bg-secondary-600 focus:ring-secondary-500;
}
.accent {
  @apply text-white bg-accent-500;
  @apply hover:bg-accent-600 focus:ring-accent-500;
}
.success {
  @apply text-white bg-success-500;
  @apply hover:bg-success-600 focus:ring-success-500;
}
.info {
  @apply text-white bg-info-500;
  @apply hover:bg-info-600 focus:ring-info-500;
}
.warning {
  @apply text-white bg-warning-500;
  @apply hover:bg-warning-600 focus:ring-warning-500;
}
.error {
  @apply text-white bg-error-500;
  @apply hover:bg-error-600 focus:ring-error-500;
}
</style>
