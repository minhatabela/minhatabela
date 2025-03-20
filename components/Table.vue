<template>
  <UCard variant="subtle">
    <UTable :columns="columns" :data="tabela">
      <template #0-cell="{ row }">
        <UBadge :color="badgeColor(row.index + 1)" class="rounded-full"> {{ row.index + 1 }} </UBadge>
      </template>
      <template #1-cell="{ row }">
        <div class="flex gap-2 items-center">
          <img style="width: 20px;" :src="row.original.clube_url" alt="">
          <span class="font-bold">{{ row.original.equipe }}</span>
        </div>
      </template>
      <template #2-cell="{ row }">
        <span class="font-bold">{{ row.original.pontos }}</span>
      </template>
    </UTable>
  </UCard>
</template>

<script lang="ts" setup>

import { type TableColumn, type TableRow } from '#ui/types';
import { badgeColor } from '~/utils/tabela';
interface Props {
  columns: TableColumn[]
  tabela: TableRow[]
}

defineProps<Props>()
</script>

<style></style>