<template>
  <div :class="{ 'w-full': enabled }"
    class="backdrop-blur-xl rounded-lg absolute top-0 left-0 right-0 bottom-0 z-10 w-0 transition-all ease-in-out duration-1000">

  </div>
</template>

<script lang="ts" setup>
interface Props {
  enabled: boolean
}

defineProps<Props>()
</script>

<style></style>