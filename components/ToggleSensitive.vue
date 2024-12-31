<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-end w-full">
      <UButton size="xs" variant="ghost" color="purple" :label="toggleLabel"
        :icon="enabled ? 'i-carbon-view-filled' : 'i-carbon-view-off-filled'" @click="toggle()" />
    </div>
    <div class="relative">
      <div v-show="enabled" class="backdrop-blur-xl rounded-lg absolute top-0 left-0 right-0 bottom-0 z-10"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>

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