<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-end w-full">
      <UButton size="xs" variant="ghost" color="purple" :label="toggleLabel"
        :icon="enabled ? 'i-carbon-view-filled' : 'i-carbon-view-off-filled'" @click="toggle()" />
    </div>
    <div class="relative">
      <HiddenContent :enabled="enabled" />
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HiddenContent from './HiddenContent.vue';


const [enabled, toggle] = useToggle()

interface Props {
  label: string
}

const props = defineProps<Props>()

const toggleLabel = computed(() => {
  if (enabled.value) {
    return `ver ${props.label}`
  }

  return `ocultar ${props.label}`
})

</script>

<style></style>