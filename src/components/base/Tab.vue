<script lang="ts" setup>
import { provide, reactive, useSlots } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

provide('tabs', { value: props.modelValue })

const slots = useSlots()
const defaultSlot = slots.default?.()

const flux = reactive({
  tab: [] as any[],
  activeTab(tab: any, idx: number) {
    if (typeof props.modelValue === 'number')
      return idx
    if (typeof props.modelValue === 'string')
      return tab.value
  },
  selectTab(tab: any, idx: number) {
    if (typeof props.modelValue === 'number')
      emit('update:modelValue', idx)
    if (typeof props.modelValue === 'string')
      emit('update:modelValue', tab.value)
  },
})

if (defaultSlot) {
  for (let i = 0; i < defaultSlot.length; i++) {
    const tab = defaultSlot[i]
    flux.tab = [...flux.tab, tab.props]
  }
}

const Render = () => {
  if (slots.default) {
    if (typeof props.modelValue === 'number')
      return slots.default()[props.modelValue]

    if (typeof props.modelValue === 'string' && defaultSlot) {
      for (let i = 0; i < defaultSlot.length; i++) {
        const tab = defaultSlot[i]

        if (tab.props?.value === props.modelValue)
          return slots.default()[i]
      }
    }
  }
}
</script>

<template>
  <div class="w-full p-4">
    <div class="flex items-center">
      <div
        v-for="(tab, idx) in flux.tab" :key="idx"
        class="tab"
        :class="{
          active: flux.activeTab(tab, idx) === modelValue,
        }"
        @click="flux.selectTab(tab, idx)"
      >
        <span> {{ tab?.title }} </span>
        <span class="inline-block w-5 h-5 ml-2" :class="tab?.icon" />
      </div>
    </div>
    <div class="p-4">
      <Render />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab {
  @apply flex items-center cursor-pointer my-2 px-7 pt-4 pb-3.5 border-b-2 border-transparent;
  @apply text-xs font-medium uppercase leading-tight text-neutral-500;

  &.active {
    @apply text-primary-500 border-primary-500;
  }
}
</style>
