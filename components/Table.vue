<template>
  <UCard>
    <UTable :columns="columns" :rows="tabela">
      <template #posicao-data="{ row }">
        <UBadge :color="badgeColor(tabela.indexOf(row) + 1)" :ui="{ rounded: 'rounded-full' }"
          :label="tabela.indexOf(row) + 1" />
      </template>
      <template #equipe-data="{ row }">
        <div class="flex gap-2 items-center">
          <img style="width: 20px;" :src="row.clube_url" alt="">
          <span class="font-bold">{{ row.equipe }}</span>
        </div>
      </template>
      <template #pontos-data="{ row }">
        <span class="font-bold">{{ row.pontos }}</span>
      </template>
    </UTable>
  </UCard>
</template>

<script lang="ts" setup>

import { type TableColumn, type TableRow } from '#ui/types';
import { badgeColor } from '../utils/tabela';

interface Props {
  columns: TableColumn[]
  tabela: TableRow[]
}

defineProps<Props>()
</script>

<style></style>