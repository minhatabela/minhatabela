<script lang="ts" setup>
import { type TableColumn, type TableRow } from '#ui/types'
import { Position } from '../values/Position'
import PositionBadge from './PositionBadge.vue'

interface Props {
  columns: TableColumn<any>[]
  tabela: TableRow<any>[]
  sensitive?: boolean
}

const { sensitive = false } = defineProps<Props>()
</script>

<template>
  <UCard variant="subtle" class="relative">
    <UTable :columns="columns" :data="tabela">
      <template #0-cell="{ row }">
        <PositionBadge :position="new Position(row.index + 1)" />
      </template>
      <template #1-cell="{ row }">
        <TeamCell :emblem="row.original.clube_url" :team="row.original.equipe"/>
      </template>
      <template #2-cell="{ row }">
        <span class="font-bold text-highlighted">{{ row.original.pontos }}</span>
      </template>
    </UTable>
    <HiddenContent :enabled="sensitive" />
  </UCard>
</template>

<style></style>
