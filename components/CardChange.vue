<template>
  <UCard variant="subtle">
    <div class="flex flex-col gap-3">
      <div class="flex justify-between">
        <UBadge size="xs" color="neutral" class="mb-2">Partida {{ partida }}</UBadge>
      </div>
      <div class="flex gap-1 items-center justify-start" v-for="_item in item">
        <p class="text-base"> <strong>{{ _item.path[1] }}</strong> mudou </p>
        <UTooltip text="minhatabela">
          <UBadge variant="subtle" size="md" color="neutral">{{ _item.oldValue || 'null' }}</UBadge>
        </UTooltip>
        <Icon name="i-basil-arrow-right-solid" size="1.5rem" />
        <UTooltip text="Oficial">
          <UBadge color="warning" size="md" variant="subtle"> {{ _item.value || 'null' }}
          </UBadge>
        </UTooltip>
      </div>
    </div>
    <div class="flex justify-end">
      <UButton @click="emit('setNumeroPartida', partida)" size="sm" color="info" variant="ghost" class="mt-4">
        Corrigir</UButton>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
interface Item {
  path: string[]
  type: "CHANGE" | "REMOVE" | "DELETE",
  value: string
  oldValue: string
}

interface Props {
  item: Item[]
}

const emit = defineEmits(['setNumeroPartida'])

const props = defineProps<Props>()

const partida = computed(() => {
  return props.item[0].path[0] || 0
})
</script>

<style></style>