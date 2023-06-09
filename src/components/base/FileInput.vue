<script setup lang="ts">
import { uniqueId } from 'lodash'
import { computed, reactive } from 'vue'

interface FileInfo {
  id: string
  name: string
  file?: File
}

interface Props {
  fileList?: Array<FileInfo>
  placeholder?: string
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select a file',
  multiple: false,
})

const emit = defineEmits(['change', 'update:fileList'])
const uid = uniqueId('file-input-')

const theFiles = computed({
  get() {
    return props.fileList || []
  },
  set(value: Array<FileInfo>) {
    emit('update:fileList', value)
  },
})

const flux = reactive({
  fileNames: [] as string[],
  onChange(event: Event) {
    const el = event.target as HTMLInputElement
    const files = Array.from(el.files || [])
    flux.fileNames = files.map(file => file.name)
    theFiles.value = files.map(file => ({
      id: uniqueId('file-'),
      name: file.name,
      file,
    }))
    emit('change', event)
  },
})
</script>

<template>
  <label
    :for="uid"
    :class="{ upload: !$slots.default }"
  >
    <template v-if="$slots.default">
      <slot />
    </template>

    <template v-else>
      <div v-if="flux.fileNames.length > 1" class="flex flex-wrap gap-1">
        <div
          v-for="item in flux.fileNames" :key="item"
          class="text-xs rounded inline-block whitespace-nowrap text-center px-1 bg-primary-300 text-whit"
        >
          {{ item }}
        </div>
      </div>
      <div v-else-if="flux.fileNames.length === 1" class="text-sm">
        {{ flux.fileNames[0] }}
      </div>
      <div v-else class="text-gray-400">
        {{ placeholder }}
      </div>
      <div class="i-fa-upload w-5 h-5 text-gray-400" />
    </template>
  </label>
  <input
    :id="uid"
    class="hidden"
    type="file"
    v-bind="$attrs"
    :multiple="multiple"
    @change="flux.onChange"
  >
</template>

<style scoped>
/* TODO: */
/* focus:outline-none focus:shadow-outline */
.upload {
  @apply flex justify-between bg-white dark:bg-slate-800 cursor-pointer shadow appearance-none border rounded w-full py-2 px-3 leading-tight ;
}
</style>
